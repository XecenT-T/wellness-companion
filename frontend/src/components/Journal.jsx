import React, { useEffect, useState } from "react";

const PROMPTS = [
  "What's one thought that bothered you today, and what's an alternative way to look at it?",
  "Name three things you are grateful for today.",
  "What's one small win you had today?",
  "Describe a moment you felt proud of yourself recently.",
  "Write one step you can take tomorrow to feel calmer."
];

const FORUM_TOPICS = [
  { id: "exam", title: "Exam Pressure" },
  { id: "social", title: "Social Anxiety" },
  { id: "away", title: "Living Away From Home" },
  { id: "imposter", title: "Imposter Syndrome" }
];

function PlantIcon({ style }) {
  return <div style={{ width: 36, height: 48, ...style }} aria-hidden>🌱</div>;
}

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [promptIndex, setPromptIndex] = useState(0);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [trees, setTrees] = useState(0);
  const [selectedForum, setSelectedForum] = useState(FORUM_TOPICS[0].id);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token from localStorage in Journal.jsx:", token);
        const res = await fetch(`/api/journal`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEntries(data);
        }
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    const fetchJournalCount = async () => {
        try {
            const res = await fetch(`/api/journal/count`);
            if(res.ok) {
                const data = await res.json();
                setTrees(data.count);
            }
        } catch (error) {
            console.error("Error fetching journal count:", error);
        }
    };
    fetchJournalCount();
  }, [entries]);

  async function saveEntry(e) {
    e?.preventDefault();
    if (!text.trim() || !title.trim()) return;
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token from localStorage in Journal.jsx (saveEntry):", token);
      const res = await fetch(`/api/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content: text }),
      });
      if (res.ok) {
        const newEntry = await res.json();
        setEntries(prev => [newEntry, ...prev]);
        setText("");
        setTitle("");
      }
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  }

  function pickPrompt(delta = 1) {
    setPromptIndex(i => (i + delta + PROMPTS.length) % PROMPTS.length);
  }

  function clearForest() {
    // This should ideally also clear the trees on the backend
    setTrees(0);
  }

  const recentText = entries[0]?.content?.toLowerCase() || "";
  const personalized = {
    showExamKit: recentText.includes("exam") || recentText.includes("test") || recentText.includes("study"),
    showPeerBuddy: recentText.includes("lonely") || recentText.includes("friend") || recentText.includes("alone")
  };

  return (
    <section id="journal" className="section container-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 items-start mb-8">
          <div className="md:col-span-2">
            <div className="card p-6">
              <h2>Structured Digital Journal</h2>
              <p className="text-muted">Daily prompts (CBT-inspired) — entries are private and stored on your account.</p>

              <form className="mt-4" onSubmit={saveEntry}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-muted">Prompt</div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="btn btn-ghost" onClick={() => pickPrompt(-1)}>Prev</button>
                    <button type="button" className="btn btn-ghost" onClick={() => pickPrompt(1)}>Next</button>
                  </div>
                </div>

                <div className="bg-white rounded p-4 border mb-3">
                  <div className="text-sm italic text-[var(--teal)] mb-2">{PROMPTS[promptIndex]}</div>
                  <input className="input w-full mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                  <textarea className="input w-full" rows={5} placeholder="Write your entry..." value={text} onChange={e => setText(e.target.value)} />
                </div>

                <div className="flex gap-3 mb-4">
                  <button type="submit" className="btn btn-primary">Save Entry (Plant a Tree)</button>
                </div>
              </form>

              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Recent entries</h4>
                {entries.length === 0 && <div className="text-muted">No entries yet — your first entry will plant a tree in the Community Forest.</div>}
                <ul className="mt-2 space-y-3">
                  {entries.slice(0, 5).map(en => (
                    <li key={en._id} className="p-3 bg-[var(--bg-soft-1)] rounded">
                      <div className="text-sm text-muted mb-1">{new Date(en.createdAt).toLocaleString()}</div>
                      <div className="font-semibold">{en.title}</div>
                      <div className="text-sm">{en.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="card p-6">
            <h3 className="text-lg font-semibold mb-2">The Community Forest</h3>
            <p className="text-sm text-muted mb-4">Each saved entry or completed exercise plants a virtual tree for everyone to see.</p>

            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div style={{ fontSize: 36 }}>🌳</div>
                <div>
                  <div className="text-2xl font-bold">{trees}</div>
                  <div className="text-sm text-muted">trees planted by the community</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary" onClick={() => { setTrees(t => t + 1); }}>Plant a tree (demo)</button>
                <button className="btn btn-ghost" onClick={clearForest}>Reset demo</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Self-Help Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#library" className="text-[var(--teal)]">Guided breathing exercises</a></li>
                <li><a href="#library" className="text-[var(--teal)]">Short CBT worksheets</a></li>
                <li><a href="#library" className="text-[var(--teal)]">Sleep hygiene toolkit</a></li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Exam Stress Decompression Kit</h4>
              <p className="text-sm text-muted">Available two weeks before exams (demo available now).</p>
              <div className="mt-2">
                <button className="btn btn-primary" onClick={() => alert("Exam Kit opened — add links to real kit in Resources.")}>Open Kit</button>
              </div>
            </div>

            <div className="mt-6 p-3 bg-white rounded border">
              <div className="text-sm text-muted mb-1">Personalized</div>
              {personalized.showExamKit && <div className="text-sm">We noticed exam-related entries — feature: <strong>Exam Stress Kit</strong> suggested.</div>}
              {personalized.showPeerBuddy && <div className="text-sm">You mentioned feeling lonely — feature: <strong>Peer Buddy</strong> suggested.</div>}
              {!personalized.showExamKit && !personalized.showPeerBuddy && <div className="text-sm">No tailored suggestions yet — try journaling to personalize your dashboard.</div>}
            </div>
          </aside>
        </div>

        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold">Expert-Moderated Thematic Forums</h3>
          <p className="text-sm text-muted">Safe, anonymous forums moderated by trained volunteers and professionals.</p>

          <div className="grid md:grid-cols-4 gap-4 mt-4">
            {FORUM_TOPICS.map(t => (
              <div key={t.id} className="p-4 bg-[var(--bg-soft-1)] rounded">
                <div className="font-semibold">{t.title}</div>
                <div className="text-xs text-muted mt-2">Moderated • Anonymous</div>
                <div className="mt-3">
                  <button className="btn btn-ghost" onClick={() => setSelectedForum(t.id)}>Enter</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold">Active forum: {FORUM_TOPICS.find(f => f.id === selectedForum).title}</h4>
            <div className="mt-3 text-sm text-muted">Forum UI placeholder — integrate a moderated threaded system or third-party forum engine. Moderation tools, reporting, and anonymous posting are required.</div>
          </div>
        </div>
      </div>
    </section>
  );
}