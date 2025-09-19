import React, { useState } from "react";
import "./Login.css";

/**
 * Posts credentials to /api/login
 * - Stores returned token in localStorage (key: accessToken)
 * - Redirects to /home on success
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Logging in...");
    setLoading(true);

    // Mock login check
    if (email === "123" && password === "admin") {
      localStorage.setItem("accessToken", "mock-token");
      setStatus("Login successful — redirecting...");
      setTimeout(() => window.location.assign("/home"), 400);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // try to parse JSON, but handle raw-string responses too
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // fallback if server returns raw token string
        data = await res.text();
      }

      if (res.ok) {
        // support multiple shapes: raw string, { accessToken: "..." }, { token: "..." }
        const token =
          typeof data === "string"
            ? data
            : data?.accessToken || data?.token || data?.access_token || null;

        if (token) {
          localStorage.setItem("accessToken", token);
          setStatus("Login successful — redirecting...");
          // small delay so user sees message, then navigate
          setTimeout(() => window.location.assign("/home"), 400);
        } else {
          // no token returned, but OK status — show raw response
          setStatus("Login succeeded but no token returned: " + JSON.stringify(data));
        }
      } else {
        const errMsg = (data && (data.error || data.message)) || JSON.stringify(data);
        setStatus("Login failed: " + errMsg);
      }
    } catch (err) {
      setStatus("Network error: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        {status && <div style={{ marginTop: 12 }}>{status}</div>}
      </form>
    </div>
  );
}