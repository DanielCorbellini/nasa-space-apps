import Sidebar from "./_components/Sidebar";
import Image from "next/image";
import bg from "@/bg.png";

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

      <h1 className="text-center text-6xl m-4 text-[#F5B465] font-bold">Vale do Taquari</h1>
      <div className="w-[25%] mx-auto py-4 bg-[#843505] border-2 rounded border-[#F5B465] text-[#F5B465] justify-center items-center shadow-md mt-4 rounded">
        <ul className="flex w-full justify-center items-center gap-8">
          <li>Mes</li>
          <li>Temp</li>
          <li>Chuva</li>
          <li>Umidade</li>
        </ul>
      </div>


      {/* Sidebar movida para cima com margem negativa */}
      <div className="-mt-36">
        <Sidebar />
      </div>
    </div>
  );
}


