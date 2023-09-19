import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { MdSettings } from "react-icons/md";

interface Props {
  isStarted: boolean;
  handleRestartClick: Function;
  handleTogglePause: Function;
  handleSettingsClick: Function;
}

export const ControlPad = ({
  isStarted,
  handleTogglePause,
  handleRestartClick,
  handleSettingsClick,
}: Props) => {
  const controlPadClassName = "w-full p-4 flex items-center justify-around";

  return (
    <div className={controlPadClassName}>
      <VscDebugRestart
        onClick={handleRestartClick}
        size="25px"
        style={{ cursor: "pointer" }}
      />

      {isStarted ? (
        <>
          <BsPauseFill
            onClick={handleTogglePause}
            size="35px"
            style={{ cursor: "pointer" }}
          />
        </>
      ) : (
        <BsPlayFill
          onClick={handleTogglePause}
          size="35px"
          style={{ cursor: "pointer" }}
        />
      )}

      <MdSettings
        onClick={handleSettingsClick}
        size="25px"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
