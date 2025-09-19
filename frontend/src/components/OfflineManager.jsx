import React, { useEffect, useState } from "react";

export default function OfflineManager() {
  const STORAGE_KEY = "offline_resources";

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed saving offline resources", e);
    }
  }, [items]);

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  function clearAll() {
    if (!items.length) return;
    if (!confirm("Clear all offline downloads? This cannot be undone.")) return;
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  function addDemo() {
    const demo = {
      id: Date.now(),
      title: `Demo Resource ${items.length + 1}`,
      type: "article",
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    };
    setItems(prev => [demo, ...prev]);
  }

  return (
    <div className="container-center">
      <div className="mb-6 text-left">
        <h2 className="text-2xl font-semibold">Offline downloads</h2>
        <p className="text-muted">Access curated resources when you don't have an internet connection.</p>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Offline Manager</h3>
            <div className="text-sm text-muted">Manage resources saved for offline use</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost"
              onClick={addDemo}
              title="Add demo offline resource (dev only)"
            >
              Add demo
            </button>

            <button
              className="btn btn-primary"
              onClick={clearAll}
              aria-disabled={items.length === 0}
              disabled={items.length === 0}
            >
              Clear all downloads
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-muted">No downloaded resources yet.</div>
        ) : (
          <ul className="space-y-3">
            {items.map(it => (
              <li
                key={it.id}
                className="flex items-center justify-between bg-[var(--bg-soft-2)] p-4 rounded-md border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-[var(--bg-soft-1)] flex items-center justify-center text-[var(--teal)] font-semibold">
                    {it.type?.[0]?.toUpperCase() ?? "R"}
                  </div>
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-muted">{it.type} · {it.size}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-sm text-muted"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Open offline resource: ${it.title}`);
                    }}
                  >
                    Open
                  </a>

                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      if (!confirm(`Remove "${it.title}" from offline downloads?`)) return;
                      removeItem(it.id);
                    }}
                    aria-label={`Delete ${it.title}`}
                    title="Remove"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}