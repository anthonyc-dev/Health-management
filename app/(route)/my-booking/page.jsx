"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/app/_components/Header";

const MyBooking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      retrieveAppointments();
    }
  }, [user]);

  const retrieveAppointments = async () => {
    try {
      const appointmentCollectionRef = collection(db, "appointment");
      const q = query(appointmentCollectionRef, where("uid", "==", user.id));

      const querySnapshot = await getDocs(q);

      const appointments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookingList(appointments);
    } catch (error) {
      console.error("Error retrieving appointments:", error);
    }
  };

  //cancel
  const handleCancel = async (id) => {
    try {
      await deleteDoc(doc(db, "appointment", id));
      setBookingList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  //reschedule
  const handleReschedule = async (id) => {
    try {
      const appointmentDocRef = doc(db, "appointment", id);
      await updateDoc(appointmentDocRef, { date: newDate, time: newTime });
      setBookingList((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                date: { seconds: new Date(newDate).getTime() / 1000 },
                time: newTime,
              }
            : item
        )
      );
      setRescheduleId(null); // Close modal
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 sm:px-10 mt-10">
        <h2 className="font-bold text-2xl mb-5">My Booking</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingList.length > 0 ? (
              bookingList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-5">
                      <Image
                        src={item.doctorImage || "/default-image.jpg"}
                        alt="Doctor Profile"
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                      {item.doctorN || "Unknown Doctor"}
                    </div>
                  </TableCell>
                  <TableCell>{item.doctorC || "Unknown"}</TableCell>
                  <TableCell>{item.doctorP || "Unknown"}</TableCell>
                  <TableCell>{item.time || "N/A"}</TableCell>
                  <TableCell>
                    {item.date
                      ? new Date(item.date.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setRescheduleId(item.id)}
                      className="bg-green-500 rounded-full hover:bg-green-400"
                    >
                      Reschedule
                    </Button>
                    <Button
                      onClick={() => handleCancel(item.id)}
                      className="bg-red-500 rounded-full hover:bg-red-400 ml-3"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No bookings available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Reschedule Modal */}
        {rescheduleId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Reschedule Appointment</h3>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => handleReschedule(rescheduleId)}
                  className="bg-blue-500 hover:bg-blue-400 text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setRescheduleId(null)}
                  className="bg-gray-500 hover:bg-gray-400 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
