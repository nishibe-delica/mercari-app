const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiResponse {
  productType: string
  color: string
  features: string
  target: string
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
): Promise<{ productInfo: any; titles: string[]; description: string }> {
  try {
    console.log('🔍 Starting API call...')
    console.log('API Key exists:', !!GEMINI_API_KEY)
    console.log('API Key prefix:', GEMINI_API_KEY?.substring(0, 10))

    // Convert image to base64
    const base64Image = await fileToBase64(imageFile)
    const imageData = base64Image.split(',')[1] // Remove data:image/...;base64, prefix
    console.log('✅ Image converted to base64')

    const prompt = `あなたはメルカリ出品のプロです。
以下の商品画像を分析し、JSON形式で出力してください。

{
  "productType": "商品の種類（例：ニット帽、マフラー）",
  "color": "色（例：ホワイト、白）",
  "features": "特徴（例：くま耳、ふわもこ、防寒）",
  "target": "ターゲット・シーン（例：冬、通勤、ディズニー）",
  "titles": [
    "タイトル候補1（40文字以内）",
    "タイトル候補2（40文字以内）",
    "タイトル候補3（40文字以内）"
  ],
  "description": "商品説明文（ヘッダー・フッターなしの本文のみ、${charCount}文字程度）"
}

【説明文のルール】
・自然な日本語で、AIが書いたと思わせない
・キーワードを自然に散りばめる
・3ブロック構造：商品の魅力 → コーデ提案 → おすすめポイント
・絵文字は♪と◎のみ控えめに使用

商品説明文は以下の要素を含めてください：
・「ご覧いただきありがとうございます」から始める
・商品の魅力を凝縮した紹介文
・コーディネートやシーン提案

※注意：カラー情報・サイズ情報は含めないでください（別途追加します）

JSONのみを返してください。`

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

    console.log('📡 Sending request to Gemini API...')
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    console.log('📥 Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Gemini API error:', errorData)
      throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    const textContent = data.candidates[0].content.parts[0].text

    // Extract JSON from the response (may be wrapped in ```json ... ```)
    let jsonText = textContent.trim()
    const jsonMatch = textContent.match(/```json\s*([\s\S]*?)\s*```/) || textContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonText = jsonMatch[1] || jsonMatch[0]
    }

    const result: GeminiResponse = JSON.parse(jsonText)

    // Combine description with header, color/size info, and footer
    const fullDescription = `${headerTemplate}

${result.description}

〇カラー〇
${result.color}

〇サイズ〇
平置き

${footerTemplate}

${closingStatement}

#${productNumber}`

    return {
      productInfo: {
        productType: result.productType,
        color: result.color,
        features: result.features,
        target: result.target,
      },
      titles: result.titles,
      description: fullDescription
    }
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
