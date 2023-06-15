"use client";

import getDynamicTime from "@/app/actions/getDynamicTime";
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface MessageBoxProps {
    isLast?: boolean;
    data: FullMessageType;
}

export default function MessageBox({ isLast, data }: MessageBoxProps) {
    const session = useSession();
    const isOwn = session?.data?.user?.email === data.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== session?.data?.user?.email)
        .map((user) => user.name)
        .join(", ");

    const container = `flex gap-3 p-4 ${isOwn ? "justify-end" : ""}`;
    const avatar = `${isOwn ? "order-2" : ""}`;
    const body = `flex flex-col gap-2 ${isOwn ? "items-end" : ""}`;
    const message = `text-sm w-fit overflow-hidden ${isOwn ? "bg-primary-500 text-white" : "bg-gray-100"} ${data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"}`;
    const time = `text-xs ${isOwn ? "-order-1" : ""}`;
    const separator = `text-sm font-medium ${!isOwn ? "-order-1" : ""}`;

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1 relative text-gray-700">
                    <div className="font-medium">·</div>
                    <div className={separator}>{data.sender?.name}</div>
                    <div className={time} title={getDynamicTime(data.createdAt, "dd/MM/yyyy HH:mm")}>
                        {getDynamicTime(data.createdAt)}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image alt={`image sent by ${data.sender?.name}`} src={data.image} width={288} height={288} className="object-cover cursor-pointer hover:scale-110 transition translate" />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>}
            </div>
        </div>
    );
}
