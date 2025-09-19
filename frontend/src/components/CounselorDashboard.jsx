import React, { useState } from "react";

const COUNSELORS = [
  { id: 1, name: "Dr. Maya Patel", title: "Clinical Psychologist", specialties: ["Anxiety","Depression"], rating: 4.9, price: 80 },
  { id: 2, name: "James Lee, LCSW", title: "Licensed Therapist", specialties: ["Stress","CBT"], rating: 4.8, price: 65 },
  { id: 3, name: "Dr. Aisha Khan", title: "Counseling Psychologist", specialties: ["Trauma","Relationships"], rating: 4.7, price: 95 },
];

const DEFAULT_SLOTS = [
  "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"
];

export default function CounselorDashboard(){
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [booked, setBooked] = useState(null);

  function openBooking(c) {
    setSelected(c);
    setOpen(true);
    setSlot("");
    setDate("");
    setBooked(null);
  }

  function confirmBooking(e) {
    e.preventDefault();
    if (!date || !slot) return;
    setBooked({ counselor: selected, date, slot });
    setTimeout(() => {
      setOpen(false);
      alert(`Booked ${selected.name} on ${date} at ${slot}`);
    }, 400);
  }

  return (
    <section id="counselor" className="section container-center">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2>Connect with a Counselor</h2>
        <p className="text-muted">Book a confidential session with a licensed counselor. Choose a counselor, pick a date and time, and confirm your booking.</p>
      </div>

      <div className="counselor-grid grid gap-6 md:grid-cols-3">
        {COUNSELORS.map(c => (
          <div key={c.id} className="card counselor-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="avatar bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
                  {c.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="font-semibold text-lg">{c.name}</div>
                  <div className="text-sm text-muted">{c.title}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted mb-1">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {c.specialties.map(s => <span key={s} className="px-2 py-1 text-sm rounded-full bg-white text-[var(--teal)] border border-[rgba(14,165,164,0.08)]">{s}</span>)}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted">
                <div>Rating: <strong className="text-accent">{c.rating}</strong></div>
                <div>Fee: <strong>${c.price}</strong></div>
              </div>
            </div>

            <div className="mt-6">
              <button className="btn btn-primary w-full" onClick={() => openBooking(c)}>Book Session</button>
            </div>
          </div>
        ))}
      </div>

      {open && selected && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="booking-modal card p-6 max-w-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Book with {selected.name}</h3>
                <div className="text-sm text-muted">{selected.title}</div>
              </div>
              <button className="text-muted" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            <form className="mt-4" onSubmit={confirmBooking}>
              <label className="block text-sm text-muted mb-1">Date</label>
              <input className="input w-full mb-4" type="date" value={date} onChange={e=>setDate(e.target.value)} required />

              <label className="block text-sm text-muted mb-2">Available slots</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {DEFAULT_SLOTS.map(s => (
                  <button
                    type="button"
                    key={s}
                    className={`slot-button px-3 py-2 rounded-md text-sm ${slot===s ? "active" : ""}`}
                    onClick={() => setSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary">Confirm booking</button>
                <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
              </div>

              {booked && (
                <div className="mt-4 text-sm text-success">Booked: {booked.counselor.name} — {booked.date} at {booked.slot}</div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}