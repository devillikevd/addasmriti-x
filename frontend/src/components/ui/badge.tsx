import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-heritage-100 text-heritage-700 border border-heritage-200",
        secondary: "bg-bengal-100 text-bengal-700 border border-bengal-200",
        outline: "border border-neutral-200 text-neutral-600",
        success: "bg-green-100 text-green-700 border border-green-200",
        warning: "bg-amber-100 text-amber-700 border border-amber-200",
        destructive: "bg-red-100 text-red-700 border border-red-200",
        emotion: "bg-gradient-to-r from-heritage-100 to-bengal-100 text-neutral-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
