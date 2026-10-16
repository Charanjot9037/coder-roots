import dbConnect from "../../../lib/db/route";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import codeUser from "../../../models/codeUser";


import { NextResponse } from "next/server";

export async function POST(req) {
  try {
await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        { status: 400 },
      );
    }

 
   const user = await codeUser.findOne({
     email: email.toLowerCase(),
  
   });


    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }


    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

function createAccessToken(user){

return jwt.sign(
{
 id:user._id,
 email:user.email
},
"44fc00d4ee0de9e90e0c53b15f0456b8c01934bd078000094cca65baa07c8af66ec5c4992c38d602d57e68969b812abb645790ca35f075cf2720be14d7d200b2",
{
 expiresIn:"15m"
}
);

}
 const createRefreshToken=(user)=>{

return jwt.sign(
{
 id:user._id
},"d11fff720be18c430ca0830ea51f290b8d25e264b9249316418ecfdcf8e7bb18d2b05cc291b470c9fb85267dda3445ea5fe34a5aaf28917d877de526682093e6",
{
 expiresIn:"7d"
}
);

}

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();



    const response = NextResponse.json(
      {
        message: "Login successful",

        user: {
          id: user._id,
     
        },
      },
      {
        status: 200,
      },
    );


    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15,
      path: "/",
    });


    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}






