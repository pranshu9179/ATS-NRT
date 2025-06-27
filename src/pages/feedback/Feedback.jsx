import React, { useState } from "react";
import { motion } from "framer-motion";
import SidebarWrapper from "@/layouts/Sidebar";

const emojis = [
  { label: "Terrible", icon: "😞" },
  { label: "Bad", icon: "😕" },
  { label: "Okay", icon: "😐" },
  { label: "Good", icon: "😊" },
  { label: "Excellent", icon: "😍" },
];

const Feedback = () => {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (selected === null || message.trim() === "") {
      alert("Please select a rating and enter your feedback.");
      return;
    }

    console.log({
      emoji: emojis[selected].label,
      message,
    });

    alert("Thank you for your feedback!");
    setSelected(null);
    setMessage("");
  };

  return (

    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-xl w-full space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-white">
          We'd Love Your Feedback 💬
        </h2>

        {/* Emoji Ratings */}
        <div className="flex justify-between gap-2">
          {emojis.map((emoji, index) => (
            <motion.button
              key={index}
              className={`text-3xl p-2 rounded-full transition-all duration-300 ${
                selected === index ? "bg-white text-black scale-125" : "hover:scale-110"
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelected(index)}
            >
              {emoji.icon}
            </motion.button>
          ))}
        </div>

        {/* Feedback Textarea */}
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-300">
            Your thoughts
          </label>
          <textarea
            placeholder="Tell us what went well or what could be better..."
            className="w-full rounded-lg p-3 text-black bg-white/90 min-h-[100px] resize-none outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-300"
        >
          Submit Feedback
        </motion.button>
      </motion.div>
    </div>

  );
};

export default Feedback;
