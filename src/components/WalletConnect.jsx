import { useState } from 'react';
import { connectWallet, registerUser } from '../utils/blockchain';

function WalletConnect({ setConnected, setUserName }) {
  const [name, setName] = useState('');

  const handleConnect = async () => {
    const account = await connectWallet();
    if (account) {
      setConnected(true);
      if (name) {
        await registerUser(name);
        setUserName(name);
      }
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-2 py-1 bg-gray-800 rounded"
      />
      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default WalletConnect;