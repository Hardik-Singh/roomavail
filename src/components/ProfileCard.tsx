import React from "react";
import { motion } from "framer-motion";
import StatusSlider, { StatusType } from "./StatusSlider";

interface ProfileCardProps {
  name: string;
  status: StatusType;
  onChange: (status: StatusType) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, status, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      {/* Larger name, no profile circle */}
      <h2 className="text-center text-white text-4xl font-semibold font-inter tracking-tight mb-6">
        {name}
      </h2>

      {/* Status Slider */}
      <StatusSlider currentStatus={status} onChange={onChange} />
    </motion.div>
  );
};

export default ProfileCard;
