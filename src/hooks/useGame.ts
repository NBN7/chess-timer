import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";

export const useGame = () => {
  // turn = false : player 1 turn
  // turn = true : player 2 turn
  const [turn, setTurn] = useState(false);

  // isGameStarted = false : game stopped
  // isGameStarted = true : game started
  const [isGameStarted, setIsGameStarted] = useState(false);

  // isSettingsOpen = false : settings window hide
  // isSettingsOpen = true : settings window show
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // player 1 timer
  const [timer1, setTimer1] = useState(300000);
  const [isTime1Short, setIsTime1Short] = useState(false);

  // isTimer1Running = false : player 1 timer is not running
  // isTimer1Running = true : player 1 timer is running
  const [isTimer1Running, setIsTimer1Running] = useState(false);

  // player 2 timer
  const [timer2, setTimer2] = useState(300000);
  const [isTime2Short, setIsTime2Short] = useState(false);

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
      if (timer1 > 0) {
        intervalRef1.current = setInterval(() => {
          setTimer1((prev) => prev - 1000);
        }, 1000);
      }
    } else {
      clearInterval(intervalRef1.current);
    }
  }, [isTimer1Running]);

  useEffect(() => {
    if (isTimer2Running) {
      if (timer2 > 0) {
        intervalRef2.current = setInterval(() => {
          setTimer2((prev) => prev - 1000);
        }, 1000);
      }
    } else {
      clearInterval(intervalRef2.current);
    }
  }, [isTimer2Running]);
  // -------- TIMERS --------

  // -------- BONUS TIME --------
  useEffect(() => {
    if (isGameStarted) {
      if (turn && timer1 > 0) {
        setTimer1((prev) => prev + selectedBonusTime.current);
        return;
      }
      if (!turn && timer2 > 0) {
        setTimer2((prev) => prev + selectedBonusTime.current);
      }
    }
  }, [turn]);
  // -------- BONUS TIME --------

  // -------- TIMER CHECK --------
  useEffect(() => {
    if (timer1 === 0) {
      clearInterval(intervalRef1.current);
      setIsGameStarted(false);
      togglePause();
    }
    if (timer1 <= selectedTime.current * 0.2) setIsTime1Short(true);
    else setIsTime1Short(false);
  }, [timer1]);

  useEffect(() => {
    if (timer2 === 0) {
      clearInterval(intervalRef2.current);
      setIsGameStarted(false);
      togglePause();
    }
    if (timer2 <= selectedTime.current * 0.2) setIsTime2Short(true);
    else setIsTime2Short(false);
  }, [timer2]);
  // -------- TIMER CHECK --------

  const toggleTurn = () => {
    setTurn((prev) => !prev);
    setIsTimer1Running((prev) => !prev);
    setIsTimer2Running((prev) => !prev);
  };

  // -------- CONTROL PAD --------
  const togglePause = () => {
    if (timer1 === 0 || timer2 === 0) return;
    if (isGameStarted) {
      setIsTimer1Running(false);
      setIsTimer2Running(false);
      setIsGameStarted((prev) => !prev);
      return;
    }
    setIsGameStarted((prev) => !prev);
    if (!turn) {
      setIsTimer1Running((prev) => !prev);
    } else {
      setIsTimer2Running((prev) => !prev);
    }
  };

  const handleRestartClick = useCallback(() => {
    setTimer1(selectedTime.current);
    setTimer2(selectedTime.current);

    setIsTimer1Running(false);
    setIsTimer2Running(false);
    setIsGameStarted(false);
    setTurn(false);
  }, []);

  const handleSettingsClick = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, [isSettingsOpen]);

  // -------- CONTROL PAD --------

  // -------- SETTINGS --------
  const handleTimeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setTimer1(parseInt(e.target.value));
    setTimer2(parseInt(e.target.value));
    selectedTime.current = parseInt(e.target.value);
    handleRestartClick();
  }, []);

  const handleBonusTimeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      selectedBonusTime.current = parseInt(e.target.value);
      handleRestartClick();
    },
    []
  );

  useEffect(() => {
    if (isSettingsOpen) {
      setIsTimer1Running(false);
      setIsTimer2Running(false);
      setIsGameStarted(false);
    }
  }, [isSettingsOpen]);

  // -------- SETTINGS --------

  return {
    timer1,
    isTime1Short,
    timer2,
    isTime2Short,
    turn,
    toggleTurn,
    isGameStarted,
    handleRestartClick,
    togglePause,
    isSettingsOpen,
    handleSettingsClick,
    handleTimeChange,
    handleBonusTimeChange,
  };
};
