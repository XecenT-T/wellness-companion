import React, { useState } from "react";

export default function Header() {
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
            <a href="#library">Resources</a>
            <a href="#chat">Chat</a>
            <a href="#counselor">Counselor</a>
          </div>

          <div className="controls">
            <a href="#sos" className="sos" aria-label="SOS">SOS</a>
            <a href="#library" className="btn btn-primary">Find Help</a>

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

        <div className={mobile-panel ${open ? "open" : ""}} role="menu" aria-hidden={!open}>
          <div className="flex flex-col gap-2">
            <a href="#home" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Home</a>
            <a href="#library" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Resources</a>
            <a href="#chat" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Chat</a>
            <a href="#counselor" className="px-3 py-2 rounded-md" onClick={() => setOpen(false)}>Counselor</a>

            <div className="flex items-center gap-2 pt-2">
              <a href="#sos" className="sos" aria-label="SOS">SOS</a>
              <a href="#library" className="btn btn-primary" onClick={() => setOpen(false)}>Find Help</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}