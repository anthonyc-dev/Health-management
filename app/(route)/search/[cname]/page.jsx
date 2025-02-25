"use client";

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_components/Header";

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
      <div className="mb-10 px-8 mt-5">
        <h2 className="font-bold text-xl">{params.cname}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 mt-4">
          {loading
            ? // Render six skeleton loaders
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"
                  ></div>
                ))
            : doctorList.map((item) => (
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
                    <h2 className="text-green-500 text-sm">
                      {item.experience}
                    </h2>
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
              ))}
        </div>
      </div>
    </>
  );
};

export default Search;
