import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.user.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

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