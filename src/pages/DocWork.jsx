import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import Toggle from "../components/Toggle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function DocWork() {
  const files = [
    { n: "Q3 財報摘要.pdf", s: "2.4 MB", st: "已完成", date: "今天" },
    { n: "技術規格書.docx", s: "856 KB", st: "翻譯中", date: "5 分鐘前", p: 65 },
  ];
  return (
    <div>
      <SectionTitle sub="支援 PDF、Word、TXT、ePUB、Markdown、字幕檔(.srt/.ass)">📄 文件翻譯</SectionTitle>

      <div style={{ background: t.card, border: `1.5px dashed ${t.primary}`, borderRadius: 14, padding: "40px 20px", textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: t.text, marginBottom: 4 }}>拖曳或點擊上傳文件</div>
        <div style={{ fontSize: 11.5, color: t.textSub, marginBottom: 12 }}>支援 PDF / Word / TXT / ePUB / Markdown / SRT / ASS</div>
        <Btn primary>選擇文件</Btn>
      </div>

      <Card style={{ marginBottom: 14 }} p="12px 16px">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, color: t.textSub }}>引擎</span>
          <Pill on>Claude</Pill><Pill>ChatGPT</Pill><Pill>Gemini</Pill>
          <span style={{ fontSize: 11.5, color: t.textSub, marginLeft: 12 }}>譯文</span>
          <select style={{ fontSize: 12, padding: "4px 10px", borderRadius: 8, border: `0.5px solid ${t.borderStrong}`, background: t.bg, fontFamily: "inherit" }}><option>繁中</option></select>
          <div style={{ flex: 1 }}></div>
          <Pill on>雙語對照</Pill><Pill>純譯文</Pill>
          <span style={{ fontSize: 11.5, color: t.textSub, marginLeft: 8 }}>OCR</span>
          <Toggle on={true} onClick={() => {}} />
        </div>
      </Card>

      <SectionTitle>近期文件</SectionTitle>
      <Card p="4px 16px">
        {files.map((f, i, a) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>📄</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: t.text, marginBottom: 3 }}>{f.n}</div>
              <div style={{ fontSize: 10.5, color: t.textSub }}>{f.s} · {f.date}</div>
              {f.p && <div style={{ marginTop: 6, height: 3, background: t.stage, borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${f.p}%`, height: "100%", background: t.primary }}></div></div>}
            </div>
            <span style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 100, background: f.st === "已完成" ? t.successLight : t.accentLight, color: f.st === "已完成" ? "#2D7A5C" : "#B8761A" }}>{f.st}</span>
            <Btn size="sm">{f.st === "已完成" ? "下載" : "查看"}</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}
