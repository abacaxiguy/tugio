"use client";

import Link from "next/link";

interface DeskttopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
    color?: string;
}

export default function DesktopItem({ label, icon: Icon, href, onClick, active, color }: DeskttopItemProps) {
    const handleClick = () => {
        if (onClick) return onClick();
    };

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold hover:bg-gray-100 
                ${active && "bg-gray-100 text-gray-800"} 
                ${color || "text-gray-500 hover:text-gray-800"}
                `}
            >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}
