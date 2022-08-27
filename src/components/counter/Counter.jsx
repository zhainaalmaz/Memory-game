import React from 'react';
import Timer from '../timer/Timer';
import cls from './Counter.module.css';
import { Link } from 'react-router-dom';

const Counter = ({ count, second, minute }) => {
  return (
    <div className={cls.timer}>
      <p className={cls.count}>{count}</p>

      <Timer minute={minute} second={second} />
    </div>
  );
};

export default Counter;
