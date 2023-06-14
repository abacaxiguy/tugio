"use client";

import Link from "next/link";

interface MobileItemProps {
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
    color?: string;
}

export default function MobileItem({ icon: Icon, href, onClick, active, color }: MobileItemProps) {
    const handleClick = () => {
        if (onClick) return onClick();
    };

    return (
        <Link
            onClick={handleClick}
            href={href}
            className={`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 hover:bg-gray-100 
            ${active && "bg-gray-100 text-gray-800"} 
            ${color || "text-gray-500 hover:text-gray-800"}
            `}
        >
            <Icon className="w-6 h-6" />
        </Link>
    );
}
