import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  time?: number;
  minutes: number;
  seconds?: number;
}

export const Board = ({ player, turn, onClick, minutes, seconds }: Props) => {
  return (
    <>
      {player ? (
        <div
          onClick={onClick}
          style={turn ? { pointerEvents: "none" } : {}}
          className={
            turn
              ? `flex items-center justify-center w-full h-[500px] bg-gray-400 rounded-b-2xl`
              : `flex items-center justify-center w-full h-[500px] gradient rounded-b-2xl`
          }
        >
          <span className="text-5xl">
            {minutes} {seconds}
          </span>
        </div>
      ) : (
        <div
          onClick={onClick}
          style={turn ? { pointerEvents: "none" } : {}}
          className={
            turn
              ? `flex items-center justify-center w-full h-[500px] gradient-disable rounded-t-2xl`
              : `flex items-center justify-center w-full h-[500px] gradient rounded-t-2xl`
          }
        >
          <span className="text-5xl rotate-180">
            {minutes} {seconds}
          </span>
        </div>
      )}
    </>
  );
};
