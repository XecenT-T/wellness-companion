import React from "react";
import HomeNavigation from "./components/HomeNavigation";
import Resources from "./components/Resources";
import Journal from "./components/Journal";
import CounselorDashboard from "./components/CounselorDashboard";
import RandomQuote from "./components/RandomQuote";
import "./Home.css";

export default function Home() {
  const username = "johndoe"; // Placeholder

  return (
    <div>
      <HomeNavigation />
      <main style={{ padding: 16 }}>
        <section id="welcome" className="welcome-section">
          <h2 className="welcome-gradient">Welcome, {username}</h2>
          <RandomQuote />
        </section>
        <section id="resources">
          <Resources />
        </section>
        <section id="journal">
          <Journal />
        </section>
        <section id="dashboard">
          <CounselorDashboard />
        </section>
      </main>
    </div>
  );
}