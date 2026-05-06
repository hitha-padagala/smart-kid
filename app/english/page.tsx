"use client";
import { useState } from "react";
import Link from "next/link";
import grammarQuestionsData from "@/data/english-grammar.json";
import moralStoriesData from "@/data/moral-stories.json";
import ramayanaStoriesData from "@/data/ramayana.json";
import krishnaStoriesData from "@/data/krishna-stories.json";
import disneyStoriesData from "@/data/disney-stories.json";
import cbseEnglishData from "@/data/cbse-english-3rd.json";

type Section =
  | "grammar"
  | "moral-stories"
  | "ramayana"
  | "krishna"
  | "disney"
  | "cbse-topics"
  | "vocabulary"
  | "reading-comprehension";

type GrammarQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  emoji: string;
};

type MoralStory = {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  characters?: string[];
};

type IndianStory = {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  characters: string[];
};

type DisneyStory = {
  title: string;
  story: string;
  lesson: string;
  emoji: string;
  princess: string;
};

const { grammarQuestions } = grammarQuestionsData;
const { moralStories } = moralStoriesData;
const { ramayanaStories } = ramayanaStoriesData;
const { krishnaStories } = krishnaStoriesData;
const { disneyStories } = disneyStoriesData;

const sectionConfig: Record<
  Section,
  { label: string; emoji: string; color: string }
> = {
  grammar: {
    label: "Grammar Quiz",
    emoji: "📝",
    color: "from-green-400 to-emerald-500",
  },
  "moral-stories": {
    label: "Moral Stories",
    emoji: "📚",
    color: "from-purple-400 to-pink-500",
  },
  ramayana: {
    label: "Ramayana",
    emoji: "🏹",
    color: "from-orange-400 to-red-500",
  },
  krishna: {
    label: "Krishna Stories",
    emoji: "🦚",
    color: "from-blue-400 to-indigo-500",
  },
  disney: {
    label: "Disney Princess",
    emoji: "👑",
    color: "from-pink-400 to-rose-500",
  },
  "cbse-topics": {
    label: "CBSE Topics",
    emoji: "🎓",
    color: "from-indigo-400 to-purple-500",
  },
  vocabulary: {
    label: "Vocabulary",
    emoji: "🔤",
    color: "from-cyan-400 to-blue-500",
  },
  "reading-comprehension": {
    label: "Reading Comp.",
    emoji: "📖",
    color: "from-violet-400 to-purple-500",
  },
};

