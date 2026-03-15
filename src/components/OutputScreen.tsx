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
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-light text-gray-800">生成結果</h2>
        </div>

        {/* タイトル候補 */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-gray-800">タイトル候補（各40文字以内）</h3>
            <button
              onClick={handleRegenerateTitles}
              className="flex items-center gap-2 text-dusty-rose hover:text-dusty-pink transition-colors"
            >
              <RefreshCw size={18} />
              再生成
            </button>
          </div>

          <div className="space-y-4">
            {generatedContent.titles.map((title, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-beige-50 rounded-xl">
                <span className="flex-1 text-gray-800">{title}</span>
                <button
                  onClick={() => handleCopy(title, `title-${index}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-beige-100 transition-colors"
                >
                  <Copy size={16} />
                  {copySuccess === `title-${index}` ? 'コピー済み!' : 'コピー'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 説明文 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-800">説明文</h3>
              <p className="text-sm text-gray-500 mt-1">
                現在の文字数: {generatedContent.description.length}文字
              </p>
            </div>
            <button
              onClick={handleRegenerateDescription}
              className="flex items-center gap-2 text-dusty-rose hover:text-dusty-pink transition-colors"
            >
              <RefreshCw size={18} />
              再生成
            </button>
          </div>

          <div className="bg-beige-50 rounded-xl p-6 mb-4">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {generatedContent.description}
            </pre>
          </div>

          <button
            onClick={() => handleCopy(generatedContent.description, 'description')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-dusty-pink to-dusty-rose text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Copy size={18} />
            {copySuccess === 'description' ? 'コピー済み!' : '全文コピー'}
          </button>
        </div>

        <div className="mt-6 text-center">
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
