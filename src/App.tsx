import React, { useState, useEffect } from 'react';
import TypingTest from './components/TypingTest/TypingTest';
import { FaFacebook, FaInstagram, FaLinkedin, FaPlay, FaTimes, FaTwitter } from 'react-icons/fa';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { toggleAudio } from './utils/toggleAudio';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
interface ScoreboardItem {
  id: string;
  name: string;
  score: number;
}
const App: React.FC = () => {
  const [isGameVisible, setIsGameVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(localStorage.getItem('isMuted') === 'true');
  const [audio] = useState(new Audio('/songs/background.wav'));
  const [scoreboard, setScoreboard] = useState<{ id: string; name: string; score: number }[]>([]);

  useEffect(() => {
    toggleAudio(audio, isMuted);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, isMuted]);

  useEffect(() => {
    localStorage.setItem('isMuted', String(isMuted));
  }, [isMuted]);

  useEffect(() => {
    const scoreboardData = localStorage.getItem('scores');
    if (scoreboardData) {
      const parsedScoreboard = JSON.parse(scoreboardData);
      parsedScoreboard.sort((a: ScoreboardItem, b: ScoreboardItem) => b.score - a.score);
      setScoreboard(parsedScoreboard);
    }
  }, [isGameVisible]);
  
  const handlePlayClick = () => {
    setIsGameVisible(true);
  };

  const handleCloseClick = () => {
    setIsGameVisible(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="App">
      <AnimatePresence>
        {!isGameVisible && (
          <motion.div
            className="pre-game"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
     

            <header>
              <h1 className="main-title">Desafio de Digitação </h1>
              <p className="description">Clique no botão abaixo para iniciar!</p>
            </header>

            <main className="game-buttons">
              <button className="play-button" onClick={handlePlayClick}>
                <FaPlay /> JOGAR
              </button>
              <ScoreBoard scoreboard={scoreboard} />

              <button className="mute-button-game" onClick={handleToggleMute}>
                {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
              </button>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isGameVisible && (
          <motion.div
            className="game"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.5, duration: 0.5 }}
          >
            <div className="game-header">
              <h2>Desafio de Digitação</h2>
              <button className="close-button" onClick={handleCloseClick}>
                <FaTimes />
              </button>
            </div>
            <TypingTest />
            <button className="mute-button-game" onClick={handleToggleMute}>
              {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
            </button>
          </motion.div>
        )}
 
      </AnimatePresence>
      <div className="social-icons">
                <a href="https://www.facebook.com/anthonysareis" target="_blank" rel="noopener noreferrer">
                  <FaFacebook color="#3b5998" size={24} />
                </a>
                <a href="https://www.twitter.com/AnthonySaReis1" target="_blank" rel="noopener noreferrer">
                  <FaTwitter color="#1da1f2" size={24} />
                </a>
                <a href="https://www.instagram.com/anthonysareis" target="_blank" rel="noopener noreferrer">
                  <FaInstagram color="#c13584" size={24} />
                </a>
                <a href="https://www.linkedin.com/in/anthony-sa-reis/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin color="#1da1f2" size={24} />
                </a>
              </div>
      <footer>
        <p className="copyright">&copy; 2024 Anthony Sa Reis. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
