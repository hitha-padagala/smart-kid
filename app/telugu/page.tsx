"use client";
import { useState } from "react";
import Image from "next/image";

const vegetables = [
  {
    telugu: "టమోటా",
    phonetic: "tamoTa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
  },
  {
    telugu: "బంగాళాదుంప",
    phonetic: "bangaladumpa",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Patates.jpg",
  },
  {
    telugu: "కారెట్",
    phonetic: "kaarat",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Carrots.jpg",
  },
  {
    telugu: "వంకాయ",
    phonetic: "vankaaya",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Eggplant.jpg",
  },
  {
    telugu: "దోసకాయ",
    phonetic: "dosakaaya",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Cucumber.jpg",
  },
];

export default function TeluguPage() {
  const [index, setIndex] = useState(0);
  const current = vegetables[index];

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="p-4 text-center card-like">
      <Image
        src={current.image}
        alt={current.telugu}
        width={224}
        height={224}
        className="w-56 h-56 object-cover rounded-xl mx-auto shadow-md"
      />
      <h2 className="text-3xl font-bold mt-4">{current.telugu}</h2>
      <div className="mt-2 text-lg text-zinc-600">{current.phonetic}</div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => speak(current.phonetic)}
          className="bg-indigo-600 text-white btn-pill"
        >
          🔊 Listen
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % vegetables.length)}
          className="border btn-pill"
        >
          ➡ Next
        </button>
      </div>
    </div>
  );
}
