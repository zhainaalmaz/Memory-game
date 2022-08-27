import React, { useEffect, useState } from 'react';
import cls from './Signin.module.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [user, setUser] = useState('');
  const [item, setItem] = useState();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('player', JSON.stringify(user));
    setUser('');
    navigate('/settings');
  };

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem('player', user)));
  }, [user]);

  return (
    <div className={cls.signin_layout}>
      <div className="container">
        <h1 className={cls.title}>Please enter your name</h1>
        <form className={cls.form}>
          <input
            placeholder="Enter your name"
            className={cls.form_input}
            type="text"
            name="name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button
            onClick={submitHandler}
            className={cls.form_button}
            type="submit"
            disabled={!user}
          >
            Начать игру
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
