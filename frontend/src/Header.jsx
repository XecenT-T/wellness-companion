import React from "react";

/**
 * Top-level Header (in src/) — mirror behavior of components/Header for consistency.
 */
export default function HeaderSimple() {
  const handleClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    if (window && typeof window.navigate === "function") {
      e.preventDefault();
      window.navigate(href);
    }
  };

  return (
    <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <nav>
        <a href="/" onClick={handleClick}>Landing</a> ·{" "}
        <a href="/home" onClick={handleClick}>Home</a> ·{" "}
        <a href="/journal" onClick={handleClick}>Journal</a> ·{" "}
        <a href="/meow" onClick={handleClick}>Chat</a> ·{" "}
        <a href="/login" onClick={handleClick}>Login</a>
      </nav>
    </header>
  );
}