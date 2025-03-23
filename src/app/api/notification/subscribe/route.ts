import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { CreatePushSubscription, GetSession } from "@/actions/users";
import { error } from "console";
export const POST = async(req:NextRequest)=>{
    const body = await req.json();
    const token= req.headers.get("Authorization")!.split('Bearer')[1].trim()
    if(token){
        try{

            const decoded_token = jwt.verify(token,process.env.VAPID_PRIVATE_KEY!) as jwt.JwtPayload
            console.log(decoded_token)
            const session = await GetSession(decoded_token.session_id, decoded_token.userId)
            console.log(session)
            if(!session){
                return NextResponse.json({
                    success: false,
                    error: 'expired session'
                },{
                    status: 400
                });
            }
            else{
                const subscription = await CreatePushSubscription(session.userId, session.ip, session.deviceInfo, body.sub);
                console.log(subscription)
                return NextResponse.json({
                    success: true,
                    subscription: subscription.id
                });
            }
        }
        catch(error){
            return NextResponse.json({
                success: false,
                error: 'invalid token'
            },{
                status: 400
            });
        }
    }
    return NextResponse.json({
        success: false,
        error: 'no token'
    },{
        status: 400
    });
}