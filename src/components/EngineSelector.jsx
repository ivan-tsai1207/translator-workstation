import { useState } from "react";
import { ENGINES, getApiKey } from "../lib/ai.js";
import { t } from "../theme.js";

export default function EngineSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const engine = ENGINES[value] || ENGINES.claude;
  const hasKey = !!getApiKey(value);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          borderRadius: 100,
          border: `1px solid ${t.border}`,
          background: t.surfaceAlt,
          cursor: "pointer",
          fontSize: 12,
          color: t.text,
          fontFamily: "inherit"
        }}
      >
        <span style={{ color: hasKey ? t.success : t.warm, fontSize: 8 }}>●</span>
        {engine.name}
        <span style={{ color: t.textMuted, fontSize: 10 }}>▾</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 199 }}
          />
          <div style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 200,
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: 6,
            minWidth: 220
          }}>
            {Object.entries(ENGINES).map(([key, eng]) => {
              const active = key === value;
              const connected = !!getApiKey(key);
              return (
                <div
                  key={key}
                  onClick={() => { onChange(key); setOpen(false); }}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: active ? t.primarySoft : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = t.surfaceAlt; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: active ? 500 : 400, color: t.text }}>
                      {eng.name}
                      <span style={{ marginLeft: 6, fontSize: 10, color: t.textMuted }}>{eng.provider}</span>
                    </div>
                    <div style={{ fontSize: 11, color: t.textSub, marginTop: 1 }}>{eng.desc}</div>
                  </div>
                  <span style={{ fontSize: 8, color: connected ? t.success : t.textMuted }}>●</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
