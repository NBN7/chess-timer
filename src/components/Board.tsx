import { motion } from "framer-motion";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  player: boolean;
  turn: boolean;
  minutes: number | string;
  seconds: number | string;
  isStarted: boolean;
  isTimeShort: boolean;
}

export const Board = ({
  player,
  turn,
  minutes,
  seconds,
  isStarted,
  isTimeShort,
  ...props
}: Props) => {
  const boardClassName = `flex items-center justify-center w-full h-[500px] ${
    turn ? "disable pointer-events-none" : "active"
  } ${player ? "rounded-b-2xl" : "rounded-t-2xl"} ${
    isStarted ? "" : "pointer-events-none"
  }`;

  const titleClassName = `text-5xl ${player ? "" : "rotate-180"}`;

  const Title = () => {
    return (
      <motion.span
        animate={isTimeShort && !turn ? { color: "#FF0000" } : ""}
        transition={{ duration: 0.4 }}
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
