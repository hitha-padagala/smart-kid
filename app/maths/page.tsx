"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import chapterData from "@/data/cbse-maths-chapters.json";
import topicData from "@/data/cbse-maths-3rd.json";

type Category =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "word-problems"
  | "cbse-topics"
  | "chapters";

interface Question {
  num1: number;
  num2: number;
  op: string;
  answer: number;
}

interface ChapterQuestion {
  q: string;
  options: string[];
  answer: string;
}

const categoryConfig: Record<
  Category,
  {
    label: string;
    emoji: string;
    op?: string;
    generate?: () => Question;
    color: string;
    chapters?: boolean;
  }
> = {
  addition: {
    label: "Addition",
    emoji: "➕",
    op: "+",
    color: "from-green-400 to-emerald-500",
    generate: () => {
      const a = Math.floor(Math.random() * 50) + 1;
      const b = Math.floor(Math.random() * 50) + 1;
      return { num1: a, num2: b, op: "+", answer: a + b };
    },
  },
  subtraction: {
    label: "Subtraction",
    emoji: "➖",
    op: "-",
    color: "from-blue-400 to-indigo-500",
    generate: () => {
      let a = Math.floor(Math.random() * 50) + 10;
      let b = Math.floor(Math.random() * 50) + 1;
      if (a < b) [a, b] = [b, a];
      return { num1: a, num2: b, op: "-", answer: a - b };
    },
  },
  multiplication: {
    label: "Multiplication",
    emoji: "✖️",
    op: "×",
    color: "from-purple-400 to-pink-500",
    generate: () => {
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      return { num1: a, num2: b, op: "×", answer: a * b };
    },
  },
  division: {
    label: "Division",
    emoji: "➗",
    op: "÷",
    color: "from-orange-400 to-red-500",
    generate: () => {
      const b = Math.floor(Math.random() * 10) + 1;
      const answer = Math.floor(Math.random() * 10) + 1;
      const a = b * answer;
      return { num1: a, num2: b, op: "÷", answer };
    },
  },
  "word-problems": {
    label: "Word Problems",
    emoji: "📚",
    color: "from-yellow-400 to-amber-500",
  },
  "cbse-topics": {
    label: "CBSE Topics",
    emoji: "🎓",
    color: "from-indigo-400 to-purple-500",
  },
  chapters: {
    label: "Chapters",
    emoji: "📖",
    color: "from-violet-400 to-purple-500",
    chapters: true,
  },
};

function generateQuestions(category: Category, count: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    if (categoryConfig[category].generate) {
      questions.push(categoryConfig[category].generate!());
    }
  }
  return questions;
}

const keypadButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "⌫",
  "0",
  "✓",
];

