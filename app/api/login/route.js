import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST (request) {
    try {
        const req = await request.json();
        const token = await jwt.sign(req, process.env.SECRET_KEY,{expiresIn:"1d"});
        const response = NextResponse.json({message: 'Login successfully'}, {success: true});
        response.cookies.set('token',token,{httpOnly:true});
        return response;
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}