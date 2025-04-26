import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSuitcase,
  FaMoon,
  FaClock,
  FaShieldAlt,
  FaCouch,
} from "react-icons/fa";

export type StatusType = "out-of-home" | "sleeping" | "busy" | "dnd" | "chilling";

interface StatusSliderProps {
  currentStatus: StatusType;
  onChange: (status: StatusType) => void;
}

const statusConfig: Record<StatusType, { icon: JSX.Element; label: string }> = {
  "out-of-home": {
    icon: <FaSuitcase />, label: "Out of Home"
  },
  sleeping: {
    icon: <FaMoon />, label: "Sleeping"
  },
  busy: {
    icon: <FaClock />, label: "Busy"
  },
  dnd: {
    icon: <FaShieldAlt />, label: "Do Not Disturb"
  },
  chilling: {
    icon: <FaCouch />, label: "Chilling"
  },
};

const StatusSlider: React.FC<StatusSliderProps> = ({ currentStatus, onChange }) => {
  const statuses: StatusType[] = ["out-of-home", "sleeping", "busy", "dnd", "chilling"];

  return (
    <div className="mt-4 w-full flex flex-col items-center gap-2" role="radiogroup" aria-label="Status selector">
      <div className="flex justify-between w-full px-1 sm:px-4">
        {statuses.map((status) => {
          const isActive = status === currentStatus;
          return (
            <button
              key={status}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 focus:outline-none ${
                isActive ? "text-purple-400 bg-white/10 shadow-lg ring-2 ring-purple-400" : "text-gray-400 hover:text-white"
              }`}
              aria-checked={isActive}
              aria-label={statusConfig[status].label}
              role="radio"
              onClick={() => onChange(status)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(status);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={status}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isActive ? 1.3 : 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl mb-0.5"
                >
                  {statusConfig[status].icon}
                </motion.div>
              </AnimatePresence>
              <span className="text-[10px] font-medium">
                {statusConfig[status].label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusSlider;
