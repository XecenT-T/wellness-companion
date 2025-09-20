import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        data = await res.text();
      }

      if (res.ok) {
        const token =
          typeof data === "string"
            ? data
            : data?.accessToken || data?.token || data?.access_token || null;

        if (token) {
          console.log("Token received from backend:", token);
          localStorage.setItem("accessToken", token);
          setStatus("Login successful — redirecting...");
          setTimeout(() => window.location.assign("/home"), 400);
        } else {
          setStatus("Login succeeded but no token returned: " + JSON.stringify(data));
        }
      } else {
        const errMsg = (data && (data.error || data.message)) || JSON.stringify(data);
        if (errMsg.includes("invalid")) {
          setStatus("Invalid username or password. Please try again.");
        } else {
          setStatus("Login failed: " + errMsg);
        }
      }
    } catch (err) {
      setStatus("Network error: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {status && <p className="error-message">{status}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="switch-form">
          Don't have an account? <a href="/register" onClick={(e) => { e.preventDefault(); window.navigate('/register'); }}>Register</a>
        </p>
      </div>
    </div>
  );
}
