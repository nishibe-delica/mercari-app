import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Copy, RefreshCw } from 'lucide-react'
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

        {/* タイトル候補カード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-heading-gray">タイトル候補</h3>
            <button
              onClick={handleRegenerateTitles}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dusty-pink/10 text-rose-beige hover:bg-dusty-pink/20 transition-all"
            >
              <RefreshCw size={18} />
              <span className="text-sm font-medium">再生成</span>
            </button>
          </div>

          <div className="space-y-3">
            {generatedContent.titles.map((title, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-3 p-4 bg-warm-white rounded-xl border-2 border-gray-100 hover:border-dusty-pink transition-all">
                  <span className="flex-1 text-text-gray leading-relaxed">{title}</span>
                  <button
                    onClick={() => handleCopy(title, `title-${index}`)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-text-gray hover:border-dusty-pink hover:text-rose-beige transition-all"
                  >
                    <Copy size={16} />
                    <span className="text-sm font-medium">
                      {copySuccess === `title-${index}` ? '✓' : 'コピー'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 説明文カード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-heading-gray">説明文</h3>
              <p className="text-sm text-text-gray/60 mt-1">
                {generatedContent.description.length}文字
              </p>
            </div>
            <button
              onClick={handleRegenerateDescription}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dusty-pink/10 text-rose-beige hover:bg-dusty-pink/20 transition-all"
            >
              <RefreshCw size={18} />
              <span className="text-sm font-medium">再生成</span>
            </button>
          </div>

          <div className="bg-warm-white rounded-xl p-6 mb-6 border-2 border-gray-100">
            <pre className="whitespace-pre-wrap font-sans text-sm text-text-gray leading-relaxed">
              {generatedContent.description}
            </pre>
          </div>

          <Button
            onClick={() => handleCopy(generatedContent.description, 'description')}
            className="bg-rose-beige hover:bg-rose-beige-hover"
          >
            <Copy size={24} />
            <span>{copySuccess === 'description' ? 'コピーしました！' : '全文コピー'}</span>
          </Button>
        </div>

        {/* 戻るボタン */}
        <Button
          onClick={() => setCurrentScreen('input')}
          variant="secondary"
        >
          <ArrowLeft size={24} />
          <span>入力画面に戻る</span>
        </Button>
      </div>
    </div>
  )
}
