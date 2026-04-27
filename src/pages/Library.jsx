import { useState, useEffect } from "react";
import { t } from "../theme.js";

const TABS = [
  { k: "history", l: "歷史記錄" },
  { k: "favorites", l: "收藏" },
  { k: "glossary", l: "術語庫" },
  { k: "prompts", l: "Prompt 模板" }
];

export default function Library() {
  const [tab, setTab] = useState("history");
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
    setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, [tab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 2, background: t.surfaceAlt, borderRadius: 10, padding: 3, width: "fit-content" }}>
        {TABS.map(tb => (
          <button
            key={tb.k}
            onClick={() => setTab(tb.k)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              background: tab === tb.k ? t.surface : "transparent",
              color: tab === tb.k ? t.text : t.textSub,
              fontSize: 12,
              fontWeight: tab === tb.k ? 500 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: tab === tb.k ? "0 1px 4px rgba(0,0,0,0.06)" : "none"
            }}
          >
            {tb.l}
          </button>
        ))}
      </div>

      {tab === "history" && <RecordList items={history} emptyText="還沒有翻譯記錄" />}
      {tab === "favorites" && <RecordList items={favorites} emptyText="還沒有收藏的翻譯" />}
      {tab === "glossary" && <EmptyState icon="📖" text="術語庫" sub="即將推出 — 儲存專業術語對照" />}
      {tab === "prompts" && <EmptyState icon="✏️" text="Prompt 模板" sub="即將推出 — 自訂翻譯風格與指令" />}
    </div>
  );
}

function RecordList({ items, emptyText }) {
  if (!items.length) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", color: t.textMuted, fontSize: 13 }}>
        {emptyText}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map(item => (
        <div key={item.id} style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "12px 16px"
        }}>
          <div style={{ fontSize: 13, color: t.textSub, marginBottom: 4, lineHeight: 1.5 }}>
            {(item.source || "").slice(0, 120)}{(item.source || "").length > 120 ? "..." : ""}
          </div>
          <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6 }}>
            {(item.result || "").slice(0, 120)}{(item.result || "").length > 120 ? "..." : ""}
          </div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 6 }}>
            {new Date(item.time).toLocaleString("zh-TW")}
            {item.engine && <span style={{ marginLeft: 8 }}>· {item.engine}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ icon, text, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{text}</div>
      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>{sub}</div>
    </div>
  );
}
