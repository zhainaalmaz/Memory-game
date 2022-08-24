import React, { useEffect, useState } from 'react';
import Card from './Card';
import Counter from '../counter/Counter';
import Modal from '../UI/modal/Modal';
import {
  proMiraclesItems,
  proFilmsItems,
  easyMiraclesItems,
  easyFilmsItems,
} from '../images/data';

let timer;
let convertTime;
const playerInfoDetail = JSON.parse(localStorage.getItem('playerInfo')) || [];
const Cards = () => {
  const option = JSON.parse(localStorage.getItem('settings'));
  console.log(option, 'option');
  // const player = JSON.parse(localStorage.getItem('player'));
  // const playerInfoDetail = JSON.parse(localStorage.getItem('playerInfo')) || [];
  console.log(playerInfoDetail, 'plinfo');

  // let updateInfo = playerInfoDetail.find(
  //   (item) => item.username === player.username && item.mode === option.mode
  // ); /// degugger

  const [items, setItems] = useState(
    option.category === 'miracles' && option.level === 'pro'
      ? proMiraclesItems
      : option.category === 'films' && option.level === 'pro'
      ? proFilmsItems
      : option.category === 'films' && option.level === 'easy'
      ? easyFilmsItems
      : easyMiraclesItems
  );

  const [prev, setPrev] = useState(-1);
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(items.length / 2);
  const [openModal, setOpenModal] = useState(false);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    timer = setInterval(() => {
      let nextSecond = second + 1;
      if (nextSecond === 59) {
        setMinute(minute + 1);
        nextSecond = 0;
      }
      setSecond(nextSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [minute, second]);

  const convertTimer = () => {
    return minute * 60 + second;
  };

  convertTime = minute * 60 + second;

  let playerInfo = {
    // player: player,
    // level: option.level,
    // category: option.category,
    count: count,
    timer: convertTime,
    ...option,
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  useEffect(() => {
    if (finish === 0) {
      stopTimer();
      setOpenModal(true);
      convertTimer();
      localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
    } else {
      console.log('update');
    }
  }, [items]);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = 'correct';
      items[prev].stat = 'correct';
      setItems([...items]);
      setTimeout(() => {
        setItems([...items]);
        items[current].stat = 'hide';
        items[prev].stat = 'hide';
        setPrev(-1);
      }, 700);
      setFinish(finish - 1);
    } else {
      items[current].stat = 'wrong';
      items[prev].stat = 'wrong';
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = '';
        items[prev].stat = '';
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = 'active disable';
      setItems([...items]);
      setPrev(id);
      setCount(count + 1);
    } else {
      check(id);
      setCount(count + 1);
    }
  }

  return (
    <div>
      <Counter count={count} minute={minute} second={second} />
      <div className="content">
        {option.level === 'pro'
          ? items.map((item, index) => (
              <Card
                key={index}
                item={item}
                id={index}
                handleClick={handleClick}
              />
            ))
          : items.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  id={index}
                  handleClick={handleClick}
                />
              );
            })}
      </div>
      {openModal && (
        <Modal>
          <p>hello</p>
          <p>{playerInfoDetail.player}</p>
          <p>{playerInfoDetail.level}</p>
          <p>{playerInfoDetail.category}</p>
          <p>{playerInfoDetail.count}</p>
          <p>{playerInfoDetail.timer}</p>
        </Modal>
      )}
    </div>
  );
};

export default Cards;
