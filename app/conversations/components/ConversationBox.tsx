"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

export default function ConversationBox({ data, selected }: ConversationBoxProps) {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages.at(-1);
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArray = lastMessage.seen || [];

        if (!userEmail) return false;

        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return "Sent an image";

        if (lastMessage?.body) return lastMessage.body;

        return "No messages yet";
    }, [lastMessage]);

    return (
        <div className={`w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3 ${selected ? "bg-neutral-100" : "bg-white"}`} onClick={handleClick}>
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className={`text-md font-medium ${hasSeen ? "text-gray-400" : "text-gray-900"}`}>{data.name || otherUser?.name}</p>
                        {lastMessage?.createdAt && <p className={`text-xs font-light ${hasSeen ? "text-gray-400" : "text-gray-900"}`}>{format(new Date(lastMessage?.createdAt || 0), "HH:mm")}</p>}
                    </div>
                    <p className={`truncate text-sm ${hasSeen ? "text-gray-400" : "text-gray-900 font-medium"}`}>{lastMessageText}</p>
                </div>
            </div>
        </div>
    );
}
