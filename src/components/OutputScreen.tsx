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
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10 px-4 py-6 sm:p-8">
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800">生成結果</h2>
        </div>

        {/* タイトル候補 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-xl font-medium text-gray-800">タイトル候補</h3>
            <button
              onClick={handleRegenerateTitles}
              className="flex items-center gap-1 sm:gap-2 text-dusty-rose hover:text-dusty-pink transition-colors text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">再生成</span>
              <span className="sm:hidden">再生成</span>
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {generatedContent.titles.map((title, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-beige-50 rounded-lg sm:rounded-xl">
                <span className="flex-1 text-sm sm:text-base text-gray-800">{title}</span>
                <button
                  onClick={() => handleCopy(title, `title-${index}`)}
                  className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 bg-white rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-beige-100 transition-colors whitespace-nowrap"
                >
                  <Copy size={14} className="sm:w-4 sm:h-4" />
                  {copySuccess === `title-${index}` ? 'コピー済み!' : 'コピー'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 説明文 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-xl font-medium text-gray-800">説明文</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                現在の文字数: {generatedContent.description.length}文字
              </p>
            </div>
            <button
              onClick={handleRegenerateDescription}
              className="flex items-center gap-1 sm:gap-2 text-dusty-rose hover:text-dusty-pink transition-colors text-sm sm:text-base"
            >
              <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">再生成</span>
              <span className="sm:hidden">再生成</span>
            </button>
          </div>

          <div className="bg-beige-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-3 sm:mb-4">
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-gray-800 leading-relaxed">
              {generatedContent.description}
            </pre>
          </div>

          <button
            onClick={() => handleCopy(generatedContent.description, 'description')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-dusty-pink to-dusty-rose text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
            {copySuccess === 'description' ? 'コピー済み!' : '全文コピー'}
          </button>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <Button
            onClick={() => setCurrentScreen('input')}
            variant="secondary"
            className="inline-flex"
          >
            入力画面に戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
