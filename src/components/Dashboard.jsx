import { useState, useEffect } from 'react';
import Loader from './Loader';
import Navigation from './Navigation';
import WalletConnect from './WalletConnect';
import MusicToggle from './MusicToggle';
import GameSection from './GameSection';
import StatsSection from './StatsSection';
import LeaderboardSection from './LeaderboardSection';
import UserProfile from './UserProfile';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [section, setSection] = useState('game');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <WalletConnect setConnected={setConnected} setUserName={setUserName} />
      {connected && <UserProfile name={userName} />}
      <MusicToggle />
      <Navigation setSection={setSection} />
      <div className="mt-6">
        {section === 'game' && connected ? <GameSection /> : !connected && section === 'game' ? <p>Connect wallet to play</p> : null}
        {section === 'stats' && connected ? <StatsSection /> : !connected && section === 'stats' ? <p>Connect wallet to view stats</p> : null}
        {section === 'leaderboard' && <LeaderboardSection />}
      </div>
    </div>
  );
}

export default Dashboard;