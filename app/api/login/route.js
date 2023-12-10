import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function POST (request) {
    try {
        const req = await request.json();
        // const token = await jwt.sign(req, process.env.SECRET_KEY,{expiresIn:"1d"});
        const api_token = req.api_token;
        console.log(api_token);
        const response = NextResponse.json({message: 'Login successfully'}, {success: true});
        response.cookies.set('token',api_token,{httpOnly:true});
        return response;
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}