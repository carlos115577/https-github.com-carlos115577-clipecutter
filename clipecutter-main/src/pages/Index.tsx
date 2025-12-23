import { useState, useEffect } from "react";
import { URLInput } from "@/components/URLInput";
import { ProcessingState } from "@/components/ProcessingState";
import { ClipsList } from "@/components/ClipsList";
import { ClipData } from "@/components/ClipCard";

type AppState = "input" | "processing" | "results";

// Mock data for demonstration
const mockClips: ClipData[] = [
  {
    id: 1,
    startTime: "00:02:15",
    endTime: "00:02:48",
    duration: 33,
    wordsPerSecond: 2.4,
    subtitlePreview: "Então o que acontece quando você começa a pensar diferente é que as oportunidades aparecem...",
  },
  {
    id: 2,
    startTime: "00:05:42",
    endTime: "00:06:21",
    duration: 39,
    wordsPerSecond: 2.8,
    subtitlePreview: "A chave para o sucesso não está em trabalhar mais horas, está em trabalhar de forma mais inteligente...",
  },
  {
    id: 3,
    startTime: "00:08:10",
    endTime: "00:08:52",
    duration: 42,
    wordsPerSecond: 2.2,
    subtitlePreview: "Quando eu comecei, ninguém acreditava que isso era possível. Mas eu continuei mesmo assim...",
  },
  {
    id: 4,
    startTime: "00:12:33",
    endTime: "00:13:05",
    duration: 32,
    wordsPerSecond: 2.6,
    subtitlePreview: "O erro mais comum que as pessoas cometem é esperar o momento perfeito. O momento perfeito é agora...",
  },
  {
    id: 5,
    startTime: "00:15:18",
    endTime: "00:16:02",
    duration: 44,
    wordsPerSecond: 2.3,
    subtitlePreview: "Cada vez que você falha, você aprende algo novo. E cada aprendizado te leva mais perto do objetivo...",
  },
  {
    id: 6,
    startTime: "00:18:45",
    endTime: "00:19:15",
    duration: 30,
    wordsPerSecond: 2.9,
    subtitlePreview: "A consistência vence o talento quando o talento não é consistente. Lembre-se disso sempre...",
  },
];

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [processingStep, setProcessingStep] = useState(0);
  const [clips, setClips] = useState<ClipData[]>([]);
  const [videoTitle, setVideoTitle] = useState("");

  const handleURLSubmit = (url: string) => {
    setAppState("processing");
    setProcessingStep(0);

    // Simulate processing steps
    const stepDurations = [2000, 1500, 2500, 2000];
    let currentStep = 0;

    const processNextStep = () => {
      currentStep++;
      setProcessingStep(currentStep);

      if (currentStep < stepDurations.length) {
        setTimeout(processNextStep, stepDurations[currentStep]);
      } else {
        // Processing complete
        setTimeout(() => {
          setClips(mockClips);
          setVideoTitle("Como Construir Hábitos que Transformam sua Vida");
          setAppState("results");
        }, 500);
      }
    };

    setTimeout(processNextStep, stepDurations[0]);
  };

  const handleReset = () => {
    setAppState("input");
    setProcessingStep(0);
    setClips([]);
    setVideoTitle("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        {appState === "input" && (
          <URLInput onSubmit={handleURLSubmit} isLoading={false} />
        )}

        {appState === "processing" && (
          <ProcessingState currentStep={processingStep} />
        )}

        {appState === "results" && (
          <ClipsList clips={clips} videoTitle={videoTitle} onReset={handleReset} />
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-muted-foreground border-t border-border bg-background/80 backdrop-blur-sm">
        <span className="font-mono">ClipCutter</span>
        <span className="mx-2">•</span>
        <span>Gerador automático de cortes</span>
      </footer>
    </div>
  );
};

export default Index;
