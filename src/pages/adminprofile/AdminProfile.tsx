import React, { useRef, useState } from "react";
import SidebarWrapper from "@/layouts/Sidebar";
import AdminInfoSection from "./components/AdminInfoSection";
import { Pencil } from "lucide-react";

export default function AdminProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [profileInfo, setProfileInfo] = useState({
    fullName: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543210",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

 const handleProfileUpdate = (updatedInfo) => {
  setProfileInfo({
    fullName: updatedInfo.fullname,
    email: updatedInfo.email,
    phone: updatedInfo.phone,
  });
};

  return (
    <SidebarWrapper>
      {/* ✅ Admin Header */}
      <div className="flex items-center gap-4 bg-gray-300 p-6 rounded-lg shadow mb-6">
        <div className="relative w-24 h-24">
          <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center text-2xl font-bold text-gray-600">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              profileInfo.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
            )}
          </div>

          {/* ✅ Edit Icon */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 p-1 bg-gray-300 border-none rounded-full shadow-sm hover:bg-gray-300"
          >
            <Pencil className="h-4 w-4 text-gray-700" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900">{profileInfo.fullName}</h2>
          <p className="text-gray-700 font-semibold">{profileInfo.email}</p>
          <p className="text-gray-600 font-semibold">{profileInfo.phone}</p>
        </div>
      </div>

      {/* ✅ Only Admin Info Section */}
      <div className="space-y-6">
        <AdminInfoSection onProfileUpdate={handleProfileUpdate} />
      </div>
    </SidebarWrapper>
  );
}

