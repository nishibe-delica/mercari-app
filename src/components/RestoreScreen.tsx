import { useState } from 'react'
import { useMercariStore } from '../store'
import Button from './Button'
import { ArrowLeft, FileSearch } from 'lucide-react'

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

      if (!data.productNumber || !data.category || !data.productType || !data.color) {
        setError('必須項目が不足しています。商品番号、カテゴリ、商品種類、カラーを含めてください。')
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

        {/* 説明カード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-heading-gray mb-3">使い方</h3>
            <p className="text-text-gray leading-relaxed mb-2">
              Googleドキュメントなどからコピーした内容を貼り付けてください。
            </p>
            <p className="text-sm text-text-gray/60">
              ※「商品番号:」「カテゴリ:」「商品種類:」「カラー:」などの形式で記載されている必要があります
            </p>
          </div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            className="w-full h-96 px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-dusty-pink focus:ring-2 focus:ring-dusty-pink/20 transition-all bg-warm-white resize-none font-mono text-sm text-text-gray"
            placeholder="ここにGoogleドキュメントの内容を貼り付けてください

例:
商品番号: A12345
カテゴリ: レディース
商品種類: ワンピース
カラー: ベージュ
特徴: フリル付き
ターゲット: 20代女性"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <div className="mt-6">
            <Button onClick={handleRestore}>
              <FileSearch size={24} />
              <span>内容を読み取る</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
