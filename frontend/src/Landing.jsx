// ...existing code...
import React from "react";

export default function Landing() {
  return (
    <section id="landing" className="section container-center">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Wellness Companion</h1>
        <p className="lead mx-auto max-w-2xl mb-6">
          A student-focused mental health toolkit — curated resources, a friendly personalized AI chatbot,
          secure counselor booking, structured journaling, community forums, and offline tools to help you stay well.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <a href="/login" className="btn btn-primary">Sign In / Sign Up</a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Personalized Chatbot</h3>
          <p className="text-sm text-muted mb-2">
            M.E.O.W. is your conversational companion — it learns from your entries and suggests tailored exercises,
            resources and prompts.
          </p>
          <ul className="text-sm space-y-1">
            <li>• Instant check-ins and grounding techniques</li>
            <li>• Personalized suggestions based on your journal entries</li>
            <li>• Safety-first supportive conversation (not a replacement for therapy)</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-2">Structured Journaling</h3>
          <p className="text-sm text-muted mb-2">
            Daily CBT-inspired prompts, gratitude entries and a Community Forest that grows when you complete exercises.
          </p>
          <ul className="text-sm space-y-1">
            <li>• Prompted journaling to reduce rumination</li>
            <li>• Plant a virtual tree with each saved entry</li>
            <li>• Personalized dashboard highlights resources relevant to you</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-2">Counseling & Self-Help Tools</h3>
          <p className_="text-sm text-muted mb-2">
            Book licensed counselors, explore vetted resources, and download offline kits like the Exam Stress Decompression Kit.
          </p>
          <ul className="text-sm space-y-1">
            <li>• Text & video counseling</li>
            <li>• Expert-moderated themed forums</li>
            <li>• Offline downloads for on-the-go support</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold mb-2">Benefits</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--bg-soft-2)] rounded text-sm">Accessible, on-demand support</div>
            <div className="p-4 bg-[var(--bg-soft-2)] rounded text-sm">Evidence-based self-help</div>
            <div className="p-4 bg-[var(--bg-soft-2)] rounded text-sm">Confidential & moderated spaces</div>
          </div>
        </div>
      </div>


    </section>
  );
}
// ...existing code...