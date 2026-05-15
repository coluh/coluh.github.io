import { useCallback, useEffect, useRef, useState } from "react";

const isEnglish = (str: string): boolean => /^[\x20-\x7F]+$/.test(str);

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("auto");
  const [translating, setTranslating] = useState(false);

  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (sourceRef.current) {
      sourceRef.current.style.height = "auto";
      sourceRef.current.style.height = sourceRef.current.scrollHeight + "px";
    }
  }, [sourceText]);
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.style.height = "auto";
      targetRef.current.style.height = targetRef.current.scrollHeight + "px";
    }
  }, [targetText]);

  const swapLangs = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  // translate
  const doTranslate = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setTranslating(true);

    const sl = sourceLang;
    let tl = targetLang;
    if (tl === "auto") {
      if (isEnglish(sourceText)) {
        tl = "Chinese";
      } else {
        tl = "English";
      }
    }

    try {
      const res = await fetch(
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_DASHSCOPE_API_KEY}`,
          },
          body: JSON.stringify({
            model: "qwen-mt-flash",
            messages: [{ role: "user", content: sourceText }],
            translation_options: {
              source_lang: sl,
              target_lang: tl,
            },
          }),
          signal: controller.signal,
        },
      );
      const data = await res.json();
      setTargetText(data.choices[0].message.content);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Translation request aborted");
        return;
      }
      console.error("Translation error:", error);
      setTargetText("Translation failed. Please try again.");
    } finally {
      setTranslating(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  useEffect(() => {
    if (!sourceText.trim()) {
      abortRef.current?.abort();
      return;
    }
    const timer = setTimeout(() => {
      doTranslate();
    }, 500);
    return () => clearTimeout(timer);
  }, [doTranslate, sourceText, sourceLang, targetLang]);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-200 via-cyan-100 to-cyan-200 p-8 dark:from-purple-700 dark:via-cyan-900 dark:to-slate-700">
      <div className="flex flex-col gap-4 rounded-2xl bg-white/50 p-4 shadow-xl dark:bg-black/20">
        <div className="flex flex-row justify-center gap-8">
          <select
            name="sl"
            id="sl"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-24 rounded-lg px-3 py-2 backdrop-blur-lg hover:bg-white/50"
          >
            <option value="auto">Auto</option>
            <option value="Chinese">Chinese</option>
            <option value="English">English</option>
          </select>
          <button onClick={swapLangs}>
            <span>⇄</span>
          </button>
          <select
            name="tl"
            id="tl"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-24 rounded-lg px-3 py-2 backdrop-blur-lg hover:bg-white/50"
          >
            <option value="auto">Auto</option>
            <option value="Chinese">Chinese</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <textarea
            name="source"
            id="source"
            ref={sourceRef}
            value={sourceText}
            onChange={(e) => {
              const value = e.target.value;
              setSourceText(value);
              if (!value.trim()) {
                setTargetText("");
              }
            }}
            placeholder="Enter text to translate..."
            className="min-h-64 flex-1 resize-none rounded-lg bg-white/70 p-2 outline-none dark:bg-black/30"
          ></textarea>
          <textarea
            readOnly
            name="target"
            id="target"
            ref={targetRef}
            value={targetText}
            placeholder={
              translating ? "Translating..." : "Translation will appear here..."
            }
            className="min-h-64 flex-1 resize-none rounded-lg bg-white/70 p-2 caret-transparent outline-none dark:bg-black/30"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
