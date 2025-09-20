import React, { useEffect, useRef, useState } from "react";

async function getBotReply(message) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("Token from localStorage in MEOWChat.jsx (getBotReply):", token);
    const response = await fetch(`/api/meow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error("API error");
    }
    const data = await response.json();
    return data.reply || "Sorry, I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Error fetching bot reply:", error);
    return "Sorry, I couldn't connect to the server.";
  }
}

export default function MEOWChat(){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token from localStorage in MEOWChat.jsx (fetchChatHistory):", token);
        const response = await fetch(`/api/meow/history`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data.map(m => ({...m, id: m._id})));
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(e) {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), from: "user", text: trimmed, ts: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setText("");
    setTyping(true);
    const botText = await getBotReply(trimmed);
    const botMsg = { id: Date.now() + 1, from: "bot", text: botText, ts: new Date().toISOString() };
    setMessages(prev => [...prev, botMsg]);
    setTyping(false);
  }

  function clearConversation() {
    // This should ideally also clear the history on the backend
    setMessages([]);
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
                  <div className="text-xs text-muted mt-1">{new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
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