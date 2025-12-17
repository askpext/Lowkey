export {};

declare global {
  interface Window {
    api: {
      modelStatus(): Promise<{ ready: boolean }>;
      downloadModel(): Promise<void>;
      startLlama(): Promise<void>;
      onProgress(cb: (percent: number) => void): void;
    };
  }
}
