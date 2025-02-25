"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import DoctorDetail from "../_components/DoctorDetail";
import Header from "@/app/_components/Header";

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState([]);

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
      setDoctor(doctorsData);
      console.log(doctorsData);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 md:px-20">
        <h2 className="font-bold text-[22px]">Details</h2>

        <div className="grid grid-cols-1 mid:grid-cols-4">
          {/**Docotr details */}
          <div className="col-span-3">
            {/**Docotr image */}
            <DoctorDetail doctor={doctor} />
          </div>
          {/**Doctor sujestion */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Details;
