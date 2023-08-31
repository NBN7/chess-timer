import { HTMLAttributes } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isPaused: boolean;
}

export const ControlPad = ({ isPaused, onClick }: Props) => {
  return (
    <div className="w-full p-2 flex items-center justify-center">
      {isPaused ? (
        <BsPauseFill onClick={onClick} size="35px" />
      ) : (
        <BsPlayFill onClick={onClick} size="35px" />
      )}
    </div>
  );
};
