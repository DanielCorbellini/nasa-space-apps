import Sidebar from './_components/Sidebar';
import Image from 'next/image';
import bg from '@/bg.png'

export default function Home() {
  return (
    <div>
      <Image src={bg} alt="Logo" fill quality={100} className='z-[-10]'/>
      <Sidebar />
    </div>
  );
}
