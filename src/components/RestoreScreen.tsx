import { useState } from 'react'
import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function RestoreScreen() {
  const { setFormData, setCurrentScreen } = useMercariStore()
  const [pastedText, setPastedText] = useState('')
  const [error, setError] = useState('')

  const handleRestore = () => {
    try {
      const lines = pastedText.split('\n')
      const data: any = {}

      lines.forEach((line) => {
        if (line.includes('商品番号:')) {
          data.productNumber = line.split('商品番号:')[1]?.trim() || ''
        }
        if (line.includes('カテゴリ:')) {
          data.category = line.split('カテゴリ:')[1]?.trim() || ''
        }
        if (line.includes('商品種類:')) {
          data.productType = line.split('商品種類:')[1]?.trim() || ''
        }
        if (line.includes('カラー:')) {
          data.color = line.split('カラー:')[1]?.trim() || ''
        }
        if (line.includes('特徴:')) {
          data.features = line.split('特徴:')[1]?.trim() || ''
        }
        if (line.includes('ターゲット:')) {
          data.target = line.split('ターゲット:')[1]?.trim() || ''
        }
      })

      if (!data.productNumber && !data.color && !data.features) {
        setError('読み取れる情報が見つかりませんでした。商品番号、カラー、特徴などを含めてください。')
        return
      }

      setFormData(data)
      setError('')
      setCurrentScreen('input')
    } catch (err) {
      setError('データの読み取りに失敗しました。')
    }
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
          <h2 className="text-2xl font-bold text-heading-gray">既存から復元</h2>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
          <h3 className="text-lg font-bold text-heading-gray mb-6 flex items-center gap-2">
            📋 Googleドキュメントの内容を貼り付けてください
          </h3>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            className="w-full h-64 px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-pink focus:ring-2 focus:ring-dusty-pink/20 transition-all bg-warm-white resize-none text-text-gray mb-6"
            placeholder="ここに説明文をペーストしてください"
          />

          <div className="bg-warm-white rounded-xl p-4 mb-6 border-2 border-gray-200">
            <p className="text-sm text-text-gray font-medium mb-2">💡 以下の形式で読み取ります：</p>
            <ul className="text-sm text-text-gray space-y-1 ml-4">
              <li>・商品番号</li>
              <li>・カラー</li>
              <li>・商品の特徴</li>
            </ul>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Button onClick={handleRestore}>
            <RefreshCw size={24} />
            <span>🔄 内容を読み取る</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
