import { lazy, Suspense } from "react";

import { useGame } from "./hooks/useGame";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";
const Settings = lazy(() => import("./components/Settings"));
import { SettingsSkeleton } from "./components/SettingsSkeleton";

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

      {isSettingsOpen && (
        <Suspense fallback={<SettingsSkeleton />}>
          <Settings
            handleSettings={handleSettings}
            handleTimeChange={handleTimeChange}
            handleBonusTimeChange={handleBonusTimeChange}
          />
        </Suspense>
      )}
    </main>
  );
}

export default App;
