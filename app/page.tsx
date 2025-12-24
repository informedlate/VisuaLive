export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          VisuaLive
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Music Visualization Platform with AI-Powered Preset Generation
        </p>
        <p className="text-gray-400 text-lg mb-12">
          Create stunning, real-time audio-reactive visuals using WebGL
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border border-gray-500 text-white rounded-lg font-semibold hover:border-gray-300 transition">
            Learn More
          </button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Visualization</h3>
            <p className="text-gray-300">Audio-reactive visuals powered by WebGL</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
            <h3 className="text-xl font-semibold text-white mb-2">AI Presets</h3>
            <p className="text-gray-300">Intelligent preset generation powered by AI</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
            <h3 className="text-xl font-semibold text-white mb-2">Professional Export</h3>
            <p className="text-gray-300">Export your creations as high-quality video</p>
          </div>
        </div>
      </div>
    </main>
  );
}
