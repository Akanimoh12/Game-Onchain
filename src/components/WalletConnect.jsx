import { useState } from 'react';
import { connectWallet, disconnectWallet, registerUser } from '../utils/blockchain';

function WalletConnect({ setConnected, setWalletAddress }) {
  const [address, setAddress] = useState('');

  const handleConnect = async () => {
    try {
      const walletAddress = await connectWallet();
      setAddress(walletAddress);
      setConnected(true);
      setWalletAddress(walletAddress);
      await registerUser(); // Register with wallet address only
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setAddress('');
      setConnected(false);
      setWalletAddress('');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {address ? (
        <div
          className="px-4 py-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={handleDisconnect}
          title="Disconnect"
        >
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default WalletConnect;