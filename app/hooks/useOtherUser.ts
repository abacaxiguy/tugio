import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

export default function useOtherUser(conversation: FullConversationType | { users: User[] }) {
    const session = useSession();
    const otherUser = useMemo(() => {
        if (!session) return undefined;

        const currentUserEmail = session?.data?.user?.email;

        return conversation.users.find((user: User) => user.email !== currentUserEmail);
    }, [session, conversation.users]);

    return otherUser;
}
