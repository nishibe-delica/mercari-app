import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Copy, RefreshCw, Edit } from 'lucide-react'
import { regenerateTitles, regenerateDescription } from '../aiGenerator'
import { useState } from 'react'

export default function OutputScreen() {
  const { generatedContent, setCurrentScreen, formData, settings, setGeneratedContent } = useMercariStore()
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  if (!generatedContent) {
    setCurrentScreen('home')
    return null
  }

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopySuccess(label)
    setTimeout(() => setCopySuccess(null), 2000)
  }

  const handleRegenerateTitles = () => {
    const newTitles = regenerateTitles(formData)
    setGeneratedContent({ ...generatedContent, titles: newTitles })
  }

  const handleRegenerateDescription = () => {
    const newDescription = regenerateDescription(formData, settings)
    setGeneratedContent({ ...generatedContent, description: newDescription })
  }

  const numberIcons = ['❶', '❷', '❸']

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
          <h2 className="text-2xl font-bold text-heading-gray">生成結果</h2>
        </div>

        {/* タイトル候補セクション */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
          <h3 className="text-lg font-bold text-heading-gray mb-4 flex items-center gap-2">
            📝 タイトル候補
          </h3>
          <div className="border-b border-gray-200 mb-6"></div>

          <div className="space-y-4">
            {generatedContent.titles.map((title, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover:border-dusty-pink transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{numberIcons[index]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-gray leading-relaxed break-words">{title}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(title, `title-${index}`)}
                    className="flex-shrink-0 px-4 py-2 rounded-lg bg-rose-beige text-white hover:bg-rose-beige-hover transition-all text-sm font-medium"
                  >
                    {copySuccess === `title-${index}` ? '✓' : 'コピー'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleRegenerateTitles}
              className="w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-lg flex items-center justify-center gap-3 text-base bg-white text-text-gray border-2 border-gray-200 hover:border-dusty-pink"
            >
              <RefreshCw size={20} />
              <span>🔄 タイトルを再生成</span>
            </button>
          </div>
        </div>

        {/* 商品説明文セクション */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
          <h3 className="text-lg font-bold text-heading-gray mb-4 flex items-center gap-2">
            📝 商品説明文
          </h3>
          <div className="border-b border-gray-200 mb-6"></div>

          <div className="bg-warm-white rounded-xl p-6 mb-4 border-2 border-gray-200 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-sm text-text-gray leading-relaxed">
              {generatedContent.description}
            </pre>
          </div>

          <div className="mb-4">
            <p className="text-sm text-text-gray flex items-center gap-2">
              📊 文字数：{generatedContent.description.length}文字
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleCopy(generatedContent.description, 'description')}
              className="bg-rose-beige hover:bg-rose-beige-hover"
            >
              <Copy size={20} />
              <span>📋 全文コピー</span>
            </Button>

            <button
              onClick={handleRegenerateDescription}
              className="w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-lg flex items-center justify-center gap-3 text-base bg-white text-text-gray border-2 border-gray-200 hover:border-dusty-pink"
            >
              <RefreshCw size={20} />
              <span>🔄 説明文を再生成</span>
            </button>

            <button
              onClick={() => setCurrentScreen('input')}
              className="w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-lg flex items-center justify-center gap-3 text-base bg-white text-text-gray border-2 border-gray-200 hover:border-dusty-pink"
            >
              <Edit size={20} />
              <span>✏️ 入力内容を修正</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
