import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import "./CSS/AuroraHero.css";
import { useNavigate } from "react-router-dom";
// import Example from "./pick/Example";


import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import "./CSS/AuroraHero.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const navigate = useNavigate();
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;


  const handlemocc = ()=> {
    navigate("/mooc-table");
  }

  const handlecomp = ()=>
  {
    navigate("/comp-table");
  }
  const handleplac = ()=>{
    navigate("/plac");
  }
  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="absolute top-5 left ">
      <div class = "heading2">
        <p>
          CAMPUS VAULT
        </p>
      </div>
      </div>
      {/* Profile Button Top-Right */}
<div className="absolute top-5 right-5 z-30">
  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
    <span className="text-sm text-white font-medium">
      {localStorage.getItem("name") || "User"}
    </span>
    <button
      onClick={() => navigate("/profile")}
      className="bg-white text-black text-sm px-3 py-1 rounded hover:bg-gray-200 transition-all"
    >
      Profile
    </button>
  </div>
</div>


      {/* Animated Card */}
      <div className="relative z-20 flex flex-col md:flex-row gap-20">
        <div class="card">
          <p class="heading">Check MOCC Certificate</p>
          <p>Powered By</p>
          <p>KIET</p>
          <button class="card-btn" onClick = {handlemocc}>Check</button>
        </div>

        <div class="card">
          <p class="heading">Check     Certificate</p>
          <p>Powered By</p>
          <p>KIET</p>
            <button class="card-btn" onClick = {handlecomp}>Check</button>
        </div>


        <div class="card">
          <p class="heading">Placement questions</p>
          <p>Powered By</p>
          <p>KIET</p>
          <button class="card-btn" onClick = {handleplac}>Upload</button>
        </div>
      </div>
    </motion.section>
  );
};
