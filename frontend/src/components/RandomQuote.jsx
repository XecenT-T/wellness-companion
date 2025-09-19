import React, { useState, useEffect } from "react";

const quotes = [
  {
    content: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    content: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
    author: "Winston Churchill",
  },
  {
    content: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    content: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
  },
  {
    content: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
  },
  {
    content: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
  },
  {
    content: "People who are crazy enough to think they can change the world, are the ones who do.",
    author: "Rob Siltanen",
  },
  {
    content: "Failure will never overtake me if my determination to succeed is strong enough.",
    author: "Og Mandino",
  },
  {
    content: "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That's the classic entrepreneur.",
    author: "Mohnish Pabrai",
  },
  {
    content: "We may encounter many defeats but we must not be defeated.",
    author: "Maya Angelou",
  },
];

export default function RandomQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  if (!quote) return null;

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <p>"{quote.content}"</p>
      <p>- {quote.author}</p>
    </div>
  );
}