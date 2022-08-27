import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PACE } from '../../utils/constant';
import RadioBox from '../radiobox/RadioBox.jsx';
import styles from './Settings.module.css';

const Settings = () => {
  const player = JSON.parse(localStorage.getItem('player')) || '';

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [level, setLevel] = useState(PACE[0]);

  localStorage.setItem(
    'settings',
    JSON.stringify({
      level: level,
      category: category,
      player,
    })
  );

  return (
    <div className={styles.settings}>
      <h2>Settings</h2>

      <h4>Category:</h4>
      <div className={styles.setting}>
        {CATEGORIES.map((item) => (
          <RadioBox
            key={item}
            name={item}
            selectedItem={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        ))}
      </div>

      <h4>Pace:</h4>
      <div className={styles.setting}>
        {PACE.map((item) => (
          <RadioBox
            key={item}
            name={item}
            selectedItem={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        ))}
      </div>

      <div>
        <Link to={'/cards'}>
          <button className={styles.button}>Start</button>
        </Link>
        <Link to={'/board'}>
          <button className={styles.button}>Board</button>
        </Link>
        <Link to={'/rules'}>
          <button className={styles.button}>Rules</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
