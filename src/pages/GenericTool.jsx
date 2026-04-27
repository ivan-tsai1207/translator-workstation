import { useState } from "react";
import { t } from "../theme.js";

export default function GenericTool({ icon, title, desc, placeholder, inputType = "url", accept, onSubmit }) {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const payload = inputType === "file" ? file : value;
    if (!payload) return;
    setLoading(true);
    setResult("");
    try {
      const res = await onSubmit(payload);
      setResult(res || "處理完成");
    } catch (e) {
      setResult("錯誤：" + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 40 }}>
      <div style={{
        width: "100%",
        maxWidth: 520,
        background: t.surface,
        borderRadius: 16,
        border: `1px solid ${t.border}`,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: t.text }}>{title}</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>{desc}</div>
        </div>

        {inputType === "file" ? (
          <label style={{
            border: `2px dashed ${t.border}`,
            borderRadius: 12,
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: t.surfaceAlt
          }}>
            <input type="file" accept={accept} style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            {file ? (
              <span style={{ fontSize: 13, color: t.text }}>{file.name}</span>
            ) : (
              <span style={{ fontSize: 13, color: t.textMuted }}>點擊或拖曳上傳</span>
            )}
          </label>
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder={placeholder}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: `1px solid ${t.border}`,
              fontSize: 14,
              color: t.text,
              background: t.surfaceAlt,
              outline: "none",
              fontFamily: "inherit"
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || (!value.trim() && !file)}
          style={{
            padding: "10px",
            borderRadius: 100,
            border: "none",
            background: (loading || (!value.trim() && !file)) ? t.border : t.primary,
            color: (loading || (!value.trim() && !file)) ? t.textMuted : "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: (loading || (!value.trim() && !file)) ? "not-allowed" : "pointer",
            fontFamily: "inherit"
          }}
        >
          {loading ? "處理中..." : "開始"}
        </button>

        {result && (
          <div style={{
            padding: "12px 14px",
            background: t.surfaceAlt,
            borderRadius: 10,
            fontSize: 13,
            color: t.text,
            lineHeight: 1.6
          }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
