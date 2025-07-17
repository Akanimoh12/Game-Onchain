import { useEffect, useState } from 'react';
import { getUserStats } from '../utils/blockchain';

function StatsSection({ walletAddress }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getUserStats(walletAddress);
      setStats(data);
    };
    fetchStats();
  }, [walletAddress]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl mb-4">Your Stats</h2>
      <p>Wins: {stats.wins.toString()}</p>
      <p>Losses: {stats.losses.toString()}</p>
      <p>Times Played: {stats.timesPlayed.toString()}</p>
      {/* <p>Amount Spent: {ethers.formatEther(stats.amountSpent)} ETH</p> */}
      {/* <p>Amount Rewarded: {ethers.formatEther(stats.amountRewarded)} ETH</p> */}
    </div>
  );
}

export default StatsSection;