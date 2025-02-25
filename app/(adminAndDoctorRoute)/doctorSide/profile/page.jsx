"use client";

import React, { useState } from "react";
import {
  FaUserMd,
  FaBriefcase,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  // State variables to hold profile data
  const [profile, setProfile] = useState({
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    experience: "15 Years of Experience",
    phone: "09546546789",
    email: "john.doe@example.com",
    address: "Calamba City, Laguna",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Local state for form data
  const [formData, setFormData] = useState(profile);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save the updated data
  const handleSave = () => {
    setProfile(formData); // Update the profile state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="relative max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="flex items-center justify-center bg-green-500 p-4">
        <img
          src={profile.image} // Use state for image
          alt="Doctor Profile"
          width={120}
          height={120}
          className="rounded-full border-4 border-white"
        />
      </div>
      <div className="p-6 text-center">
        {isEditing ? (
          <div>
            {/* Edit Mode Form */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="block w-full border rounded px-3 py-2 mb-4"
            />
            <Button
              onClick={handleSave}
              className="bg-green-500 text-white rounded p-2 mt-4"
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            {/* Display Mode */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.name}
            </h2>
            <p className="text-green-500 font-medium">
              {profile.specialization}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
              <FaBriefcase />
              <p>{profile.experience}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaPhone className="text-green-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaEnvelope className="text-green-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-green-500" />
                <span>{profile.address}</span>
              </div>
            </div>

            <div className="flex justify-start">
              <Button
                onClick={() => setIsEditing(true)} // Toggle edit mode
                className="mt-6 py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition"
                variant="outline"
              >
                <Edit className="inline mr-2" />
                Edit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
