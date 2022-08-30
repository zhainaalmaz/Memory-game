import React from 'react';
import Timer from '../timer/Timer';
import cls from './Counter.module.css';
import { Link } from 'react-router-dom';

const Counter = ({ count, second, minute }) => {
  return (
    <div className={cls.timer}>
      <Link to={'/settings'}>
        <button className={cls.backToMenu}>Exit</button>
      </Link>
      <p className={cls.count}>Count: {count}</p>
      <Timer minute={minute} second={second} />
    </div>
  );
};

export default Counter;
