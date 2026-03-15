import { useState } from 'react'
import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Save } from 'lucide-react'

export default function SettingsScreen() {
  const { settings, setSettings, setCurrentScreen } = useMercariStore()
  const [localSettings, setLocalSettings] = useState(settings)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

  const handleSave = (field: 'headerTemplate' | 'footerTemplate' | 'closingStatement') => {
    setSettings({ [field]: localSettings[field] })
    setSaveSuccess(field)
    setTimeout(() => setSaveSuccess(null), 2000)
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
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800">設定</h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* ヘッダーテンプレート */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
            <h3 className="text-base sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">ヘッダーテンプレート</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              説明文の冒頭に表示される内容です
            </p>
            <textarea
              value={localSettings.headerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, headerTemplate: e.target.value })
              }
              className="w-full h-40 sm:h-48 px-3 py-2 sm:px-4 sm:py-3 border border-beige-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none font-mono text-xs sm:text-sm"
            />
            <button
              onClick={() => handleSave('headerTemplate')}
              className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-2 sm:px-6 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors text-sm sm:text-base"
            >
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
              {saveSuccess === 'headerTemplate' ? '保存しました!' : '保存'}
            </button>
          </div>

          {/* フッターテンプレート */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
            <h3 className="text-base sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">フッターテンプレート</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              説明文の末尾に表示される内容です（注意事項など）
            </p>
            <textarea
              value={localSettings.footerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, footerTemplate: e.target.value })
              }
              className="w-full h-56 sm:h-64 px-3 py-2 sm:px-4 sm:py-3 border border-beige-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none font-mono text-xs sm:text-sm"
            />
            <button
              onClick={() => handleSave('footerTemplate')}
              className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-2 sm:px-6 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors text-sm sm:text-base"
            >
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
              {saveSuccess === 'footerTemplate' ? '保存しました!' : '保存'}
            </button>
          </div>

          {/* 締めの一文 */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
            <h3 className="text-base sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">締めの一文</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              フッターの後、商品番号の前に表示される一文です
            </p>
            <textarea
              value={localSettings.closingStatement}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, closingStatement: e.target.value })
              }
              className="w-full h-20 sm:h-24 px-3 py-2 sm:px-4 sm:py-3 border border-beige-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none text-sm sm:text-base"
            />
            <button
              onClick={() => handleSave('closingStatement')}
              className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-2 sm:px-6 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors text-sm sm:text-base"
            >
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
              {saveSuccess === 'closingStatement' ? '保存しました!' : '保存'}
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Button
            onClick={() => setCurrentScreen('home')}
            variant="secondary"
            className="inline-flex"
          >
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
