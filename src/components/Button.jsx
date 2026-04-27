import { t } from "../theme.js";

export default function Btn({ children, onClick, primary, danger, size = "md", style }) {
  const sizes = { sm: { fs: 11, p: "5px 12px" }, md: { fs: 12, p: "6px 16px" }, lg: { fs: 13, p: "8px 22px" } };
  const s = sizes[size];
  const bg = primary ? t.primary : danger ? t.warm : t.card;
  const c = (primary || danger) ? "#fff" : t.text;
  return (
    <button onClick={onClick} style={{ fontSize: s.fs, padding: s.p, borderRadius: 100, border: primary || danger ? "none" : `0.5px solid ${t.borderStrong}`, background: bg, color: c, cursor: "pointer", fontFamily: "inherit", fontWeight: primary || danger ? 500 : 400, ...style }}>
      {children}
    </button>
  );
}
