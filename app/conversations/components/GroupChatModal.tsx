"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
}

export default function GroupChatModal({ isOpen, onClose, users }: GroupChatModalProps) {
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
            name: "",
            members: [],
        },
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/conversations", {
                ...data,
                isGroup: true,
            })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => {
                toast.error("Something went wrong. Please try again.");
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:pt-0 pt-4">
                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Create a group chat</h2>
                        <p className="text-sm leading-6 text-gray-600">Create a chat with more than 2 people.</p>
                        <div className="mt-4 flex flex-col gap-y-8">
                            <Input register={register} label="Name" id="name" disabled={isLoading} required errors={errors} />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange={(value) =>
                                    setValue("members", value, {
                                        shouldValidate: true,
                                    })
                                }
                                value={members}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Button fullWidth disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
