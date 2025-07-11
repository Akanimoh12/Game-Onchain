function Navigation({ setSection }) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <button onClick={() => setSection('game')} className="p-2 bg-gray-700 rounded-lg">Game</button>
      <button onClick={() => setSection('stats')} className="p-2 bg-gray-700 rounded-lg">Stats</button>
      <button onClick={() => setSection('leaderboard')} className="p-2 bg-gray-700 rounded-lg">Leaderboard</button>
    </div>
  );
}

export default Navigation;