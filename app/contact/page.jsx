"use client";

import React from "react";
import { FaUser, FaEnvelope, FaPen, FaComments } from "react-icons/fa";
import Header from "../_components/Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
          <h1 className="text-3xl font-bold text-center text-green-600">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Have questions or need assistance? Send us a message!
          </p>
          <form className="mt-8 space-y-6">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <FaPen className="absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Subject"
                className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <FaComments className="absolute top-4 left-3 w-6 h-6 text-gray-400" />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 shadow-md transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
