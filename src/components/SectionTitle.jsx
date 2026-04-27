import { t } from "../theme.js";

export default function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 500, color: t.text }}>{children}</div>
      {sub && <div style={{ fontSize: 11.5, color: t.textSub, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
