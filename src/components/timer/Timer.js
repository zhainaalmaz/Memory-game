import React from 'react';
import cls from './Timer.module.css';

const Timer = ({ minute, second }) => {
  return (
    <div>
      <p className={cls.time}>
        {minute < 10 ? '0' + minute : minute}:
        {second < 10 ? '0' + second : second}
      </p>
    </div>
  );
};

export default Timer;
