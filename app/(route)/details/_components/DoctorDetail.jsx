import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const DoctorDetail = ({ doctor }) => {
  return (
    <div>
      {doctor.map((item, index) => (
        <div>
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg"
          >
            {/**Doctor image */}
            <div>
              <Image
                key={index} // Add a unique key for each item
                src={item.image} // Use item instead of doctor inside map
                width={200}
                height={200}
                alt="doctor-image"
                className="rounded-lg w-full h-[280px] object-cover"
              />
            </div>
            {/**Doctor info */}
            <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline">
              <h2 className="font-bold text-2xl">{item.name}</h2>
              <h2 className="flex gap-2 text-gray-500 text-md">
                <GraduationCap />
                <span>{item.experience}</span>
              </h2>
              <h2 className="text-md flex gap-2 text-gray-500">
                <MapPin />
                <span>{item.address}</span>
              </h2>
              <h2 className="text-[10px] bg-green-100 p-1 rounded-full px-2 text-green-500">
                {item.categoryName}
              </h2>
              <BookAppointment
                doctorImg={item.image}
                doctorName={item.name}
                doctorCategory={item.categoryName}
                doctorPhone={item.phone}
              />
            </div>
          </div>
          {/**About doctor */}
          <div className="p-3 border-[1px] eounded-lg mt-5">
            <h2 className="font-bold text-[20px]">About me</h2>
            <p className="text-gray-500 tracking-wider mt-2">{item.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorDetail;
