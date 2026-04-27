import { t } from "../theme.js";

const PAGE_TITLES = {
  text: "文字翻譯",
  doc: "文件翻譯",
  video: "影片翻譯",
  image: "圖片翻譯",
  web: "網頁翻譯",
  lib: "資料庫",
  settings: "設定"
};

export default function TopBar({ page }) {
  return (
    <div style={{
      height: 44,
      background: t.surface,
      borderBottom: `1px solid ${t.border}`,
      display: "flex",
      alignItems: "center",
      paddingLeft: 20,
      paddingRight: 20,
      position: "fixed",
      top: 0,
      left: 64,
      right: 0,
      zIndex: 90
    }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>
        {PAGE_TITLES[page] || "翻譯工作站"}
      </span>
    </div>
  );
}
