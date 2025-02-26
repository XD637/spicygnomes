import Image from "next/image";
import dynamic from "next/dynamic";

const Mint = dynamic(() => import("../components/Mint"));


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 space-y-12">
      <Image 
        src="/images/spicyy.webp" 
        alt="Logo" 
        width={400} 
        height={400} 
        priority 
        className="w-[80vw] max-w-[500px] h-auto filter-none" 
      />
      <Image 
        src="/images/mint-nft.jpg" 
        alt="Mint NFT" 
        width={200} 
        height={200} 
        className="w-[40vw] max-w-[250px] h-auto filter-none rounded-xl shadow-lg border-2 border-gray-300" 
      />
      
      {/* Mint Component */}
      <Mint />
    </div>
  );
}
