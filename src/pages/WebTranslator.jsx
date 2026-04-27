import GenericTool from "./GenericTool.jsx";

export default function WebTranslator() {
  return (
    <GenericTool
      icon="🌐"
      title="網頁翻譯"
      desc="輸入網址，翻譯整個頁面的文字內容"
      placeholder="https://example.com"
      inputType="url"
      onSubmit={async (url) => {
        throw new Error("網頁翻譯需要 CORS Proxy 支援，請安裝 Chrome 插件使用");
      }}
    />
  );
}
