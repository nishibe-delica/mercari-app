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
      // 簡易的なパース処理
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
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10 px-4 py-6 sm:p-8">
      <div className="max-w-[640px] mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-800">既存から復元</h2>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Googleドキュメントなどからコピーした内容を貼り付けてください。
            <br />
            <span className="text-xs sm:text-sm text-gray-500">
              ※「商品番号:」「カテゴリ:」「商品種類:」「カラー:」などの形式で記載されている必要があります
            </span>
          </p>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            className="w-full h-64 sm:h-96 px-3 py-2 sm:px-4 sm:py-3 border border-beige-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-dusty-pink resize-none font-mono text-xs sm:text-sm"
            placeholder="ここにGoogleドキュメントの内容を貼り付けてください&#10;&#10;例:&#10;商品番号: A12345&#10;カテゴリ: レディース&#10;商品種類: ワンピース&#10;カラー: ベージュ&#10;特徴: フリル付き&#10;ターゲット: 20代女性"
          />

          {error && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            onClick={handleRestore}
            className="w-full mt-6 flex items-center justify-center gap-2"
          >
            <FileSearch size={20} />
            内容を読み取る
          </Button>
        </div>
      </div>
    </div>
  )
}
