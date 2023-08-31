import { HTMLAttributes } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { BiSolidTime } from "react-icons/bi";


interface Props extends HTMLAttributes<HTMLDivElement> {
  isPaused: boolean;
}

export const ControlPad = ({ isPaused, onClick }: Props) => {
  return (
    <div className="w-full p-4 flex items-center justify-around">
      <VscDebugRestart size="27px" />
      {isPaused ? (
        <>
          <BsPauseFill onClick={onClick} size="35px" />
        </>
      ) : (
        <BsPlayFill onClick={onClick} size="35px" />
      )}
      <BiSolidTime size="25px" />
    </div>
  );
};
