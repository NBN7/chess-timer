import { memo } from "react";

import { HTMLAttributes } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { MdSettings } from "react-icons/md";

interface Props extends HTMLAttributes<HTMLDivElement> {
  start: boolean;
  handleRestart: Function;
  handleSettings: Function;
}

export const ControlPad = memo(
  ({ start, onClick, handleRestart, handleSettings }: Props) => {
    console.log("render control pad with useCallback");
    return (
      <div className="w-full p-4 flex items-center justify-around">
        <VscDebugRestart
          onClick={handleRestart}
          size="25px"
          style={{ cursor: "pointer" }}
        />
        {start ? (
          <>
            <BsPauseFill
              onClick={onClick}
              size="35px"
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <BsPlayFill
            onClick={onClick}
            size="35px"
            style={{ cursor: "pointer" }}
          />
        )}
        <MdSettings
          onClick={handleSettings}
          size="25px"
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  }
);
