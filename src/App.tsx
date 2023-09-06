import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";
import { Settings } from "./components/Settings";

function App() {
  // turn = false : player 1
  // turn = true : player 2
  const [turn, setTurn] = useState(false);

  // isStarted = false : game stopped
  // isStarted = true : game started
  const [isStarted, setIsStarted] = useState(false);

  // settings = false : settings window hide
  // settings = true : settings window show
  const [settings, setSettings] = useState(false);

  // player 1 timer
  const [timer1, setTimer1] = useState(300000);

  // isTimer1Running = false : player 1 timer is not running
  // isTimer1Running = true : player 1 timer is running
  const [isTimer1Running, setIsTimer1Running] = useState(false);

  // player 2 timer
  const [timer2, setTimer2] = useState(300000);

  // isTimer2Running = false : player 2 timer is not running
  // isTimer2Running = true : player 2 timer is running
  const [isTimer2Running, setIsTimer2Running] = useState(false);

  // selectedTime = default time
  const selectedTime = useRef(300000);

  // selectedBonusTime = default bonus time
  const selectedBonusTime = useRef(3000);

  // player 1 timer interval
  const intervalRef1 = useRef<ReturnType<typeof setInterval>>();

  // player 2 timer interval
  const intervalRef2 = useRef<ReturnType<typeof setInterval>>();

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

  // -------- BONUS TIME --------
  useEffect(() => {
    if (isStarted) {
      if (turn) {
        setTimer1((prev) => prev + selectedBonusTime.current);
        return;
      }
      setTimer2((prev) => prev + selectedBonusTime.current);
    }
  }, [turn]);

  // -------- BONUS TIME --------

  // -------- TIMER CHECK --------
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
  // -------- TIMER CHECK --------

  const toggleTurn = () => {
    setTurn((prev) => !prev);
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

  useEffect(() => {
    if (settings) {
      setIsTimer1Running(false);
      setIsTimer2Running(false);
      setIsStarted(false);
    }
  }, [settings]);

  // -------- SETTINGS --------
  return (
    <>
      <main className="flex flex-col justify-between w-full h-screen overflow-hidden">
        <Board
          minutes={Math.floor(timer1 / 60 / 1000)}
          seconds={
            Math.floor((timer1 / 1000) % 60) < 10
              ? "0" + Math.floor((timer1 / 1000) % 60)
              : Math.floor((timer1 / 1000) % 60)
          }
          onClick={toggleTurn}
          player={false}
          turn={turn}
          isStarted={isStarted}
        />

        <ControlPad
          handleRestart={handleRestart}
          handleSettings={handleSettings}
          handleTogglePause={togglePause}
          isStarted={isStarted}
        />

        <Board
          minutes={Math.floor(timer2 / 60 / 1000)}
          seconds={
            Math.floor((timer2 / 1000) % 60) < 10
              ? "0" + Math.floor((timer2 / 1000) % 60)
              : Math.floor((timer2 / 1000) % 60)
          }
          onClick={toggleTurn}
          player
          turn={!turn}
          isStarted={isStarted}
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
