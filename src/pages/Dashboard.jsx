import { t } from "../theme.js";
import { MOD_KEY } from "../platform.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Dashboard({ go }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 11.5, color: t.textSub, marginBottom: 4 }}>2026.04.26 · 早安</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: t.text }}>嗨，Ivan</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm">🧩 管理插件</Btn>
          <Btn size="sm" primary>↗ 升級 Pro</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { l: "本月翻譯字數", v: "128,540", u: "字", c: t.primary, bg: t.primaryLight },
          { l: "已翻譯文件", v: "23", u: "份", c: "#2D7A5C", bg: t.successLight },
          { l: "雙語字幕影片", v: "8", u: "支", c: "#B8761A", bg: t.accentLight },
          { l: "收藏翻譯", v: "47", u: "筆", c: "#A85555", bg: t.warmLight }
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: t.textSub, marginBottom: 6 }}>{s.l}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 500, color: s.c }}>{s.v}</span>
              <span style={{ fontSize: 11, color: t.textSub }}>{s.u}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>快速開始</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 24 }}>
        {[
          { i: "📝", l: "文字翻譯", k: "text" },
          { i: "📄", l: "文件翻譯", k: "doc" },
          { i: "🎬", l: "影片翻譯", k: "video" },
          { i: "🖼", l: "圖片翻譯", k: "image" },
          { i: "🌐", l: "網頁翻譯", k: "web" }
        ].map(q => (
          <div key={q.k} onClick={() => go(q.k)} style={{ background: t.card, borderRadius: 12, padding: "16px 12px", border: `0.5px solid ${t.border}`, cursor: "pointer", textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{q.i}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{q.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
        <div>
          <SectionTitle>最近翻譯</SectionTitle>
          <Card p="4px 16px">
            {[
              { t: "📝", n: "今天天氣很好，適合散步...", from: "繁中", to: "日文", time: "5 分鐘前" },
              { t: "📄", n: "Q3 財報摘要.pdf", from: "英文", to: "繁中", time: "2 小時前" },
              { t: "🎬", n: "YouTube · AI 趨勢演講", from: "英文", to: "繁中", time: "昨天" },
              { t: "🌐", n: "Anthropic Blog 新文章", from: "英文", to: "繁中", time: "2 天前" }
            ].map((r, i, a) => (
              <div key={i} style={{ padding: "11px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>{r.t}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: t.text, marginBottom: 2 }}>{r.n}</div>
                  <div style={{ fontSize: 10.5, color: t.textSub }}>{r.from} → {r.to} · {r.time}</div>
                </div>
                <Btn size="sm">查看</Btn>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <SectionTitle>使用技巧</SectionTitle>
          <Card>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: t.text }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 500, color: t.primaryDark, marginBottom: 2 }}>💡 在任何網頁按 {MOD_KEY}</div>
                <div style={{ fontSize: 11, color: t.textSub }}>滑鼠停在段落即翻譯</div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 500, color: t.primaryDark, marginBottom: 2 }}>📚 建立術語庫</div>
                <div style={{ fontSize: 11, color: t.textSub }}>專業詞彙不再翻譯飄移</div>
              </div>
              <div>
                <div style={{ fontWeight: 500, color: t.primaryDark, marginBottom: 2 }}>🤖 為不同場景設定引擎</div>
                <div style={{ fontSize: 11, color: t.textSub }}>論文用 Claude、新聞用 GPT</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
