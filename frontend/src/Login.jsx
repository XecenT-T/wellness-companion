import React, { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (password.length < 4) {
      setError("Please enter a password of at least 4 characters.");
      return;
    }
    const user = { phone: cleaned, created: Date.now() };
    localStorage.setItem("wc_user", JSON.stringify(user));
    window.location.hash = "app";
  }

  return (
    <section id="login-page" className="section container-center">
      <div className="max-w-md mx-auto">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Sign in / Sign up</h2>
          <p className="text-sm text-muted mb-6">Enter your phone number and password to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <label className="text-sm">Phone number</label>
            <input
              className="input w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 555 123 4567"
              inputMode="tel"
            />

            <label className="text-sm">Password</label>
            <input
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              type="password"
            />

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary w-full">Continue</button>
              <a href="#home" className="btn btn-ghost w-full">Back</a>
            </div>
          </form>

          <div className="text-sm text-muted mt-4">Your data is stored locally for demo purposes.</div>
        </div>
      </div>
    </section>
  );
}