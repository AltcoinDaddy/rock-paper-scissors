"use client";

import React, { useState, useEffect } from 'react';
import { Camera, FileText, Scissors, RefreshCw, Trophy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

// Mock iExec integration (replace with actual iExec SDK usage)
const mockIExec = {
  encryptState: async (state: string) => state,
  decryptState: async (state: string) => JSON.parse(state),
};

interface GameState {
  playerScore: number;
  computerScore: number;
  rounds: number;
}

const choices = ['rock', 'paper', 'scissors'] as const;
type Choice = typeof choices[number];

const choiceIcons: Record<Choice, React.ReactNode> = {
  rock: <Camera size={48} />,
  paper: <FileText size={48} />,
  scissors: <Scissors size={48} />,
};

const InteractiveRPSGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const initialState: GameState = {
      playerScore: 0,
      computerScore: 0,
      rounds: 0,
    };
    const encryptedState = await mockIExec.encryptState(JSON.stringify(initialState));
    setGameState(await mockIExec.decryptState(encryptedState));
  };

  const playRound = async (choice: Choice) => {
    if (!gameState || isAnimating) return;

    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    // Simulate computer "thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));

    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(compChoice);

    let roundResult: string;
    if (choice === compChoice) {
      roundResult = 'tie';
    } else if (
      (choice === 'rock' && compChoice === 'scissors') ||
      (choice === 'paper' && compChoice === 'rock') ||
      (choice === 'scissors' && compChoice === 'paper')
    ) {
      roundResult = 'win';
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      roundResult = 'lose';
    }

    const newState: GameState = {
      playerScore: gameState.playerScore + (roundResult === 'win' ? 1 : 0),
      computerScore: gameState.computerScore + (roundResult === 'lose' ? 1 : 0),
      rounds: gameState.rounds + 1,
    };

    const encryptedState = await mockIExec.encryptState(JSON.stringify(newState));
    setGameState(await mockIExec.decryptState(encryptedState));
    setResult(roundResult);
    setIsAnimating(false);
  };

  const resetGame = () => {
    initializeGame();
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      {showConfetti && <Confetti />}
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-800">Confidential Rock Paper Scissors</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="flex justify-around mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {choices.map((choice) => (
              <motion.button
                key={choice}
                onClick={() => playRound(choice)}
                className={`p-3 rounded-full transition-colors ${
                  playerChoice === choice ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
                } hover:bg-purple-500 hover:text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isAnimating}
              >
                {choiceIcons[choice]}
              </motion.button>
            ))}
          </motion.div>
          <div className="flex justify-around items-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={playerChoice || 'player-placeholder'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="font-semibold text-purple-800 mb-2">You chose:</p>
                {playerChoice ? (
                  <div className="p-3 bg-purple-100 rounded-full inline-block">
                    {choiceIcons[playerChoice]}
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-purple-100 rounded-full"></div>
                )}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={computerChoice || 'computer-placeholder'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="font-semibold text-purple-800 mb-2">Computer chose:</p>
                {computerChoice ? (
                  <div className="p-3 bg-pink-100 rounded-full inline-block">
                    {choiceIcons[computerChoice]}
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    {isAnimating && <RefreshCw className="animate-spin text-pink-500" size={24} />}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Alert className="mb-6" variant={result === 'win' ? 'default' : result === 'lose' ? 'destructive' : 'secondary'}>
                  <AlertTitle>{result === 'win' ? 'Victory!' : result === 'lose' ? 'Defeat!' : 'It\'s a tie!'}</AlertTitle>
                  <AlertDescription>
                    {result === 'win' ? 'You won this round!' : result === 'lose' ? 'The computer won this round.' : 'No winner this time.'}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-center bg-purple-50 p-4 rounded-lg shadow-inner mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-purple-800">Player</span>
              <span className="font-semibold text-purple-800">Computer</span>
            </div>
            <Progress value={(gameState.playerScore / (gameState.playerScore + gameState.computerScore)) * 100} className="h-4" />
            <div className="flex justify-between mt-2">
              <span className="font-bold text-purple-600">{gameState.playerScore}</span>
              <span className="font-bold text-purple-600">{gameState.computerScore}</span>
            </div>
            <p className="font-semibold text-purple-800 mt-2">Rounds Played: <span className="text-purple-600">{gameState.rounds}</span></p>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={resetGame} variant="outline" className="bg-white text-purple-600 border-purple-300 hover:bg-purple-50">
              Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-500 rounded-full"
          initial={{ 
            top: '0%',
            left: `${Math.random() * 100}%`,
            opacity: 1
          }}
          animate={{ 
            top: '100%',
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 1 + 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveRPSGame;