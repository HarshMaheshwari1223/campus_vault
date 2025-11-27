import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import axios from "axios";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import "./CSS/Mocc.css";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Comp = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  const [formData, setFormData] = useState({
    id: "init",
    title: "",
    place: "",
    type: "",
    date: "",
    certId: "",
    link: "",
  });

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

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
      await axios.post("http://192.168.146.115:8085/api/general/upload", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Certificate uploaded successfully!");
      setFormData({
        id: "reset_id",
        title: "",
        place: "",
        type: "",
        date: "",
        certId: "",
        link: "",
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="absolute top-5 left ">
        <div class="heading2">
          <p>CERTIFICATE UPLOAD</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="relative z-20 flex flex-col md:flex-row gap-20 mt-20">
        <div className="form_card">
          <div className="form_card2">
            <form className="form" onSubmit={handleSubmit}>
              <p id="heading">Competition Details</p>

              {/* Title */}
              <div className="field">
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  placeholder="Competition Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Place */}
              <div className="field">
                <input
                  type="text"
                  name="place"
                  className="input-field"
                  placeholder="Organizing Place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Type */}
              <div className="field">
                <input
                  type="text"
                  name="type"
                  className="input-field"
                  placeholder="Certificate Type (e.g., Winner, Participation)"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date */}
              <div className="field">
                <input
                  type="date"
                  name="date"
                  className="input-field"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Certificate ID */}
              <div className="field">
                <input
                  type="text"
                  name="certId"
                  className="input-field"
                  placeholder="Certificate ID"
                  value={formData.certId}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* File Upload (Not yet implemented) */}
              <div className="field">
                <input
                  type="file"
                  className="input-field"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled
                  title="File upload not implemented yet"
                />
              </div>

              {/* Link */}
              <div className="field">
                <input
                  type="url"
                  name="link"
                  className="input-field"
                  placeholder="Certificate Link (Google Drive URL)"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>

              <button className="button3" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
