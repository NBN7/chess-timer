import { memo, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  minutes: number;
  seconds: number;
  gameStart: boolean;
}

export const Board = memo(
  ({ player, turn, onClick, minutes, seconds, gameStart }: Props) => {
    return (
      <div
        onClick={onClick}
        className={`flex items-center justify-center w-full h-[500px] ${
          turn ? "disable" : "active"
        } ${player ? "rounded-b-2xl" : "rounded-t-2xl"} ${
          gameStart ? "" : "pointer-events-none"
        }`}
      >
        <span className={`${player ? "" : "rotate-180"} text-5xl`}>
          {minutes} {seconds}
        </span>
      </div>
    );
  }
);
