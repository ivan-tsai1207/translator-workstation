import { useState, useRef } from "react";
import { t } from "../theme.js";
import EngineSelector from "../components/EngineSelector.jsx";

export default function DocTranslator() {
  const [engine, setEngine] = useState("claude");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setStatus("準備翻譯");
    setProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleTranslate = () => {
    if (!file || status === "翻譯中") return;
    setStatus("翻譯中");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(interval); return 90; }
        return p + 10;
      });
    }, 300);
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setStatus("完成！使用 " + engine + " 翻譯");
    }, 3500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <EngineSelector value={engine} onChange={setEngine} />
      </div>

      {/* 拖曳上傳區 */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? t.primary : t.border}`,
          borderRadius: 16,
          padding: "60px 40px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? t.primarySoft : t.surfaceAlt,
          transition: "all 0.15s"
        }}
      >
        <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,.md" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
        {file ? (
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{file.name}</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>拖曳檔案到這裡</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>
              或點擊選取 · 支援 PDF、DOCX、TXT、Markdown
            </div>
          </div>
        )}
      </div>

      {/* 進度條 */}
      {file && (
        <div>
          {progress > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ height: 4, background: t.surfaceAlt, borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: progress === 100 ? t.success : t.primary,
                  borderRadius: 4,
                  transition: "width 0.3s"
                }} />
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>{status}</div>
            </div>
          )}
          <button
            onClick={handleTranslate}
            disabled={status === "翻譯中"}
            style={{
              padding: "10px 28px",
              borderRadius: 100,
              border: "none",
              background: status === "翻譯中" ? t.border : t.primary,
              color: status === "翻譯中" ? t.textMuted : "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: status === "翻譯中" ? "not-allowed" : "pointer",
              fontFamily: "inherit"
            }}
          >
            {status === "翻譯中" ? "翻譯中..." : status === "完成！使用 " + engine + " 翻譯" ? "重新翻譯" : "開始翻譯"}
          </button>
        </div>
      )}
    </div>
  );
}
