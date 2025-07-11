import { useEffect, useState } from 'react';
import { getLeaderboard } from '../utils/blockchain';

function LeaderboardSection() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl mb-4">Leaderboard</h2>
      {leaderboard.map((address, index) => (
        <p key={index}>{index + 1}. {address} - Wins: TBD</p> // Fetch wins separately
      ))}
    </div>
  );
}

export default LeaderboardSection;