import { ChangeEventHandler } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  handleSettings: Function;
  handleTimeChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Configuration = ({ handleSettings, handleTimeChange }: Props) => {
  const TIMER_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div className="flex items-center justify-center absolute w-full h-full backdrop-blur-sm">
      <div className="flex flex-col items-center w-[300px] h-[300px] bg-[#242424] rounded-2xl p-4">
        <div className="flex w-full justify-end">
          <MdClose onClick={handleSettings} size="20px" />
        </div>

        <div className="flex flex-col w-full h-full justify-center">
          <select
            onChange={handleTimeChange}
            className="w-full p-4 rounded-2xl"
            name="time"
          >
            <option defaultValue="">Time</option>
            {TIMER_OPTIONS.map((opt, index) => (
              <option value={opt * 60 * 1000} key={index}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
