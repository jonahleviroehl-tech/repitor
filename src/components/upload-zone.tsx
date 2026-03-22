"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getSupportedAcceptString,
  getSupportedFormatsLabel,
} from "@/lib/supported-formats";

type UploadZoneProps = {
  label: string;
  description?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string | null;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadZone({
  label,
  description,
  file,
  onFileChange,
  accept = getSupportedAcceptString(),
  maxSizeMB = 10,
  error,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = error || localError;

  const validateFile = useCallback(
    (f: File): boolean => {
      const validExtensions = [".pdf", ".docx", ".doc", ".txt", ".rtf"];
      const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
      if (!validExtensions.includes(ext)) {
        setLocalError(
          `Dieses Format wird nicht unterstützt. Erlaubt: ${getSupportedFormatsLabel()}.`
        );
        return false;
      }
      if (f.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`Die Datei ist zu groß. Maximal ${maxSizeMB} MB.`);
        return false;
      }
      setLocalError(null);
      return true;
    },
    [maxSizeMB]
  );

  const handleFile = useCallback(
    (f: File) => {
      if (validateFile(f)) {
        onFileChange(f);
      }
    },
    [validateFile, onFileChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
      e.target.value = "";
    },
    [handleFile]
  );

  if (file) {
    return (
      <div className="rounded-lg border border-border bg-accent/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <FileCheck className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => {
              onFileChange(null);
              setLocalError(null);
            }}
            aria-label="Datei entfernen"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/30",
          displayError && "border-destructive/50"
        )}
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full transition-colors",
            isDragOver ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Upload
            className={cn(
              "size-5 transition-colors",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {getSupportedFormatsLabel()}, max. {maxSizeMB} MB
        </p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        aria-label={label}
      />
      {displayError && (
        <p className="mt-1.5 text-xs text-destructive">{displayError}</p>
      )}
    </div>
  );
}
