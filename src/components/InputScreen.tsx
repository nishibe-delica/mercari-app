import { useState } from 'react'
import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Search, Upload } from 'lucide-react'
import { analyzeProductImage } from '../geminiService'

export default function InputScreen() {
  const { formData, setFormData, setCurrentScreen, settings, setGeneratedContent } = useMercariStore()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ imageFile: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setFormData({ imageFile: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleGenerate = async () => {
    if (!formData.imageFile) {
      setError('画像を選択してください')
      return
    }

    if (!formData.productNumber) {
      setError('商品番号を入力してください')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await analyzeProductImage(
        formData.imageFile,
        formData.productNumber,
        formData.charCount,
        settings.headerTemplate,
        settings.footerTemplate,
        settings.closingStatement
      )

      // Update form data with AI-generated info
      setFormData({
        productType: result.productInfo.productType,
        color: result.productInfo.color,
        features: result.productInfo.features,
        target: result.productInfo.target,
      })

      // Set generated content
      setGeneratedContent({
        titles: result.titles,
        description: result.description
      })

      setCurrentScreen('output')
    } catch (err) {
      console.error('Generation error:', err)
      setError('生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
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
          {/* 商品画像 */}
          <div>
            <label className={`${labelClass} flex items-center gap-2`}>
              📷 商品画像
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-dusty-pink transition-all cursor-pointer bg-warm-white"
              onClick={() => document.getElementById('imageInput')?.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setImagePreview(null)
                      setFormData({ imageFile: null })
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="py-12">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-text-gray mb-2">
                    ここに画像をドラッグ
                  </p>
                  <p className="text-text-gray">
                    または クリックして選択
                  </p>
                </div>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* 商品番号 */}
          <div>
            <label className={labelClass}>
              商品番号
            </label>
            <input
              type="text"
              value={formData.productNumber}
              onChange={(e) => setFormData({ productNumber: e.target.value })}
              className={inputClass}
              placeholder="例: 1568"
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

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <div className="pt-4">
            <Button onClick={handleGenerate} className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}>
              <Search size={24} />
              <span>{isLoading ? '生成中...' : '🔍 AIで一括生成する'}</span>
            </Button>
          </div>

          <div className="bg-warm-white rounded-xl p-4 border-2 border-gray-200">
            <p className="text-sm text-text-gray flex items-start gap-2">
              <span className="flex-shrink-0">💡</span>
              <span>画像から商品情報を自動で読み取り、説明文まで生成します</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
