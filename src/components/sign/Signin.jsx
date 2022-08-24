import React, { useEffect, useState } from 'react';
import cls from './Signin.module.css';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [user, setUser] = useState('');
  //   const [error, setError] = useState('');
  const [item, setItem] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('player', JSON.stringify(user));
    setUser('');
  };

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem('player', user)));
  }, [user]);

  return (
    <div className={cls.signin_layout}>
      <div className="container">
        <h1 className={cls.title}>Please enter your name</h1>
        <form onSubmit={submitHandler} className={cls.form}>
          <input
            placeholder="Enter your name"
            className={cls.form_input}
            type="text"
            name="name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button className={cls.form_button} type="submit">
            Enter
          </button>
          {item && (
            <Link to={'/settings'}>
              <button className={cls.form_button} type="submit">
                Начать игру
              </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
