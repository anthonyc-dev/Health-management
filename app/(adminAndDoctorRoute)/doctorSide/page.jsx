"use client";

import { Check, NotepadText, X } from "lucide-react";
import React, { useState } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUser,
  FaClock,
  FaMoneyCheck,
  FaMoneyCheckAlt,
} from "react-icons/fa"; // Importing Font Awesome icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import withAuth from "@/utils/withAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { MoonLoader } from "react-spinners";

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (email, status) => {
    setLoading(true); // Set loading state when the action is triggered
    try {
      const response = await axios.post("/api/sendEmail", { email, status });
      Swal.fire({
        title: "Success!",
        text: `${response.data.message}!`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to send email. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false); // Reset loading state after the action is completed
    }
  };

  // Dummy data for doctors and appointments
  const earningCount = 25;
  const appointmentsCount = 100;
  const patientsCount = 200;

  // Updated latestBookings data for three doctors
  const latestBookings = [
    {
      patientName: "Jane Smith",
      patientCondition: "Hypertension", // Example condition
      doctorName: "Dr. John Doe",
      appointmentDate: "2024-11-15",
      status: "Confirmed",
      patientImage: "https://randomuser.me/api/portraits/women/75.jpg", // Dummy profile image
    },
    {
      patientName: "Mike Johnson",
      patientCondition: "Migraine", // Example condition
      doctorName: "Dr. Sarah Lee",
      appointmentDate: "2024-11-16",
      status: "Cancelled",
      patientImage: "https://randomuser.me/api/portraits/men/76.jpg", // Dummy profile image
    },
    {
      patientName: "Emily Davis",
      patientCondition: "Asthma", // Example condition
      doctorName: "Dr. Emma White",
      appointmentDate: "2024-11-17",
      status: "Pending",
      patientImage: "https://randomuser.me/api/portraits/women/77.jpg", // Dummy profile image
    },
  ];

  const handleAccept = (email) => handleAction(email, "accepted");
  const handleCancel = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this action?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, go back",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAction(email, "cancelled");
        Swal.fire("Cancelled!", "The action has been cancelled.", "success");
      }
    });
  };

  return (
    <div className="p-3 bg-gray-100 min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Count Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaMoneyCheckAlt className="text-indigo-500 text-4xl" />{" "}
          {/* Doctor Icon */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Earnings</h3>
            <p className="text-3xl font-bold text-indigo-500">{earningCount}</p>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Patient</TableHead>
              <TableHead className="text-left">Doctor</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestBookings.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gray-50">
                <TableCell className="flex items-center">
                  <img
                    src={appointment.patientImage}
                    alt={`${appointment.patientName} profile`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  {appointment.patientName}
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
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
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() =>
                            handleCancel("takasukunami76@gmail.com")
                          }
                          disabled={loading} // Disable while loading
                        >
                          {loading ? (
                            <MoonLoader size={24} color="black" />
                          ) : (
                            <X className="text-red-500 font-bold" />
                          )}
                        </Button>

                        <Button
                          aria-label="Accept"
                          variant="outline"
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() =>
                            handleAccept("takasukunami76@gmail.com")
                          }
                          disabled={loading} // Disable while loading
                        >
                          {loading ? (
                            <MoonLoader size={24} color="black" />
                          ) : (
                            <Check className="text-green-500 font-bold" />
                          )}
                        </Button>
                      </div>
                    )}
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

export default DoctorDashboard;
