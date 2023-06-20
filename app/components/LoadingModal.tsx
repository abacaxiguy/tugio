"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function LoadingModal() {
    return (
        <Transition.Root show as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => {}}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opactiy-0">
                    <div className="fixed inset-0 bg-gray-50 bg-opacity-50 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel>
                            <svg className="rotate-Y-180" width="100" height="114" viewBox="0 0 100 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className="animate-[preloader_.7s_infinite_alternate]" width="27" height="114" fill="#0080FF" />
                                <rect className="animate-[preloader_.7s_infinite_.1s_alternate]" x="37" width="26" height="114" fill="#0080FF" fill-opacity="0.65" />
                                <rect className="animate-[preloader_.7s_infinite_.3s_alternate]" x="73" width="27" height="114" fill="#0080FF" fill-opacity="0.35" />
                            </svg>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