export default function MathsPage() {
  const [category, setCategory] = useState<Category>("addition");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [wordProblemIndex, setWordProblemIndex] = useState(0);
  const [cbseTopicIndex, setCbseTopicIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chapterQIndex, setChapterQIndex] = useState(0);
  const [chapterType, setChapterType] = useState<"questions" | "wordProblems">(
    "questions",
  );

  const resetQuiz = () => {
    const newQuestions = generateQuestions(category, 10);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setResult("");
    setAnswers(new Array(10).fill(null));
  };

  useEffect(() => {
    if (
      started &&
      !finished &&
      category !== "word-problems" &&
      category !== "cbse-topics"
    ) {
      setTimeout(() => {
        resetQuiz();
      }, 0);
    }
  }, [category]);

  const startQuiz = () => {
    setStarted(true);
    setFinished(false);
    if (category !== "word-problems" && category !== "cbse-topics") {
      setQuestions(generateQuestions(category, 10));
    }
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setResult("");
    setAnswers(new Array(10).fill(null));
  };

  const handleKeypadPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);

    if (key === "⌫") {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === "✓") {
      if (answer.length > 0) check();
    } else {
      setAnswer((prev) => prev + key);
    }
  };

  const check = () => {
    if (category === "word-problems") {
      const currentWp = topicData.wordProblems[wordProblemIndex];
      const isCorrect = parseInt(answer || "NaN", 10) === currentWp.answer;
      handleResult(isCorrect, currentWp.answer);
    } else if (questions.length > 0) {
      const current = questions[currentIndex];
      const isCorrect = parseInt(answer || "NaN", 10) === current.answer;
      handleResult(isCorrect, current.answer);
    }
  };

  const handleResult = (isCorrect: boolean, correctAnswer: number) => {
    if (isCorrect) {
      setScore((s) => s + 1);
      setResult("🎉 Correct!");
    } else {
      setResult(`❌ Wrong! Answer is ${correctAnswer}`);
    }

    const newAnswers = [...answers];
    newAnswers[currentIndex] = isCorrect;
    setAnswers(newAnswers);

    setTimeout(() => {
      setResult("");
      setAnswer("");
      if (category === "word-problems") {
        setFinished(true);
      } else if (currentIndex < 9) {
        setCurrentIndex((i) => i + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const getBadge = () => {
    if (score === 10)
      return {
        emoji: "🏆",
        label: "Perfect Score!",
        color: "text-yellow-500",
        bg: "bg-yellow-100",
      };
    if (score >= 8)
      return {
        emoji: "🌟",
        label: "Excellent!",
        color: "text-blue-500",
        bg: "bg-blue-100",
      };
    if (score >= 6)
      return {
        emoji: "👍",
        label: "Good Job!",
        color: "text-green-500",
        bg: "bg-green-100",
      };
    if (score >= 4)
      return {
        emoji: "💪",
        label: "Keep Trying!",
        color: "text-orange-500",
        bg: "bg-orange-100",
      };
    return {
      emoji: "📚",
      label: "Practice More!",
      color: "text-red-500",
      bg: "bg-red-100",
    };
  };

  const allCorrect = score === 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🧮 Maths Fun! 🎯 | CBSE 3rd Grade
        </h1>

        {category === "word-problems" && !started ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-700">
              📚 Word Problems - CBSE 3rd Grade
            </h2>
            <p className="text-center mb-4 text-gray-600">
              Choose a problem to solve:
            </p>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {topicData.wordProblems.map((wp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setWordProblemIndex(idx);
                    setStarted(true);
                    setAnswer("");
                    setResult("");
                  }}
                  className="w-full text-left p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 hover:bg-yellow-100 transition transform hover:scale-102"
                >
                  <span className="text-2xl mr-2">{wp.emoji}</span>
                  <span className="font-medium">{wp.question}</span>
                </button>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setStarted(true)}
                className="text-sm text-indigo-600 underline"
              >
                Back to main menu
              </button>
            </div>
          </div>
        ) : category === "cbse-topics" && !started ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-indigo-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
              🎓 CBSE 3rd Grade Math Topics
            </h2>
            <p className="text-center mb-4 text-gray-600">
              Select a topic to learn:
            </p>
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {topicData.cbseMathTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCbseTopicIndex(idx);
                    setStarted(true);
                  }}
                  className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl border-2 border-indigo-200 hover:from-indigo-200 hover:to-purple-200 transition transform hover:scale-105"
                >
                  <div className="text-3xl mb-1">{topic.emoji}</div>
                  <div className="font-bold text-sm text-indigo-800">
                    {topic.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : !started ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
              🎮 Choose a Game
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {(Object.keys(categoryConfig) as Category[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`p-5 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-105 ${
                    category === key
                      ? `bg-gradient-to-br ${categoryConfig[key].color} text-white border-white shadow-lg`
                      : "bg-gray-100 border-gray-300 hover:border-purple-300 text-gray-800"
                  }`}
                >
                  <div className="text-4xl mb-2">
                    {categoryConfig[key].emoji}
                  </div>
                  <div>{categoryConfig[key].label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-105 shadow-lg"
            >
              🚀 Start Quiz (10 Questions)
            </button>
          </div>
        ) : finished ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-200">
            <h2 className="text-3xl font-bold text-center mb-4 text-purple-700">
              🎊 Quiz Complete! 🎊
            </h2>
            <div className="text-8xl mb-4 animate-bounce">
              {getBadge().emoji}
            </div>
            <div className={`text-3xl font-bold ${getBadge().color} mb-2`}>
              {getBadge().label}
            </div>
            <div className="text-2xl mb-4 text-gray-700">
              Score:{" "}
              <span className="font-bold text-purple-600">{score}/10</span>
            </div>
            {allCorrect && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-4 border-yellow-400 rounded-2xl p-4 mb-4">
                <div className="text-4xl mb-2">🎉🏆🎉</div>
                <div className="text-xl font-bold text-yellow-700">
                  ALL CORRECT! AMAZING WORK!
                </div>
                <div className="text-3xl mt-2">⭐⭐⭐⭐⭐</div>
              </div>
            )}
            <button
              onClick={() => {
                setStarted(false);
                setFinished(false);
                setScore(0);
              }}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-purple-600 transition transform hover:scale-105 shadow-lg"
            >
              🔄 Try Another
            </button>
          </div>
        ) : category === "cbse-topics" ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-indigo-200">
            <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
              {topicData.cbseMathTopics[cbseTopicIndex]?.emoji}{" "}
              {topicData.cbseMathTopics[cbseTopicIndex]?.title}
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-4">
              <h3 className="font-bold text-lg mb-2 text-gray-700">
                About this topic:
              </h3>
              <p className="text-gray-600 mb-3">
                {topicData.cbseMathTopics[cbseTopicIndex]?.description}
              </p>
              <h4 className="font-bold text-md mb-1 text-gray-700">
                Chapters covered:
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                {topicData.cbseMathTopics[cbseTopicIndex]?.chapters.map(
                  (chapter, i) => (
                    <li key={i}>{chapter}</li>
                  ),
                )}
              </ul>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setCbseTopicIndex(
                    (i) =>
                      (i - 1 + topicData.cbseMathTopics.length) %
                      topicData.cbseMathTopics.length,
                  );
                }}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-2 rounded-xl text-lg font-bold"
              >
                ⬅️ Previous
              </button>
              <button
                onClick={() => {
                  setStarted(false);
                  setFinished(false);
                }}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-xl text-lg font-bold"
              >
                🏠 Home
              </button>
              <button
                onClick={() => {
                  setCbseTopicIndex(
                    (i) => (i + 1) % topicData.cbseMathTopics.length,
                  );
                }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-2 rounded-xl text-lg font-bold"
              >
                ➡️ Next
              </button>
            </div>
          </div>
        ) : category === "word-problems" ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-200">
            <div className="text-center mb-4">
              <span className="text-5xl animate-bounce inline-block">
                {topicData.wordProblems[wordProblemIndex]?.emoji}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-700">
              Word Problem
            </h2>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 mb-4 border-2 border-yellow-200">
              <p className="text-lg text-center text-gray-800">
                {topicData.wordProblems[wordProblemIndex]?.question}
              </p>
            </div>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-purple-600">
                Answer: {answer || "?"}
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold min-h-[2.5rem] text-center">
              {result && (
                <span
                  className={
                    result.includes("Correct")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 max-w-xs mx-auto">
              {keypadButtons.map((key) => {
                let btnClass = "bg-gray-100 hover:bg-gray-200 text-gray-800";
                if (key === "⌫")
                  btnClass = "bg-orange-400 hover:bg-orange-500 text-white";
                else if (key === "✓")
                  btnClass = "bg-green-500 hover:bg-green-600 text-white";
                else if (pressedKey === key)
                  btnClass = "bg-purple-300 text-purple-800";
                return (
                  <button
                    key={key}
                    onClick={() => handleKeypadPress(key)}
                    className={`py-4 rounded-xl text-2xl font-bold transition transform active:scale-95 shadow-md ${btnClass}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          questions[currentIndex] && (
            <>
              <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`text-lg font-bold px-4 py-2 rounded-full bg-gradient-to-r ${categoryConfig[category].color} text-white`}
                  >
                    {categoryConfig[category].emoji}{" "}
                    {categoryConfig[category].label}
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    ⭐ {score}/10
                  </div>
                </div>
                <div className="mb-2 text-sm text-gray-500 font-medium">
                  📝 Question {currentIndex + 1} of 10
                </div>
                <div className="flex justify-center gap-1 mb-4">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full ${
                        i < currentIndex
                          ? answers[i]
                            ? "bg-green-500"
                            : "bg-red-500"
                          : i === currentIndex
                            ? "bg-purple-500"
                            : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-4">
                  <h2 className="text-5xl font-bold text-center text-gray-800">
                    {questions[currentIndex].num1} {questions[currentIndex].op}{" "}
                    {questions[currentIndex].num2} ={" "}
                    <span className="text-purple-600">{answer || "?"}</span>
                  </h2>
                </div>

                <div className="mt-4 text-2xl font-bold min-h-[2.5rem] text-center">
                  {result && (
                    <span
                      className={
                        result.includes("Correct")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {result}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 max-w-xs mx-auto">
                  {keypadButtons.map((key) => {
                    let btnClass =
                      "bg-gray-100 hover:bg-gray-200 text-gray-800";
                    if (key === "⌫")
                      btnClass = "bg-orange-400 hover:bg-orange-500 text-white";
                    else if (key === "✓")
                      btnClass = "bg-green-500 hover:bg-green-600 text-white";
                    else if (pressedKey === key)
                      btnClass = "bg-purple-300 text-purple-800";
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeypadPress(key)}
                        className={`py-4 rounded-xl text-2xl font-bold transition transform active:scale-95 shadow-md ${btnClass}`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )
        )}

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
