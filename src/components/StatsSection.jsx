import { useEffect, useState } from 'react';
import { getUserStats } from '../utils/blockchain';

function StatsSection() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getUserStats('connected-wallet-address'); // Replace with actual address
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl mb-4">Your Stats</h2>
      <p>Wins: {stats.wins}</p>
      <p>Losses: {stats.losses}</p>
      <p>Times Played: {stats.timesPlayed}</p>
      <p>Amount Spent: {stats.amountSpent / 1e18} ETH</p>
      <p>Amount Rewarded: {stats.amountRewarded / 1e18} ETH</p>
    </div>
  );
}

export default StatsSection;