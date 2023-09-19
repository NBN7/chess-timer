import { lazy, Suspense } from "react";

import { useGame } from "./hooks/useGame";
import { PLAYERS } from "./constants/players";

import { AnimatePresence } from "framer-motion";

import { Board } from "./components/board-timer";
import { ControlPad } from "./components/control-pad";
const Settings = lazy(() => import("./components/settings-modal"));
import { SettingsSkeleton } from "./components/settings-modal-skeleton";

import { minutesParse, secondsParse } from "./utils/parser";

function App() {
  const {
    timer1,
    isTime1Short,
    timer2,
    isTime2Short,
    turn,
    toggleTurn,
    isStarted,
    handleRestart,
    togglePause,
    isSettingsOpen,
    handleSettings,
    handleTimeChange,
    handleBonusTimeChange,
  } = useGame();

  return (
    <main className="dark flex flex-col justify-between w-full h-screen overflow-hidden">
      <Board
        minutes={minutesParse(timer1)}
        seconds={secondsParse(timer1)}
        onClick={toggleTurn}
        player={PLAYERS.PLAYER_1}
        turn={turn}
        isStarted={isStarted}
        isTimeShort={isTime1Short}
      />

      <ControlPad
        handleRestart={handleRestart}
        handleSettings={handleSettings}
        handleTogglePause={togglePause}
        isStarted={isStarted}
      />

      <Board
        minutes={minutesParse(timer2)}
        seconds={secondsParse(timer2)}
        onClick={toggleTurn}
        player={PLAYERS.PLAYER_2}
        turn={!turn}
        isStarted={isStarted}
        isTimeShort={isTime2Short}
      />

      <AnimatePresence>
        {isSettingsOpen && (
          <Suspense fallback={<SettingsSkeleton />}>
            <Settings
              handleSettings={handleSettings}
              handleTimeChange={handleTimeChange}
              handleBonusTimeChange={handleBonusTimeChange}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
