// layout.tsx

import Header from "./_components/Header";
import SidebarDoctor from "./_components/SideBarDoctor";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* <DoctorLogin> */}
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <SidebarDoctor />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</div>
        {/* </DoctorLogin> */}
      </div>
    </>
  );
}
