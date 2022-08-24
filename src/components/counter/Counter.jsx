import React from 'react';
import Timer from '../timer/Timer';
import cls from './Counter.module.css';
import Board from '../board/Board';

const Counter = ({ count, second, minute }) => {
  return (
    <div className="timer">
      <p className={cls.count}>{count}</p>
      <Board />
      <Timer minute={minute} second={second} />
    </div>
  );
};

export default Counter;
