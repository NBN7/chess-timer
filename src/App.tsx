import { useState, useEffect } from "react";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";

function App() {
  const totalMinutes = 15;

  const [turn, setTurn] = useState(false);
  const [pause, setPause] = useState(false);

  const [timer, setTimer] = useState({ minutes: totalMinutes, seconds: 0 });

  const toggleTurn = () => {
    setTurn((prev) => !prev);
  };

  const togglePause = () => {
    setPause((prev) => !prev);
  };

  return (
    <>
      <main className="flex flex-col justify-between w-full h-screen">
        {/* timer */}
        <Board
          minutes={timer.minutes}
          seconds={timer.seconds}
          onClick={toggleTurn}
          player={true}
          turn={turn}
        />

        {/* control pad */}
        <ControlPad onClick={togglePause} isPaused={pause} />

        {/* timer */}
        <Board
          minutes={15}
          seconds={0}
          onClick={toggleTurn}
          player={false}
          turn={!turn}
        />
      </main>
    </>
  );
}

export default App;
