# Confidential Rock Paper Scissors Game

## Overview
This project implements a modern, interactive version of the classic Rock Paper Scissors game with a unique twist - it leverages blockchain technology and confidential computing to ensure fair play and data privacy.

## Key Features

1. Confidential Computing: 
   - Utilizes the iExec SDK for encrypting and storing game states.
   - Ensures that game data remains confidential and tamper-proof.

2. Interactive UI:
   - Built with React and TypeScript for a robust, type-safe implementation.
   - Features smooth animations and transitions using Framer Motion.
   - Employs a responsive design suitable for various screen sizes.

3. Visual Feedback:
   - Uses intuitive icons (Camera for Rock, FileText for Paper, Scissors for Scissors).
   - Displays player and computer choices with animated transitions.
   - Shows game results with color-coded alerts.

4. Score Tracking:
   - Keeps track of player and computer scores.
   - Visualizes the score balance with a progress bar.
   - Counts the total number of rounds played.

5. Celebratory Effects:
   - Displays a confetti animation when the player wins a round.

6. Blockchain Integration:
   - Interacts with Ethereum blockchain through the iExec SDK.
   - Deploys and updates encrypted datasets for each game state.

## Technical Implementation

- Frontend: React with TypeScript
- State Management: React Hooks (useState, useEffect)
- Animations: Framer Motion
- Styling: Tailwind CSS with shadcn/ui components
- Blockchain Interaction: iExec SDK
- Icons: Lucide React

## How It Works

1. Game Initialization:
   - Creates an initial game state.
   - Encrypts the state using iExec SDK.
   - Deploys the encrypted state as a dataset on the blockchain.

2. Gameplay:
   - Player selects their choice (Rock, Paper, or Scissors).
   - Computer randomly selects its choice.
   - Game logic determines the winner.
   - New game state is encrypted and updated on the blockchain.

3. UI Updates:
   - Animated transitions show the choices and result.
   - Scoreboard updates reflect the new game state.

4. Reset Functionality:
   - Allows players to start a new game, resetting all states.

## Privacy and Security

The game leverages blockchain and confidential computing technologies to ensure:
- Game states are encrypted before being stored on the blockchain.
- The actual game logic could potentially be executed in a secure enclave (not implemented in this demo version).
- Player choices and game outcomes are protected from tampering or unauthorized access.

## Future Enhancements

Potential areas for improvement include:
- Implementing actual confidential computing for game logic execution.
- Adding multiplayer functionality.
- Incorporating a leaderboard system.
- Enhancing error handling and user feedback for blockchain interactions.

This Rock Paper Scissors game demonstrates how traditional games can be reimagined with modern web technologies and blockchain integration, providing a fun, interactive experience while exploring concepts of data privacy and confidential computing.
