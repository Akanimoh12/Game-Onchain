import { ethers } from 'ethers';
import ChessFlipGameABI from './ChessFlipGameABI.json'; // Export ABI after compiling contract

// const contractAddress = '0xa6e4369468fC1dbB21B2A8C9AC4D0391EDb9Fb1F';
const contractAddress = '0x6FD36e3551899C94ce9675Af620fA8974F3CAEB8';

let provider, signer, contract;

// export async function connectWallet() {
//   if (window.ethereum) {
//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send('eth_requestAccounts', []);
//     signer = provider.getSigner();
//     contract = new ethers.Contract(contractAddress, ChessFlipGameABI, signer);
//     return await signer.getAddress();
//   }
//   throw new Error('No wallet found');
// }

export async function connectWallet() {
  if (window.ethereum) {
    // Use BrowserProvider for ethers.js v6
    provider = new ethers.BrowserProvider(window.ethereum);
    // Get the signer asynchronously
    signer = await provider.getSigner();
    // Assuming you have a contract to interact with
    contract = new ethers.Contract(contractAddress, ChessFlipGameABI, signer);
    // Return the wallet address
    return await signer.getAddress();
  }
  throw new Error('No wallet found');
}

export async function registerUser(name) {
  const tx = await contract.register(name);
  await tx.wait();
}

export async function startGame() {
  const tx = await contract.startGame({ value: ethers.parseEther('0.001') });
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