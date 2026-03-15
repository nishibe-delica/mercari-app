import { useState } from 'react'
import { useMercariStore } from '../store'
import { ArrowLeft, Save, Home } from 'lucide-react'

export default function SettingsScreen() {
  const { settings, setSettings, setCurrentScreen } = useMercariStore()
  const [localSettings, setLocalSettings] = useState(settings)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

  const handleSave = (field: 'headerTemplate' | 'footerTemplate' | 'closingStatement') => {
    setSettings({ [field]: localSettings[field] })
    setSaveSuccess(field)
    setTimeout(() => setSaveSuccess(null), 2000)
  }

  const textareaClass = "w-full px-4 py-4 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-pink focus:ring-2 focus:ring-dusty-pink/20 transition-all bg-warm-white resize-none text-text-gray leading-relaxed"

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
          <h2 className="text-2xl font-bold text-heading-gray">テンプレート設定</h2>
        </div>

        <div className="space-y-6">
          {/* ヘッダーテンプレート */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2 flex items-center gap-2">
              📝 ヘッダーテンプレート
            </h3>
            <p className="text-sm text-text-gray/60 mb-4">
              説明文の最初に表示される内容
            </p>
            <textarea
              value={localSettings.headerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, headerTemplate: e.target.value })
              }
              className={`${textareaClass} h-48 mb-4`}
            />
            <button
              onClick={() => handleSave('headerTemplate')}
              className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                saveSuccess === 'headerTemplate'
                  ? 'bg-green-500 text-white shadow-soft'
                  : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
              }`}
            >
              <Save size={20} />
              <span>{saveSuccess === 'headerTemplate' ? '保存しました！' : '💾 保存'}</span>
            </button>
          </div>

          {/* フッターテンプレート */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2 flex items-center gap-2">
              📝 フッターテンプレート
            </h3>
            <p className="text-sm text-text-gray/60 mb-4">
              説明文の末尾に表示される内容
            </p>
            <textarea
              value={localSettings.footerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, footerTemplate: e.target.value })
              }
              className={`${textareaClass} h-64 mb-4`}
            />
            <button
              onClick={() => handleSave('footerTemplate')}
              className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                saveSuccess === 'footerTemplate'
                  ? 'bg-green-500 text-white shadow-soft'
                  : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
              }`}
            >
              <Save size={20} />
              <span>{saveSuccess === 'footerTemplate' ? '保存しました！' : '💾 保存'}</span>
            </button>
          </div>

          {/* 締めの一文 */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2 flex items-center gap-2">
              📝 締めの一文
            </h3>
            <p className="text-sm text-text-gray/60 mb-4">
              フッター後、商品番号前に表示
            </p>
            <textarea
              value={localSettings.closingStatement}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, closingStatement: e.target.value })
              }
              className={`${textareaClass} h-24 mb-4`}
            />
            <button
              onClick={() => handleSave('closingStatement')}
              className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                saveSuccess === 'closingStatement'
                  ? 'bg-green-500 text-white shadow-soft'
                  : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
              }`}
            >
              <Save size={20} />
              <span>{saveSuccess === 'closingStatement' ? '保存しました！' : '💾 保存'}</span>
            </button>
          </div>
        </div>

        {/* ホームに戻る */}
        <div className="mt-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-lg flex items-center justify-center gap-3 text-base bg-white text-text-gray border-2 border-gray-200 hover:border-dusty-pink"
          >
            <Home size={24} />
            <span>🏠 ホームに戻る</span>
          </button>
        </div>
      </div>
    </div>
  )
}
