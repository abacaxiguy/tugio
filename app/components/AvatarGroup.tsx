"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
    users?: User[];
    size?: "s" | "l";
}

export default function AvatarGroup({ users = [], size = "s" }: AvatarGroupProps) {
    const slicedUsers = users.slice(0, 3);

    const positionMap = {
        0: size === "s" ? "top-0 left-[12px]" : "top-0 left-[27px]",
        1: "bottom-0",
        2: "bottom-0 right-0",
    };

    return (
        <div className={`relative ${size === "s" ? "h-11 w-11" : "h-[6.3rem] w-[6.3rem]"}`}>
            {slicedUsers.map((user, index) => {
                return (
                    <div
                        key={user.id}
                        className={`absolute inline-block rounded-full overflow-hidden ${size === "s" ? "h-[21px] w-[21px]" : "h-12 w-12"} ${positionMap[index as keyof typeof positionMap]}`}
                    >
                        <Image alt={`${user?.name}'s avatar`} fill src={user?.image || "/images/placeholder.jpg"} />
                    </div>
                );
            })}
        </div>
    );
}
