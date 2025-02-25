import React, { useEffect, useRef, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

const BookAppointment = ({
  doctorImg,
  doctorName,
  doctorCategory,
  doctorPhone,
}) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [select, setSelect] = useState();
  const [note, setNote] = useState();
  const dialogRef = useRef(null);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = async () => {
    // After saving the booking, close the dialog
    if (dialogRef.current) {
      dialogRef.current.close(); // Close the dialog
    }

    // Validate the time slot selection
    if (!select) {
      toast.error("Please select a time slot.");
      return;
    }

    // Validate the date
    if (!date) {
      toast.error("Please select a valid date.");
      return;
    }

    // Validate the note (optional, depending on whether you want to make it mandatory)
    // if (!note || note.trim() === "") {
    //   toast.error("Please add a note for the appointment.");
    //   return;
    // }

    try {
      // Add a new document with the booking data to the "appointment" collection
      await addDoc(collection(db, "appointment"), {
        uid: user.id,
        username: user.given_name + " " + user.family_name,
        email: user.email,
        time: select,
        date: date,
        doctorImage: doctorImg,
        doctorN: doctorName,
        doctorC: doctorCategory,
        doctorP: doctorPhone,
        note: note,
      });
      console.log("Booking saved successfully!");
      toast.success("Booking successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };
  return (
    <Dialog ref={dialogRef}>
      <DialogTrigger>
        <Button className="mt-3 rounded-full bg-green-500 hover:bg-green-600">
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                {/** Calendar */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-green-500 h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    disabled={isPastDay}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                {/** Time slot */}
                <div>
                  <h2 className="flex gap-3 items-center mb-5">
                    <Clock className="text-green-500 h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 rounded-lg">
                    {timeSlot?.map((item, index) => (
                      <h2
                        key={index}
                        onClick={() => setSelect(item.time)}
                        className={`p-2 border cursor-pointer text-center hover:text-slate-50 hover:bg-green-500 rounded-full ${
                          item.time === select &&
                          "bg-green-500 hover:text-slate-50"
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                placeholder="Note"
                className="mt-3 w-full"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-green-500"
            disabled={!(date && select)}
            onClick={saveBooking}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
