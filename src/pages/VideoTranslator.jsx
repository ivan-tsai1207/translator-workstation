import GenericTool from "./GenericTool.jsx";

export default function VideoTranslator() {
  return (
    <GenericTool
      icon="🎬"
      title="影片翻譯"
      desc="輸入 YouTube 或影片網址，自動生成翻譯字幕"
      placeholder="https://www.youtube.com/watch?v=..."
      inputType="url"
      onSubmit={async (url) => {
        throw new Error("請先在設定中填入 AI 引擎的 API Key，此功能需要後端支援");
      }}
    />
  );
}
