import React, { useEffect, useRef, useState } from "react";

const BOT_RESPONSES = [
  "I'm here to listen — tell me what’s on your mind.",
  "That sounds difficult. Would you like a breathing exercise or a short grounding technique?",
  "You might try reframing that thought — what's a kinder alternative perspective?",
  "If you'd like, I can suggest a resource or connect you to a counselor.",
  "Remember small steps count — what's one small thing you can do today?"
];

function sampleBotReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes("exam") || t.includes("test") || t.includes("study")) {
    return "Exams can be stressful — try our Exam Stress Decompression Kit in Resources. Want me to open it?";
  }
  if (t.includes("sleep") || t.includes("insomnia")) {
    return "Sleep routines help. I can share a short sleep hygiene routine or a 10-min guided breathing.";
  }
  return BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
}

export default function MEOWChat(){
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("meow_messages") || "[]");
    } catch { return []; }
  });
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("meow_messages", JSON.stringify(messages));
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(e) {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), from: "user", text: trimmed, ts: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      const botText = sampleBotReply(trimmed);
      const botMsg = { id: Date.now()+1, from: "bot", text: botText, ts: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 900 + Math.min(1400, trimmed.length * 30));
  }

  function clearConversation() {
    setMessages([]);
    localStorage.removeItem("meow_messages");
  }

  return (
    <section id="chat" className="section container-center">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2>Chat with M.E.O.W.</h2>
        <p className="text-muted">A supportive conversational companion. Not a replacement for professional therapy.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-0 overflow-hidden">
          <div className="chat-window flex flex-col" style={{height: '520px'}}>
            <div ref={listRef} className="chat-list p-4 overflow-auto" style={{flex: 1, background: 'rgba(14,165,164,0.02)'}}>
              {messages.length === 0 && (
                <div className="text-muted text-center mt-12">Say hi to M.E.O.W. — try: "I'm anxious about exams"</div>
              )}
              {messages.map(m => (
                <div key={m.id} className={`mb-3 max-w-3/4 ${m.from === "user" ? "ml-auto text-right" : "mr-auto text-left"}`}>
                  <div className={`inline-block px-4 py-2 rounded-lg ${m.from === "user" ? "bg-teal-600 text-white" : "bg-white text-[var(--text-dark)]"} shadow-sm`}>
                    {m.text}
                  </div>
                  <div className="text-xs text-muted mt-1">{new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
                </div>
              ))}

              {typing && (
                <div className="mb-3 mr-auto">
                  <div className="inline-flex items-center px-3 py-2 rounded-lg bg-white shadow-sm">
                    <div className="typing-dots mr-2" aria-hidden>
                      <span className="dot" /> <span className="dot" /> <span className="dot" />
                    </div>
                    <div className="text-muted text-sm">M.E.O.W. is typing...</div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="chat-input p-4 border-t bg-white flex gap-3 items-center">
              <input
                className="input flex-1"
                placeholder="Share what's on your mind..."
                value={text}
                onChange={e=>setText(e.target.value)}
                aria-label="Message input"
              />
              <button type="submit" className="btn btn-primary">Send</button>
              <button type="button" className="btn btn-ghost" onClick={clearConversation} title="Clear conversation">Clear</button>
            </form>
          </div>
        </div>

        <aside className="card p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <button className="btn btn-ghost" onClick={() => { setText("I feel overwhelmed"); }}>I'm overwhelmed</button>
              <button className="btn btn-ghost" onClick={() => { setText("I need to focus for exams"); }}>Exam focus</button>
              <button className="btn btn-ghost" onClick={() => { setText("I can't sleep"); }}>Can't sleep</button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Safety</h4>
            <div className="text-sm text-muted">If you are in crisis, use the SOS button or call your local crisis line. M.E.O.W. provides support but is not a therapist.</div>
          </div>
        </aside>
      </div>
    </section>
  );
}