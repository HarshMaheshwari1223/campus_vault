import React, { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import axios from "axios";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const MoocTable = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [moocData, setMoocData] = useState([]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    // Fetch data
    axios
      .get("http://localhost:8085/api/mooc/all")
      .then((res) => setMoocData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative flex items-center justify-center min-h-screen overflow-x-auto bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="relative z-20 w-full max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Certificate Records</h2>
        <div className="overflow-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-gray-800 border border-gray-700 text-sm text-left text-gray-300">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Platform</th>
                <th className="px-4 py-3 border">Type</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Cert ID</th>
                <th className="px-4 py-3 border">Link</th>
              </tr>
            </thead>
            <tbody>
              {moocData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-2 border">{item.title}</td>
                  <td className="px-4 py-2 border">{item.platform || "-"}</td>
                  <td className="px-4 py-2 border">{item.type}</td>
                  <td className="px-4 py-2 border">{item.date}</td>
                  <td className="px-4 py-2 border">{item.certId}</td>
                  <td className="px-4 py-2 border text-blue-400">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline">
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {moocData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};
