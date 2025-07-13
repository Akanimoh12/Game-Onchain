function Card({ card, onFlip }) {
  return (
    <div
      onClick={() => !card.flipped && !card.matched && onFlip(card.id)}
      className={`w-20 h-20 flex items-center justify-center bg-gray-700 rounded-lg cursor-pointer transform transition-all duration-300 ${
        card.flipped || card.matched ? 'rotate-y-180 scale-105' : ''
      } ${card.matched ? 'border-2 border-green-500' : ''}`}
    >
      <span className="text-6xl">{card.flipped || card.matched ? card.icon : '?'}</span>
    </div>
  );
}

export default Card;