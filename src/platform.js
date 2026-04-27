export const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);
export const MOD_KEY = isMac ? "⌘" : "Ctrl";
