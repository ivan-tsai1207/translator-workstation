import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import Toggle from "../components/Toggle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function ImageWork() {
  return (
    <div>
      <SectionTitle sub="OCR 識別圖片文字並翻譯，保留原圖風格">🖼 圖片翻譯</SectionTitle>
      <div style={{ background: t.card, border: `1.5px dashed ${t.primary}`, borderRadius: 14, padding: "50px 20px", textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>🖼</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: t.text, marginBottom: 4 }}>拖曳圖片或點擊上傳</div>
        <div style={{ fontSize: 11.5, color: t.textSub, marginBottom: 12 }}>支援 JPG、PNG、WebP，最大 10MB</div>
        <Btn primary>選擇圖片</Btn>
      </div>

      <Card style={{ marginBottom: 14 }} p="12px 16px">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, color: t.textSub }}>引擎</span>
          <Pill on>Claude</Pill><Pill>Gemini</Pill>
          <div style={{ flex: 1 }}></div>
          <span style={{ fontSize: 11.5, color: t.textSub }}>保留原圖樣式</span>
          <Toggle on={true} onClick={() => {}} />
        </div>
      </Card>
    </div>
  );
}
