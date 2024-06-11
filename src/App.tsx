import React, { useState, useEffect } from 'react';
import TypingTest from './components/TypingTest/TypingTest';
import { FaFacebook, FaInstagram, FaLinkedin, FaPlay, FaTimes, FaTrophy, FaTwitter } from 'react-icons/fa';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { toggleAudio } from './utils/toggleAudio';
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
     

            <header>
              <h1 className="main-title">Desafio de Digitação <br></br> Aventura na Selva</h1>
              <p className="description">Você foi parar em uma selva misteriosa. Para sair, você precisa desvendar os segredos antigos digitando corretamente os encantamentos!</p>
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
            </header>

     

            <main className="game-buttons">
              <button className="play-button" onClick={handlePlayClick}>
                <FaPlay /> Explorar a Selva
              </button>
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'keyframes', duration: 0.5 }}
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
      <div className="scoreboard">
          <h2>Scoreboard</h2>
          {scoreboard.length > 0 ? (
            <ul>
              {scoreboard.map(({ id, name, score }) => (
                <li key={id}>
                  {name}: {score}
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-scoreboard">
              <FaTrophy size={40}/> 
              <p>Nenhum score registrado ainda. Seja o primeiro!</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;
