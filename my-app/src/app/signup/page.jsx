"use client";
import { useRouter } from "next/navigation";
import {   useState } from "react"
const Page=()=>{
    const [name,setName]=useState("");
    const [email,setemail]=useState("");
    const [password,setPassword]=useState("");
    const [mobile,setMobile]=useState("");
    const router=useRouter();
    const handleSubmit= async()=>{
        alert(`gooing to signup  ${email}`,email);
        try{
const response=  await fetch("/api/auth/signup",{  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data:{
                email:email,
                password:password,
                name:name,
                mobile:mobile,
                
            }
          }),
    })
    const data = await response.json()
    console.log(data);
 if(data?.success==true){
    router.push("/login")
 }else{
    alert(data?.message);
 }
        }catch(error){
            console.log("error",error);
            alert(error);
        }
  
    }
    return(
        <div className="flex justify-center items-center bg-red-700 h-screen">
            
            <div className="bg-white p-5">
<p>     Sign here</p>
<div className="flex flex-col gap-5">
      <input placeholder="enter name" className="border p-1" value={name} onChange={(e)=>{setName(e.target.value)}}/>
    <input placeholder="enter email" className="border p-1" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input placeholder="enter password" className="border p-1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

  <input placeholder="ente mobile no" className="border p-1" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
<button onClick={()=>{handleSubmit()}} className="bg-blue-500">create account</button>
</div>


            </div> 
            </div>
    )
}
export default Page