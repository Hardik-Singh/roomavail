import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "./components/ProfileCard";
import { StatusType } from "./components/StatusSlider";

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 },
  }),
};

const App: React.FC = () => {
  const [jeremyStatus, setJeremyStatus] = useState<StatusType>("out-of-home");
  const [hardikStatus, setHardikStatus] = useState<StatusType>("out-of-home");
  const [jayStatus, setJayStatus] = useState<StatusType>("out-of-home");
  const [dhanushStatus, setDhanushStatus] = useState<StatusType>("out-of-home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 font-inter relative overflow-hidden">
      {/* Subtle animated gradient backdrop (optional) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(circle_at_1px_1px,_#ffffff0f_1px,_transparent_0)] bg-[size:16px_16px] opacity-10"></div>

      {/* Sleek Modern Header */}
      <motion.h1
        className="relative z-10 text-center text-4xl md:text-5xl font-semibold text-white font-inter mb-10 tracking-tight"
      >
        {"Status Board".split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Responsive Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <ProfileCard name="Jeremy" status={jeremyStatus} onChange={setJeremyStatus} />
        <ProfileCard name="Hardik" status={hardikStatus} onChange={setHardikStatus} />
        <ProfileCard name="Jay" status={jayStatus} onChange={setJayStatus} />
        <ProfileCard name="Dhanush" status={dhanushStatus} onChange={setDhanushStatus} />
      </div>
    </div>
  );
};

export default App;
