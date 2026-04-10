"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const getTeluguVoice = (voices: SpeechSynthesisVoice[]) => {
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith("te")) ||
    voices.find((v) => v.lang.toLowerCase().includes("in")) ||
    null
  );
};

type Section = "vegetables" | "fruits" | "reading";

interface VegetableItem {
  telugu: string;
  phonetic: string;
  english: string;
  image: string;
  emoji: string;
}

interface FruitItem {
  telugu: string;
  phonetic: string;
  english: string;
  image: string;
  emoji: string;
}

interface ReadingItem {
  title: string;
  telugu: string;
  phonetic: string;
  english: string;
  emoji: string;
}

const vegetables: VegetableItem[] = [
  {
    telugu: "టమోటా",
    phonetic: "tamoTa",
    english: "Tomato",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
    emoji: "🍅",
  },
  {
    telugu: "బంగాళాదుంప",
    phonetic: "bangaladumpa",
    english: "Potato",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Patates.jpg",
    emoji: "🥔",
  },
  {
    telugu: "కారెట్",
    phonetic: "kaarat",
    english: "Carrot",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Carrots.jpg",
    emoji: "🥕",
  },
  {
    telugu: "వంకాయ",
    phonetic: "vankaaya",
    english: "Brinjal",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Eggplant.jpg",
    emoji: "🍆",
  },
  {
    telugu: "దోసకాయ",
    phonetic: "dosakaaya",
    english: "Cucumber",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Cucumber.jpg",
    emoji: "🥒",
  },
  {
    telugu: "ఉల్లిపాయ",
    phonetic: "ullipaaya",
    english: "Onion",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Onion.jpg",
    emoji: "🧅",
  },
  {
    telugu: "పచ్చిమిరప",
    phonetic: "pachimirapa",
    english: "Green Chilli",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Green_chili_pepper.jpg",
    emoji: "🌶️",
  },
  {
    telugu: "బెండకాయ",
    phonetic: "bendakaaya",
    english: "Lady's Finger",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Okra_pod.jpg",
    emoji: "🥬",
  },
  {
    telugu: "కాలీఫ్లవర్",
    phonetic: "kaaleephlaavar",
    english: "Cauliflower",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/25/Cauliflower.jpg",
    emoji: "🥦",
  },
  {
    telugu: "మునగాకు",
    phonetic: "munagaaku",
    english: "Drumstick Leaves",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Moringa_oleifera_leaves.jpg",
    emoji: "🌿",
  },
  {
    telugu: "చిలగడదుంప",
    phonetic: "chilagadadumpa",
    english: "Sweet Potato",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/30/Sweet_potato.jpg",
    emoji: "🍠",
  },
  {
    telugu: "బీట్‌రూట్",
    phonetic: "beetrooT",
    english: "Beetroot",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Beetroot.jpg",
    emoji: "🟣",
  },
  {
    telugu: "ముల్లంగి",
    phonetic: "mullangi",
    english: "Radish",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Radish_33711.jpg",
    emoji: "⚪",
  },
  {
    telugu: "క్యాబేజీ",
    phonetic: "kyaaabeejee",
    english: "Cabbage",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Cabbage_and_cross_section_on_white_background.jpg",
    emoji: "🥬",
  },
  {
    telugu: "పొట్లకాయ",
    phonetic: "potlakaaya",
    english: "Snake Gourd",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Trichosanthes_cucumerina_fruit.jpg",
    emoji: "🥒",
  },
];

