import { t } from "../theme.js";

export default function Card({ children, p = "16px 18px", style }) {
  return (
    <div style={{ background: t.card, borderRadius: 12, padding: p, border: `0.5px solid ${t.border}`, ...style }}>
      {children}
    </div>
  );
}
