import { ethers } from 'ethers';
import ChessFlipGameABI from './ChessFlipGameABI.json';

const contractAddress = '0xa6e4369468fC1dbB21B2A8C9AC4D0391EDb9Fb1F'; // Update with your deployed address

let provider, signer, contract;

export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x106a' }], // Lisk Sepolia Chain ID 4202
      });
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, ChessFlipGameABI, signer);
      return await signer.getAddress();
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x106a',
            chainName: 'Lisk Sepolia Testnet',
            rpcUrls: ['https://rpc.sepolia-api.lisk.com'],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            blockExplorerUrls: ['https://sepolia-blockscout.lisk.com'],
          }],
        });
        return connectWallet();
      }
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  }
  throw new Error('No wallet found');
}

export async function disconnectWallet() {
  provider = null;
  signer = null;
  contract = null;
  return true;
}

export async function registerUser() {
  const tx = await contract.register();
  await tx.wait();
}

export async function startGame() {
  const tx = await contract.startGame({ value: ethers.parseEther('0.001') });
  await tx.wait();
}

export async function reportWin() {
  const tx = await contract.reportWin();
  await tx.wait();
}

export async function reportLoss() {
  const tx = await contract.reportLoss();
  await tx.wait();
}

export async function claimReward() {
  const tx = await contract.claimReward();
  await tx.wait();
}

export async function getUserStats(address) {
  return await contract.getUserStats(address);
}

export async function getLeaderboard() {
  return await contract.getLeaderboard();
}

export async function getGameState(address) {
  const user = await contract.getUserStats(address);
  return user.gameState; // Returns the gameState enum value (0: Inactive, 1: Active, 2: Won, 3: Lost)
}