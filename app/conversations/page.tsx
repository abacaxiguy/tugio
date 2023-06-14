"use client";

import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

export default function Home() {
    const { isOpen } = useConversation();

    return (
        <div className={`lg:pl-80 h-full lg:block ${isOpen ? "block" : "hidden"}`}>
            <EmptyState />
        </div>
    );
}
