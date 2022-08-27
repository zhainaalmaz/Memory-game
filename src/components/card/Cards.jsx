import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import Counter from '../counter/Counter';
import Modal from '../UI/modal/Modal';
import {
  proMiraclesItems,
  proFilmsItems,
  proJapaneseItems,
  easyMiraclesItems,
  easyJapaneseItems,
  easyFilmsItems,
} from '../images/data';
import cls from './Cards.module.css';

let timer;
let convertTime;
let score;

const Cards = () => {
  let option = JSON.parse(localStorage.getItem('settings'));
  let playerInfoDetail = JSON.parse(localStorage.getItem('playerInfo')) || [];
  let user = playerInfoDetail.find(
    (item) =>
      item.player === option.player &&
      item.level === option.level &&
      item.category === option.category
  );

  const [items, setItems] = useState(
    option.category === 'miracles' && option.level === 'pro'
      ? proMiraclesItems
      : option.category === 'films' && option.level === 'pro'
      ? proFilmsItems
      : option.category === 'films' && option.level === 'easy'
      ? easyFilmsItems
      : option.category === 'japanese' && option.level === 'pro'
      ? proJapaneseItems
      : option.category === 'japanese' && option.level === 'easy'
      ? easyJapaneseItems
      : easyMiraclesItems
  );

  const [prev, setPrev] = useState(-1);
  const [count, setCount] = useState(0);
  const [finish, setFinish] = useState(items.length / 2);
  const [openModal, setOpenModal] = useState(false);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [time, setTime] = useState(false);

  useEffect(() => {
    if (time) {
      timer = setInterval(() => {
        let nextSecond = second + 1;
        if (nextSecond === 59) {
          setMinute(minute + 1);
          nextSecond = 0;
        }
        setSecond(nextSecond);
      }, 1000);
    } else if (!time) {
      clearInterval(time);
    }
    return () => clearInterval(timer);
  }, [time, minute, second]);

  const convertTimer = () => {
    return minute * 60 + second;
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const savinScore = () => {
    convertTime = minute * 60 + second;
    score = convertTime * count;
    let playerInfo = {
      score: score,
      count: count,
      time: convertTime,
      ...option,
    };
    if (user && user.score > playerInfo.score) {
      playerInfoDetail = playerInfoDetail.map((el) => {
        if (
          el.player === user.player &&
          el.level === user.level &&
          el.category === user.category
        ) {
          el.count = count;
          el.score = score;
          el.time = convertTime;
        }
        return el;
      });
    } else if (!user) {
      playerInfoDetail.push(playerInfo);
    }

    playerInfoDetail.sort((a, b) => a.score - b.score);
    localStorage.setItem('playerInfo', JSON.stringify(playerInfoDetail));
  };

  useEffect(() => {
    if (finish === 0) {
      stopTimer();
      setOpenModal(true);
      convertTimer();
      savinScore();
    }
  }, [finish]);

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
      }, 400);
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
      }, 500);
    }
  }

  function handleClick(id) {
    setTime(true);
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

  function restartGame() {
    setOpenModal(false);
    setCount(0);
    setMinute(0);
    setSecond(0);
    savinScore();
    setItems(
      option.category === 'miracles' && option.level === 'pro'
        ? proMiraclesItems
        : option.category === 'films' && option.level === 'pro'
        ? proFilmsItems
        : option.category === 'films' && option.level === 'easy'
        ? easyFilmsItems
        : option.category === 'japanese' && option.level === 'pro'
        ? proJapaneseItems
        : option.category === 'japanese' && option.level === 'easy'
        ? easyJapaneseItems
        : easyMiraclesItems
    );
    items.map((item) => (item.stat = ''));
    setFinish(items.length / 2);
  }

  return (
    <div>
      <Counter count={count} minute={minute} second={second} />
      <div className={cls.content}>
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
          <div className={cls.modal_inner}>
            <div className={cls.modal_info}>
              <p>player: {user.player}</p>
              <p>level: {user.level}</p>
              <p>category: {user.category}</p>
              <p>time: {user.time}</p>
              <p>count: {user.count}</p>
              <p>score: {score}</p>
            </div>
            <NavLink to={'/board'} className={cls.modal_link}>
              <button>Board</button>
            </NavLink>
            <button onClick={restartGame}>Play again</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Cards;
