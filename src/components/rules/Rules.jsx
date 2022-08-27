import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './Rules.module.css';
const Rules = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className={cls.rules_title}>How to Play the Memory Game</h1>
      <div className={cls.rules_inner}>
        <p>
          Players choose two cards at a time and try to find two cards that are
          exactly the same.
        </p>
        <p>
          If they find two cards that match then they remove the cards from the
          middle and keep them in front of them.
        </p>
        <p>
          The player continues until they are unable to find a matching pair,
          with the game then moving on to the next player to the left.
        </p>
        <p>
          If players are unable to match two cards together then they have to
          turn the cards back over face down.
        </p>
        <p>
          The game continues until all the cards have been successfully paired
          up.
        </p>
        <p>
          The winner is the player who has the most pairs of cards at the end of
          the game.
        </p>
        <button
          className={cls.rules_button}
          onClick={() => navigate('/settings')}
        >
          Back to game
        </button>
      </div>
    </div>
  );
};

export default Rules;
