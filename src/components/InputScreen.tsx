import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { generateTitles, generateDescription } from '../aiGenerator'

export default function InputScreen() {
  const { formData, setFormData, setCurrentScreen, settings, setGeneratedContent } = useMercariStore()

  const handleGenerate = () => {
    const titles = generateTitles(formData)
    const description = generateDescription(formData, settings)
    setGeneratedContent({ titles, description })
    setCurrentScreen('output')
  }

  const inputClass = "w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-pink focus:ring-2 focus:ring-dusty-pink/20 transition-all bg-white text-text-gray"
  const labelClass = "block text-sm font-semibold text-heading-gray mb-2"

  return (
    <div className="min-h-screen bg-warm-white px-6 py-8">
      <div className="max-w-[640px] mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-soft text-text-gray hover:text-heading-gray hover:shadow-lg transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold text-heading-gray">商品情報入力</h2>
        </div>

        {/* フォームカード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 space-y-6">
          {/* 商品番号 */}
          <div>
            <label className={labelClass}>
              商品番号 <span className="text-dusty-pink">*</span>
            </label>
            <input
              type="text"
              value={formData.productNumber}
              onChange={(e) => setFormData({ productNumber: e.target.value })}
              className={inputClass}
              placeholder="例: A12345"
            />
          </div>

          {/* カテゴリ */}
          <div>
            <label className={labelClass}>
              カテゴリ <span className="text-dusty-pink">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ category: e.target.value })}
              className={inputClass}
            >
              <option value="">選択してください</option>
              <option value="レディース">レディース</option>
              <option value="メンズ">メンズ</option>
              <option value="キッズ">キッズ</option>
              <option value="インテリア">インテリア</option>
              <option value="雑貨">雑貨</option>
            </select>
          </div>

          {/* 商品種類 */}
          <div>
            <label className={labelClass}>
              商品種類 <span className="text-dusty-pink">*</span>
            </label>
            <input
              type="text"
              value={formData.productType}
              onChange={(e) => setFormData({ productType: e.target.value })}
              className={inputClass}
              placeholder="例: ワンピース、Tシャツ、クッション"
            />
          </div>

          {/* カラー */}
          <div>
            <label className={labelClass}>
              カラー <span className="text-dusty-pink">*</span>
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ color: e.target.value })}
              className={inputClass}
              placeholder="例: ベージュ、ホワイト、ブラック"
            />
          </div>

          {/* 特徴 */}
          <div>
            <label className={labelClass}>
              特徴
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ features: e.target.value })}
              className={inputClass}
              placeholder="例: フリル、ロング丈、コットン100%"
            />
          </div>

          {/* ターゲット */}
          <div>
            <label className={labelClass}>
              ターゲット
            </label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({ target: e.target.value })}
              className={inputClass}
              placeholder="例: 20代〜30代の女性、カジュアル好きな方"
            />
          </div>

          {/* 文字数 */}
          <div>
            <label className={labelClass}>
              文字数
            </label>
            <select
              value={formData.charCount}
              onChange={(e) => setFormData({ charCount: Number(e.target.value) })}
              className={inputClass}
            >
              <option value={600}>600文字</option>
              <option value={700}>700文字</option>
              <option value={800}>800文字</option>
              <option value={900}>900文字</option>
            </select>
          </div>

          {/* 追加の指示 */}
          <div>
            <label className={labelClass}>
              追加の指示
            </label>
            <textarea
              value={formData.additionalInstructions}
              onChange={(e) => setFormData({ additionalInstructions: e.target.value })}
              className={`${inputClass} h-32 resize-none`}
              placeholder="特に強調したいポイントや注意点があれば記入してください"
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleGenerate}>
              <Sparkles size={24} />
              <span>AIで生成する</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
