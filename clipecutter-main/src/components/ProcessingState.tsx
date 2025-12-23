import { useEffect, useState } from "react";
import { Loader2, Download, FileAudio, Film, Type } from "lucide-react";

interface ProcessingStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: "pending" | "active" | "complete";
}

interface ProcessingStateProps {
  currentStep: number;
}

export function ProcessingState({ currentStep }: ProcessingStateProps) {
  const steps: ProcessingStep[] = [
    { id: "download", label: "Baixando vídeo", icon: <Download className="w-4 h-4" />, status: "pending" },
    { id: "audio", label: "Extraindo áudio", icon: <FileAudio className="w-4 h-4" />, status: "pending" },
    { id: "transcribe", label: "Transcrevendo", icon: <Type className="w-4 h-4" />, status: "pending" },
    { id: "segment", label: "Segmentando", icon: <Film className="w-4 h-4" />, status: "pending" },
  ];

  const getStepStatus = (index: number): "pending" | "active" | "complete" => {
    if (index < currentStep) return "complete";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 animate-pulse-glow">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-medium mb-1">Processando vídeo</h2>
        <p className="text-sm text-muted-foreground">Aguarde enquanto analisamos o conteúdo</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ${
                status === "active"
                  ? "bg-primary/5 border-primary/30"
                  : status === "complete"
                  ? "bg-card border-border opacity-60"
                  : "bg-card border-border opacity-40"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  status === "active"
                    ? "bg-primary text-primary-foreground"
                    : status === "complete"
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {status === "active" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "complete" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${status === "active" ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </div>
              </div>
              {status === "active" && (
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-card border border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-mono text-primary">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 glow-primary-subtle"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