const fruits: FruitItem[] = [
  {
    telugu: "ఆపిల్",
    phonetic: "aaphil",
    english: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
    emoji: "🍎",
  },
  {
    telugu: "అరటిపండు",
    phonetic: "araTipaMDu",
    english: "Banana",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Bananas_white_background.jpg",
    emoji: "🍌",
  },
  {
    telugu: "మామిడిపండు",
    phonetic: "maamidiPaMDu",
    english: "Mango",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Mangoes.jpg",
    emoji: "🥭",
  },
  {
    telugu: "ద్రాక్షపండు",
    phonetic: "draakshaPaMDu",
    english: "Grapes",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Vitis_vinifera_Grapes_2.jpg",
    emoji: "🍇",
  },
  {
    telugu: "కమలాపండు",
    phonetic: "kamalaaPaMDu",
    english: "Orange",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/OrangeBloss_wb.jpg",
    emoji: "🍊",
  },
  {
    telugu: "బొప్పాయి",
    phonetic: "boppaayi",
    english: "Papaya",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Papaya_cross_section.jpg",
    emoji: "🍈",
  },
  {
    telugu: "పనసపండు",
    phonetic: "panasapaMDu",
    english: "Jackfruit",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Jackfruit.jpg",
    emoji: "🍈",
  },
  {
    telugu: "కర్బూజ",
    phonetic: "karbuuja",
    english: "Watermelon",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Watermelon.jpg",
    emoji: "🍉",
  },
  {
    telugu: "దానిమ్మపండు",
    phonetic: "daanimmaPaMDu",
    english: "Pomegranate",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Pomegranate03.jpg",
    emoji: "🍎",
  },
  {
    telugu: "జామపండు",
    phonetic: "jaamaPaMDu",
    english: "Guava",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Guava_cross_section.jpg",
    emoji: "🍐",
  },
  {
    telugu: "నిమ్మకాయ",
    phonetic: "nimmakaaya",
    english: "Lemon",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Lemon.jpg",
    emoji: "🍋",
  },
  {
    telugu: "చెర్రీపండు",
    phonetic: "cherreeepaMDu",
    english: "Cherry",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Cherry_Stella_edited.jpg",
    emoji: "🍒",
  },
  {
    telugu: "స్ట్రాబెర్రీ",
    phonetic: "straaberree",
    english: "Strawberry",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
    emoji: "🍓",
  },
  {
    telugu: "అనాసపండు",
    phonetic: "anaasapaMDu",
    english: "Pineapple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg",
    emoji: "🍍",
  },
  {
    telugu: "సపోట",
    phonetic: "sapoTa",
    english: "Sapota",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Manilkara_zapota_fruit.jpg",
    emoji: "🥝",
  },
];

