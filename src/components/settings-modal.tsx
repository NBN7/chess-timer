import { memo, ChangeEventHandler } from "react";
import { motion } from "framer-motion";

import { Select } from "./Select";
import { TIME_OPTIONS } from "../constants/time-options";

import { MdClose } from "react-icons/md";

interface Props {
  handleSettings: Function;
  handleTimeChange: ChangeEventHandler<HTMLSelectElement>;
  handleBonusTimeChange: ChangeEventHandler<HTMLSelectElement>;
}

const Settings = memo(
  ({ handleSettings, handleTimeChange, handleBonusTimeChange }: Props) => {
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
          <div className="flex w-full justify-end">
            <MdClose
              onClick={handleSettings}
              size="20px"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="flex flex-col w-full h-full justify-center gap-4">
            <Select onChange={handleTimeChange}>
              <>
                <option defaultValue="">Time (minutes)</option>
                {TIME_OPTIONS.TIME.map((opt, index) => (
                  <option value={opt * 60 * 1000} key={index}>
                    {opt}
                  </option>
                ))}
              </>
            </Select>

            <Select onChange={handleBonusTimeChange}>
              <>
                <option defaultValue="">Bonus time (seconds)</option>
                {TIME_OPTIONS.BONUS_TIME.map((opt, index) => (
                  <option value={opt * 1000} key={index}>
                    {opt}
                  </option>
                ))}
              </>
            </Select>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default Settings;
