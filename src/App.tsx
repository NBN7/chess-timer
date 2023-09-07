import { lazy, Suspense } from "react";

import { useGame } from "./hooks/useGame";
import { useSecondsParse } from "./hooks/useSecondsParse";
import { useMinutesParse } from "./hooks/useMinutesParse";

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

  const { secondsParse } = useSecondsParse();
  const { minutesParse } = useMinutesParse();

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
