import React from "react";
import HomeNavigation from "./components/HomeNavigation";
import Resources from "./components/Resources";
import Journal from "./components/Journal";
import CounselorDashboard from "./components/CounselorDashboard";
import RandomQuote from "./components/RandomQuote";
import Footer from "./components/Footer";
import SOSButton from "./components/SOSButton";
import MeowChat from "./components/MEOWChat";
import "./Home.css";

export default function Home() {
  const username = "johndoe"; // Placeholder

  return (
    <div>
      <HomeNavigation />
      <main style={{ padding: 16 }}>
        <section id="home" className="welcome-section">
          <h2 className="welcome-gradient">Welcome, {username}</h2>
          <RandomQuote />
        </section>
        <section id="resources">
          <Resources />
        </section>
        <section id="chat">
            <MeowChat /> 
        </section>
        <section id="journal">
          <Journal />
        </section>
        <section id="dashboard">
          <CounselorDashboard />
        </section>
        <section>
            <Footer/>
        </section>
      </main>
      <SOSButton />
    </div>
  );
}