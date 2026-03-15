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

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-light text-gray-800">商品情報入力</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          {/* 商品番号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              商品番号 <span className="text-dusty-rose">*</span>
            </label>
            <input
              type="text"
              value={formData.productNumber}
              onChange={(e) => setFormData({ productNumber: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
              placeholder="例: A12345"
            />
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ <span className="text-dusty-rose">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ category: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              商品種類 <span className="text-dusty-rose">*</span>
            </label>
            <input
              type="text"
              value={formData.productType}
              onChange={(e) => setFormData({ productType: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
              placeholder="例: ワンピース、Tシャツ、クッション"
            />
          </div>

          {/* カラー */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カラー <span className="text-dusty-rose">*</span>
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ color: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
              placeholder="例: ベージュ、ホワイト、ブラック"
            />
          </div>

          {/* 特徴 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              特徴
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ features: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
              placeholder="例: フリル、ロング丈、コットン100%"
            />
          </div>

          {/* ターゲット */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ターゲット
            </label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({ target: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
              placeholder="例: 20代〜30代の女性、カジュアル好きな方"
            />
          </div>

          {/* 文字数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文字数
            </label>
            <select
              value={formData.charCount}
              onChange={(e) => setFormData({ charCount: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink"
            >
              <option value={600}>600文字</option>
              <option value={700}>700文字</option>
              <option value={800}>800文字</option>
              <option value={900}>900文字</option>
            </select>
          </div>

          {/* 追加の指示 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              追加の指示
            </label>
            <textarea
              value={formData.additionalInstructions}
              onChange={(e) => setFormData({ additionalInstructions: e.target.value })}
              className="w-full px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink h-24 resize-none"
              placeholder="特に強調したいポイントや注意点があれば記入してください"
            />
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 mt-8"
          >
            <Sparkles size={20} />
            AIで生成する
          </Button>
        </div>
      </div>
    </div>
  )
}
