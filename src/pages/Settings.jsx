import { useState } from "react";
import { t } from "../theme.js";
import { isMac, MOD_KEY } from "../platform.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import Toggle from "../components/Toggle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Settings() {
  const [tab, setTab] = useState("account");
  const tabs = [
    { k: "account", l: "👤 帳號與訂閱" },
    { k: "engine", l: "🤖 AI 翻譯引擎" },
    { k: "pref", l: "🌏 翻譯偏好" },
    { k: "ui", l: "🎨 介面與外觀" },
    { k: "rules", l: "🌐 網頁翻譯規則" },
    { k: "shortcut", l: "⌨️ 快捷鍵" },
    { k: "lib", l: "📖 術語 & Prompt" },
    { k: "adv", l: "🔧 進階" }
  ];

  return (
    <div style={{ display: "flex", gap: 18 }}>
      <div style={{ width: 180, flexShrink: 0 }}>
        <SectionTitle>⚙ 設定中心</SectionTitle>
        {tabs.map(tt => (
          <div key={tt.k} onClick={() => setTab(tt.k)} style={{ padding: "8px 12px", borderRadius: 8, marginBottom: 2, cursor: "pointer", fontSize: 12.5, background: tab === tt.k ? t.stage : "transparent", color: tab === tt.k ? t.text : t.textSub, fontWeight: tab === tt.k ? 500 : 400 }}>{tt.l}</div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {tab === "account" && (
          <>
            <SectionTitle>帳號與訂閱</SectionTitle>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 500 }}>I</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>Ivan</div>
                  <div style={{ fontSize: 11.5, color: t.textSub }}>ivan@example.com</div>
                </div>
                <Btn>編輯資料</Btn>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: 12, background: t.primaryLight, borderRadius: 10 }}>
                  <div style={{ fontSize: 10.5, color: t.textSub, marginBottom: 3 }}>方案</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: t.primaryDark }}>Pro 會員</div>
                  <div style={{ fontSize: 10.5, color: t.textSub, marginTop: 3 }}>下次扣款 2026/05/26</div>
                </div>
                <div style={{ padding: 12, background: t.successLight, borderRadius: 10 }}>
                  <div style={{ fontSize: 10.5, color: t.textSub, marginBottom: 3 }}>本月用量</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#2D7A5C" }}>128,540 / 500,000 字</div>
                  <div style={{ height: 3, background: "rgba(0,0,0,0.06)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}><div style={{ width: "26%", height: "100%", background: "#2D7A5C" }}></div></div>
                </div>
              </div>
            </Card>
          </>
        )}

        {tab === "engine" && (
          <>
            <SectionTitle sub="管理 AI 引擎金鑰並指派各場景使用的引擎">AI 翻譯引擎</SectionTitle>
            {[
              { n: "Claude", desc: "Anthropic · 適合長文與專業翻譯", st: "已連接", c: t.primary },
              { n: "ChatGPT", desc: "OpenAI · 通用性強，翻譯流暢", st: "已連接", c: t.success },
              { n: "Gemini", desc: "Google · 多模態強項", st: "未連接", c: t.accent }
            ].map((e, i) => (
              <Card key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: e.c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>{e.n[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{e.n}</div>
                      <div style={{ fontSize: 11, color: t.textSub }}>{e.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 100, background: e.st === "已連接" ? t.successLight : t.stage, color: e.st === "已連接" ? "#2D7A5C" : t.textSub }}>{e.st}</span>
                    <Btn size="sm">{e.st === "已連接" ? "API Key" : "連接"}</Btn>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {tab === "ui" && (
          <>
            <SectionTitle>介面與外觀</SectionTitle>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>介面語言</div>
              <div style={{ display: "flex", gap: 8 }}>
                <Pill on>繁體中文</Pill><Pill>日本語</Pill><Pill>English</Pill>
              </div>
            </Card>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>主題模式</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[{ l: "淺色", b: "#FFFFFF" }, { l: "深色", b: "#1F2A33" }, { l: "跟隨系統", b: "linear-gradient(90deg,#FFF 50%, #1F2A33 50%)" }].map((m, i) => (
                  <div key={i} style={{ background: t.bg, border: `0.5px solid ${i === 2 ? t.primary : t.border}`, borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "center" }}>
                    <div style={{ height: 40, borderRadius: 6, background: m.b, marginBottom: 6, border: `0.5px solid ${t.border}` }}></div>
                    <div style={{ fontSize: 12 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {tab === "shortcut" && (
          <>
            <SectionTitle sub={`系統偵測為 ${isMac ? "macOS" : "Windows / Linux"}，可自訂所有快捷鍵`}>快捷鍵管理</SectionTitle>
            <Card p="0 16px">
              {[
                { l: "懸停翻譯觸發鍵", k: MOD_KEY, d: "按住 + 滑鼠懸停段落即翻譯" },
                { l: "翻譯本頁 / 還原原文", k: isMac ? "⌥+A" : "Alt+A", d: "切換目前網頁的翻譯狀態" },
                { l: "翻譯完整頁面", k: isMac ? "⌥+W" : "Alt+W", d: "翻譯所有內容含側邊欄" },
                { l: "劃詞翻譯", k: "auto", d: "選取文字後自動顯示泡泡" },
                { l: "輸入框翻譯", k: "空白鍵 ×3", d: "連按 3 次空白鍵翻譯輸入內容" }
              ].map((it, i, a) => (
                <div key={i} style={{ padding: "13px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13 }}>{it.l}</div>
                    <div style={{ fontSize: 10.5, color: t.textSub, marginTop: 2 }}>{it.d}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <kbd style={{ minWidth: 60, textAlign: "center" }}>{it.k}</kbd>
                    <Btn size="sm">修改</Btn>
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

        {(tab === "pref" || tab === "rules" || tab === "lib" || tab === "adv") && (
          <Card>
            <div style={{ textAlign: "center", padding: 30, color: t.textSub, fontSize: 12 }}>
              此頁面內容請查看完整版 Demo，Claude Code 開發階段會擴充
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
