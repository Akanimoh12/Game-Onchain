import { ethers } from 'ethers';
import ChessFlipGameABI from './ChessFlipGameABI.json'; // Export ABI after compiling contract

const contractAddress = 'YOUR_CONTRACT_ADDRESS';

let provider, signer, contract;

export async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, ChessFlipGameABI, signer);
    return await signer.getAddress();
  }
  throw new Error('No wallet found');
}

export async function registerUser(name) {
  const tx = await contract.register(name);
  await tx.wait();
}

export async function startGame() {
  const tx = await contract.startGame({ value: ethers.utils.parseEther('0.001') });
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