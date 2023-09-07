import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  minutes: number | string;
  seconds: number | string;
  isStarted: boolean;
}

export const Board = ({ player, turn, minutes, seconds, isStarted, ...props }: Props) => {
  const boardClassName = `flex items-center justify-center w-full h-[500px] ${
    turn ? "disable pointer-events-none" : "active"
  } ${player ? "rounded-b-2xl" : "rounded-t-2xl"} ${
    isStarted ? "" : "pointer-events-none"
  }`;
  
  const titleClassName = `text-5xl ${player ? "" : "rotate-180"}`

  const Title = () => {
    return (
      <span className={titleClassName}>
        {minutes} {seconds}
      </span>
    );
  };

  return (
    <div {...props} className={boardClassName}>
      <Title />
    </div>
  );
};
