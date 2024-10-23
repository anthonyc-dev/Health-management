"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import Image from "next/image";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const [category, setCategory] = useState([]); // Initialize as empty array
  const params = usePathname();
  const categoryName = params.split("/")[2];
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
    <div className="h-screen mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {category.length > 0
              ? category.map((item, index) => (
                  <CommandItem key={index}>
                    <Link
                      href={"/search/" + item.name}
                      className={`p-2 flex gap-2 text-[14px] text-green-500 rounded-md cursor-pointer items-center w-full ${
                        categoryName === item.name && "bg-green-100"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={25}
                        height={25}
                      />
                      <label>{item.name}</label>
                    </Link>
                  </CommandItem>
                ))
              : null}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
