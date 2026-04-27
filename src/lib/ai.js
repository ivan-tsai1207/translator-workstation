export const ENGINES = {
  claude: {
    name: "Claude",
    provider: "Anthropic",
    desc: "長文、專業翻譯、文學風格",
    apiUrl: "https://api.anthropic.com/v1/messages",
    model: "claude-sonnet-4-20250514",
    type: "llm"
  },
  openai: {
    name: "ChatGPT",
    provider: "OpenAI",
    desc: "通用性強、流暢自然",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    type: "llm"
  },
  gemini: {
    name: "Gemini",
    provider: "Google",
    desc: "多模態、速度快、成本低",
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    model: "gemini-2.0-flash",
    type: "llm"
  },
  deepseek: {
    name: "DeepSeek",
    provider: "DeepSeek",
    desc: "中文翻譯極強、成本最低",
    apiUrl: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    type: "llm"
  },
  mistral: {
    name: "Mistral",
    provider: "Mistral AI",
    desc: "歐語強項、開源備援",
    apiUrl: "https://api.mistral.ai/v1/chat/completions",
    model: "mistral-small-latest",
    type: "llm"
  },
  deepl: {
    name: "DeepL",
    provider: "DeepL",
    desc: "翻譯品質頂尖、商務首選",
    apiUrl: "https://api-free.deepl.com/v2/translate",
    type: "traditional"
  },
  google: {
    name: "Google Translate",
    provider: "Google",
    desc: "100+ 語言、即時短句",
    apiUrl: "https://translation.googleapis.com/language/translate/v2",
    type: "traditional"
  }
};

export const SCENE_DEFAULTS = {
  selection: "deepl",
  page: "gemini",
  document: "claude",
  zhJa: "deepseek",
  professional: "claude",
  default: "claude"
};

export function getApiKey(engine) {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(`api_key_${engine}`) || "";
}

export function setApiKey(engine, key) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`api_key_${engine}`, key);
}

export function getSceneEngine(scene) {
  if (typeof window === "undefined") return SCENE_DEFAULTS[scene] || SCENE_DEFAULTS.default;
  return localStorage.getItem(`scene_engine_${scene}`) || SCENE_DEFAULTS[scene] || SCENE_DEFAULTS.default;
}

export function setSceneEngine(scene, engine) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`scene_engine_${scene}`, engine);
}

export async function translate({ engine = "claude", from = "auto", to, text }) {
  const e = ENGINES[engine];
  if (!e) throw new Error(`未知引擎: ${engine}`);

  const apiKey = getApiKey(engine);
  if (!apiKey) throw new Error(`請先在設定中填入 ${e.name} 的 API Key`);

  if (e.type === "llm") {
    const prompt = `Translate the following text${from !== "auto" ? ` from ${from}` : ""} to ${to}. Output ONLY the translation, no explanation.\n\n${text}`;

    if (engine === "claude") return callClaude(apiKey, e.model, prompt);
    if (engine === "gemini") return callGemini(apiKey, e.model, prompt);
    return callOpenAICompatible(apiKey, e.apiUrl, e.model, prompt);
  }

  if (engine === "deepl") return callDeepL(apiKey, from, to, text);
  if (engine === "google") return callGoogle(apiKey, from, to, text);

  throw new Error(`引擎 ${engine} 尚未實作`);
}

async function callClaude(apiKey, model, prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

async function callOpenAICompatible(apiKey, url, model, prompt) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}

async function callGemini(apiKey, model, prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates[0].content.parts[0].text;
}

const LANG_MAP_DEEPL = { "繁中": "ZH", "英文": "EN", "日文": "JA", "韓文": "KO", "法文": "FR", "德文": "DE", "西班牙文": "ES" };
const LANG_MAP_GOOGLE = { "繁中": "zh-TW", "英文": "en", "日文": "ja", "韓文": "ko", "法文": "fr", "德文": "de", "西班牙文": "es", "auto": "" };

async function callDeepL(apiKey, from, to, text) {
  const params = new URLSearchParams();
  params.append("text", text);
  params.append("target_lang", LANG_MAP_DEEPL[to] || to.toUpperCase());
  if (from !== "auto") params.append("source_lang", LANG_MAP_DEEPL[from] || from.toUpperCase());

  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  const data = await res.json();
  if (data.message) throw new Error(data.message);
  return data.translations[0].text;
}

async function callGoogle(apiKey, from, to, text) {
  const body = {
    q: text,
    target: LANG_MAP_GOOGLE[to] || to
  };
  if (from !== "auto" && LANG_MAP_GOOGLE[from]) body.source = LANG_MAP_GOOGLE[from];

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.data.translations[0].translatedText;
}
