"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";
import Header from "../_components/Header";
import { Search } from "lucide-react";

const DoctorList = ({ heading = "All Doctors" }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = async () => {
    try {
      const categoriesQuery = query(collection(db, "category"));
      const categoriesSnapshot = await getDocs(categoriesQuery);

      // Fetch doctors from each category's subcollection
      const allDoctors = await Promise.all(
        categoriesSnapshot.docs.map(async (categoryDoc) => {
          const doctorsRef = collection(categoryDoc.ref, "doctor");
          const doctorsSnapshot = await getDocs(doctorsRef);
          const doctorsData = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            categoryName: categoryDoc.data().name, // Include category name
          }));
          return doctorsData;
        })
      );

      // Flatten the array of doctors
      const flattenedDoctors = allDoctors.flat();
      setDoctors(flattenedDoctors);
      setLoading(false); // Disable loading once data is fetched
    } catch (error) {
      console.error("Error fetching doctors: ", error);
      setLoading(false); // Disable loading on error
    }
  };

  // Filter doctors based on the search query
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Header />
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
            // Render six skeleton loaders
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"
                ></div>
              ))
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((item) => (
              <div
                key={item.id}
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-green-500 hover:shadow-sm transition-all ease-in-out"
              >
                <Image
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={200}
                  className="h-[200px] w-full object-cover rounded-lg"
                />
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[10px] bg-green-100 p-1 rounded-full px-2 text-green-500">
                    {item.categoryName}
                  </h2>
                  <h2 className="font-bold">{item.name}</h2>
                  <h2 className="text-green-500 text-sm">{item.experience}</h2>
                  <h2 className="text-gray-500 text-sm">{item.address}</h2>
                  <Link
                    href={"/details/" + item.categoryName}
                    className="w-full"
                  >
                    <h2 className="p-2 px-3 border-[1px] border-green-500 text-green-500 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-green-500 hover:text-white transition-all ease-in-out">
                      Book Now
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500 mt-5">
              <h2>No doctors found.</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
