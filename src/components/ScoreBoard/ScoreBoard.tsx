import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrophy } from 'react-icons/fa';
import './styles.css';

interface ScoreboardItem {
  id: string;
  name: string;
  score: number;
}

interface ScoreBoardProps {
  scoreboard: ScoreboardItem[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scoreboard }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scoreboard.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(scoreboard.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {currentItems.length > 0 ? (
        <ul>
          {currentItems.map(({ id, name, score }) => (
            <li key={id}>
              {name}: {score}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-scoreboard">
          <FaTrophy size={40} />
          <p>Nenhum score registrado ainda.</p>
        </div>
      )}
      {scoreboard.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-button">
            <FaArrowLeft />
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="page-button">
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
