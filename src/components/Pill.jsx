import { t } from "../theme.js";

export default function Pill({ children, on, onClick, color = t.primary }) {
  return (
    <button onClick={onClick} style={{ fontSize: 11.5, padding: "5px 12px", borderRadius: 100, border: "none", background: on ? color : t.stage, color: on ? "#fff" : t.textSub, cursor: "pointer", fontFamily: "inherit", fontWeight: on ? 500 : 400 }}>
      {children}
    </button>
  );
}
