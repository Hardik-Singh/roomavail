import React, { useState } from "react";
import { motion } from "framer-motion";
import StatusSlider, { StatusType } from "./StatusSlider";

interface ProfileCardProps {
  name: string;
  status: StatusType;
  onChange: (status: StatusType) => void; // ✅ Add this line
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, status, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 shadow-inner mb-4 flex items-center justify-center">
        <span className="text-white font-bold text-xl">👤</span>
      </div>

      <h2 className="text-center text-white text-2xl font-bold font-[Poppins] tracking-wide mb-2">
        {name}
      </h2>

      {/* Pass the onChange callback down to StatusSlider */}
      <StatusSlider currentStatus={status} onChange={onChange} />
    </motion.div>
  );
};

export default ProfileCard;