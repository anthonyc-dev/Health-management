"use client";

import { EyeIcon, User2 } from "lucide-react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Header from "../(adminAndDoctorRoute)/doctorSide/_components/Header";
import Link from "next/link";
import { toast } from "sonner";

const DoctorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (username === "doctor" && password === "doctor") {
      // router.push("/adminSide");
      toast.success("Log in successful.");
    } else {
      // swal({
      //   position: "top-end",
      //   icon: "error",
      //   title: "Invalid credentials.",
      //   showConfirmButton: false,
      // });
      toast.error("Invalid credentials.");
    }
  };
  return (
    <>
      <Header />
      <section className="relative flex justify-center items-center lg:h-screen lg:items-center bg-myBgDark-lifgtDark">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 shadow-lg rounded-lg">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold  text-green-500">Doctor</h1>
          </div>

          <form
            action="/doctorSide"
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <User2 className="size-4 text-gray-400" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <EyeIcon className="size-4 text-gray-400" />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                // onClick={handleLogin}
                className="inline-block rounded-lg bg-green-500 hover:bg-green-700 px-5 py-3 text-sm font-medium text-white w-full"
              >
                Log in
              </button>
            </div>
            <p>
              Are you?
              <Link className="text-blue-500" href={"/login"}>
                {"   "}
                Admin
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default DoctorLogin;
