"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [category, setCategory] = useState([]); // Initialize as empty array

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const q = query(collection(db, "category"));
    const querySnapshot = await getDocs(q);

    // Map the documents to an array
    const categories = querySnapshot.docs.map((doc) => doc.data());
    setCategory(categories);
  };

  return (
    <div className="mb-10 px-5 items-center flex flex-col gap-2">
      <h1 className="font-bold text-4xl tracking-wide">
        Search <span className="text-green-500">Doctors</span>
      </h1>
      <h2 className="text-gray-500 text-xl">
        Search your Doctor and Book Appointment in one click
      </h2>
      <Link href={"/search/" + "Dentist"}>
        <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search..." />
          <Button type="submit" className="bg-green-500 hover:bg-green-400">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </Link>
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
        {category.length > 0
          ? category.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={"/search/" + item.name}
                    key={index}
                    className="flex flex-col text-center items-center p-5 bg-green-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer"
                  >
                    <Image
                      src={item.icon}
                      height={30}
                      width={30}
                      alt={item.name}
                    />
                    <label className="text-green-500 text-sm">
                      {item.name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[120px] w-[130px] bg-slate-200 m-2  rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
