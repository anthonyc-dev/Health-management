"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:order-last lg:h-full">
            <Image
              alt=""
              src="/hero.jpg"
              className="absolute inset-0 h-full w-full object-cover"
              width={800}
              height={800}
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find & Book
              <span className="text-green-500"> Appoinment </span>
              with your favorate
              <span className="text-green-500"> Doctor</span>
            </h2>

            <p className="mt-4 text-gray-600">
              Streamline Your Healthcare Journey: Connect with Top Doctors,
              Schedule Appointments, and Keep Track of Your Medical History All
              in One Place
            </p>

            <LoginLink>
              <Button className="bg-green-500 hover:bg-green-400 mt-10">
                Get Started
              </Button>
            </LoginLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
