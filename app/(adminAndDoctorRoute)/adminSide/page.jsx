"use client";

import { NotepadText } from "lucide-react";
import React from "react";
import { FaUserMd, FaCalendarCheck, FaUser, FaClock } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  // Dummy data for doctors and appointments
  const doctorsCount = 25;
  const appointmentsCount = 100;
  const patientsCount = 200;

  // Updated latestBookings data for three doctors
  const latestBookings = [
    {
      doctorName: "Dr. John Doe",
      doctorSpecialty: "Cardiologist",
      patientName: "Jane Smith",
      appointmentDate: "2024-11-15",
      status: "Confirmed",
      doctorImage: "https://randomuser.me/api/portraits/men/75.jpg", // Dummy profile image
    },
    {
      doctorName: "Dr. Sarah Lee",
      doctorSpecialty: "Neurologist",
      patientName: "Mike Johnson",
      appointmentDate: "2024-11-16",
      status: "Cancelled",
      doctorImage: "https://randomuser.me/api/portraits/women/76.jpg", // Dummy profile image
    },
    {
      doctorName: "Dr. Emma White",
      doctorSpecialty: "Pediatrician",
      patientName: "Emily Davis",
      appointmentDate: "2024-11-17",
      status: "Pending",
      doctorImage: "https://randomuser.me/api/portraits/women/77.jpg", // Dummy profile image
    },
  ];

  return (
    <div className="p-3 bg-gray-100 min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Count Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaUserMd className="text-indigo-500 text-4xl" /> {/* Doctor Icon */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Doctors</h3>
            <p className="text-3xl font-bold text-indigo-500">{doctorsCount}</p>
          </div>
        </div>

        {/* Appointment Count Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaCalendarCheck className="text-green-500 text-4xl" />{" "}
          {/* Appointment Icon */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Appointments
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {appointmentsCount}
            </p>
          </div>
        </div>

        {/* Patient Count Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaUser className="text-blue-500 text-4xl" /> {/* Patient Icon */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Patients</h3>
            <p className="text-3xl font-bold text-blue-500">{patientsCount}</p>
          </div>
        </div>
      </div>

      {/* Latest Booking Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          <NotepadText className="inline-block w-6 h-6 mr-2" />
          Latest Bookings
        </h3>
        {/* {latestBookings.map((booking, index) => (
          <div key={index} className="flex items-center space-x-4 mb-6">
            <FaClock className="text-gray-500 text-2xl" />{" "}
            <img
              src={booking.doctorImage}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-semibold">{booking.doctorName}</h4>
              <p className="text-gray-500">{booking.doctorSpecialty}</p>
              <p className="text-gray-600 mt-2">
                Patient: {booking.patientName}
              </p>
              <p className="text-gray-600">
                Appointment Date: {booking.appointmentDate}
              </p>
            </div>
          </div>
        ))} */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Doctor</TableHead>
              <TableHead className="text-left">Specialist</TableHead>
              <TableHead className="text-left">Patient</TableHead>
              <TableHead className="text-left">Schedule</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestBookings.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gray-50">
                <TableCell className="flex items-center">
                  <img
                    src={appointment.doctorImage}
                    alt={`${appointment.doctorName} profile`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  {appointment.doctorName}
                </TableCell>
                <TableCell>{appointment.doctorSpecialty}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 py-1 rounded-full ${
                      appointment.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : appointment.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : appointment.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : ""
                    }`}
                  >
                    {appointment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
