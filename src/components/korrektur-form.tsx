"use client";

import { useState, useCallback } from "react";
import { FileText, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadZone } from "@/components/upload-zone";
import { StepIndicator } from "@/components/step-indicator";
import { KorrekturResult } from "@/components/korrektur-result";
import { cn } from "@/lib/utils";

type LoesungMode = "pdf" | "text";

const STEPS = ["Unterlagen", "Lösung", "Ergebnis"];

export function KorrekturForm() {
  const [step, setStep] = useState(1);
  const [klausurFile, setKlausurFile] = useState<File | null>(null);
  const [skizzeFile, setSkizzeFile] = useState<File | null>(null);
  const [loesungFile, setLoesungFile] = useState<File | null>(null);
  const [loesungText, setLoesungText] = useState("");
  const [loesungMode, setLoesungMode] = useState<LoesungMode>("pdf");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);

  const canAdvanceStep1 = klausurFile && skizzeFile;
  const canAdvanceStep2 =
    loesungMode === "pdf"
      ? !!loesungFile
      : loesungText.trim().length >= 50;

  const handleNext = useCallback(() => {
    if (step === 1) {
      if (!canAdvanceStep1) {
        setStepError("Bitte lade sowohl die Klausur als auch die Lösungsskizze hoch.");
        return;
      }
      setStepError(null);
      setStep(2);
    } else if (step === 2) {
      if (!canAdvanceStep2) {
        setStepError(
          loesungMode === "pdf"
            ? "Bitte lade deine Lösung hoch."
            : "Bitte gib mindestens 50 Zeichen ein."
        );
        return;
      }
      setStepError(null);

      const fd = new FormData();
      fd.append("klausur", klausurFile!);
      fd.append("skizze", skizzeFile!);
      if (loesungMode === "pdf" && loesungFile) {
        fd.append("loesung", loesungFile);
      } else {
        fd.append("loesungText", loesungText.trim());
      }
      setFormData(fd);
      setStep(3);
    }
  }, [step, canAdvanceStep1, canAdvanceStep2, klausurFile, skizzeFile, loesungFile, loesungText, loesungMode]);

  const handleBack = useCallback(() => {
    setStepError(null);
    if (step === 2) setStep(1);
  }, [step]);

  const handleReset = useCallback(() => {
    setStep(1);
    setKlausurFile(null);
    setSkizzeFile(null);
    setLoesungFile(null);
    setLoesungText("");
    setLoesungMode("pdf");
    setFormData(null);
    setStepError(null);
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <StepIndicator currentStep={step} steps={STEPS} />
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Unterlagen hochladen
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Lade die Klausur (Sachverhalt) und die Lösungsskizze hoch.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <UploadZone
              label="Klausur (Sachverhalt)"
              description="Der Klausursachverhalt"
              file={klausurFile}
              onFileChange={setKlausurFile}
            />
            <UploadZone
              label="Lösungsskizze"
              description="Die Musterlösung / Lösungsskizze"
              file={skizzeFile}
              onFileChange={setSkizzeFile}
            />
          </div>

          {stepError && (
            <p className="text-xs text-destructive">{stepError}</p>
          )}

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleNext}
              disabled={!canAdvanceStep1}
              size="lg"
            >
              Weiter
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Deine Lösung
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Lade deine Klausurlösung hoch oder gib sie als Text ein.
            </p>
          </div>

          <div className="flex gap-1 rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setLoesungMode("pdf")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                loesungMode === "pdf"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="size-3.5" />
              Datei hochladen
            </button>
            <button
              type="button"
              onClick={() => setLoesungMode("text")}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                loesungMode === "text"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <PenLine className="size-3.5" />
              Text eingeben
            </button>
          </div>

          {loesungMode === "pdf" ? (
            <UploadZone
              label="Deine Klausurlösung"
              description="Deine Bearbeitung"
              file={loesungFile}
              onFileChange={setLoesungFile}
            />
          ) : (
            <div className="space-y-1.5">
              <Textarea
                placeholder="Füge hier deine Klausurlösung ein..."
                value={loesungText}
                onChange={(e) => setLoesungText(e.target.value)}
                className="min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                {loesungText.trim().length} / min. 50 Zeichen
              </p>
            </div>
          )}

          {stepError && (
            <p className="text-xs text-destructive">{stepError}</p>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={handleBack} size="sm">
              Zurück
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canAdvanceStep2}
              size="lg"
            >
              Korrektur starten
            </Button>
          </div>
        </div>
      )}

      {step === 3 && formData && (
        <div className="animate-in fade-in duration-500">
          <KorrekturResult formData={formData} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
