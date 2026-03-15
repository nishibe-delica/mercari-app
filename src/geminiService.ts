const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeProductImage(
  imageBase64: string,
  productNumber: string,
  targetLength: number,
  headerTemplate: string,
  footerTemplate: string,
  closingStatement: string
): Promise<{
  productInfo: {
    productType: string;
    color: string;
    features: string;
    target: string;
  };
  titles: string[];
  description: string;
}> {
  console.log("🔍 Starting API call...");
  console.log("API Key exists:", !!API_KEY);
  console.log("API Key prefix:", API_KEY?.substring(0, 10));

  const prompt = `あなたはメルカリ出品のプロです。
以下の商品画像を分析し、JSON形式のみで出力してください。
説明文や前置きは不要です。JSONのみを出力してください。

{
  "productType": "商品の種類（例：パーカー、ニット、ワンピース）",
  "color": "色（例：ブラウン、茶色）",
  "features": "特徴（例：オーバーサイズ、英字ロゴ、フード付き）",
  "target": "ターゲット・シーン（例：カジュアル、韓国ファッション、秋冬）",
  "titles": [
    "メルカリ用タイトル候補1（40文字以内、スペース区切りでキーワードを並べる）",
    "メルカリ用タイトル候補2（40文字以内）",
    "メルカリ用タイトル候補3（40文字以内）"
  ],
  "description": "商品説明文（${targetLength}文字程度、自然な日本語、キーワードを自然に散りばめる、改行を含む）"
}

【説明文のルール】
- 最初の3行で商品の魅力を伝える
- コーディネート提案を含める
- シーン提案を含める（通勤、デート、カフェなど）
- 韓国ファッション、カジュアルなどのトレンドワードを自然に入れる
- 絵文字は♪と◎のみ、控えめに使用
- AIが書いたと思わせない自然な文章
- カラー情報・サイズ情報は含めないでください（別途追加します）`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
            }
          },
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  console.log("📡 Sending request to Gemini API...");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  console.log("📥 Response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Gemini API error:", errorData);
    throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  console.log("✅ Gemini API response:", data);

  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error("No content in response");
  }

  // JSONを抽出（```json ... ``` で囲まれている場合に対応）
  let jsonString = textContent;
  const jsonMatch = textContent.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    jsonString = jsonMatch[1];
  } else {
    // { から } までを抽出
    const startIndex = textContent.indexOf("{");
    const endIndex = textContent.lastIndexOf("}");
    if (startIndex !== -1 && endIndex !== -1) {
      jsonString = textContent.substring(startIndex, endIndex + 1);
    }
  }

  const result = JSON.parse(jsonString);

  // Combine description with header, color/size info, and footer
  const fullDescription = `${headerTemplate}

${result.description}

〇カラー〇
${result.color}

〇サイズ〇
平置き

${footerTemplate}

${closingStatement}

#${productNumber}`;

  return {
    productInfo: {
      productType: result.productType,
      color: result.color,
      features: result.features,
      target: result.target,
    },
    titles: result.titles,
    description: fullDescription
  };
}
