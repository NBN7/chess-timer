import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  minutes: number;
  seconds: number;
  gameStart: boolean;
}

export const Board = ({
  player,
  turn,
  onClick,
  minutes,
  seconds,
  gameStart,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className={`flex items-center justify-center w-full h-[500px] ${
        turn ? "disable pointer-events-none" : "active"
      } ${player ? "rounded-b-2xl" : "rounded-t-2xl"} ${
        gameStart ? "" : "pointer-events-none"
      }`}
    >
      <span className={`${player ? "" : "rotate-180"} text-5xl`}>
        {minutes} {seconds}
      </span>
    </div>
  );
};
