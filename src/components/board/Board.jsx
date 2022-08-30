import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './Board.module.css';

let filteredMode;
const Board = () => {
  const [mode, setMode] = useState('time');
  const [selected, setSelected] = useState(filteredMode);
  const [level, setLevel] = useState('easy');
  const [active, setActive] = useState(false);

  const handleActiveButton = (e) => {
    setActive(!active);
    setLevel(e.target.value);
  };

  const navigate = useNavigate();
  const playerInfoDetail = JSON.parse(localStorage.getItem('playerInfo')) || [];

  useEffect(() => {
    filteredMode = playerInfoDetail
      .filter((item) => {
        let selectedLevel = item.level === level;
        return selectedLevel;
      })
      .filter((item) => {
        let keys = Object.keys(item);
        const f = keys.map((key) => key === mode);
        return f;
      });
    setSelected(filteredMode);
  }, [mode, level]);

  return (
    <div className={cls.board}>
      <h3> leader Board</h3>
      <div className={cls.categories}>
        <button
          style={{ backgroundColor: active ? '' : '	#1E90FF' }}
          onClick={handleActiveButton}
          value="easy"
        >
          Easy
        </button>
        <button
          style={{ backgroundColor: active ? '	#1E90FF' : '' }}
          onClick={handleActiveButton}
          value="pro"
        >
          Pro
        </button>
      </div>
      <select onChange={(e) => setMode(e.target.value)} value={mode}>
        <option value="time">Time</option>
        <option value="count">Count</option>
        <option value="score">Score</option>
      </select>

      <div className={cls.board_info}>
        {selected?.map((item) => (
          <div className={cls.board_item} key={item.time}>
            <p>{item.player}</p>
            <p> {item.category}</p>
            {mode === 'time' ? (
              <p>{item.time}</p>
            ) : mode === 'count' ? (
              <p>{item.count}</p>
            ) : (
              <p>{item.score}</p>
            )}
          </div>
        ))}
        <button onClick={() => navigate('/settings')}>Back to menu</button>
      </div>
    </div>
  );
};

export default Board;
