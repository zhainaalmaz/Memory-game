import './App.css';
import { useState } from 'react';
import Cards from './components/card/Cards';
import Signin from './components/sign/Signin';
import Settings from './components/settings/Settings';
import { Route, Routes } from 'react-router-dom';
import Background from './components/background/Background';
import Board from './components/board/Board';
import Rules from './components/rules/Rules';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Background />
        <h1 className="title">Memory Card Game</h1>
        <Routes>
          <Route path={'*'} element={<Signin />} />
          <Route path={'/settings'} element={<Settings />} />
          <Route path={'/cards'} element={<Cards />} />
          <Route path={'/board'} element={<Board />} />
          <Route path={'/rules'} element={<Rules />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
