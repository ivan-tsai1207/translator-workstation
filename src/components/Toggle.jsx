import { t } from "../theme.js";

export default function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width: 32, height: 18, borderRadius: 100, background: on ? t.primary : t.borderStrong, position: "relative", cursor: "pointer", transition: "0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 2, left: on ? 16 : 2, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "0.2s" }}></div>
    </div>
  );
}
