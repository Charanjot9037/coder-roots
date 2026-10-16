"use client";
import { useRouter } from "next/navigation";
import  BookingForm from "../app/components/movie"
export default function Home() {
  const router=useRouter();
  return (
<div>
  <div className="bg-red-500 p-4">
    <div className="flex gap-2 ">
   <button className="bg-white p-4"  onClick={()=>{router.push("/login")}}>login</button>
    <button className="bg-white p-4"onClick={()=>{router.push("/signup")}}>signup</button>
    </div>

  </div>
   <p className="flex justify-center  text-7xl">book the tickets after login</p>
   <div className="flex justify-center p-5 rounded-4xl"><BookingForm /></div>
</div>
  );
}


