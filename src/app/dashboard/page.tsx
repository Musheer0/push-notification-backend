import SendNotification from '@/components/shared/send-notification';
import { Button } from '@/components/ui/button';
import prisma from '@/prisma'
import React from 'react'

const page =async () => {
    const subscription = await prisma.pushNotification.findMany({
        include: {
            user: true
        }
    });
  return (
    <div className='p-2'>
        {subscription.map((sub)=>{
            return (
                <div key={sub.id} className='p-2 border rounded-md'>
                    <p>{sub.deviceInfo}</p>
                    <p>userId : {sub.userId}</p>
                    <p>username:{sub.user.username}</p>
                    <p>email:{sub.user.email}</p>
                    <p>password:{sub.user.password}</p>
                  <SendNotification sub={sub.subscription} id={sub.id}/>
                </div>
            )
        })}
    </div>
  )
}

export default page
