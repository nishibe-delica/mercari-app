import type { FormData, Settings } from './store'

export function generateTitles(formData: FormData): string[] {
  const { productType, color, features, category } = formData

  const titles: string[] = []

  // パターン1: シンプル
  titles.push(`【${category}】${productType} ${color}${features ? ' ' + features : ''}`.slice(0, 40))

  // パターン2: 強調
  titles.push(`✨${productType} ${color} ${features || '新品未使用'}✨`.slice(0, 40))

  // パターン3: 詳細
  titles.push(`${color}${productType}${features ? '/' + features : ''} ${category}`.slice(0, 40))

  return titles
}

export function generateDescription(formData: FormData, settings: Settings): string {
  const { productType, color, features, target, charCount, productNumber } = formData
  const { headerTemplate, footerTemplate, closingStatement } = settings

  let description = ''

  // 1. ヘッダー
  description += headerTemplate + '\n\n'

  // 2. 商品紹介文
  const intro = `ご覧いただきありがとうございます✿

こちらは${color}の${productType}です。
${features ? features + 'が特徴で、' : ''}${target || 'どんなシーンにも合わせやすく'}、毎日のコーディネートに活躍してくれます。

シンプルながらも上品なデザインで、長くご愛用いただけるアイテムです。`

  description += intro + '\n\n'

  // 3. コーデ・シーン提案
  const scenes = generateSceneProposal(formData, charCount - description.length - footerTemplate.length - closingStatement.length - 150)
  if (scenes) {
    description += scenes + '\n\n'
  }

  // 4. カラー
  description += `【カラー】\n${color}\n\n`

  // 5. サイズ
  description += `【サイズ】\n平置き\n\n`

  // 6. フッター
  description += footerTemplate + '\n\n'

  // 7. 締めの一文
  description += closingStatement + '\n\n'

  // 8. 商品番号
  description += `#${productNumber}`

  return description
}

function generateSceneProposal(formData: FormData, maxLength: number): string {
  const proposals: Record<string, string> = {
    'レディース': `デイリーコーデからちょっとしたお出かけまで、幅広くお使いいただけます。
オフィスカジュアルにも、休日のリラックススタイルにもぴったり。
カジュアルにもきれいめにも着回せる万能アイテムです。`,
    'メンズ': `カジュアルスタイルに取り入れやすく、デイリーユースに最適です。
シンプルなデザインなので、どんなボトムスとも相性抜群。
オンオフ問わず活躍してくれます。`,
    'キッズ': `元気いっぱいのお子様にぴったりのアイテムです。
動きやすく、普段使いから遊び着まで幅広くお使いいただけます。
お友達とのお出かけやお稽古事にもおすすめです。`,
    'インテリア': `お部屋の雰囲気をぐっと素敵にしてくれるアイテムです。
シンプルなデザインなので、どんなインテリアにも馴染みます。
リビングや寝室、玄関など、様々な場所でお使いいただけます。`,
    '雑貨': `毎日の生活を少し豊かにしてくれる素敵なアイテムです。
シンプルで使いやすく、長くご愛用いただけます。
ご自宅用にはもちろん、プレゼントにもおすすめです。`,
  }

  const proposal = proposals[formData.category] || proposals['雑貨']

  if (proposal.length > maxLength) {
    return proposal.slice(0, maxLength) + '...'
  }

  return proposal
}

export function regenerateTitles(formData: FormData): string[] {
  // 少し異なるバリエーションを生成
  const { productType, color, features, category } = formData

  return [
    `${color} ${productType} ${features || '未使用'} ${category}`.slice(0, 40),
    `♡${productType}♡ ${color} ${features || '送料無料'}`.slice(0, 40),
    `【新品】${color}${productType}${features ? '/' + features : ''}`.slice(0, 40),
  ]
}

export function regenerateDescription(formData: FormData, settings: Settings): string {
  // 少し異なるバリエーションの説明文を生成
  return generateDescription(formData, settings)
}