export default function EnglishPage() {
  const [activeSection, setActiveSection] = useState<Section>("grammar");
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [ramayanaIndex, setRamayanaIndex] = useState(0);
  const [krishnaIndex, setKrishnaIndex] = useState(0);
  const [disneyIndex, setDisneyIndex] = useState(0);
  const [readingCompIndex, setReadingCompIndex] = useState(0);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [cbseTopicIndex, setCbseTopicIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [showStoryMoral, setShowStoryMoral] = useState(false);

  const currentQuestion = grammarQuestions[grammarIndex];

  const checkAnswer = (opt: string) => {
    if (opt === currentQuestion.answer) {
      setResult("🎉 Correct! Great job!");
      setScore((s) => s + 1);
    } else {
      setResult(`❌ Oops! The answer is "${currentQuestion.answer}"`);
    }
    setShowExplanation(true);

    setTimeout(() => {
      setResult("");
      setShowExplanation(false);
      setGrammarIndex((i) => (i + 1) % grammarQuestions.length);
    }, 2500);
  };

  const renderStorySection = (
    stories: IndianStory[] | DisneyStory[],
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    sectionColor: string,
    borderColor: string,
    bgColor: string,
    title: string,
    showCharacters: boolean = true,
  ) => {
    const current = stories[currentIndex];
    const isDisney = "princess" in current;

    return (
      <div
        className={`bg-white rounded-3xl shadow-xl p-6 border-4 ${borderColor} relative`}
      >
        {/* Decorative corner emojis */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
          {current.emoji}
        </div>
        <div
          className="absolute -top-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          {isDisney ? "👑" : "🪔"}
        </div>
        <div
          className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          {isDisney ? "✨" : "🌟"}
        </div>
        <div
          className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          {isDisney ? "🏰" : "🙏"}
        </div>

        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{
            color: sectionColor.includes("blue")
              ? "#1e40af"
              : sectionColor.includes("pink")
                ? "#be185d"
                : "#c2410c",
          }}
        >
          {title}
        </h2>

        {/* Story Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {stories.map((story, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setShowStoryMoral(false);
              }}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition transform hover:scale-110 ${
                idx === currentIndex
                  ? `bg-gradient-to-br ${sectionColor} text-white shadow-lg`
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {story.emoji}
            </button>
          ))}
        </div>

        {/* Story Content */}
        <div
          className={`bg-gradient-to-r ${bgColor} rounded-2xl p-6 mb-4 border-2 ${borderColor}`}
        >
          <div className="text-center mb-4">
            <span className="text-6xl animate-bounce inline-block">
              {current.emoji}
            </span>
          </div>
          <h3
            className="text-2xl font-bold text-center mb-4"
            style={{
              color: sectionColor.includes("blue") ? "#1e40af" : "#be185d",
            }}
          >
            {current.title}
          </h3>

          {/* Characters/Princess Badge */}
          {showCharacters && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {"characters" in current
                ? current.characters.map((char, idx) => (
                    <span
                      key={idx}
                      className="bg-white px-3 py-1 rounded-full text-sm font-bold border-2"
                      style={{
                        borderColor: sectionColor.includes("blue")
                          ? "#93c5fd"
                          : "#fda4af",
                        color: sectionColor.includes("blue")
                          ? "#1e40af"
                          : "#be185d",
                      }}
                    >
                      {char}
                    </span>
                  ))
                : "princess" in current && (
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-300 text-pink-600">
                      👑 Princess {current.princess}
                    </span>
                  )}
            </div>
          )}

          <div className="text-lg leading-relaxed text-gray-800 mb-4 bg-white rounded-xl p-4 border-2 border-gray-100">
            {current.story}
          </div>

          {showStoryMoral ? (
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-2 border-yellow-300 text-center animate-pulse">
              <h4 className="font-bold text-yellow-800 mb-2">
                🌟 What We Learn:
              </h4>
              <p className="text-lg text-yellow-700 font-semibold">
                {current.lesson}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowStoryMoral(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-yellow-500 hover:to-amber-600 transition transform hover:scale-110 shadow-lg"
            >
              🌟 See the Lesson!
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              const newIndex =
                (currentIndex - 1 + stories.length) % stories.length;
              setCurrentIndex(newIndex);
              setShowStoryMoral(false);
            }}
            className={`bg-gradient-to-r ${sectionColor} text-white px-6 py-3 rounded-2xl text-lg font-bold transition transform hover:scale-110 shadow-lg`}
          >
            ⬅️ Previous
          </button>
          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % stories.length;
              setCurrentIndex(newIndex);
              setShowStoryMoral(false);
            }}
            className={`bg-gradient-to-r ${sectionColor} text-white px-6 py-3 rounded-2xl text-lg font-bold transition transform hover:scale-110 shadow-lg`}
          >
            ➡️ Next
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">
            Story {currentIndex + 1}
          </span>
          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${sectionColor} transition-all duration-300`}
              style={{
                width: `${((currentIndex + 1) / stories.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-sm text-gray-500">{stories.length}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-purple-100 to-pink-200">
      {/* Floating clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float-slow absolute top-10 left-10 text-6xl">
          ☁️
        </div>
        <div className="animate-float-medium absolute top-20 right-20 text-5xl">
          ☁️
        </div>
        <div className="animate-float-fast absolute top-40 left-1/3 text-4xl">
          ☁️
        </div>
        <div className="animate-float-slow absolute top-60 right-1/4 text-6xl">
          ☁️
        </div>
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-twinkle"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-bounce absolute top-32 left-20 text-4xl"
          style={{ animationDelay: "0s" }}
        >
          📝
        </div>
        <div
          className="animate-bounce absolute top-48 right-16 text-4xl"
          style={{ animationDelay: "0.5s" }}
        >
          📚
        </div>
        <div
          className="animate-bounce absolute bottom-32 left-24 text-4xl"
          style={{ animationDelay: "1s" }}
        >
          🦚
        </div>
        <div
          className="animate-bounce absolute bottom-48 right-24 text-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          👑
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Fun header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl animate-bounce">🔤</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
                English Fun Time!
              </h1>
              <span
                className="text-5xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎯
              </span>
            </div>
            <p className="text-xl font-semibold text-purple-700 drop-shadow-sm">
              {"Hey Champ! Let's Learn English! 🚀"}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(Object.keys(sectionConfig) as Section[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setShowStoryMoral(false);
                }}
                className={`px-5 py-3 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-110 ${
                  activeSection === key
                    ? `bg-gradient-to-br ${sectionConfig[key].color} text-white border-white shadow-lg`
                    : "bg-gray-100 border-gray-300 hover:border-purple-300 text-gray-800"
                }`}
              >
                <span className="text-2xl mr-2">
                  {sectionConfig[key].emoji}
                </span>
                {sectionConfig[key].label}
              </button>
            ))}
          </div>

          {/* Grammar Quiz Section */}
          {activeSection === "grammar" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-green-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                📝
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ✏️
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                📖
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎓
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-green-700">
                  📝 Grammar Quiz
                </h2>
                <div className="bg-gradient-to-r from-yellow-300 to-amber-300 px-4 py-2 rounded-full font-bold text-lg text-yellow-900 shadow-md border-2 border-yellow-400">
                  ⭐ Score: {score}/{grammarQuestions.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-sm text-gray-500">
                  Question {grammarIndex + 1}
                </span>
                <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                    style={{
                      width: `${((grammarIndex + 1) / grammarQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {grammarQuestions.length}
                </span>
              </div>

              {/* Question Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 border-2 border-green-200">
                <div className="text-center mb-4">
                  <span className="text-6xl animate-bounce inline-block">
                    {currentQuestion.emoji}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => checkAnswer(opt)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Result */}
                {result && (
                  <div
                    className={`mt-4 text-xl font-bold text-center p-3 rounded-xl ${
                      result.includes("Correct")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result}
                  </div>
                )}

                {/* Explanation */}
                {showExplanation && (
                  <div className="mt-4 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2">
                      💡 Learn Why:
                    </h4>
                    <p className="text-gray-700">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() =>
                    setGrammarIndex(
                      (i) =>
                        (i - 1 + grammarQuestions.length) %
                        grammarQuestions.length,
                    )
                  }
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                >
                  ⬅️ Previous
                </button>
                <button
                  onClick={() =>
                    setGrammarIndex((i) => (i + 1) % grammarQuestions.length)
                  }
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                >
                  ➡️ Next
                </button>
              </div>
            </div>
          )}

          {/* Moral Stories Section */}
          {activeSection === "moral-stories" &&
            renderStorySection(
              moralStories as unknown as IndianStory[],
              storyIndex,
              (i) => {
                setStoryIndex(i);
              },
              "from-purple-400 to-pink-500",
              "border-purple-200",
              "from-purple-50 to-pink-50",
              "📚 Moral Stories for Kids",
              false,
            )}

          {/* Ramayana Stories Section */}
          {activeSection === "ramayana" &&
            renderStorySection(
              ramayanaStories,
              ramayanaIndex,
              (i) => {
                setRamayanaIndex(i);
              },
              "from-orange-400 to-red-500",
              "border-orange-200",
              "from-orange-50 to-red-50",
              "🏹 Ramayana Stories for Kids",
            )}

          {/* Krishna Stories Section */}
          {activeSection === "krishna" &&
            renderStorySection(
              krishnaStories,
              krishnaIndex,
              (i) => {
                setKrishnaIndex(i);
              },
              "from-blue-400 to-indigo-500",
              "border-blue-200",
              "from-blue-50 to-indigo-50",
              "🦚 Krishna Stories for Kids",
            )}

          {/* Disney Princess Stories Section */}
          {activeSection === "disney" &&
            renderStorySection(
              disneyStories,
              disneyIndex,
              (i) => {
                setDisneyIndex(i);
              },
              "from-pink-400 to-rose-500",
              "border-pink-200",
              "from-pink-50 to-rose-50",
              "👑 Disney Princess Stories",
            )}

          {/* CBSE Topics Section */}
          {activeSection === "cbse-topics" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-indigo-200">
              <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                🎓 CBSE 3rd Grade English Topics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {cbseEnglishData.cbseEnglishTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCbseTopicIndex(idx)}
                    className={`p-4 rounded-2xl border-4 transition transform hover:scale-105 ${
                      idx === cbseTopicIndex
                        ? "bg-gradient-to-br from-indigo-400 to-purple-500 text-white border-white shadow-lg"
                        : "bg-indigo-50 border-indigo-200 hover:border-indigo-400 text-gray-800"
                    }`}
                  >
                    <div className="text-4xl mb-2">{topic.emoji}</div>
                    <div className="font-bold text-sm">{topic.title}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
                <h3 className="font-bold text-lg mb-2 text-indigo-800">
                  {cbseEnglishData.cbseEnglishTopics[cbseTopicIndex]?.title}
                </h3>
                <p className="text-gray-700">
                  {
                    cbseEnglishData.cbseEnglishTopics[cbseTopicIndex]
                      ?.description
                  }
                </p>
              </div>
            </div>
          )}

          {/* Vocabulary Section */}
          {activeSection === "vocabulary" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-cyan-200">
              <h2 className="text-3xl font-bold text-center mb-6 text-cyan-700">
                🔤 Vocabulary Builder
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                {cbseEnglishData.vocabularyWords.map((word, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border-2 transition transform hover:scale-105 ${
                      idx === vocabIndex
                        ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-white shadow-lg"
                        : "bg-cyan-50 border-cyan-200 hover:border-cyan-400 text-gray-800"
                    }`}
                    onClick={() => setVocabIndex(idx)}
                  >
                    <div className="text-2xl mb-1">{word.emoji}</div>
                    <div className="font-bold text-sm">{word.word}</div>
                    <div className="text-xs">{word.meaning}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4">
                <h3 className="font-bold text-xl mb-2 text-cyan-800">
                  {cbseEnglishData.vocabularyWords[vocabIndex]?.word}
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Meaning:</strong>{" "}
                  {cbseEnglishData.vocabularyWords[vocabIndex]?.meaning}
                </p>
                <p className="text-gray-600 italic">
                  Use in a sentence to help remember!
                </p>
              </div>
            </div>
          )}

          {/* Reading Comprehension Section */}
          {activeSection === "reading-comprehension" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-violet-200">
              <h2 className="text-3xl font-bold text-center mb-6 text-violet-700">
                📖 Reading Comprehension
              </h2>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {cbseEnglishData.readingComprehension.map((story, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReadingCompIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition transform hover:scale-110 ${
                      idx === readingCompIndex
                        ? "bg-gradient-to-br from-violet-400 to-purple-500 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {story.emoji} {story.title}
                  </button>
                ))}
              </div>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4">
                <h3 className="font-bold text-xl mb-2 text-violet-800">
                  {
                    cbseEnglishData.readingComprehension[readingCompIndex]
                      ?.title
                  }
                </h3>
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {
                      cbseEnglishData.readingComprehension[readingCompIndex]
                        ?.story
                    }
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-violet-700 mb-2">Questions:</h4>
                  {cbseEnglishData.readingComprehension[
                    readingCompIndex
                  ]?.questions.map((q, qIdx) => (
                    <div key={qIdx} className="mb-3 bg-white rounded-lg p-3">
                      <p className="font-medium mb-2">
                        {qIdx + 1}. {q.q}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() =>
                              setResult(
                                opt === q.answer
                                  ? "🎉 Correct!"
                                  : `❌ Wrong! Answer: ${q.answer}`,
                              )
                            }
                            className="px-3 py-1 bg-violet-100 hover:bg-violet-200 rounded-lg text-sm font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {result && (
                  <div
                    className={`mt-4 text-center text-lg font-bold p-3 rounded-xl ${
                      result.includes("Correct")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {result}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
            >
              🏠 Back to Home
            </Link>
          </div>

          {/* Bottom decorative elements */}
          <div className="mt-8 flex items-center justify-center gap-4 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              🎈
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🌟
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              🎯
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>
              🏆
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.8s" }}>
              🎈
            </span>
          </div>
        </div>
      </div>

      {/* Rainbow decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-red-400 via-green-400 to-purple-400"></div>
    </div>
  );
}
