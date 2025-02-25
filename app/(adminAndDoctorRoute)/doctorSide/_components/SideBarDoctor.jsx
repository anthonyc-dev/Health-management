import { useAuth } from "@/context/AuthDoctor";
import { UserGroupIcon } from "@heroicons/react/outline";
import {
  BriefcaseMedical,
  LayoutDashboardIcon,
  LogOut,
  NotepadText,
  SquarePlus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarDoctor = () => {
  // const { logout } = useAuth();
  return (
    <div>
      <div className="flex h-screen flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <span className="flex h-10 w-32 justify-center items-center rounded-full bg-gray-100 text-xs text-green-500 border border-green-500">
            <BriefcaseMedical className="inline-block w-5 h-5 mr-2" />
            Doctor
          </span>

          <ul className="mt-6 space-y-1">
            <li>
              <Link
                href="/doctorSide"
                className="block rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700  px-4 py-2 text-sm font-medium "
              >
                <LayoutDashboardIcon className="inline-block w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/doctorSide/docAppointments"
                className="block rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700  px-4 py-2 text-sm font-medium "
              >
                <NotepadText className="inline-block w-5 h-5 mr-2" />
                Appointments
              </Link>
            </li>

            <li>
              <Link
                href="/doctorSide/profile"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <UserRound className="inline-block w-5 h-5 mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <form action="/">
                <button
                  type="submit"
                  // onClick={logout}
                  className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  <LogOut className="inline-block w-5 h-5 mr-2" />
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarDoctor;
