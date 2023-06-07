"use client";

import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

export default function Button({ children, type, fullWidth, onClick, secondary, danger, disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx("flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all", {
                "opacity-50 cursor-default": disabled,
                "w-full": fullWidth,
                "text-white": !secondary,
                "text-gray-900": secondary,
                "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600": danger,
                "bg-primary-500": !danger && !secondary,
                "hover:bg-primary-600 focus-visible:outline-primary-600": !danger && !secondary && !disabled,
            })}
        >
            {children}
        </button>
    );
}
