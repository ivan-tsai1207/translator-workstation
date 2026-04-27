import { t } from "../theme.js";

export default function Login() {
  return (
    <div style={{ background: t.bg, padding: "60px 40px", borderRadius: 14, minHeight: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 360, background: t.card, borderRadius: 16, padding: 36, border: `0.5px solid ${t.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: t.primary, color: "#fff", fontSize: 22, fontWeight: 600, marginBottom: 14 }}>譯</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: t.text }}>歡迎回到翻譯工作站</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>登入後同步你的所有翻譯記錄</div>
        </div>
        <input placeholder="email@example.com" style={{ width: "100%", padding: "10px 14px", fontSize: 13, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.bg, marginBottom: 10, fontFamily: "inherit", color: t.text }} />
        <input type="password" placeholder="密碼" style={{ width: "100%", padding: "10px 14px", fontSize: 13, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.bg, marginBottom: 14, fontFamily: "inherit", color: t.text }} />
        <button style={{ width: "100%", padding: 11, fontSize: 13, fontWeight: 500, borderRadius: 10, border: "none", background: t.primary, color: "#fff", cursor: "pointer", marginBottom: 12, fontFamily: "inherit" }}>登入</button>
        <div style={{ textAlign: "center", fontSize: 11, color: t.textSub, margin: "10px 0" }}>或</div>
        <button style={{ width: "100%", padding: 10, fontSize: 12, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.card, color: t.text, cursor: "pointer", marginBottom: 8, fontFamily: "inherit" }}>使用 Google 登入</button>
        <button style={{ width: "100%", padding: 10, fontSize: 12, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.card, color: t.text, cursor: "pointer", fontFamily: "inherit" }}>使用 Apple 登入</button>
        <div style={{ textAlign: "center", fontSize: 11, color: t.textSub, marginTop: 18 }}>
          還沒有帳號？<span style={{ color: t.primary, cursor: "pointer" }}>立即註冊</span>
        </div>
      </div>
    </div>
  );
}
