import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Resources() {
  return (
    <div>
      <SectionTitle>📘 資源中心</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        {[
          { i: "🎓", l: "新手教學", d: "5 分鐘上手核心功能" },
          { i: "🎬", l: "影片教學", d: "10 支影片完整介紹" },
          { i: "❓", l: "常見問答", d: "30+ FAQ 解決常見問題" }
        ].map((r, i) => (
          <Card key={i} style={{ cursor: "pointer", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{r.i}</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{r.l}</div>
            <div style={{ fontSize: 11, color: t.textSub }}>{r.d}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>📞 聯絡我們</div>
        <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.7 }}>有任何問題或建議，歡迎透過下列方式聯絡：</div>
        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn size="sm">📧 寄信給我們</Btn>
          <Btn size="sm">💬 加入 Discord</Btn>
          <Btn size="sm">🐦 Twitter / X</Btn>
        </div>
      </Card>
    </div>
  );
}
