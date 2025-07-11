import { useState, useEffect } from 'react';
import { startGame, claimReward } from '../utils/blockchain';
import Card from './Card';
import LifeIndicator from './LifeIndicator';

function GameSection() {
  const chessIcons = ['♟', '♞', '♝', '♜', '♛', '♚', '♟', '♞', '♝', '♜']; // 10 icons
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [lives, setLives] = useState(4);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeCards = () => {
    const icons = [...chessIcons, ...chessIcons];
    const shuffled = icons.sort(() => Math.random() - 0.5);
    return shuffled.map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false,
    }));
  };

  const handleStartGame = async () => {
    try {
      await startGame();
      setCards(initializeCards());
      setLives(4);
      setMatchedPairs(0);
      setFlippedCards([]);
      setGameStarted(true);
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const flipCard = (id) => {
    if (flippedCards.length === 2 || !gameStarted) return;
    setCards(cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    ));
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, Slo, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      if (firstCard.icon === secondCard.icon) {
        setCards(cards.map(card =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        ));
        setMatchedPairs(matchedPairs + 1);
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          ));
          setLives(lives - 1);
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards, matchedPairs]);

  const handleClaimReward = async () => {
    await claimReward();
    setGameStarted(false);
  };

  return (
    <div className="text-center">
      {!gameStarted ? (
        <button
          onClick={handleStartGame}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
        >
          Pay 0.001 ETH to Play
        </button>
      ) : (
        <>
          <LifeIndicator lives={lives} />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {cards.map(card => (
              <Card key={card.id} card={card} onFlip={flipCard} />
            ))}
          </div>
          {matchedPairs === 10 && (
            <div className="mt-4 animate-pulse">
              <p>You Won!</p>
              <button
                onClick={handleClaimReward}
                className="px-4 py-2 bg-green-500 rounded-lg"
              >
                Claim 0.002 ETH
              </button>
            </div>
          )}
          {lives === 0 && <p className="mt-4 text-red-500">Game Over! Try Again.</p>}
        </>
      )}
    </div>
  );
}

export default GameSection;