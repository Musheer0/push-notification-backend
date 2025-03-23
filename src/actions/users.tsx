"use server"

import prisma from "@/prisma"
import jwt from "jsonwebtoken";
export const FindUserByEmail = async(email:string)=>{
    const user = await prisma.user.findFirst({
        where:{
            email
        }
    });
    return user
}
export const FindUserById = async(id:string)=>{
    const user = await prisma.user.findFirst({
        where:{
            id
        }
    });
    return user
}
export const CreateUser =async({email, password,username}:{email:string, password:string, username:string})=>{
    if(!email || !password|| !username) return {user:null}
    try {
        const user = await prisma.user.create({
            data:{
                email, password,username
            }
        });
        return {user:user}
    } catch (error) {
        return {user:null}
    }
}
export const CreateUserSession = async(userId:string, ip:string, location:string, deviceInfo:string)=>{
  const user = await FindUserById(userId);
  const secrect_key = process.env.VAPID_PRIVATE_KEY!
  if(user){
    const session = await prisma.session.create({
        data:{
              ip,
              location,
              deviceInfo: deviceInfo,
              userId: user.id,
              expiresAt: new Date(new Date().setDate(new Date().getDate() + 60))
                      }
    })
const payload = {
    userId:user.id,
    session_id: session.id
}
const token = jwt.sign(payload, secrect_key,{expiresIn: '60d'});
return {session: token}
  }else{
    return {session: null}
  }
}

export const GetSession = async(id:string, userId:string)=>{
    const session = await prisma.session.findFirst({
        where:{
            id,
            userId,
            expiresAt: {
                gt: new Date()
            }
        }
    });
   return session
}
export const CreatePushSubscription = async(userId:string, ip:string,  deviceInfo:string,sub:string)=>{
  const subscription = await prisma.pushNotification.create({
    data:{
        userId,
        ip,
        deviceInfo,
        subscription:sub
    }
  });
  return subscription
}