import { useState, useEffect, useRef, ChangeEvent } from "react";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";
import { Configuration } from "./components/Configuration";

function App() {
  const [turn, setTurn] = useState(false);
  const [start, setStart] = useState(false);
  const [settings, setSettings] = useState(false);

  const [timer1, setTimer1] = useState(300000);

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const toggleTurn = () => {
    setTurn((prev) => !prev);
  };

  const togglePause = () => {
    setStart((prev) => !prev);
  };

  const handleRestart = () => {};

  const handleSettings = () => {
    setSettings((prev) => !prev);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimer1(parseInt(e.target.value));
  };

  useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        setTimer1((prev) => prev - 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [start]);

  useEffect(() => {
    if (timer1 === 0) {
      clearInterval(intervalRef.current);
    }
    console.log(timer1 / 1000);
  }, [timer1]);

  return (
    <>
      <main className="flex flex-col justify-between w-full h-screen">
        <Board
          minutes={Math.floor(timer1 / 60 / 1000)}
          seconds={Math.floor(timer1 / 1000)}
          onClick={toggleTurn}
          player={false}
          turn={turn}
        />

        <ControlPad
          handleRestart={handleRestart}
          handleSettings={handleSettings}
          onClick={togglePause}
          start={start}
        />

        <Board
          minutes={Math.floor(timer1 / 60 / 1000)}
          seconds={Math.floor(timer1 / 1000)}
          onClick={toggleTurn}
          player={true}
          turn={!turn}
        />

        {settings && (
          <Configuration
            handleSettings={handleSettings}
            handleTimeChange={handleTimeChange}
          />
        )}
      </main>
    </>
  );
}

export default App;
