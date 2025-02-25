"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import { Search } from "lucide-react";
import { toast } from "sonner";

const DoctorList = ({ heading = "All Doctors" }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModal, setEditModal] = useState({ open: false, doctor: null });

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = async () => {
    try {
      const categoriesQuery = query(collection(db, "category"));
      const categoriesSnapshot = await getDocs(categoriesQuery);

      const allDoctors = await Promise.all(
        categoriesSnapshot.docs.map(async (categoryDoc) => {
          const doctorsRef = collection(categoryDoc.ref, "doctor");
          const doctorsSnapshot = await getDocs(doctorsRef);
          const doctorsData = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            categoryName: categoryDoc.data().name,
            categoryPath: categoryDoc.ref.path, // Store category path for reference
          }));
          return doctorsData;
        })
      );

      setDoctors(allDoctors.flat());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
      setLoading(false);
    }
  };

  const handleEdit = async (doctor) => {
    setEditModal({ open: true, doctor });
  };

  const handleRemove = async (doctor) => {
    if (confirm("Are you sure you want to remove this doctor?")) {
      try {
        const doctorRef = doc(db, doctor.categoryPath, "doctor", doctor.id);
        await deleteDoc(doctorRef);
        toast.success("Doctor removed successfully!");
        getDoctorList();
      } catch (error) {
        console.error("Error removing doctor: ", error);
      }
    }
  };

  //edit
  const saveEdit = async (updatedDoctor) => {
    try {
      const doctorRef = doc(
        db,
        updatedDoctor.categoryPath,
        "doctor",
        updatedDoctor.id
      );
      await updateDoc(doctorRef, updatedDoctor);
      toast.success("Doctor updated successfully!");
      setEditModal({ open: false, doctor: null });
      getDoctorList();
    } catch (error) {
      console.error("Error updating doctor: ", error);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-10 px-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">{heading}</h2>

        <div className="mb-6 flex justify-center items-center">
          <Search className="inline-block w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-4">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"
              ></div>
            ))
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-green-500 hover:shadow-sm transition-all ease-in-out"
            >
              <Image
                loading="lazy"
                src={doctor.image}
                alt={doctor.name}
                width={500}
                height={200}
                className="h-[200px] w-full object-cover rounded-lg"
              />
              <div className="mt-3 items-baseline flex flex-col gap-1">
                <h2 className="text-[10px] bg-green-100 p-1 rounded-full px-2 text-green-500">
                  {doctor.categoryName}
                </h2>
                <h2 className="font-bold">{doctor.name}</h2>
                <h2 className="text-green-500 text-sm">{doctor.experience}</h2>
                <h2 className="text-gray-500 text-sm">{doctor.address}</h2>

                <button
                  onClick={() => handleEdit(doctor)}
                  className="p-2 px-3 border-[1px] border-green-500 text-green-500 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-green-500 hover:text-white transition-all ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(doctor)}
                  className="p-2 px-3 border-[1px] border-red-500 text-red-500 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all ease-in-out"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500 mt-5">
            <h2>No doctors found.</h2>
          </div>
        )}
      </div>

      {editModal.open && (
        <DoctorEditModal
          doctor={editModal.doctor}
          onClose={() => setEditModal({ open: false, doctor: null })}
          onSave={saveEdit}
        />
      )}
    </div>
  );
};

//save docotor
const DoctorEditModal = ({ doctor, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...doctor });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border mb-2 rounded"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
