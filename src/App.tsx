import { useState } from "react";

import { Board } from "./components/Board";
import { ControlPad } from "./components/ControlPad";

function App() {
  const [turn, setTurn] = useState(false);

  const toggleTurn = () => {
    setTurn((prev) => !prev);
  };

  const [pause, setPause] = useState(false);

  const togglePause = () => {
    setPause((prev) => !prev);
  };

  return (
    <>
      <main className="flex flex-col justify-between w-full h-screen">
        {/* timer */}
        <Board onClick={toggleTurn} player={true} turn={turn} />

        {/* control pad */}
        <ControlPad onClick={togglePause} isPaused={pause} />

        {/* timer */}
        <Board onClick={toggleTurn} player={false} turn={!turn} />
      </main>
    </>
  );
}

export default App;
