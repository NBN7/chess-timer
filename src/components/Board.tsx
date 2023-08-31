import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
}

export const Board = ({ player, turn, onClick }: Props) => {
  return (
    <>
      {player ? (
        <div
          onClick={onClick}
          style={turn ? { pointerEvents: "none" } : {}}
          className={
            turn
              ? `flex items-center justify-center w-full h-[300px] bg-gray-600 rounded-b-2xl`
              : `flex items-center justify-center w-full h-[300px] bg-red-600 rounded-b-2xl`
          }
        >
          <span className="text-5xl">15 : 00</span>
        </div>
      ) : (
        <div
          onClick={onClick}
          style={turn ? { pointerEvents: "none" } : {}}
          className={
            turn
              ? `flex items-center justify-center w-full h-[300px] bg-gray-600 rounded-t-2xl`
              : `flex items-center justify-center w-full h-[300px] bg-red-600 rounded-t-2xl`
          }
        >
          <span className="text-5xl">15 : 00</span>
        </div>
      )}
    </>
  );
};
