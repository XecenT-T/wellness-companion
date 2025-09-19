import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ResourceLibrary from "./components/ResourceLibrary";
import MEOWChat from "./components/MEOWChat";
import CounselorDashboard from "./components/CounselorDashboard";
import SOSButton from "./components/SOSButton";
import OfflineManager from "./components/OfflineManager";
import Journal from "./components/Journal";
import Footer from "./components/Footer";

const QUOTES = [
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "You must do the things you think you cannot do.", author: "Eleanor Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Happiness can be found, even in the darkest of times.", author: "J.K. Rowling" },
  { text: "When we are no longer able to change a situation, we are challenged to change ourselves.", author: "Viktor E. Frankl" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
  { text: "Small deeds done are better than great deeds planned.", author: "Peter Marshall" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
];

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex(i => (i + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const quote = QUOTES[quoteIndex];

  return (
    <>
      <Header />

      <main id="home" className="section container-center">
        <section className="card hero text-center p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello, User</h1>

          <div className="quote-container mx-auto max-w-2xl mt-2 mb-6">
            <blockquote className="quote text-xl md:text-2xl italic text-[var(--teal)]">
              “{quote.text}”
            </blockquote>
            <div className="text-sm text-muted mt-2">— {quote.author}</div>
            <div className="mt-4">
              <a href="#library" className="btn btn-primary">Explore Resources</a>
            </div>
          </div>
        </section>
      </main>

      <ResourceLibrary />
      <section id="offline" className="section container-center">
        <OfflineManager />
      </section>
      <MEOWChat />
      <Journal />
      <CounselorDashboard />

      <div id="sos" style={{ position: "fixed", right: 20, bottom: 24, zIndex: 60 }}>
        <SOSButton />
      </div>

      <Footer />
    </>
  );
}
