import { memo, ChangeEventHandler } from "react";
import { motion } from "framer-motion";

import { Select } from "./Select";

import { MdClose } from "react-icons/md";

interface Props {
  handleSettings: Function;
  handleTimeChange: ChangeEventHandler<HTMLSelectElement>;
  handleBonusTimeChange: ChangeEventHandler<HTMLSelectElement>;
}
const TIME_OPTIONS = [
  1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
];
const BONUS_OPTIONS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
];

const Settings = memo(
  ({ handleSettings, handleTimeChange, handleBonusTimeChange }: Props) => {
    const ExitBtn = () => {
      return (
        <div className="flex w-full justify-end">
          <MdClose
            onClick={handleSettings}
            size="20px"
            style={{ cursor: "pointer" }}
          />
        </div>
      );
    };

    const TimeOptions = () => {
      return (
        <Select onChange={handleTimeChange}>
          <>
            <option defaultValue="">Time (minutes)</option>
            {TIME_OPTIONS.map((opt, index) => (
              <option value={opt * 60 * 1000} key={index}>
                {opt}
              </option>
            ))}
          </>
        </Select>
      );
    };

    const BonusTimeOptions = () => {
      return (
        <Select onChange={handleBonusTimeChange}>
          <>
            <option defaultValue="">Bonus time (seconds)</option>
            {BONUS_OPTIONS.map((opt, index) => (
              <option value={opt * 1000} key={index}>
                {opt}
              </option>
            ))}
          </>
        </Select>
      );
    };

    return (
      <div className="flex items-center justify-center absolute w-full h-full backdrop-blur-sm p-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, transition: { duration: 0.2 } }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex flex-col items-center w-[300px] h-[300px] bg-[#242424] rounded-2xl p-4"
        >
          <ExitBtn />
          <div className="flex flex-col w-full h-full justify-center gap-4">
            <TimeOptions />
            <BonusTimeOptions />
          </div>
        </motion.div>
      </div>
    );
  }
);

export default Settings;
