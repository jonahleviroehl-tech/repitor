import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { icon: 28, text: "text-xl" },
  md: { icon: 40, text: "text-2xl" },
  lg: { icon: 64, text: "text-4xl" },
} as const;

export function Logo({
  size = "sm",
  showWordmark = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}) {
  const { icon, text } = sizeMap[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="120" height="120" rx="28" fill="#1a1a1a" />
        <path
          d="M38 88V32h24c12 0 20 7 20 18 0 9-5.5 15.5-14 17.5L84 88H72L57 68H50v20H38zm12-30h12c6 0 10-3.5 10-9s-4-9-10-9H50v18z"
          fill="white"
        />
        <circle cx="86" cy="34" r="6" fill="#d97706" />
      </svg>
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground leading-none",
            text
          )}
        >
          Rep
          <span className="relative inline-block">
            ı
            <span className="absolute left-1/2 -translate-x-1/2 -top-[0.05em] size-[0.22em] rounded-full bg-[#d97706]" />
          </span>
          tor
        </span>
      )}
    </span>
  );
}
