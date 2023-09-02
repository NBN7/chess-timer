import { memo } from "react";

import { ChangeEventHandler } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  handleSettings: Function;
  handleTimeChange: ChangeEventHandler<HTMLSelectElement>;
  handleBonusTimeChange: ChangeEventHandler<HTMLSelectElement>;
}
const TIME_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const BONUS_OPTIONS = [1, 2, 3, 4, 5];

export const Settings = memo(
  ({ handleSettings, handleTimeChange, handleBonusTimeChange }: Props) => {
    console.log("render settings with useCallback");
    return (
      <div className="flex items-center justify-center absolute w-full h-full backdrop-blur-sm">
        <div className="flex flex-col items-center w-[300px] h-[300px] bg-[#242424] rounded-2xl p-4">
          <div className="flex w-full justify-end">
            <MdClose onClick={handleSettings} size="20px" />
          </div>

          <div className="flex flex-col w-full h-full justify-center gap-4">
            {/* TIME OPTIONS */}
            <select
              onChange={handleTimeChange}
              className="w-full p-4 rounded-2xl overflow-scroll"
              name="time"
            >
              <option defaultValue="">Time (minutes)</option>
              {TIME_OPTIONS.map((opt, index) => (
                <option value={opt * 60 * 1000} key={index}>
                  {opt}
                </option>
              ))}
            </select>
            {/* TIME OPTIONS */}

            {/* BONUS OPTIONS */}
            <select
              onChange={handleBonusTimeChange}
              className="w-full p-4 rounded-2xl overflow-scroll"
              name="time"
            >
              <option defaultValue="">Bonus time (seconds)</option>
              {BONUS_OPTIONS.map((opt, index) => (
                <option value={opt * 1000} key={index}>
                  {opt}
                </option>
              ))}
            </select>
            {/* BONUS OPTIONS */}
          </div>
        </div>
      </div>
    );
  }
);
