import { cn } from "@/lib/utils"

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  label,
  display,
  className,
  trackClassName,
  barClassName,
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  display?: string
  className?: string
  trackClassName?: string
  barClassName?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(100, (value / max) * 100)
  const offset = circumference - (pct / 100) * circumference
  const center = display ?? `${Math.round(pct)}%`

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={cn("stroke-muted", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("stroke-primary transition-all duration-700 ease-out", barClassName)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-tight">{center}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}
