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

export const Mocc = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  const [formData, setFormData] = useState({
    rollNumber: "", 
    name: "",    
    title: "",
    platform: "",
    type: "",
    date: "",
    certId: "",
    link: "",
  });

const [selectedFile, setSelectedFile] = useState(null);
const [uploading, setUploading] = useState(false);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);


useEffect(() => {
  const roll = localStorage.getItem("rollNumber") || "";
  const userName = localStorage.getItem("name") || "";

  setFormData((prev) => ({
    ...prev,
    rollNumber: roll,
    name: userName,
  }));
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
      await axios.post("http://localhost:8085/api/mooc/upload", formData, {
  headers: {
    "Content-Type": "application/json",
  },
});



      alert("Certificate uploaded successfully!");
      setFormData({
        rollNumber: localStorage.getItem("rollNumber") || "",
        name: localStorage.getItem("name") || "",  
        title: "",
        platform: "",
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
        <div class="heading2">
          <p>CERTIFICATE UPLOAD</p>
        </div>
      </div>

      {/* Animated Card */}
      <div className="relative z-20 flex flex-col md:flex-row gap-20 mt-20">
        <div className="form_card">
          <div className="form_card2">
            <form className="form" onSubmit={handleSubmit}>
              <p id="heading">Certificate Details</p>

              {/* Course Title */}
              <div className="field">
                <input
                  type="text"
                  name="title"
                  className="input-field"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Course Platform */}
              <div className="field">
                <input
                  type="text"
                  name="platform"
                  className="input-field"
                  placeholder="Course Platform (e.g., Coursera, NPTEL)"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Certificate Type */}
              <div className="field">
                <input
                  type="text"
                  name="type"
                  className="input-field"
                  placeholder="Certificate Type (e.g., Completion)"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Completion Date */}
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

              {/* Upload Certificate File */}
              <div className="field">
                <input
                  type="file"
                  className="input-field"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>

              <div className="field1">
                <button
                  className="button4"
                  type="button"
                  onClick={async () => {
                    if (!selectedFile)
                      return alert("Please select a file first.");
                    setUploading(true);
                    const data = new FormData();
                    data.append("file", selectedFile);

                    try {
                      const res = await axios.post(
                        "http://localhost:5000/upload",
                        data,
                        {
                          headers: { "Content-Type": "multipart/form-data" },
                        }
                      );
                      if (res.data.fileLink) {
                        setFormData((prev) => ({
                          ...prev,
                          link: res.data.fileLink,
                        }));
                        alert("File uploaded to google drive!");
                      } else {
                        alert("Failed to get google drive link.");
                      }
                    } catch (err) {
                      console.error("Upload failed:", err);
                      alert("Upload failed. See console.");
                    } finally {
                      setUploading(false);
                    }
                  }}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <span className="spinner mr-2" /> Uploading...
                    </>
                  ) : (
                    "Upload to Drive"
                  )}
                </button>
              </div>

              {/* Certificate Link */}
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

              {/* Submit Button */}
              <button className="button3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
