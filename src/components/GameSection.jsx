import { useState, useEffect } from 'react';
import { startGame, reportWin, reportLoss, claimReward, getGameState } from '../utils/blockchain';
import Card from './Card';
import LifeIndicator from './LifeIndicator';

function GameSection({ walletAddress }) {
  const chessIcons = ['♟', '♞', '♝', '♜', '♛', '♚', '♟', '♞', '♝', '♜'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [lives, setLives] = useState(4);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showClaimPopup, setShowClaimPopup] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showForfeitButton, setShowForfeitButton] = useState(false); // New state for forfeit button

  // Initialize game cards
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

  // Handle starting a new game
  const handleStartGame = async () => {
    try {
      await startGame();
      setCards(initializeCards());
      setLives(4);
      setMatchedPairs(0);
      setFlippedCards([]);
      setGameStarted(true);
      setGameOver(false);
      setShowForfeitButton(false); // Hide forfeit button on successful start
    } catch (error) {
      console.error('Failed to start game:', error);
      // Check if the error is "Finish or claim previous game"
      if (error.reason === 'Finish or claim previous game') {
        setShowForfeitButton(true); // Show forfeit button
      }
    }
  };

  // Handle forfeiting and claiming the loss reward
  const handleForfeitAndClaim = async () => {
    try {
      const gameState = await getGameState(walletAddress);
      console.log('Current game state:', gameState);

      // If game is Active (1), report loss to set state to Lost (3)
      if (gameState === 1) {
        await reportLoss();
      }
      // Claim the reward (0.0005 ETH for loss, or 0.002 ETH if won)
      await claimReward();
      setShowForfeitButton(false); // Hide forfeit button
    } catch (error) {
      console.error('Failed to forfeit and claim:', error);
    }
  };

  // Handle card flip
  const flipCard = (id) => {
    if (!gameStarted || gameOver || flippedCards.length === 2 || lives === 0) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    setCards(cards.map(c => (c.id === id ? { ...c, flipped: true } : c)));
    setFlippedCards([...flippedCards, id]);
  };

  // Handle card comparison
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (!firstCard || !secondCard) {
        console.error('Card not found:', { first, second });
        setFlippedCards([]);
        return;
      }

      if (firstCard.icon === secondCard.icon) {
        setCards(cards.map(card =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        ));
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          ));
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives === 0) {
              setGameOver(true);
              setGameStarted(false);
              reportLoss();
            }
            return newLives;
          });
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Handle win condition
  useEffect(() => {
    if (matchedPairs === 10) {
      setGameOver(true);
      setGameStarted(false);
      reportWin();
    }
  }, [matchedPairs]);

  // Debug onFlip prop
  useEffect(() => {
    console.log('flipCard function:', typeof flipCard, flipCard);
  }, []);

  return (
    <div className="text-center">
      {!gameStarted && !gameOver ? (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleStartGame}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
          >
            Pay 0.001 ETH to Play
          </button>
          {showForfeitButton && (
            <button
              onClick={handleForfeitAndClaim}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
            >
              Forfeit Previous Game & Claim Reward
            </button>
          )}
        </div>
      ) : (
        <>
          <LifeIndicator lives={lives} />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {cards.map(card => (
              <Card
                key={card.id}
                card={card}
                onFlip={flipCard}
              />
            ))}
          </div>
          {gameOver && matchedPairs === 10 && (
            <div className="mt-4 animate-pulse">
              <p className="text-2xl text-green-500">You Won!</p>
              <button
                onClick={handleForfeitAndClaim}
                className="px-4 py-2 bg-green-500 rounded-lg mt-2"
              >
                Claim 0.002 ETH
              </button>
            </div>
          )}
          {gameOver && lives === 0 && (
            <div className="mt-4">
              <p className="text-2xl text-red-500">Game Over! You lost.</p>
              <button
                onClick={handleForfeitAndClaim}
                className="px-4 py-2 bg-green-500 rounded-lg mt-2"
              >
                Claim 0.0005 ETH
              </button>
              <button
                onClick={handleStartGame}
                className="px-4 py-2 bg-green-500 rounded-lg mt-2 ml-2"
              >
                Pay 0.001 ETH to Play Again
              </button>
            </div>
          )}
        </>
      )}
      {showClaimPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl mb-4">Unclaimed Reward Detected</h2>
            {pendingAction === 2 && (
              <p>You won the previous game. Claim 0.002 ETH?</p>
            )}
            {pendingAction === 3 && (
              <p>You lost the previous game. Claim 0.0005 ETH?</p>
            )}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleForfeitAndClaim}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Claim Reward
              </button>
              <button
                onClick={() => setShowClaimPopup(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameSection;