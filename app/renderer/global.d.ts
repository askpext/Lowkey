export {};

declare global {
  interface Window {
    api: {
      modelStatus(): Promise<{ ready: boolean; downloaded: boolean }>;
      downloadModel(): Promise<void>;
      startLlama(): Promise<void>;
      onProgress(cb: (percent: number) => void): void;
      sendMessage(text: string): Promise<void>;
      stopGeneration(): Promise<void>;
      onToken(cb: (token: string) => void): void;
      onStreamDone(cb: () => void): void;
      onReady(cb: () => void): void;
      saveChat(chatId: string, messages: any[]): Promise<void>;
      loadChats(): Promise<any[]>;
      loadChat(chatId: string): Promise<any>;
      deleteChat(chatId: string): Promise<void>;
    };
  }
}
