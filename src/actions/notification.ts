"use server"
import webpush from 'web-push'
webpush.setVapidDetails(
    'mailto:musheeran165@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  )
   //prkey url
export const SendNotificationAction = async(sub:string, title:string, body:string, prkey:string, url:string)=>{
 const subscription = JSON.parse(sub) as PushSubscription;
try {
    await webpush.sendNotification(
        subscription as any,
        JSON.stringify({
         title,
         body,
         icon: '/icon92.png',
         prkey,
         url

        })
    );
    console.log('sent')
    return {success:true}
} catch (error) {
    
}
}