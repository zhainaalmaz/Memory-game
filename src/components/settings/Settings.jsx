import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PACE } from '../../utils/constant';
import RadioBox from '../radiobox/RadioBox.jsx';
import styles from './Settings.module.css';

const Settings = ({ startGame }) => {
  const player = JSON.parse(localStorage.getItem('player')) || '';

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [level, setLevel] = useState(PACE[0]);

  const onStartGameClick = () => {
    startGame({ category, level });
  };

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

      <Link to={'/cards'}>
        <button className={styles.button} onClick={onStartGameClick}>
          Start
        </button>
      </Link>
    </div>
  );
};

export default Settings;
