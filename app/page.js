"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import Doctor from "./_components/Doctor";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { user } = useKindeBrowserClient();
  return (
    <div>
      <Header />
      {/*Hero section */}
      <Hero />
      {/*SErach category*/}
      <CategorySearch />
      {/*Doctor category*/}
      <Doctor />
      {user ? "" : <Footer />}
    </div>
  );
}
