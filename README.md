# CHESS FLIP

Chess Flip Game is a blockchain-based memory matching game built with React and Solidity, deployed on the Lisk Sepolia Testnet. Players connect their MetaMask wallet, pay 0.001 ETH to play, and match pairs of chess piece cards (e.g., ♟, ♞, ♝, ♜, ♛, ♚). The game tracks lives (4 attempts) and rewards players with 0.002 ETH for matching all 10 pairs (win) or 0.0005 ETH for losing all lives. The smart contract ensures secure gameplay, reward distribution, and leaderboard tracking.

## FEATURES

- **Wallet Integration**: Connect with MetaMask on Lisk Sepolia Testnet (Chain ID: 4202).
- **Game Mechanics**:
  - Pay 0.001 ETH to start a game.
  - Match 20 cards (10 pairs of chess pieces) within 4 lives.
  - Win by matching all pairs (0.002 ETH reward) or lose by exhausting lives (0.0005 ETH reward).
- **Unclaimed Reward Handling**: A "Forfeit Previous Game & Claim Reward" button appears if a previous game’s reward is unclaimed, allowing players to claim and proceed.
- **Leaderboard**: Tracks top players by wins, stored on the blockchain.
- **User Stats**: Displays wins, losses, times played, amount spent, and amount rewarded.
- **Responsive UI**: Built with React and Tailwind CSS, featuring card flip animations and a clean interface.
- **Error Handling**: Prevents gameplay issues, such as unclaimed rewards blocking new games.

## PREREQUISITES

- **Node.js**: Version 14 or higher (`npm` included).
- **MetaMask**: Browser extension for wallet connection.
- **Lisk Sepolia Testnet ETH**: Obtain testnet ETH via [Lisk Sepolia Bridge](https://portal.lisk.com) or [Superchain Faucet](https://app.superbridge.app/lisk-sepolia).
- **Code Editor**: VS Code or similar for development.
- **Git**: For cloning the repository.

## INSTALLATION

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Akanimoh12/Game-Onchain.git
   cd Game-Onchain
   npm run dev

## LIVE LINK
https://chess-flip-onchain.vercel.app/

## CHESS-FLIP CONTRACT ADDRESS
https://sepolia-blockscout.lisk.com/address/0xa6e4369468fC1dbB21B2A8C9AC4D0391EDb9Fb1F
