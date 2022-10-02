import { useEffect, useState } from "react";
import "./App.css";
import colors from "./res/colors.json";

function App() {
  const [color, setColor] = useState("");
  const [guess, setGuess] = useState(false);
  const [clicked, setClicked] = useState(false);

  const checkGuess = (e) => {
    setClicked(true);
    const correct = e.target.textContent === color;
    setGuess(correct);
    if (correct) {
      setColor(colors[1].hex);
    }
  };

  useEffect(() => {
    setColor(colors[0].hex);
  }, []);

  return (
    <div className="app">
      <div className="color-box" style={{ backgroundColor: color }}></div>
      <div className="guesses">
        <button className="guess-button" onClick={checkGuess}>
          {colors[0].hex}
        </button>
        <button className="guess-button" onClick={checkGuess}>
          {colors[1].hex}
        </button>
        <button className="guess-button" onClick={checkGuess}>
          {colors[2].hex}
        </button>
      </div>
      {clicked && (guess ? <p>Success</p> : <p>Error</p>)}
    </div>
  );
}

export default App;
