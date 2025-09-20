import React, { useState } from "react";

export default function HomeNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-glass sticky top-0 z-50">
      <div className="container-center flex items-center justify-between py-4 relative">
        <a href="#home" className="brand">
          <span className="font-semibold text-lg">Wellness Companion</span>
        </a>

        <nav className="app-nav">
          <div className="links" role="navigation" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#resources">Resources</a>
            <a href="#chat">Chat</a>
            <a href="#counselor">Counselor</a>
          </div>

          <div className="controls">
            <a href="/" className="btn btn-danger btn-square" aria-label="Logout"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M7 12h14l-3 -3m0 6l3 -3"></path></svg></a>

            <button
              className="mobile-toggle md:hidden ml-2 p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg>
              )}
            </button>
          </div>
        </nav>

        <div
  className={`mobile-panel ${open ? "open" : ""}`}
  role="menu"
  aria-hidden={!open}
>
  <div className="flex flex-col gap-2">
    <a href="#home" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Home</a>
    <a href="#resources" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Resources</a>
    <a href="#chat" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Chat</a>
    <a href="#counselor" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Counselor</a>

    <div className="flex items-center gap-2 pt-2">
      <a href="/" className="btn btn-danger btn-square" aria-label="Logout" onClick={() => setOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M7 12h14l-3 -3m0 6l3 -3"></path></svg></a>
    </div>
  </div>
</div>

      </div>
    </header>
  );
}