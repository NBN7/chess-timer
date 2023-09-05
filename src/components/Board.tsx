import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  minutes: number;
  seconds: number | string;
  isStarted: boolean;
}

export const Board = ({
  player,
  turn,
  minutes,
  seconds,
  isStarted,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={`flex items-center justify-center w-full h-[500px] ${
        turn ? "disable pointer-events-none" : "active"
      } ${player ? "rounded-b-2xl" : "rounded-t-2xl"} ${
        isStarted ? "" : "pointer-events-none"
      }`}
    >
      <span className={`text-5xl ${player ? "" : "rotate-180"}`}>
        {minutes} {seconds}
      </span>
    </div>
  );
};
