import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";
import { Settings } from "./components/Settings";

function App() {
  const [turn, setTurn] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [settings, setSettings] = useState(false);

  const [timer1, setTimer1] = useState(300000);
  const [isTimer1Running, setIsTimer1Running] = useState(false);

  const [timer2, setTimer2] = useState(300000);
  const [isTimer2Running, setIsTimer2Running] = useState(false);

  const selectedTime = useRef(300000);
  const selectedBonusTime = useRef(3000);

  const intervalRef1 = useRef<ReturnType<typeof setInterval>>();
  const intervalRef2 = useRef<ReturnType<typeof setInterval>>();

  const toggleTurn = () => {
    setTurn((prev) => !prev);
    if (isTimer1Running) {
      setIsTimer1Running((prev) => !prev);
      setIsTimer2Running((prev) => !prev);
      return;
    }
    setIsTimer1Running((prev) => !prev);
    setIsTimer2Running((prev) => !prev);
  };

  // -------- CONTROL PAD --------
  const togglePause = useCallback(() => {
    if (isStarted) {
      setIsTimer1Running(false);
      setIsTimer2Running(false);
      setIsStarted((prev) => !prev);
      return;
    }
    setIsStarted((prev) => !prev);
    if (!turn) {
      setIsTimer1Running((prev) => !prev);
    } else {
      setIsTimer2Running((prev) => !prev);
    }
  }, [isStarted]);

  const handleRestart = useCallback(() => {
    setTimer1(selectedTime.current);
    setTimer2(selectedTime.current);

    setIsTimer1Running(false);
    setIsTimer2Running(false);
    setIsStarted(false);
    setTurn(false);
  }, []);

  const handleSettings = useCallback(() => {
    setSettings((prev) => !prev);
  }, []);

  // -------- CONTROL PAD --------

  // -------- SETTINGS --------
  const handleTimeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setTimer1(parseInt(e.target.value));
    setTimer2(parseInt(e.target.value));
    selectedTime.current = parseInt(e.target.value);
  }, []);

  const handleBonusTimeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      selectedBonusTime.current = parseInt(e.target.value);
    },
    []
  );

  // -------- SETTINGS --------

  // -------- TIMERS --------
  useEffect(() => {
    if (isTimer1Running) {
      intervalRef1.current = setInterval(() => {
        setTimer1((prev) => prev - 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef1.current);
    }
  }, [isTimer1Running]);

  useEffect(() => {
    if (isTimer2Running) {
      intervalRef2.current = setInterval(() => {
        setTimer2((prev) => prev - 1000);
      }, 1000);
    } else {
      clearInterval(intervalRef2.current);
    }
  }, [isTimer2Running]);
  // -------- TIMERS --------

  // -------- CHECK IF TIMER IS ZERO --------
  useEffect(() => {
    if (timer1 === 0) {
      clearInterval(intervalRef1.current);
    }
  }, [timer1]);

  useEffect(() => {
    if (timer2 === 0) {
      clearInterval(intervalRef2.current);
    }
  }, [timer2]);
  // -------- CHECK IF TIMER IS ZERO --------

  return (
    <>
      <main className="flex flex-col justify-between w-full h-screen overflow-hidden">
        <Board
          minutes={Math.floor(timer1 / 60 / 1000)}
          seconds={Math.floor(timer1 / 1000)}
          onClick={toggleTurn}
          player={false}
          turn={turn}
          gameStart={isStarted}
        />

        <ControlPad
          handleRestart={handleRestart}
          handleSettings={handleSettings}
          onClick={togglePause}
          start={isStarted}
        />

        <Board
          minutes={Math.floor(timer2 / 60 / 1000)}
          seconds={Math.floor(timer2 / 1000)}
          onClick={toggleTurn}
          player={true}
          turn={!turn}
          gameStart={isStarted}
        />

        {settings && (
          <Settings
            handleSettings={handleSettings}
            handleTimeChange={handleTimeChange}
            handleBonusTimeChange={handleBonusTimeChange}
          />
        )}
      </main>
    </>
  );
}

export default App;
