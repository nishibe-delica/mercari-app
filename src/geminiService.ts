const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiResponse {
  productInfo: {
    productType: string
    color: string
    features: string
    target: string
  }
  titles: string[]
  description: string
}

export async function analyzeProductImage(
  imageFile: File,
  productNumber: string,
  charCount: number,
  headerTemplate: string,
  footerTemplate: string,
  closingStatement: string
): Promise<GeminiResponse> {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile)
    const imageData = base64Image.split(',')[1] // Remove data:image/...;base64, prefix

    const prompt = `あなたはメルカリ出品のプロです。この商品画像を分析して、以下の情報を日本語で生成してください。

商品番号: ${productNumber}
説明文の目標文字数: ${charCount}文字

以下の形式のJSONで返してください：

{
  "productInfo": {
    "productType": "商品の種類（例: ニット帽、マフラー、ワンピース）",
    "color": "色（例: ホワイト、ベージュ、ブラック）",
    "features": "特徴（例: くま耳、小顔効果、オーバーサイズ）",
    "target": "ターゲット・シーン（例: 通勤、ディズニー、20代女性）"
  },
  "titles": [
    "タイトル案1（40文字以内、キーワードを詰め込む）",
    "タイトル案2（40文字以内、異なる切り口で）",
    "タイトル案3（40文字以内、さらに別の表現で）"
  ],
  "description": "商品説明文（${charCount}文字程度）"
}

説明文は以下の構成で生成してください：

【ヘッダー部分】
${headerTemplate}

【商品紹介文】（150〜200文字）
- 商品の魅力を凝縮
- 「ご覧いただきありがとうございます✿」から始める

【コーデ・シーン提案】
- 自然にキーワードを散りばめる
- ターゲット層に響く表現

【カラー・サイズ情報】
カラー: [色]
サイズ: 平置き

【フッター部分】
${footerTemplate}

【締めの一文】
${closingStatement}

【商品番号】
#${productNumber}

※大人っぽく、可愛すぎない雰囲気で書いてください。`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: imageData
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const textContent = data.candidates[0].content.parts[0].text

    // Extract JSON from the response (may be wrapped in ```json ... ```)
    const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/) || textContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Gemini response')
    }

    const jsonText = jsonMatch[1] || jsonMatch[0]
    const result = JSON.parse(jsonText)

    return result
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
