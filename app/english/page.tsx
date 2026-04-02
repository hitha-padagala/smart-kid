"use client";
import { useState } from "react";

export default function EnglishPage() {
  const questions = [
    {
      sentence: "The cat is ___",
      options: ["run", "running", "runs"],
      answer: "running",
    },
    {
      sentence: "She ___ to school every day",
      options: ["go", "goes", "going"],
      answer: "goes",
    },
    {
      sentence: "They are ___ cricket",
      options: ["play", "playing", "plays"],
      answer: "playing",
    },
    {
      sentence: "I ___ a mango",
      options: ["eat", "eats", "eating"],
      answer: "eat",
    },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  const current = questions[index];

  const checkAnswer = (opt: string) => {
    if (opt === current.answer) {
      setResult("✅ Correct!");
      setScore((s) => s + 1);
    } else {
      setResult("❌ Try again!");
    }

    setTimeout(() => {
      setResult("");
      setIndex((i) => (i + 1) % questions.length);
    }, 900);
  };

  return (
    <div className="p-4">
      <div className="text-center card-like">
        <div className="text-lg">⭐ Score: {score}</div>
        <h2 className="text-2xl font-bold mt-6">{current.sentence}</h2>

        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          {current.options.map((o) => (
            <button
              key={o}
              onClick={() => checkAnswer(o)}
              className="bg-indigo-600 text-white btn-pill"
            >
              {o}
            </button>
          ))}
        </div>

        <div className="mt-4 text-lg">{result}</div>
      </div>
    </div>
  );
}
