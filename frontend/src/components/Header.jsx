import React from "react";

/**
 * Use <a> with an onClick handler that uses window.navigate if available.
 * Falls back to full navigation when JS is disabled or navigate is not set.
 */
export default function Header() {
  const handleClick = (e) => {
    // only handle left-clicks without modifier keys
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    if (window && typeof window.navigate === "function") {
      e.preventDefault();
      window.navigate(href);
    }
  };

  const path = window.location.pathname;

  return (
    <header className="site-header" style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <nav>
        {path === "/" || path === "/landing" ? (
          <>
            <a href="/" onClick={handleClick}>About</a> ·{" "}
            <a href="/login" onClick={handleClick}>Login</a>
          </>
        ) : (
          <>
            <a href="/" onClick={handleClick}>About</a> ·{" "}
            <a href="/journal" onClick={handleClick}>Journal</a> ·{" "}
            <a href="/meow" onClick={handleClick}>Chat</a> ·{" "}
            <a href="/login" onClick={handleClick}>Login</a> ·{" "}
            <a href="/dashboard" onClick={handleClick}>Dashboard</a>
          </>
        )}
      </nav>
    </header>
  );
}