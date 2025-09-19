import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer bg-white mt-12 border-t">
      <div className="container-center py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[var(--teal)] flex items-center justify-center text-white font-bold">❤</div>
              <div className="font-semibold text-lg">Wellness Companion</div>
            </div>
            <p className="text-muted">Providing accessible mental health support and resources for everyone.</p>
          </div>

          <div>
            <div className="font-semibold mb-3">Services</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#chat" className="text-[var(--teal)]">Text Counseling</a></li>
              <li><a href="#counselor" className="text-[var(--teal)]">Video Sessions</a></li>
              <li><a href="#chat" className="text-[var(--teal)]">AI Companion</a></li>
              <li><a href="#journal" className="text-[var(--teal)]">Journaling</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Resources</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#library" className="text-[var(--teal)]">Curated Library</a></li>
              <li><a href="#offline" className="text-[var(--teal)]">Offline Tools</a></li>
              <li><a href="#journal" className="text-[var(--teal)]">Self-Help Tools</a></li>
              <li><a href="#counselor" className="text-[var(--teal)]">Book a Counselor</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Emergency Contacts</div>
            <div className="text-sm space-y-2 text-muted">
              <div>📞 Crisis Line: 988</div>
              <div>✉️ Text: HOME to 741741</div>
              <div>📍 Campus Security: (555) 123-4567</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Wellness Companion. All rights reserved. • Confidential • Available 24/7
        </div>
      </div>
    </footer>
  );
}
// ...existing code...