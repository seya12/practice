import { useCallback, useEffect, useState } from "react";
import "./App.css";
import colors from "./res/colors.json";

function App() {
  const [color, setColor] = useState({ name: "", hex: "" });
  const [guess, setGuess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [guessOptions, setGuessOptions] = useState([{ name: "", hex: "" }]);

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * colors.length);
  }, []);

  const fillOptions = useCallback(() => {
    const options = [];
    const randomColor = getRandomNumber();
    setColor(colors[randomColor]);

    options[0] = colors[randomColor];
    options[1] = colors[getRandomNumber()];
    options[2] = colors[getRandomNumber()];

    setGuessOptions([...options].sort(() => Math.random() - 0.5));
  }, [getRandomNumber]);

  useEffect(() => {
    fillOptions();
  }, [fillOptions]);

  const checkGuess = (e) => {
    setClicked(true);
    const correct = e.target.textContent === color.hex;
    setGuess(correct);
    if (correct) {
      fillOptions();
    }
  };

  return (
    <div className="app">
      <div className="color-box" style={{ backgroundColor: color.hex }}></div>
      <div className="guesses">
        {guessOptions.map(({ hex }) => {
          return (
            <button key={hex} className="guess-button" onClick={checkGuess}>
              {hex}
            </button>
          );
        })}
      </div>
      {clicked &&
        (guess ? (
          <p className="success">Success!</p>
        ) : (
          <p className="error">Wrong Answer</p>
        ))}
    </div>
  );
}

export default App;
