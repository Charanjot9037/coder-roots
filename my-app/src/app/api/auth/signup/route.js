import { NextResponse } from "next/server";
import codeUser from "../../../models/codeUser";
import dbConnect from "../../../lib/db/route";
import bcrypt from "bcrypt";

export async function POST(req) {
    try{
await dbConnect();
const {data}=await req.json();

console.log("running");




  if (!data.email || !data.password|| !data.mobile || !data.name) {
      return NextResponse.json(
        {
          message: "Email,name,mobile and password are required",
        },
        { status: 400 },
      );
    }

    const existingUser=await codeUser.findOne({email:data.email});
    if (existingUser){
         console.log("esisting",existingUser);
        return NextResponse.json({success:"false",status:400,message:"user already exists"});
    }
    console.log("esisting",existingUser);
        const hashedPassword = await bcrypt.hash(data?.password, 10);
const user=codeUser.create({
    name:data.name,
    mobile:data.mobile,
    password:hashedPassword,
    email:data.email,

})


return NextResponse.json({message:"succes fully created"},{success:"true"},{status:200})
    }
    catch(error){
console.log(error);
return NextResponse.json({message:"not created"},{success:"false"},{status:500})
    }
}