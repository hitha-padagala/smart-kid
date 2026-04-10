"use client";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-sky-300 via-purple-200 to-pink-200">
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
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl animate-twinkle`}
            style={{
              top: `${15 + i * 12}%`,
              left: `${5 + i * 13}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Welcome section */}
        <div className="text-center mb-12">
          {/* Fun header with bouncing emoji */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl animate-bounce">🌈</span>
            <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
              Smart Kid
            </h1>
            <span
              className="text-5xl animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              🎨
            </span>
          </div>
          <p className="text-2xl font-semibold text-purple-700 drop-shadow-sm">
            {"Hey Champ! Let\u0027s Learn & Play! \u{1F680}"}
          </p>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
          {/* English Card */}
          <a
            href="/english"
            className="group relative transform transition-all duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <div className="bg-linear-to-br from-green-300 via-green-400 to-emerald-500 rounded-3xl p-8 text-center shadow-xl border-4 border-white/50 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-7xl mb-4 group-hover:animate-bounce">
                  🔤
                </div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  English
                </h2>
                <p className="text-white/90 text-lg mt-2">ABC & Beyond!</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-200 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>

          {/* Maths Card */}
          <a
            href="/maths"
            className="group relative transform transition-all duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <div className="bg-linear-to-br from-blue-300 via-blue-400 to-cyan-500 rounded-3xl p-8 text-center shadow-xl border-4 border-white/50 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-7xl mb-4 group-hover:animate-bounce">
                  🔢
                </div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  Maths
                </h2>
                <p className="text-white/90 text-lg mt-2">Numbers & Fun!</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-200 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>

          {/* Telugu Card */}
          <a
            href="/telugu"
            className="group relative transform transition-all duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <div className="bg-linear-to-br from-pink-300 via-pink-400 to-rose-500 rounded-3xl p-8 text-center shadow-xl border-4 border-white/50 cursor-pointer overflow-hidden">
              {/* Sparkle effect on hover */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-7xl mb-4 group-hover:animate-bounce">
                  📖
                </div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  Telugu
                </h2>
                <p className="text-white/90 text-lg mt-2">తెలుగు</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-yellow-200 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-12 flex items-center justify-center gap-6 text-4xl">
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

      {/* Rainbow decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-linear-to-r from-red-400 via-green-400 to-purple-400"></div>
    </div>
  );
}