const readingLessons: ReadingItem[] = [
  {
    title: "అక్షరమాల (Alphabet)",
    telugu: "అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఌ ౡ ఎ ఏ ఐ ఒ ఓ ఔ అం అః",
    phonetic: "a aa i ee u oo ru ruu lu luu e ae ai o oo au am ah",
    english: "Vowels in Telugu",
    emoji: "🔤",
  },
  {
    title: "హల్లులు (Consonants)",
    telugu:
      "క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష",
    phonetic:
      "ka kha ga gha nga cha chha ja jha nya ta tha da dha na pa pha ba bha ma ya ra la va sha sha sa ha la ksha",
    english: "Consonants in Telugu",
    emoji: "🔡",
  },
  {
    title: "సంఖ్యలు (Numbers)",
    telugu:
      "సున్న - ౦, ఒకటి - ౧, రెండు - ౨, మూడు - ౩, నాలుగు - ౪, ఐదు - ౫, ఆరు - ౬, ఏడు - ౭, ఎనిమిది - ౮, తొమ్మిది - ౯, పది - ౧౦",
    phonetic:
      "sunna - 0, okati - 1, rendu - 2, moodu - 3, naalugu - 4, aidu - 5, aaru - 6, edu - 7, enimidi - 8, tommidi - 9, padi - 10",
    english: "Numbers in Telugu",
    emoji: "🔢",
  },
  {
    title: "రంగులు (Colors)",
    telugu:
      "ఎరుపు - Red, నీలం - Blue, పచ్చ - Green, పసుపు - Yellow, తెలుపు - White, నలుపు - Black, ఊదా - Purple, గులాబీ - Pink",
    phonetic:
      "erupu - Red, neelam - Blue, pacha - Green, pasupu - Yellow, telupu - White, nalupu - Black, oodaa - Purple, gulaabee - Pink",
    english: "Colors in Telugu",
    emoji: "🌈",
  },
  {
    title: "రోజులు (Days of Week)",
    telugu: "ఆదివారం, సోమవారం, మంగళవారం, బుధవారం, గురువారం, శుక్రవారం, శనివారం",
    phonetic:
      "Aadivaaram, Somavaaram, Mangalavaaram, Budhavaaram, Guruvaram, Sukravaaram, Sanivaaram",
    english: "Days of the Week in Telugu",
    emoji: "📅",
  },
  {
    title: "నెలలు (Months)",
    telugu:
      "జనవరి, ఫిబ్రవరి, మార్చి, ఏప్రిల్, మే, జూన్, జూలై, ఆగస్టు, సెప్టెంబర్, అక్టోబర్, నవంబర్, డిసెంబర్",
    phonetic:
      "January, February, March, April, May, June, July, August, September, October, November, December",
    english: "Months in Telugu",
    emoji: "📆",
  },
  {
    title: "పండుగలు (Festivals)",
    telugu: "ఉగాది, దసరా, దీపావళి, సంక్రాంతి, విజయదశమి, వినాయక చవితి, రామనవమి",
    phonetic:
      "Ugaadi, Dasara, Deepaavali, Sankraanti, Vijayadashami, Vinaayaka Chavithi, Raamanavami",
    english: "Festivals in Telugu",
    emoji: "🎉",
  },
  {
    title: "కుటుంబ సభ్యులు (Family Members)",
    telugu:
      "నాన్న - Father, అమ్మ - Mother, అన్నయ్య - Elder Brother, అక్క - Elder Sister, తమ్ముడు - Younger Brother, చెల్లి - Younger Sister, తాత - Grandfather, అమ్మమ్మ - Grandmother (maternal), నానమ్మ - Grandmother (paternal)",
    phonetic:
      "Naanna - Father, Amma - Mother, Annayya - Elder Brother, Akka - Elder Sister, Tammudu - Younger Brother, Chelli - Younger Sister, Taatha - Grandfather, Ammamma - Grandmother (maternal), Naanamma - Grandmother (paternal)",
    english: "Family Members in Telugu",
    emoji: "👨‍👩‍👧‍👦",
  },
  {
    title: "సాధారణ వాక్యాలు (Common Sentences)",
    telugu:
      "నమస్కారం - Hello, ధన్యవాదాలు - Thank you, బాగున్నాను - I am fine, మీ పేరు ఏమిటి? - What is your name?, నా పేరు ... - My name is ..., దయచేసి - Please, క్షమించండి - Sorry",
    phonetic:
      "Namaskaaram - Hello, Dhanyavaadaalu - Thank you, Baagunnaanu - I am fine, Mee peru emiti? - What is your name?, Naa peru ... - My name is ..., Dayachesi - Please, Kshaminchandi - Sorry",
    english: "Common Sentences in Telugu",
    emoji: "💬",
  },
  {
    title: "జంతువులు (Animals)",
    telugu:
      "కుక్క - Dog, పిల్లి - Cat, ఆవు - Cow, ఎద్దు - Bull, గుర్రం - Horse, ఏనుగు - Elephant, పులి - Tiger, సింహం - Lion, ఎలుగుబంటి - Bear, కోతి - Monkey",
    phonetic:
      "Kukka - Dog, Pilli - Cat, Aavu - Cow, Eddu - Bull, Gurram - Horse, Enugu - Elephant, Puli - Tiger, Simham - Lion, Elugubanti - Bear, Kothi - Monkey",
    english: "Animals in Telugu",
    emoji: "🐾",
  },
  {
    title: "పక్షులు (Birds)",
    telugu:
      "కాకి - Crow, పావురం - Pigeon, చిలుక - Parrot, నెమలి - Peacock, కోడి - Hen, గుడ్లగూబ - Owl, గద్ద - Eagle, బుల్బుల్ - Bulbul",
    phonetic:
      "Kaaki - Crow, Paavuram - Pigeon, Chiluka - Parrot, Nemali - Peacock, Kodi - Hen, Gudlagooba - Owl, Gadda - Eagle, Bulbul - Bulbul",
    english: "Birds in Telugu",
    emoji: "🐦",
  },
  {
    title: "చిన్న కథ (Short Story)",
    telugu:
      "ఒక ఊరిలో ఒక రైతు ఉండేవాడు. అతనికి ముగ్గురు కొడుకులు. వారు ఎప్పుడూ కలిసి ఉండేవారు. రైతు వారికి మంచి బుద్ధి చెప్పాడు. కలిసి ఉంటే బలం అని చెప్పాడు.",
    phonetic:
      "Oka oorilo oka raitu undevaadu. Ataniki mugguru kodukulu. Vaaru eppuduu kalisi undevaaru. Raitu vaariki manchi buddhi cheppaadu. Kalisi unte balam ani cheppaadu.",
    english:
      "In a village, there lived a farmer. He had three sons. They always stayed together. The farmer taught them good values. He said unity is strength.",
    emoji: "📚",
  },
  {
    title: "పద్యం (Poem)",
    telugu:
      "అమ్మ అమ్మ అమ్మ అని పిలిచిన పలికేను\nఅందరికి అమ్మే ప్రాణం అని తెలిసేను\nఅమ్మ ఒడిలో అమృతం దొరుకును\nఅమ్మ ప్రేమలో ఆనందం దొరుకును",
    phonetic:
      "Amma amma amma ani pilichina palikenu\nAndariki amme praanam ani telisenu\nAmma odilo amrutam dorukunu\nAmma premalo aanandam dorukunu",
    english:
      "When I call Amma, she responds\nI learned that mother is life itself\nIn mother's lap, we find nectar\nIn mother's love, we find happiness",
    emoji: "🎵",
  },
];

