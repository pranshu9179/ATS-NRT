import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Upload, X, Eye } from "lucide-react";

const skillsList = ["React", "JavaScript", "HTML", "CSS", "Tailwind", "GraphQL", "Node.js", "TypeScript", "Redux"];

export default function SkillsResumeSection() {
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [resume, setResume] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setInputSkill(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = skillsList.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !skills.includes(skill)
      );
      setFilteredSuggestions(filtered);
    }
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputSkill("");
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputSkill);
    }
  };

  const removeSkill = (removeSkill) => {
    setSkills(skills.filter((skill) => skill !== removeSkill));
  };

  const handleResumeUpload = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (file.size <= 2 * 1024 * 1024) {
        setResume(file.name);
        const url = URL.createObjectURL(file);
        setResumeUrl(url);
      } else {
        alert("File size should be less than 2MB");
      }
    }
  };

  const handleViewResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  const handleDeleteResume = () => {
    setResume("");
    setResumeUrl("");
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Skills & Resume</h2>

      {/* Skills */}
      <div className="bg-[#f1f5f9] dark:bg-[#111] space-y-4 p-4 rounded-lg ">
        <p className="font-medium">Key Skills</p>
        <Input
          placeholder="Type skill and press Enter"
          value={inputSkill}
          onChange={handleSkillChange}
          onKeyDown={handleKeyDown} className={undefined} type={undefined}        />
        {filteredSuggestions.length > 0 && (
          <div className="border rounded-md p-2  space-y-1">
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => addSkill(suggestion)}
                className="cursor-pointer hover:text-gray-500 p-1 rounded-md text-sm"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {skill}
              <X
                className="h-4 w-4 cursor-pointer"
                onClick={() => removeSkill(skill)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div className="bg-[#f1f5f9] dark:bg-[#111] space-y-4 p-4 rounded-lg">
        <p className="font-medium">Resume</p>
        {resume && <p className="font-semibold">{resume}</p>}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewResume}
            disabled={!resumeUrl} className={undefined}          >
            <Eye className="h-4 w-4 mr-2" /> View Resume
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteResume}
            disabled={!resumeUrl} className={undefined}          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-4 cursor-pointer">
          <Upload className="h-5 w-5 text-blue-600 mb-2" />
          <p className="text-blue-600 font-medium">Update resume</p>
          <input type="file" accept=".pdf,.doc,.docx,.rtf" className="hidden" onChange={handleResumeUpload} />
          <p className="text-xs text-gray-500 mt-1">Supported: doc, docx, rtf, pdf, up to 2MB</p>
        </label>
      </div>
    </Card>
  );
}
