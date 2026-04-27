import { useState, useRef, useCallback } from "react";
import { t } from "../theme.js";
import EngineSelector from "../components/EngineSelector.jsx";
import { translate } from "../lib/ai.js";

const LANGS = ["自動偵測", "繁中", "英文", "日文", "韓文", "法文", "德文", "西班牙文"];
const TARGET_LANGS = ["繁中", "英文", "日文", "韓文", "法文", "德文", "西班牙文"];

function saveHistory(entry) {
  if (typeof window === "undefined") return;
  const hist = JSON.parse(localStorage.getItem("history") || "[]");
  hist.unshift(entry);
  localStorage.setItem("history", JSON.stringify(hist.slice(0, 200)));
}

export default function TextTranslator() {
  const [engine, setEngine] = useState("claude");
  const [from, setFrom] = useState("自動偵測");
  const [to, setTo] = useState("繁中");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);

  const doTranslate = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const fromLang = from === "自動偵測" ? "auto" : from;
      const result = await translate({ engine, from: fromLang, to, text: input });
      setOutput(result);
      saveHistory({
        id: Date.now(),
        engine,
        from: fromLang,
        to,
        source: input,
        result,
        time: new Date().toISOString()
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [engine, from, to, input]);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") doTranslate();
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swapLangs = () => {
    if (from === "自動偵測") return;
    setFrom(to);
    setTo(from);
    setInput(output);
    setOutput(input);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      {/* 頂部控制列 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <EngineSelector value={engine} onChange={setEngine} />
        <div style={{ flex: 1 }} />
        <LangSelect value={from} options={LANGS} onChange={setFrom} />
        <button
          onClick={swapLangs}
          disabled={from === "自動偵測"}
          style={{
            width: 28, height: 28, borderRadius: 100,
            border: `1px solid ${t.border}`,
            background: "transparent",
            cursor: from === "自動偵測" ? "not-allowed" : "pointer",
            color: from === "自動偵測" ? t.textMuted : t.textSub,
            fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center"
          }}
          title="交換語言"
        >
          ⇄
        </button>
        <LangSelect value={to} options={TARGET_LANGS} onChange={setTo} />
      </div>

      {/* 雙欄翻譯區 */}
      <div style={{ display: "flex", gap: 12, flex: 1, minHeight: 360 }}>
        {/* 輸入區 */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          overflow: "hidden"
        }}>
          <textarea
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入要翻譯的文字..."
            style={{
              flex: 1,
              padding: "16px 18px",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: 16,
              lineHeight: 1.7,
              color: t.text,
              background: "transparent",
              fontFamily: "inherit"
            }}
          />
          <div style={{
            padding: "10px 16px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: 11, color: t.textMuted }}>
              {input.length} 字元 · ⌘↵ 翻譯
            </span>
            <button
              onClick={doTranslate}
              disabled={!input.trim() || loading}
              style={{
                padding: "6px 18px",
                borderRadius: 100,
                border: "none",
                background: input.trim() && !loading ? t.primary : t.border,
                color: input.trim() && !loading ? "#fff" : t.textMuted,
                fontSize: 13,
                fontWeight: 500,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "all 0.15s"
              }}
            >
              {loading ? "翻譯中..." : "翻譯 →"}
            </button>
          </div>
        </div>

        {/* 譯文區 */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: t.surfaceAlt,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          overflow: "hidden"
        }}>
          <div style={{
            flex: 1,
            padding: "16px 18px",
            fontSize: 16,
            lineHeight: 1.7,
            color: output ? t.text : t.textMuted,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}>
            {loading ? (
              <span style={{ color: t.textMuted }}>翻譯中...</span>
            ) : error ? (
              <span style={{ color: t.warm, fontSize: 13 }}>{error}</span>
            ) : output ? (
              output
            ) : (
              "✨ 譯文會顯示在這裡"
            )}
          </div>

          {output && !loading && (
            <div style={{
              padding: "10px 16px",
              borderTop: `1px solid ${t.border}`,
              display: "flex",
              gap: 8
            }}>
              <ActionBtn onClick={copyOutput} title={copied ? "已複製" : "複製"}>
                {copied ? "✓" : "📋"}
              </ActionBtn>
              <ActionBtn onClick={() => {
                const item = { id: Date.now(), source: input, result: output, time: new Date().toISOString(), starred: true };
                const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
                favs.unshift(item);
                localStorage.setItem("favorites", JSON.stringify(favs.slice(0, 200)));
              }} title="收藏">⭐</ActionBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LangSelect({ value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: "5px 10px",
        borderRadius: 100,
        border: `1px solid ${t.border}`,
        background: t.surface,
        color: t.text,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit",
        outline: "none"
      }}
    >
      {options.map(l => <option key={l} value={l}>{l}</option>)}
    </select>
  );
}

function ActionBtn({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: "4px 12px",
        borderRadius: 100,
        border: `1px solid ${t.border}`,
        background: t.surface,
        color: t.textSub,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }}
    >
      {children}
    </button>
  );
}
