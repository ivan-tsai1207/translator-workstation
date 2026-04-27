import { useState } from "react";
import { t } from "../theme.js";
import { isMac, MOD_KEY } from "../platform.js";
import Toggle from "../components/Toggle.jsx";
import { ENGINES, getApiKey, setApiKey, getSceneEngine, setSceneEngine, SCENE_DEFAULTS } from "../lib/ai.js";

const SETTINGS_NAV = [
  { k: "engine", l: "AI 引擎" },
  { k: "shortcut", l: "快捷鍵" },
  { k: "appearance", l: "外觀" },
  { k: "account", l: "帳號" }
];

export default function Settings() {
  const [section, setSection] = useState("engine");

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {/* 左側 nav */}
      <div style={{ width: 140, flexShrink: 0 }}>
        {SETTINGS_NAV.map(item => (
          <div
            key={item.k}
            onClick={() => setSection(item.k)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              color: section === item.k ? t.primary : t.textSub,
              background: section === item.k ? t.primarySoft : "transparent",
              fontWeight: section === item.k ? 500 : 400,
              marginBottom: 2
            }}
          >
            {item.l}
          </div>
        ))}
      </div>

      {/* 右側內容 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {section === "engine" && <EngineSection />}
        {section === "shortcut" && <ShortcutSection />}
        {section === "appearance" && <AppearanceSection />}
        {section === "account" && <AccountSection />}
      </div>
    </div>
  );
}

function EngineSection() {
  const [modalEngine, setModalEngine] = useState(null);
  const [tempKey, setTempKey] = useState("");
  const [saved, setSaved] = useState({});
  const [scenes, setScenes] = useState(() => ({
    selection: getSceneEngine("selection"),
    page: getSceneEngine("page"),
    document: getSceneEngine("document"),
    zhJa: getSceneEngine("zhJa"),
    default: getSceneEngine("default")
  }));

  const openModal = (key) => {
    setModalEngine(key);
    setTempKey(getApiKey(key));
  };

  const saveKey = () => {
    setApiKey(modalEngine, tempKey);
    setSaved(s => ({ ...s, [modalEngine]: true }));
    setModalEngine(null);
  };

  const updateScene = (scene, engine) => {
    setSceneEngine(scene, engine);
    setScenes(s => ({ ...s, [scene]: engine }));
  };

  const API_DOCS = {
    claude: "https://console.anthropic.com/",
    openai: "https://platform.openai.com/api-keys",
    gemini: "https://aistudio.google.com/apikey",
    deepseek: "https://platform.deepseek.com/api_keys",
    mistral: "https://console.mistral.ai/api-keys",
    deepl: "https://www.deepl.com/pro-api",
    google: "https://console.cloud.google.com/"
  };

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 4 }}>AI 引擎</div>
      <div style={{ fontSize: 12, color: t.textSub, marginBottom: 16 }}>設定各引擎 API Key，並指派不同場景使用的引擎</div>

      {/* 引擎列表 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {Object.entries(ENGINES).map(([key, eng]) => {
          const connected = !!getApiKey(key) || saved[key];
          return (
            <div key={key} style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: t.primarySoft,
                color: t.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 600
              }}>
                {eng.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>
                  {eng.name}
                  <span style={{ marginLeft: 6, fontSize: 11, color: t.textMuted, fontWeight: 400 }}>{eng.provider}</span>
                </div>
                <div style={{ fontSize: 11, color: t.textSub, marginTop: 2 }}>{eng.desc}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 100,
                  background: connected ? "#E8F5EF" : t.surfaceAlt,
                  color: connected ? t.success : t.textMuted
                }}>
                  {connected ? "已連接" : "未連接"}
                </span>
                <button
                  onClick={() => openModal(key)}
                  style={{
                    padding: "5px 14px", borderRadius: 100,
                    border: `1px solid ${t.border}`,
                    background: t.surface, color: t.text,
                    fontSize: 12, cursor: "pointer", fontFamily: "inherit"
                  }}
                >
                  {connected ? "管理" : "連接"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 場景指派 */}
      <div style={{ fontSize: 14, fontWeight: 500, color: t.text, marginBottom: 12 }}>場景引擎指派</div>
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
        {[
          { k: "selection", l: "劃詞翻譯" },
          { k: "page", l: "整頁翻譯" },
          { k: "document", l: "文件翻譯" },
          { k: "zhJa", l: "中日翻譯" },
          { k: "default", l: "預設引擎" }
        ].map((scene, i, arr) => (
          <div key={scene.k} style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none"
          }}>
            <span style={{ fontSize: 13, color: t.text }}>{scene.l}</span>
            <select
              value={scenes[scene.k]}
              onChange={e => updateScene(scene.k, e.target.value)}
              style={{
                padding: "4px 10px", borderRadius: 8,
                border: `1px solid ${t.border}`,
                background: t.surfaceAlt,
                color: t.text, fontSize: 12,
                fontFamily: "inherit", cursor: "pointer"
              }}
            >
              {Object.entries(ENGINES).map(([key, eng]) => (
                <option key={key} value={key}>{eng.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* API Key Modal */}
      {modalEngine && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: t.surface, borderRadius: 16, padding: 28, width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 6 }}>
              {ENGINES[modalEngine]?.name} API Key
            </div>
            <div style={{ fontSize: 12, color: t.textSub, marginBottom: 16 }}>
              Key 僅儲存在你的瀏覽器本機，不會上傳到任何伺服器。{" "}
              <a href={API_DOCS[modalEngine]} target="_blank" rel="noreferrer" style={{ color: t.primary }}>申請 Key →</a>
            </div>
            <input
              type="password"
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && saveKey()}
              placeholder="貼上 API Key..."
              autoFocus
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: `1px solid ${t.border}`, fontSize: 13,
                color: t.text, background: t.surfaceAlt,
                fontFamily: "monospace", outline: "none",
                boxSizing: "border-box"
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
              <button onClick={() => setModalEngine(null)} style={{ padding: "8px 18px", borderRadius: 100, border: `1px solid ${t.border}`, background: "transparent", color: t.textSub, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>取消</button>
              <button onClick={saveKey} style={{ padding: "8px 18px", borderRadius: 100, border: "none", background: t.primary, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>儲存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShortcutSection() {
  const shortcuts = [
    { l: "懸停翻譯觸發鍵", k: MOD_KEY, d: "按住 + 滑鼠懸停段落即翻譯" },
    { l: "翻譯本頁 / 還原原文", k: isMac ? "⌥ + A" : "Alt+A", d: "切換目前網頁的翻譯狀態" },
    { l: "翻譯完整頁面", k: isMac ? "⌥ + W" : "Alt+W", d: "翻譯所有內容含側邊欄" },
    { l: "劃詞翻譯", k: "自動", d: "選取文字後自動顯示泡泡" },
    { l: "輸入框翻譯", k: "Space ×3", d: "連按 3 次空白鍵翻譯輸入內容" }
  ];

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 4 }}>快捷鍵</div>
      <div style={{ fontSize: 12, color: t.textSub, marginBottom: 16 }}>
        系統偵測為 {isMac ? "macOS" : "Windows / Linux"}
      </div>
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
        {shortcuts.map((item, i) => (
          <div key={i} style={{
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: i < shortcuts.length - 1 ? `1px solid ${t.border}` : "none"
          }}>
            <div>
              <div style={{ fontSize: 13, color: t.text }}>{item.l}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{item.d}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <kbd style={{
                padding: "3px 10px", borderRadius: 6,
                background: t.surfaceAlt, border: `1px solid ${t.border}`,
                fontSize: 12, color: t.text, fontFamily: "monospace"
              }}>{item.k}</kbd>
              <button style={{ padding: "4px 12px", borderRadius: 100, border: `1px solid ${t.border}`, background: "transparent", color: t.textSub, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>修改</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceSection() {
  const [lang, setLang] = useState("繁中");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("standard");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 4 }}>外觀</div>

      <SettingBlock title="介面語言">
        <div style={{ display: "flex", gap: 2, background: t.surfaceAlt, borderRadius: 10, padding: 3, width: "fit-content" }}>
          {["繁中", "日本語", "English"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 14px", borderRadius: 8, border: "none", background: lang === l ? t.surface : "transparent", color: lang === l ? t.text : t.textSub, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: lang === l ? 500 : 400 }}>{l}</button>
          ))}
        </div>
      </SettingBlock>

      <SettingBlock title="主題">
        <div style={{ display: "flex", gap: 2, background: t.surfaceAlt, borderRadius: 10, padding: 3, width: "fit-content" }}>
          {[["light", "淺色"], ["dark", "深色"], ["system", "跟隨系統"]].map(([k, l]) => (
            <button key={k} onClick={() => setTheme(k)} style={{ padding: "5px 14px", borderRadius: 8, border: "none", background: theme === k ? t.surface : "transparent", color: theme === k ? t.text : t.textSub, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: theme === k ? 500 : 400 }}>{l}</button>
          ))}
        </div>
      </SettingBlock>

      <SettingBlock title="字級">
        <div style={{ display: "flex", gap: 2, background: t.surfaceAlt, borderRadius: 10, padding: 3, width: "fit-content" }}>
          {[["small", "小"], ["standard", "標準"], ["large", "大"]].map(([k, l]) => (
            <button key={k} onClick={() => setFontSize(k)} style={{ padding: "5px 14px", borderRadius: 8, border: "none", background: fontSize === k ? t.surface : "transparent", color: fontSize === k ? t.text : t.textSub, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: fontSize === k ? 500 : 400 }}>{l}</button>
          ))}
        </div>
      </SettingBlock>
    </div>
  );
}

function AccountSection() {
  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 500, color: t.text, marginBottom: 4 }}>帳號</div>
      <div style={{
        background: t.surface, border: `1px solid ${t.border}`,
        borderRadius: 12, padding: "48px 24px", textAlign: "center"
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>即將開放</div>
        <div style={{ fontSize: 12, color: t.textSub, marginTop: 6 }}>帳號系統（Supabase Auth）正在開發中</div>
      </div>
    </div>
  );
}

function SettingBlock({ title, children }) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: t.text, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
