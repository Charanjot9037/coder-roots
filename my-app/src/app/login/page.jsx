"use client";
import { useRouter } from "next/navigation";
import {  useState } from "react"
const Page=()=>{
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();
    const handleSubmit= async()=>{
        alert(`gooing to login ${email}`,email);
        try{
const response=  await fetch("/api/auth/login",{  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         
                email:email,
                password:password
            
          }),
    })
    const data= await response.json()
    console.log(data);
    if(data?.user){
        alert("SUCCES FULLY LOGIN")
router.push("/");
    }
        }catch(error){
            console.log("error",error);
        }
  
    }
    return(
        <div className="flex justify-center items-center bg-amber-700 h-screen">
            
            <div className="bg-white p-5">
<p >     login here</p>
<div className="flex flex-col gap-5">
    <input placeholder="enter email" className="border p-1" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input placeholder="enter password" className="border p-1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
<button onClick={()=>{handleSubmit()}} className="bg-red-600">login</button>
</div>


            </div>
      
            
            
            
            </div>
    )
}
export default Page