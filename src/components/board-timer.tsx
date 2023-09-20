import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

import { PLAYERS } from "../constants/players";

type Player = typeof PLAYERS.PLAYER_1 | typeof PLAYERS.PLAYER_2;

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: Player;
  turn: boolean;
  minutes: number | string;
  seconds: number | string;
  isGameStarted: boolean;
  isTimeShort: boolean;
}

export const Board = ({
  player,
  turn,
  minutes,
  seconds,
  isGameStarted,
  isTimeShort,
  ...props
}: Props) => {
  const boardClassName = `flex items-center justify-center w-full h-[500px] cursor-pointer ${
    turn ? "disable pointer-events-none" : "active"
  } ${player === PLAYERS.PLAYER_1 ? "rounded-t-2xl" : "rounded-b-2xl"} ${
    isGameStarted ? "" : "pointer-events-none"
  }`;

  const titleClassName = `text-5xl ${
    player === PLAYERS.PLAYER_1 ? "rotate-180" : ""
  }`;

  const Title = () => {
    return (
      <motion.span
        animate={isTimeShort && !turn ? { color: ["#FF0000", "#fff"] } : ""}
        transition={{ duration: 1.7, ease: "easeInOut" }}
        className={titleClassName}
      >
        {minutes} {seconds}
      </motion.span>
    );
  };

  return (
    <div {...props} className={boardClassName}>
      <Title />
    </div>
  );
};
