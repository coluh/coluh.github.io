import { create } from "zustand";
import { persist } from "zustand/middleware";

type TranslationConfig = {
  endpoint: string;
  model: string;
  apiKey: string;
  setEndpoint: (endpoint: string) => void;
  setModel: (model: string) => void;
  setApiKey: (apiKey: string) => void;
};

export const useTranslateConfigStore = create<TranslationConfig>()(
  persist(
    (set) => ({
      endpoint:
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      model: "qwen-mt-flash",
      apiKey: import.meta.env.VITE_DASHSCOPE_API_KEY || "",
      setEndpoint: (endpoint: string) => set({ endpoint }),
      setModel: (model: string) => set({ model }),
      setApiKey: (apiKey: string) => set({ apiKey }),
    }),
    { name: "translate-config" },
  ),
);
