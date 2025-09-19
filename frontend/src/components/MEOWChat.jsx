import React, { useState, useEffect, useRef } from "react";

export default function MEOWChat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { role: "user", content: input }];
    setHistory(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/meow/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (res.ok) {
        setHistory([...newHistory, { role: "assistant", content: data.text }]);
      } else {
        setHistory([...newHistory, { role: "assistant", content: `Error: ${data.error || JSON.stringify(data)}` }]);
      }
    } catch (err) {
      setHistory([...newHistory, { role: "assistant", content: `Network error: ${String(err)}` }]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section style={{ paddingTop: 100, maxWidth: 800, margin: "auto" }}>
      <h2>MEOW Chat</h2>
      <div ref={chatHistoryRef} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, height: 400, overflowY: "scroll", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        {history.map((item, index) => (
          <div key={index} style={{ marginBottom: 12, textAlign: item.role === "user" ? "right" : "left" }}>
            <div style={{ display: "inline-block", padding: "10px 15px", borderRadius: 15, backgroundColor: item.role === "user" ? "#a1eafb" : "#e1e1e1" }}>
              {item.content}
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
      <form onSubmit={handleGenerate} style={{ marginTop: 16, display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 8, padding: "12px 16px", borderRadius: 8, border: "none", backgroundColor: "#4caf50", color: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          Send
        </button>
      </form>
    </section>
  );
}