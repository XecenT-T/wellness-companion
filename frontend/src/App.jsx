import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import Home from "./Home";
import Login from "./Login";
import Journal from "./components/Journal";
import MEOWChat from "./components/MEOWChat";
import CounselorDashboard from "./components/CounselorDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Resources from "./components/Resources";

const protectedRoutes = ["/home", "/meow", "/journal", "/dashboard", "/resources"];

/**
 * Simple path router (no react-router)
 * - Adds window.navigate(to) for in-app navigation (uses history.pushState)
 * - Listens to popstate so back/forward works
 */
function getRouteComponent(pathname) {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return <Login />;
  }

  if (pathname === "/" || pathname === "/landing") return <Landing />;
  if (pathname === "/home") return <Home />;
  if (pathname === "/login") return <Login />;
  if (pathname === "/meow" || pathname === "/chat") return <MEOWChat />;
  if (pathname === "/dashboard" || pathname === "/counselor") return <CounselorDashboard />;
  if (pathname === "/resources") return <Resources />;

  if (pathname === "/journal") return <Journal />;
  const journalMatch = pathname.match(/^\/journal\/([^/]+)$/);
  if (journalMatch) return <Journal journalId={journalMatch[1]} />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Page not found</h2>
      <p>No client-side view for {pathname}</p>
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(typeof window !== "undefined" ? window.location.pathname : "/");

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);

    // expose navigate() so Header and other components can call it
    window.navigate = (to) => {
      if (!to || typeof to !== "string") return;
      if (to === window.location.pathname) return;
      history.pushState({}, "", to);
      setPath(to);
    };

    return () => {
      window.removeEventListener("popstate", onPop);
      try {
        delete window.navigate;
      } catch (_) {}
    };
  }, []);

  const Page = getRouteComponent(path);
  const showHeaderFooter = !protectedRoutes.includes(path) && path !== "/login";

  return (
    <div className="app-root">
      {showHeaderFooter && <Header />}
      <main>{Page}</main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}
