import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import "./CSS/Mocc.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Plac = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  const [formData, setFormData] = useState({
    companyName: "",
    type: "Technical",
    questionText: "",
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8085/api/questions/all");
      // Normalize keys from API response (questiontext -> questionText)
      const normalized = res.data.map((q) => ({
        ...q,
        questionText: q.questiontext || "",  // fallback empty string if undefined
      }));
      setQuestions(normalized);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8085/api/questions/upload", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Submitted successfully!");
      setFormData({
        companyName: "",
        type: "Technical",
        questionText: "",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed.");
    }
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative flex flex-col items-center min-h-screen overflow-hidden bg-gray-950 px-4 py-10 text-gray-200"
    >
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      {/* Heading */}
      <div className="z-10 mb-8 text-center text-3xl font-bold">
        Placement Question Upload
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-6 bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
        <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="companyName"
              className="flex-1 border border-gray-400 rounded-md px-4 py-2 bg-white bg-opacity-70 text-black placeholder-gray-700"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              className="flex-1 border border-gray-400 rounded-md px-4 py-2 bg-white bg-opacity-70 text-black"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Technical">Technical</option>
              <option value="Non-Technical">Non-Technical</option>
            </select>
          </div>

          <textarea
            name="questionText"
            className="border border-gray-400 rounded-md px-4 py-2 bg-white bg-opacity-70 text-black placeholder-gray-700"
            placeholder="Write or paste interview/coding questions here..."
            value={formData.questionText}
            onChange={handleChange}
            rows={4}
            required
          />

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2 hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Questions Table */}
      <div className="relative z-10 mt-10 w-full max-w-6xl text-left bg-gray-900 bg-opacity-70 rounded-xl p-6 shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Uploaded Questions</h2>
        {questions.length === 0 ? (
          <p className="text-gray-400">No questions submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-700">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 border border-gray-700">#</th>
                  <th className="p-3 border border-gray-700">Company Name</th>
                  <th className="p-3 border border-gray-700">Type</th>
                  <th className="p-3 border border-gray-700">Question</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index} className="bg-gray-700 hover:bg-gray-600">
                    <td className="p-3 border border-gray-600">{index + 1}</td>
                    <td className="p-3 border border-gray-600">{q.companyName}</td>
                    <td className="p-3 border border-gray-600">{q.type}</td>
                    <td className="p-3 border border-gray-600">{q.questionText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
};
