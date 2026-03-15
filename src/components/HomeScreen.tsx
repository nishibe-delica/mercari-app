import { useMercariStore } from '../store'
import Button from './Button'
import { Plus, FileText, Settings } from 'lucide-react'

export default function HomeScreen() {
  const setCurrentScreen = useMercariStore((state) => state.setCurrentScreen)

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[640px]">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">✿</div>
          <h1 className="text-3xl md:text-4xl font-bold text-heading-gray mb-4">
            メルカリ出品AIツール
          </h1>
          <p className="text-text-gray text-base leading-relaxed">
            商品情報を入力するだけで<br className="md:hidden" />
            魅力的なタイトルと説明文を自動生成
          </p>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 space-y-4">
          <Button
            onClick={() => setCurrentScreen('input')}
            className="bg-rose-beige hover:bg-rose-beige-hover"
          >
            <Plus size={24} />
            <span>新規作成</span>
          </Button>

          <Button
            onClick={() => setCurrentScreen('restore')}
            variant="secondary"
          >
            <FileText size={24} />
            <span>既存から復元</span>
          </Button>

          <Button
            onClick={() => setCurrentScreen('settings')}
            variant="outline"
          >
            <Settings size={24} />
            <span>設定</span>
          </Button>
        </div>

        {/* フッター */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-gray/60">
            タップしやすい、使いやすい、心地よい
          </p>
        </div>
      </div>
    </div>
  )
}
