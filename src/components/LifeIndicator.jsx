function LifeIndicator({ lives }) {
  return (
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <span key={i} className={`text-2xl ${i < lives ? 'text-green-500' : 'text-gray-500'}`}>❤️</span>
      ))}
    </div>
  );
}

export default LifeIndicator;