import { HTMLAttributes } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { MdSettings } from "react-icons/md";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isPaused: boolean;
  handleRestart: Function;
  handleSettings: Function;
}

export const ControlPad = ({
  isPaused,
  onClick,
  handleRestart,
  handleSettings,
}: Props) => {
  return (
    <div className="w-full p-4 flex items-center justify-around">
      <VscDebugRestart onClick={handleRestart} size="25px" />
      {isPaused ? (
        <>
          <BsPauseFill onClick={onClick} size="35px" />
        </>
      ) : (
        <BsPlayFill onClick={onClick} size="35px" />
      )}
      <MdSettings onClick={handleSettings} size="25px" />
    </div>
  );
};
