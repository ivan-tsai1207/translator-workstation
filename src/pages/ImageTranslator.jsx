import GenericTool from "./GenericTool.jsx";

export default function ImageTranslator() {
  return (
    <GenericTool
      icon="🖼️"
      title="圖片翻譯"
      desc="上傳含文字的圖片，自動識別並翻譯"
      inputType="file"
      accept="image/*"
      onSubmit={async (file) => {
        throw new Error("圖片翻譯需要多模態 AI 支援，即將推出");
      }}
    />
  );
}
