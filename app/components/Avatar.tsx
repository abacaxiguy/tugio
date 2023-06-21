"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User;
    size?: "s" | "l";
}

export default function Avatar({ user, size = "s" }: AvatarProps) {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <div className="relative">
            <div className={`relative inline-block rounded-full overflow-hidden ${size === "s" ? "h-9 w-9 md:h-11 md:w-11" : "h-32 w-32 md:h-36 md:w-36"}`}>
                <Image alt={`${user?.name}'s avatar`} src={user?.image || "/images/placeholder.svg"} fill />
            </div>
            {isActive && (
                <span className={`absolute block rounded-full bg-green-500 top-0 right-0 ring-white ${size === "s" ? "ring-2 h-2 w-2 md:h-3 md:w-3" : "ring-4 h-6 w-6 md:h-8 md:w-8 top-1 right-1"}`} />
            )}
        </div>
    );
}
