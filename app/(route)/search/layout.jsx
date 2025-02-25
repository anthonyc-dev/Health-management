import React from "react";
import CategoryList from "./_components/CategoryList";
import Header from "@/app/_components/Header";

const layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-4">
        <div className="hidden md:block">
          {/* Category List */}
          <CategoryList />
        </div>

        <div className="col-span-4 md:col-span-3  h-screen">{children}</div>
      </div>
    </>
  );
};

export default layout;
