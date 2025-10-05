import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import bg from "@/bg.png";
import Rightbar from "@/app/_components/Rightbar";
import Topbar from "./_components/Topbar";

export default function Home() {
  return (
    <div className="relative h-auto min-h-screen">
      <Image
        src={bg}
        alt="Background"
        fill
        quality={100}
        className="z-[-10] blur-xs m-[-24px]"
      />

      <h1 className="text-center text-6xl m-4 text-[#F5B465] font-bold">
        Vale do Taquari
      </h1>

      <Topbar />

      {/* Sidebar movida para cima com margem negativa */}
      <div className="-mt-36">
        <Sidebar />
      </div>

      <Rightbar />
    </div>
  );
}
