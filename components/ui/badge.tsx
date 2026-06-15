import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:   "bg-signal-50 text-signal-700 border border-signal-100",
        trust:     "bg-teal-50 text-teal-700 border border-teal-100",
        gold:      "bg-gold-50 text-gold-700 border border-gold-100",
        navy:      "bg-navy-900 text-white",
        outline:   "border border-navy-200 text-navy-700",
        secondary: "bg-navy-100 text-navy-600",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
