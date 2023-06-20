"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import { useState } from "react";

interface ImageModalProps {
    src?: string | null;
    isOpen?: boolean;
    onClose: () => void;
}

export default function ImageModal({ src, isOpen, onClose }: ImageModalProps) {
    const [zoom, setZoom] = useState(false);

    if (!src) return null;

    const handleZoom = () => {
        setZoom((prev) => !prev);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-fit">
                <Image onClick={handleZoom} className={`object-cover transition ${zoom ? "cursor-zoom-out scale-125" : "cursor-zoom-in"}`} src={src} width={700} height={700} alt="Image" />
            </div>
        </Modal>
    );
}
