import * as React from "react";
import { cn } from "../../lib/utils";

type InputProps = React.ComponentProps<"input"> & {
    endAdornment?: React.ReactNode;
};

function Input({ className, type = "text", endAdornment, ...props }: InputProps) {
    return (
        <div className="relative">
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    endAdornment ? "pr-10" : "",
                    className
                )}
                {...props}
            />
            {endAdornment && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    {endAdornment}
                </div>
            )}
        </div>
    );
}

export { Input };
