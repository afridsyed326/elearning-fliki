"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
    labelText?: React.ReactNode;
    error?: React.ReactNode;
}

function Label({ className, labelText, children, error, ...props }: LabelProps) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(
                "flex select-none flex-col text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
                className
            )}
            {...props}
        >
            {labelText && <div className="mb-2">{labelText}</div>}
            {children}
            {error && <div className="mt-2 font-normal text-red-500">{error}</div>}
        </LabelPrimitive.Root>
    );
}

export { Label };
