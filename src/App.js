import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = (props) => {


  const [counter, setCounter] = useState(1);

  const [chosenSide, setChosenSide] = useState('light');

  const [selectedCharacter, setSelectedCharacter] = useState(1);

  const [destroyed, setDestroyed] = useState(false);


  const sideHandler = side => {
    setChosenSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

  const handleSetCounter = () => {
    setCounter(counter + 1);

  }

  const content = (
    <React.Fragment>
      <div>
        <button onClick={handleSetCounter}>Counter</button>
      </div>
      <CharPicker
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
        counter={counter}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, 'light')}>
        Light Side
        </button>
      <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
      {chosenSide === 'dark' && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    return <h1>Total destruction!</h1>;
  }
  return content;

}

export default App;
