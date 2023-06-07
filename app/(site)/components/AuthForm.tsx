"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === "REGISTER") {
            // Register
        }
        if (variant === "LOGIN") {
            // Login
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);
        // Social login
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-700">{variant === "LOGIN" ? "Sign in to your account" : "Create your Tugio account"}</h2>
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />}
                    <Input id="email" type="email" label="Email address" register={register} errors={errors} disabled={isLoading} />
                    <Input id="password" type="password" label="Password" register={register} errors={errors} disabled={isLoading} />
                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant === "LOGIN" ? "Sign in" : "Register"}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <span>{variant === "LOGIN" ? "New to Tugio?" : "Already have an account?"}</span>
                        <div className="underline cursor-pointer" onClick={toggleVariant}>
                            {variant === "LOGIN" ? "Create an account" : "Sign in"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
