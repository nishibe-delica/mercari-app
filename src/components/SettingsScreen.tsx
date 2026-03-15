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
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-light text-gray-800">設定</h2>
        </div>

        <div className="space-y-6">
          {/* ヘッダーテンプレート */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">ヘッダーテンプレート</h3>
            <p className="text-sm text-gray-500 mb-4">
              説明文の冒頭に表示される内容です
            </p>
            <textarea
              value={localSettings.headerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, headerTemplate: e.target.value })
              }
              className="w-full h-48 px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none font-mono text-sm"
            />
            <button
              onClick={() => handleSave('headerTemplate')}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors"
            >
              <Save size={18} />
              {saveSuccess === 'headerTemplate' ? '保存しました!' : '保存'}
            </button>
          </div>

          {/* フッターテンプレート */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">フッターテンプレート</h3>
            <p className="text-sm text-gray-500 mb-4">
              説明文の末尾に表示される内容です（注意事項など）
            </p>
            <textarea
              value={localSettings.footerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, footerTemplate: e.target.value })
              }
              className="w-full h-64 px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none font-mono text-sm"
            />
            <button
              onClick={() => handleSave('footerTemplate')}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors"
            >
              <Save size={18} />
              {saveSuccess === 'footerTemplate' ? '保存しました!' : '保存'}
            </button>
          </div>

          {/* 締めの一文 */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">締めの一文</h3>
            <p className="text-sm text-gray-500 mb-4">
              フッターの後、商品番号の前に表示される一文です
            </p>
            <textarea
              value={localSettings.closingStatement}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, closingStatement: e.target.value })
              }
              className="w-full h-24 px-4 py-3 border border-beige-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none"
            />
            <button
              onClick={() => handleSave('closingStatement')}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-dusty-pink text-white rounded-lg hover:bg-dusty-rose transition-colors"
            >
              <Save size={18} />
              {saveSuccess === 'closingStatement' ? '保存しました!' : '保存'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
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
