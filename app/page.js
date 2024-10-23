import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import Doctor from "./_components/Doctor";

export default function Home() {
  return (
    <div>
      {/*Hero section */}
      <Hero />
      {/*SErach category*/}
      <CategorySearch />
      {/*Doctor category*/}
      <Doctor />
    </div>
  );
}
