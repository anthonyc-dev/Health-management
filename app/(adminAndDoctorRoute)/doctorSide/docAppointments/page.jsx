"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { Check, Search, X } from "lucide-react";

const dummyAppointments = [
  {
    id: "1",
    doctor: "Dr. John Doe",
    patient: "Jane Smith",
    date: "2024-11-10",
    time: "10:30 AM",
    status: "Confirmed",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg", // Dummy profile pic URL
  },
  {
    id: "2",
    doctor: "Dr. Mary Johnson",
    patient: "Tom White",
    date: "2024-11-10",
    time: "11:00 AM",
    status: "Pending",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg", // Dummy profile pic URL
  },
  {
    id: "3",
    doctor: "Dr. Peter Brown",
    patient: "Emily Davis",
    date: "2024-11-11",
    time: "9:00 AM",
    status: "Confirmed",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg", // Dummy profile pic URL
  },
  // New appointment with Cancelled status
  {
    id: "4",
    doctor: "Dr. Alex Green",
    patient: "Lucas Gray",
    date: "2024-11-12",
    time: "2:00 PM",
    status: "Cancelled",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg", // Dummy profile pic URL
  },
];

const DocAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter doctors based on the search query
  const filteredDoctors = dummyAppointments.filter((doctor) => {
    return (
      doctor.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.patient.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">All Appointments</h1>
        {/* Search bar */}
        <div className="mb-6 flex justify-center items-center">
          <Search className="inline-block w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg "
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Patient</TableHead>
              <TableHead className="text-left">Doctor</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Time</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-gray-50">
                  <TableCell className="flex items-center">
                    <img
                      src={appointment.profilePic}
                      alt={`${appointment.doctor} profile`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    {appointment.patient}
                  </TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        appointment.status === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : appointment.status === "Cancelled"
                          ? "bg-red-200 text-red-800"
                          : ""
                      }`}
                    >
                      {appointment.status === "Confirmed" && appointment.status}
                      {appointment.status === "Cancelled" && appointment.status}

                      {appointment.status === "Pending" && (
                        <div className="flex items-center gap-2">
                          <Button
                            aria-label="Cancel"
                            variant="outline"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="font-bold" />
                          </Button>

                          <Button
                            aria-label="Confirm"
                            variant="outline"
                            className="text-green-500 hover:text-green-700"
                          >
                            <Check />
                          </Button>
                        </div>
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-4"
                >
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocAppointments;
