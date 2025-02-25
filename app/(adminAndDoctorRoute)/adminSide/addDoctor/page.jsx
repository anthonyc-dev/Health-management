"use client";

import React, { useState } from "react";
import {
  UserIcon,
  BriefcaseIcon,
  PhoneIcon,
  CameraIcon,
} from "@heroicons/react/outline";
import { db, storage } from "@/FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const AddDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    specialty: "",
    contact: "",
    address: "",
    experience: "",
    about: "",
    profilePic: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorInfo((prev) => ({
        ...prev,
        profilePic: file,
      }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload image to Firebase Storage
      let profilePicURL = "";
      if (doctorInfo.profilePic) {
        const storageRef = ref(
          storage,
          `doctors/${uuidv4()}_${doctorInfo.profilePic.name}`
        );
        await uploadBytes(storageRef, doctorInfo.profilePic);
        profilePicURL = await getDownloadURL(storageRef);
      }

      // Add doctor data to Firestore
      const categoryRef = doc(collection(db, "category"));
      const doctorRef = doc(collection(categoryRef, "doctor"));

      await setDoc(doctorRef, {
        name: doctorInfo.name,
        specialty: doctorInfo.specialty,
        contact: doctorInfo.contact,
        address: doctorInfo.address,
        experience: doctorInfo.experience,
        about: doctorInfo.about,
        image: profilePicURL,
      });

      alert("Doctor added successfully!");
      setDoctorInfo({
        name: "",
        specialty: "",
        contact: "",
        address: "",
        experience: "",
        about: "",
        profilePic: null,
      });
      setProfilePreview(null);
    } catch (error) {
      console.error("Error adding doctor: ", error);
      alert("Failed to add doctor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Doctor</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Doctor's Name */}
        <div className="mb-4 flex items-center border-b-2 border-gray-300">
          <UserIcon className="w-6 h-6 text-gray-500 mr-3" />
          <input
            type="text"
            name="name"
            value={doctorInfo.name}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-0 focus:ring-0"
            placeholder="Enter doctor's full name"
            required
          />
        </div>

        {/* Specialty */}
        <div className="mb-4 flex items-center border-b-2 border-gray-300">
          <BriefcaseIcon className="w-6 h-6 text-gray-500 mr-3" />
          <input
            type="text"
            name="specialty"
            value={doctorInfo.specialty}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-0 focus:ring-0"
            placeholder="Enter doctor's specialty"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4 flex items-center border-b-2 border-gray-300">
          <PhoneIcon className="w-6 h-6 text-gray-500 mr-3" />
          <input
            type="text"
            name="contact"
            value={doctorInfo.contact}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-0 focus:ring-0"
            placeholder="Enter doctor's contact number"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <textarea
            name="address"
            value={doctorInfo.address}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-b-2 border-gray-300 focus:ring-0"
            placeholder="Enter doctor's address"
            required
          ></textarea>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <input
            type="text"
            name="experience"
            value={doctorInfo.experience}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-b-2 border-gray-300 focus:ring-0"
            placeholder="Enter doctor's experience"
            required
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <textarea
            name="about"
            value={doctorInfo.about}
            onChange={handleChange}
            className="mt-2 p-3 w-full border-b-2 border-gray-300 focus:ring-0"
            placeholder="Write a short description about the doctor"
          ></textarea>
        </div>

        {/* Profile Picture */}
        <div className="mb-4 flex items-center border-b-2 border-gray-300">
          <CameraIcon className="w-6 h-6 text-gray-500 mr-3" />
          <input
            type="file"
            name="profilePic"
            onChange={handleFileChange}
            className="mt-2 p-3 w-full border-0 focus:ring-0"
            accept="image/*"
          />
        </div>

        {/* Display Profile Picture Preview */}
        {profilePreview && (
          <div className="mb-4 text-center">
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
