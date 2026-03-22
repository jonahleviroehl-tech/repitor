import { cn } from "@/lib/utils";

const GRADE_LABELS: Record<string, string> = {
  "18": "sehr gut",
  "17": "sehr gut",
  "16": "sehr gut",
  "15": "gut",
  "14": "gut",
  "13": "gut",
  "12": "vollbefriedigend",
  "11": "vollbefriedigend",
  "10": "vollbefriedigend",
  "9": "befriedigend",
  "8": "befriedigend",
  "7": "befriedigend",
  "6": "ausreichend",
  "5": "ausreichend",
  "4": "ausreichend",
  "3": "mangelhaft",
  "2": "mangelhaft",
  "1": "mangelhaft",
  "0": "ungenügend",
};

function getGradeColor(note: number): string {
  if (note >= 13) return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300";
  if (note >= 9) return "bg-primary/15 text-primary-foreground dark:bg-primary/25";
  if (note >= 4) return "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-300";
}

type GradeBadgeProps = {
  note: number;
  className?: string;
};

export function GradeBadge({ note, className }: GradeBadgeProps) {
  const label = GRADE_LABELS[String(note)] ?? "—";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3",
        getGradeColor(note),
        className
      )}
    >
      <span className="text-3xl font-bold tabular-nums leading-none">
        {note}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider opacity-70">
          Punkte
        </span>
        <span className="text-sm font-semibold capitalize">{label}</span>
      </div>
    </div>
  );
}
