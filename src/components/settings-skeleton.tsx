import { motion } from "framer-motion";
import { Skeleton } from "@nextui-org/react";

export const SettingsSkeleton = () => {
  return (
    <div className="flex items-center justify-center absolute w-full h-full backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col items-center w-[300px] h-[300px] bg-[#242424] rounded-2xl p-4 animate-fade-up"
      >
        <div className="flex flex-col w-full h-full justify-center gap-4 mt-[20px]">
          <Skeleton className="h-[55px] rounded-lg" />
          <Skeleton className="h-[55px] rounded-lg" />
        </div>
      </motion.div>
    </div>
  );
};
