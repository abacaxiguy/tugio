"use client";

import getDynamicTime from "@/app/actions/getDynamicTime";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConfirmModal from "@/app/components/ConfirmModal";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[];
    };
}

export default function ProfileDrawer({ data, isOpen, onClose }: ProfileDrawerProps) {
    const otherUser = useOtherUser(data);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const joinedDate = useMemo(() => {
        return getDynamicTime(data.createdAt, "PP");
    }, [data.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser?.name;
    }, [data.name, otherUser?.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }

        return "Online";
    }, [data]);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex md:max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-end">
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        onClick={onClose}
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <IoClose size={24} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2">{data.isGroup ? <AvatarGroup users={data.users} size="l" /> : <Avatar size="l" user={otherUser} />}</div>
                                                <div>{title}</div>
                                                <div className="text-sm text-gray-500">{statusText}</div>
                                                <div className="flex gap-10 my-8">
                                                    <div
                                                        className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75
                                                    transition-opacity"
                                                        onClick={() => setConfirmOpen(true)}
                                                    >
                                                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                                            <IoTrash size={20} />
                                                        </div>
                                                        <div className="text-sm font-light text-neutral-600">Delete</div>
                                                    </div>
                                                </div>
                                                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                    <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                        {data.isGroup && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Users</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                    {data.users.map((user) => (
                                                                        <div key={user.id} className="flex items-start gap-3 mt-4">
                                                                            <Avatar user={user} />
                                                                            <div className="flex flex-col justify-start">
                                                                                <span className="font-semibold">{user.name}</span>
                                                                                <span>{user.email}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Email</dt>
                                                                <dd className="mt-1 text-sm  text-gray-900 sm:col-span-2">{otherUser?.email}</dd>
                                                            </div>
                                                        )}
                                                        <hr />
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">{data.isGroup ? "Created on" : "Joined"}</dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                <time dateTime={joinedDate}>{joinedDate}</time>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
