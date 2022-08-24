import React from 'react';
import cls from './Board.module.css';

const Board = () => {
  const option = JSON.parse(localStorage.getItem('settings'));
  const player = JSON.parse(localStorage.getItem('player'));
  const playerInfoDetail = JSON.parse(localStorage.getItem('playerInfo')) || [];
  console.log(playerInfoDetail.player);
  //   let updateInfo = playerInfoDetail.filter(
  //     (item) => console.log(item.player)
  //   &&
  //   item.category === option.category &&
  //   item.level === option.level
  // ); // degugger

  return <div className={cls.board}>leader Board</div>;
};

export default Board;