const sectionConfig: Record<
  Section,
  {
    label: string;
    emoji: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  vegetables: {
    label: "కూరగాయలు",
    emoji: "🥬",
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-300",
  },
  fruits: {
    label: "పండ్లు",
    emoji: "🍎",
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    borderColor: "border-red-300",
  },
  reading: {
    label: "చదవడం నేర్చుకుందాం",
    emoji: "📖",
    color: "from-blue-400 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-300",
  },
};

export default function TeluguPage() {
  const [activeSection, setActiveSection] = useState<Section>("vegetables");
  const [vegIndex, setVegIndex] = useState(0);
  const [fruitIndex, setFruitIndex] = useState(0);
  const [readingIndex, setReadingIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      // Try to load voices immediately
      loadVoices();

      // Listen for voiceschanged event (voices may load asynchronously)
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      };
    }
  }, []);

  const currentVeg = vegetables[vegIndex];
  const currentFruit = fruits[fruitIndex];
  const currentReading = readingLessons[readingIndex];

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    // Try to find an English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && !v.lang.startsWith("en-IN"),
    );
    if (englishVoice) u.voice = englishVoice;
    window.speechSynthesis.speak(u);
  };

  const speakTelugu = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "te-IN";
    u.rate = 0.8;

    // Ensure voices are loaded before trying to speak (important in Chrome/Edge)
    if (!voicesLoaded) {
      window.speechSynthesis.getVoices();
    }

    // Try to find a Telugu voice first
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = getTeluguVoice(voices);
    if (teluguVoice) {
      u.voice = teluguVoice;
    }

    u.onerror = () => {
      const fallback = new SpeechSynthesisUtterance(text);
      fallback.lang = "en-IN";
      fallback.rate = 0.8;
      window.speechSynthesis.speak(fallback);
    };

    window.speechSynthesis.speak(u);
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
          🥬
        </div>
        <div
          className="animate-bounce absolute top-48 right-16 text-4xl"
          style={{ animationDelay: "0.5s" }}
        >
          🍎
        </div>
        <div
          className="animate-bounce absolute bottom-32 left-24 text-4xl"
          style={{ animationDelay: "1s" }}
        >
          📖
        </div>
        <div
          className="animate-bounce absolute bottom-48 right-24 text-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          🌟
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Fun header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl animate-bounce">📚</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
                తెలుగు నేర్చుకుందాం!
              </h1>
              <span
                className="text-5xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎯
              </span>
            </div>
            <p className="text-xl font-semibold text-purple-700 drop-shadow-sm">
              {"Hey Champ! Let's Learn Telugu! 🚀"}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(Object.keys(sectionConfig) as Section[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setShowTranslation(false);
                }}
                className={`px-5 py-3 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-110 ${
                  activeSection === key
                    ? `bg-gradient-to-br ${sectionConfig[key].color} text-white border-white shadow-lg`
                    : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl mr-2">
                  {sectionConfig[key].emoji}
                </span>
                {sectionConfig[key].label}
              </button>
            ))}
          </div>

          {/* Vegetables Section */}
          {activeSection === "vegetables" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-green-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                🥕
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🍅
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🥔
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🥒
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
                🥬 కూరగాయలు (Vegetables) 🥦
              </h2>

              <div className="text-center">
                {/* Image with fun border */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 rounded-2xl transform rotate-3"></div>
                  <Image
                    src={currentVeg.image}
                    alt={currentVeg.telugu}
                    width={224}
                    height={224}
                    className="relative w-56 h-56 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white"
                  />
                </div>

                {/* Name display with animation */}
                <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 inline-block">
                  <h3 className="text-5xl font-bold text-green-800 animate-pulse">
                    {currentVeg.emoji} {currentVeg.telugu} {currentVeg.emoji}
                  </h3>
                  <div className="mt-2 text-2xl text-zinc-600 font-medium">
                    🔊 {currentVeg.phonetic}
                  </div>
                  <div className="mt-1 text-lg text-zinc-500">
                    ({currentVeg.english})
                  </div>
                </div>

                {/* Fun buttons */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => speakTelugu(currentVeg.telugu)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                  >
                    🔊 వినండి
                  </button>
                  <button
                    onClick={() =>
                      setVegIndex((i) => (i + 1) % vegetables.length)
                    }
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ➡️ తర్వాత
                  </button>
                  <button
                    onClick={() =>
                      setVegIndex(
                        (i) => (i - 1 + vegetables.length) % vegetables.length,
                      )
                    }
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ⬅️ ముందు
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-500">{vegIndex + 1}</span>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                      style={{
                        width: `${((vegIndex + 1) / vegetables.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {vegetables.length}
                  </span>
                </div>

                {/* All vegetables grid */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    👀 అన్ని కూరగాయలు చూడండి:
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {vegetables.map((veg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setVegIndex(idx)}
                        className={`p-3 rounded-xl border-2 transition transform hover:scale-110 ${
                          idx === vegIndex
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-500 shadow-lg"
                            : "bg-white border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="text-3xl mb-1">{veg.emoji}</div>
                        <div className="text-xs font-bold">{veg.telugu}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fruits Section */}
          {activeSection === "fruits" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-red-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                🍎
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🍌
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🍇
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🍊
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
                🍎 పండ్లు (Fruits) 🍇
              </h2>

              <div className="text-center">
                {/* Image with fun border */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-pink-300 rounded-2xl transform rotate-3"></div>
                  <Image
                    src={currentFruit.image}
                    alt={currentFruit.telugu}
                    width={224}
                    height={224}
                    className="relative w-56 h-56 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white"
                  />
                </div>

                {/* Name display with animation */}
                <div className="mt-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-4 inline-block">
                  <h3 className="text-5xl font-bold text-red-800 animate-pulse">
                    {currentFruit.emoji} {currentFruit.telugu}{" "}
                    {currentFruit.emoji}
                  </h3>
                  <div className="mt-2 text-2xl text-zinc-600 font-medium">
                    🔊 {currentFruit.phonetic}
                  </div>
                  <div className="mt-1 text-lg text-zinc-500">
                    ({currentFruit.english})
                  </div>
                </div>

                {/* Fun buttons */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => speakTelugu(currentFruit.telugu)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                  >
                    🔊 వినండి
                  </button>
                  <button
                    onClick={() =>
                      setFruitIndex((i) => (i + 1) % fruits.length)
                    }
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-red-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ➡️ తర్వాత
                  </button>
                  <button
                    onClick={() =>
                      setFruitIndex(
                        (i) => (i - 1 + fruits.length) % fruits.length,
                      )
                    }
                    className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-orange-500 hover:to-red-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ⬅️ ముందు
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-500">
                    {fruitIndex + 1}
                  </span>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-300"
                      style={{
                        width: `${((fruitIndex + 1) / fruits.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{fruits.length}</span>
                </div>

                {/* All fruits grid */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    👀 అన్ని పండ్లు చూడండి:
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {fruits.map((fruit, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFruitIndex(idx)}
                        className={`p-3 rounded-xl border-2 transition transform hover:scale-110 ${
                          idx === fruitIndex
                            ? "bg-gradient-to-br from-red-400 to-pink-500 text-white border-red-500 shadow-lg"
                            : "bg-white border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="text-3xl mb-1">{fruit.emoji}</div>
                        <div className="text-xs font-bold">{fruit.telugu}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reading Section */}
          {activeSection === "reading" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                📚
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
                🎓
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                📝
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
                📖 చదవడం నేర్చుకుందాం 🎓
              </h2>

              {/* Lesson Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {readingLessons.map((lesson, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setReadingIndex(idx);
                      setShowTranslation(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition transform hover:scale-110 ${
                      idx === readingIndex
                        ? "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {lesson.emoji} {lesson.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Current Lesson Content */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4 border-2 border-blue-200">
                <div className="text-center mb-4">
                  <span className="text-5xl animate-bounce inline-block">
                    {currentReading.emoji}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-blue-800">
                  {currentReading.title}
                </h3>

                <div className="text-2xl sm:text-3xl leading-relaxed text-center text-gray-800 mb-4 whitespace-pre-line bg-white rounded-xl p-4 border-2 border-blue-100">
                  {currentReading.telugu}
                </div>

                <div className="text-lg text-center text-zinc-600 mb-2 italic bg-white/50 rounded-xl p-3">
                  🔊 {currentReading.phonetic}
                </div>

                {showTranslation && (
                  <div className="text-lg text-center text-green-700 bg-green-50 rounded-xl p-3 mt-2 border-2 border-green-200 animate-pulse">
                    🌟 {currentReading.english}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => speakTelugu(currentReading.telugu)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                >
                  🔊 తెలుగు వినండి
                </button>
                <button
                  onClick={() => speak(currentReading.phonetic)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
                >
                  🔊 ఉచ్ఛారణ
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                >
                  {showTranslation ? "🙈 దాచు" : "👁️ చూడు"}
                </button>
                <button
                  onClick={() =>
                    setReadingIndex((i) => (i + 1) % readingLessons.length)
                  }
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                >
                  ➡️ తర్వాత
                </button>
                <button
                  onClick={() =>
                    setReadingIndex(
                      (i) =>
                        (i - 1 + readingLessons.length) % readingLessons.length,
                    )
                  }
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-orange-500 hover:to-yellow-600 transition transform hover:scale-110 shadow-lg"
                >
                  ⬅️ ముందు
                </button>
              </div>

              {/* Progress indicator */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  పాఠం {readingIndex + 1}
                </span>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                    style={{
                      width: `${((readingIndex + 1) / readingLessons.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {readingLessons.length}
                </span>
              </div>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
            >
              🏠 హోమ్‌కి వెళ్ళండి
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
