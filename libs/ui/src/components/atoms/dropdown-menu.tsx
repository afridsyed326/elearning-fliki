"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownProps {
    label: string | React.ReactNode;
    items: { label: string; onClick: () => void }[];
}

export function Dropdown({ label, items }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={ref}>
            {/* <button
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
                {label}
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M19 9l-7 7-7-7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button> */}

            <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
                {label}
            </div>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick();
                                    setOpen(false);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
