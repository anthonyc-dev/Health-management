"use client";

import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "All doctors",
      path: "/doctor",
    },
    {
      id: 3,
      name: "About",
      path: "/about",
    },
    {
      id: 4,
      name: "Contact Us",
      path: "/contact",
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-10 w-full">
        <Link href={"/"}>
          <Image src="/logo4.png" alt="logo" width={120} height={120} />
        </Link>
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item) => (
            <Link href={item.path}>
              <li
                className="hover:text-green-500 cursor-pointer hover:scale-105 transition-all ease-in-out"
                key={item.id}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {user ? (
        <Popover>
          <PopoverTrigger>
            <Image
              src={user?.picture}
              alt="profile-image"
              width={50}
              height={50}
              className="rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent>
            <ul className="flex flex-col gap-2">
              <Link
                href={"/my-booking"}
                className="cursor-pointer hover:bg-slate-100 p-2 rounded-md"
              >
                My booking
              </Link>
              <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                <LogoutLink>
                  <Button variant="outline">Log out</Button>
                </LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button className="bg-green-500 hover:bg-green-400">
            Get Started
          </Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
