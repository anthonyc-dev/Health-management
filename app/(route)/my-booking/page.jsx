"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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

const MyBooking = () => {
  const [bookingList, setBookingList] = useState([]);
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

      // Map over the documents and include the 'doctor' object in the result
      const appointments = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data, // Spread the main document fields
        };
      });

      console.log("Retrieved appointments with doctor:", appointments);
      setBookingList(appointments);
    } catch (error) {
      console.error("Error retrieving appointments:", error);
    }
  };

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl mb-5">My Booking</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Image</TableHead>
            <TableHead>Doctor's Name</TableHead>
            <TableHead>Categorie's</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingList.length > 0 ? (
            bookingList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={item.doctorImage || "/path/to/default-image.jpg"} // Use a fallback image if doctor image is missing
                    alt="Doctor Profile Image"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{item.doctorN || "Unknown Doctor"}</TableCell>
                <TableCell>{item.doctorC || "Unknown"}</TableCell>
                <TableCell>{item.doctorP || "Unknown"}</TableCell>
                <TableCell>{item.time || "N/A"}</TableCell>
                <TableCell>
                  {item.date
                    ? new Date(item.date.seconds * 1000).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button className="bg-red-500 rounded-full hover:bg-red-400">
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No bookings available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBooking;
