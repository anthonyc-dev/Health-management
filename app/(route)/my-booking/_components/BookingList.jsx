import Image from "next/image";
import React from "react";

const BookingList = ({ bookingList }) => {
  return (
    <div>
      {bookingList &&
        bookingList.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 my-4">
            <Image
              src={item.data.image} // Ensure this field matches your Firestore data
              className="rounded-full h-[70px] w-[70px] object-cover"
              width={70}
              height={70}
              alt="doctor-image"
            />
            <div>
              <p className="font-bold">{item.data.doctorName}</p>
              <p>{item.data.date}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingList;
