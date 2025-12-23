import { ClipCard, ClipData } from "./ClipCard";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Film } from "lucide-react";

interface ClipsListProps {
  clips: ClipData[];
  videoTitle: string;
  onReset: () => void;
}

export function ClipsList({ clips, videoTitle, onReset }: ClipsListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Novo vídeo</span>
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-1 line-clamp-1">{videoTitle}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                {clips.length} cortes gerados
              </span>
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            <Download className="w-4 h-4 mr-2" />
            <span>Baixar todos</span>
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-lg bg-card border border-border text-center">
          <div className="text-2xl font-mono font-semibold text-primary">{clips.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border text-center">
          <div className="text-2xl font-mono font-semibold text-foreground">
            {Math.round(clips.reduce((acc, c) => acc + c.duration, 0) / 60)}m
          </div>
          <div className="text-xs text-muted-foreground mt-1">Duração</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border text-center">
          <div className="text-2xl font-mono font-semibold text-foreground">
            {Math.round(clips.reduce((acc, c) => acc + c.wordsPerSecond, 0) / clips.length * 10) / 10}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Média p/s</div>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border text-center">
          <div className="text-2xl font-mono font-semibold text-foreground">
            {Math.round(clips.reduce((acc, c) => acc + c.duration, 0) / clips.length)}s
          </div>
          <div className="text-xs text-muted-foreground mt-1">Média duração</div>
        </div>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clips.map((clip, index) => (
          <ClipCard key={clip.id} clip={clip} index={index} />
        ))}
      </div>
    </div>
  );
}
