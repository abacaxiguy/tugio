"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MesaageInputProps {
    id: string;
    type?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
    placeholder?: string;
}

export default function MessageInput({ id, type, register, errors, required, placeholder }: MesaageInputProps) {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type || "text"}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            />
        </div>
    );
}
