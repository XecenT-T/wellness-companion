import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import App from "./App";
import Landing from "./components/Landing";
import Login from "./components/Login";
import "./styles.css";

function Router() {
  const [route, setRoute] = useState(() => (window.location.hash.replace("#", "") || "home"));
  const [authed, setAuthed] = useState(!!localStorage.getItem("wc_user"));

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onStorage = () => setAuthed(!!localStorage.getItem("wc_user"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (route === "app" && !authed) {
    window.location.hash = "login";
    return null;
  }

  return (
    <>
      <Header />
      <main>
        {route === "login" ? <Login /> : route === "app" ? <App /> : <Landing />}
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);