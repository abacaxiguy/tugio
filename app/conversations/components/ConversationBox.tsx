"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import getDynamicTime from "@/app/actions/getDynamicTime";
import AvatarGroup from "@/app/components/AvatarGroup";

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

    const lastMessageDate = useMemo(() => {
        if (!lastMessage?.createdAt) return null;
        return getDynamicTime(lastMessage.createdAt);
    }, [lastMessage?.createdAt]);

    return (
        <div
            className={`w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer mt-1 p-3 ${selected ? "bg-neutral-100" : "bg-white"}`}
            onClick={handleClick}
        >
            {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className={`text-md text-gray-900 ${!hasSeen ? "font-medium" : ""}`}>{data.name || otherUser?.name}</p>
                        {lastMessage?.createdAt && <p className={`text-xs font-light ${hasSeen ? "text-gray-400" : "text-gray-900 font-semibold"}`}>{lastMessageDate}</p>}
                    </div>
                    <p className={`truncate text-sm ${hasSeen ? "text-gray-400" : "text-gray-900 font-medium"}`}>{lastMessageText}</p>
                </div>
            </div>
        </div>
    );
}
