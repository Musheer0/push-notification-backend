"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { SendNotificationAction } from "@/actions/notification";

const SendNotification = ({ sub,id }: { sub: string,id:string }) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSendNotification =async () => {
        if (!title.trim() || !message.trim()) {
            alert("Title and message are required.");
            return;
        }
     toast.success('sent!')
   await SendNotificationAction(sub,title,message, id,'youtube.com')
        // Clear input fields after sending
        setTitle("");
        setMessage("");
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Send Notification</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Send Notification</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the notification title and message.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSendNotification}>
                        Send
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SendNotification;
