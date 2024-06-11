import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar/ProgressBar';
import Card from '../Card/Card';
import { generateRandomParagraph } from '../../utils/generateRandomParagraph';
import { resetTest } from '../../utils/resetTest';
import { playAudio } from '../../utils/playAudio';

const TypingTest: React.FC = () => {
  const initialMaxTime = 20;
  const [maxTime, setMaxTime] = useState<number>(initialMaxTime);
  const [timeLeft, setTimeLeft] = useState<number>(initialMaxTime);
  const [mistakes, setMistakes] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);
  const [countWords, setCountWords] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [paragraph, setParagraph] = useState<string>(generateRandomParagraph(6));
  const inputRef = useRef<HTMLInputElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [correctWrong, setCorrectWrong] = useState<string[]>(Array(paragraph.length).fill(''));
  const [timeIsUp, setTimeIsUp] = useState<boolean>(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            setTimeIsUp(true);
            playAudio('/songs/gameOver.wav');
            calculateScore();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setIsTyping(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeIsUp) {
      playAudio('/songs/gameOver.wav');
      const now = new Date();
      const userScore = {
        id: `score-${now.getTime()}`,
        name: `Played at ${now.getHours()}h${now.getMinutes()}`,
        score: score
      };
      const scores = JSON.parse(localStorage.getItem('scores') || '[]');
      scores.push(userScore);
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }, [timeIsUp]);

  useEffect(() => {
    if (isTyping) {
      setWpm(Number(((charIndex / 5) / ((initialMaxTime - timeLeft) / 60)).toFixed(2)));
      setCpm(Number((charIndex / ((initialMaxTime - timeLeft) / 60)).toFixed(2)));
    }
  }, [charIndex, timeLeft, isTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const characters = charRefs.current;
    const currentChar = characters[charIndex];
    const typedChar = e.target.value.slice(-1);

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }
      let newCorrectWrong = [...correctWrong];
      if (currentChar && typedChar === currentChar.textContent) {
        if (charIndex === characters.length - 1) {
          setIsTyping(false);
          playAudio('/songs/correct.wav');
          const newParagraph = generateRandomParagraph(6);
          setCountWords((prevCount) => prevCount + 1);
          newCorrectWrong = Array(newParagraph.length).fill('');
          charRefs.current.forEach((charRef) => {
            if (charRef) {
              charRef.classList.remove('correct', 'wrong');
            }
          });
          setParagraph(newParagraph);
          setCharIndex(0);
          setMaxTime((prevMaxTime) => Math.max(5, prevMaxTime - 15));
          setTimeLeft(Math.max(5, maxTime - 15));
          calculateScore();
        } else {
          setCharIndex((prevIndex) => prevIndex + 1);
          newCorrectWrong[charIndex] = 'correct';
          playAudio('/songs/correct.wav');
        }
      } else {
        setMistakes((prevMistakes) => prevMistakes + 1);
        newCorrectWrong[charIndex] = 'wrong';
        playAudio('/songs/erro.wav');
      }
      setCorrectWrong(newCorrectWrong);
    } else {
      setIsTyping(false);
    }
  };

  const calculateScore = () => {
    const newScore = countWords / (mistakes === 0 ? 1 : mistakes) * 0.4;
    setScore(parseFloat(newScore.toFixed(2)));
  };
  

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleContainerClick}
    >
      <h1 className='title'>{timeIsUp ? 'Você perdeu!' : 'Digite'}</h1>
      <div className="test">
        <input
          type="text"
          className="input-field"
          ref={inputRef}
          onChange={handleChange}
        />
        {timeIsUp ? (
          <motion.span className='game-over'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            Fim de Jogo!
          </motion.span>
        ) : (
          paragraph.split('').map((char, index) => (
            <Card
              isActive={index === charIndex}
              isCorrect={correctWrong[index]}
              char={char}
              ref={(el) => (charRefs.current[index] = el)}
              key={index}
            />
          ))
        )}
      </div>
      <ProgressBar width={(timeLeft / maxTime) * 100} />
      <motion.div className="result"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <p>
          Erros: <strong>{mistakes}</strong>
        </p>
        <p>
          WPM: <strong>{wpm}</strong>
        </p>
        <p>
          CPM: <strong>{cpm}</strong>
        </p>
        <p>
          Pontuação: <strong>{score.toFixed(2)}</strong>
        </p>
        <button className="btn" onClick={() => resetTest(setParagraph, initialMaxTime, setMaxTime, setTimeLeft, setMistakes, setCharIndex, setIsTyping, setWpm, setCpm, setCorrectWrong, charRefs, setTimeIsUp, inputRef, setScore, setCountWords)}>
          Reiniciar
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TypingTest;

