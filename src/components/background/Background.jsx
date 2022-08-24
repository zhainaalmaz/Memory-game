import React from 'react';
import cls from './Background.module.css';
const Background = () => {
  return (
    <main className={cls.app}>
      <div className={cls.boxes}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  );
};

export default Background;
