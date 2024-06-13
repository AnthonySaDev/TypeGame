import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrophy, FaMedal } from 'react-icons/fa';
import './styles.css';

interface ScoreboardItem {
  id: string;
  name: string;
  score: number;
  difficulty: string;
}

interface ScoreBoardProps {
  scoreboard: ScoreboardItem[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scoreboard }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy'); // Estado para controlar a dificuldade

  const filteredItems = scoreboard.filter(item => item.difficulty === selectedDifficulty);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="scoreboard">
      <h2 className="title">Scoreboard</h2>
      <div className="difficulty-buttons">
        <button onClick={() => setSelectedDifficulty('facil')} className={selectedDifficulty === 'facil' ? 'selected' : ''}>
          Fácil
        </button>
        <button onClick={() => setSelectedDifficulty('normal')} className={selectedDifficulty === 'normal' ? 'selected' : ''}>
          Normal
        </button>
        <button onClick={() => setSelectedDifficulty('dificil')} className={selectedDifficulty === 'dificil' ? 'selected' : ''}>
          Difícil
        </button>
        <button onClick={() => setSelectedDifficulty('muitoDificil')} className={selectedDifficulty === 'muitoDificil' ? 'selected' : ''}>
          Muito Difícil
        </button>
      </div>
      {currentItems.length > 0 ? (
        <ul className="scoreboard-list">
               <FaTrophy size={40} />
          {currentItems.map(({ id, name, score, difficulty }, index) => (
            <li key={id}>
              {index < 3 && <FaMedal className="medal" size={30} />} 
              {name}: {score} {difficulty}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-scoreboard">
          <FaTrophy size={40} />
          <p>Nenhum score registrado ainda.</p>
        </div>
      )}
      {filteredItems.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-button">
            <FaArrowLeft />
          </button>
          <span className="page-info">
            Página <br /> {currentPage} <br /> de <br /> {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="page-button">
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
