import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function VideoWork() {
  return (
    <div>
      <SectionTitle sub="貼上影片網址生成雙語字幕，支援 YouTube、Netflix 等 100+ 平台">🎬 影片翻譯</SectionTitle>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: t.textSub, marginBottom: 8 }}>影片網址</div>
        <input placeholder="https://www.youtube.com/watch?v=..." style={{ width: "100%", padding: "10px 14px", fontSize: 13, borderRadius: 10, border: `0.5px solid ${t.borderStrong}`, background: t.bg, fontFamily: "inherit", color: t.text }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11.5, color: t.textSub }}>譯文</span>
            <select style={{ fontSize: 12, padding: "4px 10px", borderRadius: 8, border: `0.5px solid ${t.borderStrong}`, background: t.bg, fontFamily: "inherit" }}><option>繁中</option></select>
            <span style={{ fontSize: 11.5, color: t.textSub, marginLeft: 8 }}>引擎</span>
            <Pill on>Claude</Pill><Pill>GPT</Pill>
          </div>
          <Btn primary>生成字幕</Btn>
        </div>
      </Card>

      <SectionTitle>已生成字幕</SectionTitle>
      <Card p="4px 16px">
        {[
          { n: "AI 趨勢演講 2026", time: "12 分鐘前", lines: 142 },
          { n: "Apple Vision Pro 評測", time: "昨天", lines: 89 }
        ].map((v, i, a) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 50, height: 32, borderRadius: 6, background: t.stage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎬</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: t.text, marginBottom: 2 }}>{v.n}</div>
              <div style={{ fontSize: 10.5, color: t.textSub }}>{v.lines} 行字幕 · {v.time}</div>
            </div>
            <Btn size="sm">下載 SRT</Btn>
            <Btn size="sm">預覽</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}
