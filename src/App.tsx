import { lazy, Suspense } from "react";

import { useGame } from "./hooks/useGame";

import { AnimatePresence } from "framer-motion";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";
const Settings = lazy(() => import("./components/Settings"));
import { SettingsSkeleton } from "./components/SettingsSkeleton";

import { minutesParse } from "./utils/minutesParse";
import { secondsParse } from "./utils/secondsParse";

function App() {
  const {
    timer1,
    timer2,
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
        minutes={minutesParse(timer2)}
        seconds={secondsParse(timer2)}
        onClick={toggleTurn}
        player
        turn={!turn}
        isStarted={isStarted}
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
