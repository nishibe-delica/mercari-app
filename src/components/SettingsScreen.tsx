import { useState } from 'react'
import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, Save, Check } from 'lucide-react'

export default function SettingsScreen() {
  const { settings, setSettings, setCurrentScreen } = useMercariStore()
  const [localSettings, setLocalSettings] = useState(settings)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

  const handleSave = (field: 'headerTemplate' | 'footerTemplate' | 'closingStatement') => {
    setSettings({ [field]: localSettings[field] })
    setSaveSuccess(field)
    setTimeout(() => setSaveSuccess(null), 2000)
  }

  const textareaClass = "w-full px-4 py-4 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-pink focus:ring-2 focus:ring-dusty-pink/20 transition-all bg-warm-white resize-none font-mono text-text-gray leading-relaxed"

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
          <h2 className="text-2xl font-bold text-heading-gray">設定</h2>
        </div>

        <div className="space-y-6">
          {/* ヘッダーテンプレート */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2">ヘッダーテンプレート</h3>
            <p className="text-sm text-text-gray/60 mb-4">
              説明文の冒頭に表示される内容です
            </p>
            <textarea
              value={localSettings.headerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, headerTemplate: e.target.value })
              }
              className={`${textareaClass} h-48`}
            />
            <div className="mt-4">
              <button
                onClick={() => handleSave('headerTemplate')}
                className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                  saveSuccess === 'headerTemplate'
                    ? 'bg-green-500 text-white'
                    : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
                }`}
              >
                {saveSuccess === 'headerTemplate' ? (
                  <>
                    <Check size={24} />
                    <span>保存しました！</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>保存</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* フッターテンプレート */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2">フッターテンプレート</h3>
            <p className="text-sm text-text-gray/60 mb-4">
              説明文の末尾に表示される内容です（注意事項など）
            </p>
            <textarea
              value={localSettings.footerTemplate}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, footerTemplate: e.target.value })
              }
              className={`${textareaClass} h-64`}
            />
            <div className="mt-4">
              <button
                onClick={() => handleSave('footerTemplate')}
                className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                  saveSuccess === 'footerTemplate'
                    ? 'bg-green-500 text-white'
                    : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
                }`}
              >
                {saveSuccess === 'footerTemplate' ? (
                  <>
                    <Check size={24} />
                    <span>保存しました！</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>保存</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 締めの一文 */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h3 className="text-lg font-bold text-heading-gray mb-2">締めの一文</h3>
            <p className="text-sm text-text-gray/60 mb-4">
              フッターの後、商品番号の前に表示される一文です
            </p>
            <textarea
              value={localSettings.closingStatement}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, closingStatement: e.target.value })
              }
              className={`${textareaClass} h-24`}
            />
            <div className="mt-4">
              <button
                onClick={() => handleSave('closingStatement')}
                className={`w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                  saveSuccess === 'closingStatement'
                    ? 'bg-green-500 text-white'
                    : 'bg-rose-beige text-white hover:bg-rose-beige-hover shadow-soft hover:shadow-lg'
                }`}
              >
                {saveSuccess === 'closingStatement' ? (
                  <>
                    <Check size={24} />
                    <span>保存しました！</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>保存</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ホームに戻る */}
        <div className="mt-6">
          <Button
            onClick={() => setCurrentScreen('home')}
            variant="secondary"
          >
            <ArrowLeft size={24} />
            <span>ホームに戻る</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
