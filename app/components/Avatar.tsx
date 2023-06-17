"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
    className?: string;
}

export default function Avatar({ user, className }: AvatarProps) {
    if (!className) className = "h-9 w-9 md:h-11 md:w-11";

    return (
        <div className="relative">
            <div className={`relative inline-block rounded-full overflow-hidden ${className}`}>
                <Image alt={`${user?.name}'s avatar`} src={user?.image || "/images/placeholder.svg"} fill />
            </div>
            <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
        </div>
    );
}
