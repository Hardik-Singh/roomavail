import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileCard from "./components/ProfileCard";
import { StatusType } from "./components/StatusSlider";
import { supabase } from "./utils/supabase";

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 },
  }),
};

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<Record<string, StatusType>>({});

  // Fetch profile data from Supabase on mount
  useEffect(() => {
    const loadProfiles = async () => {
      console.log("Fetching profiles from Supabase...");
      const { data, error } = await supabase.from("profiles").select("*");
  
      if (error) {
        console.error("❌ Supabase error:", error.message);
      } else if (!data || data.length === 0) {
        console.warn("⚠️ No profiles found in table.");
      } else {
        console.log("✅ Profiles fetched:", data);
        const statusMap: Record<string, StatusType> = {};
        data.forEach((p) => (statusMap[p.name] = p.status));
        setProfiles(statusMap);
        
      }
    };
  
    loadProfiles();
  }, []);

  // Update status locally and remotely
  const handleStatusChange = async (name: string, status: StatusType) => {
    // Update local state
    setProfiles((prev) => ({ ...prev, [name]: status }));
  
    // Upsert into Supabase
    const { error } = await supabase
      .from("profiles")
      .upsert({ name, status }, { onConflict: "name" });
  
    if (error) {
      console.error("❌ Supabase upsert error:", error.message);
    } else {
      console.log(`✅ Updated status for ${name} to ${status}`);
    }
  };
  const names = ["Jeremy", "Hardik", "Jay", "Dhanush"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 font-inter relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 bg-[radial-gradient(circle_at_1px_1px,_#ffffff0f_1px,_transparent_0)] bg-[size:16px_16px] opacity-10"></div>

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

      {Object.keys(profiles).length === 0 ? (
        <p className="text-center text-gray-400">Loading profiles...</p>
      ) : (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {names.map((name) => (
            <ProfileCard
              key={name}
              name={name}
              status={profiles[name] || "out-of-home"}
              onChange={(newStatus) => handleStatusChange(name, newStatus)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
