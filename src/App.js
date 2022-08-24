import './App.css';
import { useState } from 'react';
import Cards from './components/card/Cards';
import Signin from './components/sign/Signin';
import Settings from './components/settings/Settings';
import { Route, Routes } from 'react-router-dom';
import Background from './components/background/Background';

function App() {
  const [gameOptions, setGameOptions] = useState(null);

  const startGame = (options) => {
    setGameOptions(options);
  };

  const restartGame = () => {
    setGameOptions(null);
  };

  return (
    <div className="App">
      <div className="container">
        <Background />
        <h1 className="title">Memory Card Game</h1>
        <Routes>
          <Route path={'*'} element={<Signin />} />
          <Route
            path={'/settings'}
            element={<Settings startGame={startGame} />}
          />
          <Route path={'/cards'} element={<Cards />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
