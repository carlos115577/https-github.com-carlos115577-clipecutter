import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scissors, Play, AlertCircle } from "lucide-react";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function URLInput({ onSubmit, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("URL obrigatória");
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError("URL do YouTube inválida");
      return;
    }

    onSubmit(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 glow-primary-subtle">
          <Scissors className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          <span className="text-gradient-primary">ClipCutter</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Gerador automático de cortes curtos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            className="h-14 text-base pr-4 bg-card border-border focus:border-primary"
            disabled={isLoading}
          />
          {error && (
            <div className="absolute -bottom-6 left-0 flex items-center gap-1.5 text-destructive text-xs">
              <AlertCircle className="w-3 h-3" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="glow"
          size="lg"
          className="w-full h-12 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Processando...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Gerar Cortes</span>
            </>
          )}
        </Button>
      </form>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-mono font-semibold text-primary mb-1">15-60s</div>
          <div className="text-xs text-muted-foreground">Duração</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-mono font-semibold text-primary mb-1">SRT</div>
          <div className="text-xs text-muted-foreground">Legendas</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="text-2xl font-mono font-semibold text-primary mb-1">ASR</div>
          <div className="text-xs text-muted-foreground">Transcrição</div>
        </div>
      </div>
    </div>
  );
}
