import { useState } from 'react';

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audio = new Audio('/path-to-game-music.mp3'); // Add your music file

  const toggleMusic = () => {
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  return (
    <button onClick={toggleMusic} className="p-2 bg-gray-700 rounded-full">
      {playing ? '🔇' : '🎵'}
    </button>
  );
}

export default MusicToggle;