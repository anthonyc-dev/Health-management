"use client";

import React from "react";
import Image from "next/image"; // For optimized images in Next.js
import Header from "../_components/Header";
import {
  AcademicCapIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/outline";

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-white">
          <div className="container mx-auto flex flex-col lg:flex-row items-center py-12 px-6 lg:space-x-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-green-500 leading-tight">
                Welcome to Our Hospital
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Where compassionate care meets medical excellence. Discover our
                legacy of healthcare innovation and patient-first approach.
              </p>
              <a
                href="#history"
                className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition duration-300"
              >
                Learn More
              </a>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                src="https://qmedcenter.com/wp-content/uploads/2023/02/Vector-doctor-examining-a-patient-at-the-clinic-portraying-20-qualities-that-make-a-good-doctor.webp" // Replace with your own image URL
                alt="Doctor Image"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="container mx-auto py-12 px-6 space-y-12">
          {/* History Section */}
          <section
            id="history"
            className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg p-8"
          >
            <ClockIcon className="w-16 h-16 text-green-500 flex-shrink-0" />
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our History
              </h2>
              <p className="mt-4 text-gray-600">
                Established in 1985, our hospital has been a cornerstone of
                healthcare in the community. With over three decades of service,
                we have continually evolved to meet the needs of our patients
                through innovation and dedication.
              </p>
            </div>
          </section>

          {/* Awards Section */}
          <section className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg p-8">
            <SparklesIcon className="w-16 h-16 text-yellow-500 flex-shrink-0" />
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Achievements
              </h2>
              <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Recipient of the National Healthcare Excellence Award in 2022
                </li>
                <li>Accredited by the Joint Commission International (JCI)</li>
                <li>Ranked among the top 10 hospitals in the country</li>
                <li>State-of-the-art facilities recognized for patient care</li>
              </ul>
            </div>
          </section>

          {/* Mission Section */}
          <section className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg p-8">
            <AcademicCapIcon className="w-16 h-16 text-green-500 flex-shrink-0" />
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600">
                To lead the way in healthcare by offering world-class services
                with compassion, innovation, and a commitment to excellence. We
                strive to create a healthier future for all.
              </p>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-green-500 text-white text-center py-12">
          <h2 className="text-3xl font-bold">Join Us on Our Journey</h2>
          <p className="mt-4 text-lg">
            Partner with us to create a healthier and brighter future.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-block bg-white text-green-500 px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          >
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
};

export default About;
