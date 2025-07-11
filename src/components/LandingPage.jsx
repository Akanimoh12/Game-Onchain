import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen transition-colors`}>
      {/* Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 bg-green-500 rounded-full"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-bold mb-4">Chess Flip Game</h1>
        <p className="text-xl mb-6">Match chess cards, win ETH, climb the leaderboard!</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg"
        >
          Play Now
        </button>
      </section>

      {/* Game Info */}
      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-4">About the Game</h2>
        <p>Flip cards to match chess icons. Pay 0.001 ETH, win 0.002 ETH!</p>
      </section>

      {/* Roadmap */}
      <section className="p-8 bg-gray-800">
        <h2 className="text-3xl font-semibold mb-4">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 rounded-lg">Q1: Launch</div>
          <div className="p-4 bg-gray-700 rounded-lg">Q2: Multiplayer</div>
          <div className="p-4 bg-gray-700 rounded-lg">Q3: NFT Rewards</div>
        </div>
      </section>

      {/* How to Play */}
      <section className="p-8">
        <h2 className="text-3xl font-semibold mb-4">How to Play</h2>
        <p>1. Connect wallet<br />2. Register<br />3. Pay fee<br />4. Match cards<br />5. Win ETH!</p>
      </section>
    </div>
  );
}

export default LandingPage;