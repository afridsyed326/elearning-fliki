import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import { buttonVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader className="animate-spin" /> : children}
    </Comp>
  );
}
