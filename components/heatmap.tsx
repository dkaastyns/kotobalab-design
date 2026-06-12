import { cn } from "@/lib/utils"

const levelClasses = [
  "bg-muted",
  "bg-primary/30",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
]

export function Heatmap({ data, className }: { data: number[][]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {data.map((week, w) => (
          <div key={w} className="flex flex-col gap-1">
            {week.map((intensity, d) => (
              <div
                key={d}
                className={cn("size-3 rounded-[4px] transition-colors", levelClasses[intensity] ?? levelClasses[0])}
                title={`${intensity} sessions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {levelClasses.map((c, i) => (
            <span key={i} className={cn("size-3 rounded-[4px]", c)} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
