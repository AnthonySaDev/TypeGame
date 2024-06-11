import React from 'react';

interface ProgressBarProps {
  width: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ width }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ProgressBar;
