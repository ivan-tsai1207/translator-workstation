import { t } from "../theme.js";
import { MOD_KEY } from "../platform.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function WebWork() {
  return (
    <div>
      <SectionTitle sub="貼上網址生成雙語對照頁面，可分享連結">🌐 網頁翻譯</SectionTitle>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textSub, marginBottom: 8 }}>網頁網址</div>
        <input placeholder="https://example.com/article" style={{ width: "100%", padding: "10px 14px", fontSize: 13, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.bg, fontFamily: "inherit", color: t.text }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <Pill on>雙語對照</Pill><Pill>純譯文</Pill>
            <span style={{ fontSize: 11.5, color: t.textSub, marginLeft: 8 }}>引擎</span>
            <Pill on>Claude</Pill>
          </div>
          <Btn primary>翻譯網頁</Btn>
        </div>
      </Card>

      <div style={{ background: t.primaryLight, border: `0.5px solid ${t.primary}`, borderRadius: 10, padding: "12px 14px", fontSize: 11.5, color: t.primaryDark, lineHeight: 1.6 }}>
        💡 安裝 Chrome 插件後，在任何網頁按 <kbd>{MOD_KEY}</kbd> 即可即時翻譯，免複製貼上
      </div>
    </div>
  );
}
