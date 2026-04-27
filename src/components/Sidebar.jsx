import { t } from "../theme.js";

const NAV = [
  { k: "text",     icon: "✏️",  label: "文字翻譯" },
  { k: "doc",      icon: "📄",  label: "文件翻譯" },
  { k: "video",    icon: "🎬",  label: "影片翻譯" },
  { k: "image",    icon: "🖼️",  label: "圖片翻譯" },
  { k: "web",      icon: "🌐",  label: "網頁翻譯" },
  { k: "lib",      icon: "📚",  label: "資料庫" },
  { k: "settings", icon: "⚙️",  label: "設定" },
];

export default function Sidebar({ page, setPage }) {
  return (
    <div style={{
      width: 64,
      flexShrink: 0,
      height: "100vh",
      background: t.surface,
      borderRight: `1px solid ${t.border}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 16,
      paddingBottom: 16,
      gap: 4,
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: t.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 16,
        flexShrink: 0
      }}>
        譯
      </div>

      {NAV.map(item => (
        <NavItem
          key={item.k}
          item={item}
          active={page === item.k}
          onClick={() => setPage(item.k)}
        />
      ))}
    </div>
  );
}

function NavItem({ item, active, onClick }) {
  return (
    <div
      onClick={onClick}
      title={item.label}
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        cursor: "pointer",
        background: active ? t.primarySoft : "transparent",
        color: active ? t.primary : t.textMuted,
        transition: "all 0.15s",
        position: "relative"
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = t.surfaceAlt;
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      {item.icon}
    </div>
  );
}
