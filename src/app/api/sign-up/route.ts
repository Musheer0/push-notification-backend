import { CreateUser, CreateUserSession, FindUserByEmail } from "@/actions/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    const body =await req.json();
    const response = NextResponse.json({
        success: true
    })
    const sec_fetch_site = req.headers.get('Sec-Fetch-Site');
const user_agent = req.headers.get('user-agent');
const location = 'development';
const ip = req.headers.get('x-forwaded-for')||'127.0.0.1'
    if(!sec_fetch_site?.toLowerCase().includes('none')){
     const userExists = await FindUserByEmail(body.email);
     if(userExists){
        return NextResponse.json({
           error: 'user already exists'
        },{
            status: 400
        })
     }
     else{
        const {user} = await CreateUser(body);
        if(user){
         const session = await CreateUserSession(user.id, ip, location, user_agent!);
         console.log(session)
         response.cookies.set('token',session.session!,{
            sameSite:'none',
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 5184000
         })
            return response
        }
        else{

            return NextResponse.json({
               error: 'error creating user'
            }, {status: 400})
        }
     }
    }
    else{
        return NextResponse.json({
            error: 'not allowed'
        },{status: 500})
    }

}
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3001'); // Update with frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    res.status(200).json({ message: 'CORS enabled' });
  }
  