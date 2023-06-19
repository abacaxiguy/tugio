"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Modal from "../Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface SettingsModalProps {
    currentUser: User;
    isOpen?: boolean;
    onClose: () => void;
}

export default function SettingsModal({ currentUser, isOpen, onClose }: SettingsModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="text-sm leading-6 text-gray-600">Edit your public information</p>

                        <div className="my-5 flex items-center flex-col">
                            <div className="mt-2 flex items-center relative">
                                <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="okgkpwso">
                                    <Image width="200" height="200" className="rounded-full aspect-square" src={image || currentUser?.image || "/images/placeholder.svg"} alt="Avatar" />
                                    <div className="rounded-full bg-gray-300/20 opacity-0 hover:opacity-80 duration-300 ease-in-out z-10 w-full h-full absolute top-0 left-0 flex items-center justify-center">
                                        <HiOutlinePencilSquare size={50} className="text-white" />
                                    </div>
                                </CldUploadButton>
                            </div>
                        </div>
                        <Input disabled={isLoading} label="Name" id="name" errors={errors} required register={register} />
                    </div>
                    <div className="mt-2">
                        <Button fullWidth disabled={isLoading} type="submit">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
