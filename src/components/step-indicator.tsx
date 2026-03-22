"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  currentStep: number;
  steps: string[];
};

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={cn(
                  "h-px w-8 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                  isCompleted &&
                    "bg-primary text-primary-foreground",
                  isActive &&
                    "bg-primary text-primary-foreground ring-2 ring-primary/20",
                  !isCompleted &&
                    !isActive &&
                    "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="size-3.5" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:inline",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
