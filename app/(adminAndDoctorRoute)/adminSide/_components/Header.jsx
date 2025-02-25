"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex items-center gap-10 w-full">
        <Link href={"/"}>
          <Image src="/logo4.png" alt="logo" width={120} height={120} />
        </Link>
        <ul className="md:flex gap-8 hidden">Admin</ul>
      </div>

      <Button className="bg-green-500 hover:bg-green-400">Log out</Button>
    </div>
  );
};

export default Header;
