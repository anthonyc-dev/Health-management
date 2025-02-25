"use client";

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_components/Header";
import {
  Edit,
  Edit2,
  GraduationCap,
  MapPin,
  Trash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Search = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.cname) {
      getDoctorList(params.cname);
      console.log(params.cname);
    } // Assuming params contains categoryName
  }, [params.cname]);

  const getDoctorList = async (categoryName) => {
    try {
      // Query the 'category' collection where the 'name' matches the categoryName from params
      const categoriesQuery = query(
        collection(db, "category"),
        where("name", "==", categoryName) // Query by name field
      );
      const categoriesSnapshot = await getDocs(categoriesQuery);

      if (categoriesSnapshot.empty) {
        console.log("No matching categories found.");
        return;
      }

      // Get the first matching category document (assuming name is unique)
      const categoryDoc = categoriesSnapshot.docs[0];
      const categoryRef = categoryDoc.ref;

      // Fetch the 'doctor' subcollection data under this category
      const doctorsRef = collection(categoryRef, "doctor");
      const doctorsSnapshot = await getDocs(doctorsRef);

      const doctorsData = doctorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        categoryName: categoryDoc.data().name,
      }));

      setDoctorList(doctorsData);

      console.log(doctorsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-5 rounded-lg">
        {loading
          ? // Render six skeleton loaders
            Array(1)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"
                ></div>
              ))
          : doctorList.map((item, index) => (
              <div>
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg"
                >
                  {/**Doctor image */}
                  <div>
                    <Image
                      key={index} // Add a unique key for each item
                      src={item.image} // Use item instead of doctor inside map
                      width={200}
                      height={200}
                      alt="doctor-image"
                      className="rounded-lg w-full h-[280px] object-cover"
                    />
                  </div>
                  {/**Doctor info */}
                  <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline">
                    <h2 className="font-bold text-2xl">{item.name}</h2>
                    <h2 className="flex gap-2 text-gray-500 text-md">
                      <GraduationCap />
                      <span>{item.experience}</span>
                    </h2>
                    <h2 className="text-md flex gap-2 text-gray-500">
                      <MapPin />
                      <span>{item.address}</span>
                    </h2>
                    <h2 className="text-[10px] bg-green-100 p-1 rounded-full px-2 text-green-500">
                      {item.categoryName}
                    </h2>
                    <div className="flex space-x-4 mt-10">
                      <Button
                        aria-label="Confirm"
                        variant="outline"
                        className="text-green-500 hover:text-green-700"
                      >
                        <Edit2 className="inline-block w-5 h-5" />
                      </Button>
                      <Button
                        aria-label="Confirm"
                        variant="outline"
                        className="text-green-500 hover:text-green-700"
                      >
                        <Trash2 className="inline-block w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/**About doctor */}
                <div className="p-3 border-[1px] eounded-lg mt-5">
                  <h2 className="font-bold text-[20px]">About me</h2>
                  <p className="text-gray-500 tracking-wider mt-2">
                    {item.about}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Search;
