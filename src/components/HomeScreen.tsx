import { useMercariStore } from '../store'
import Button from './Button'
import { Plus, FileText, Settings } from 'lucide-react'

export default function HomeScreen() {
  const setCurrentScreen = useMercariStore((state) => state.setCurrentScreen)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8 bg-gradient-to-br from-beige-50 via-white to-dusty-pink/10">
      <div className="text-center space-y-8 sm:space-y-12 w-full max-w-[640px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-2 sm:mb-4">
          ✿ メルカリ出品AIツール
        </h1>
        <p className="text-gray-600 text-base sm:text-lg font-light px-4">
          商品情報を入力するだけで、魅力的なタイトルと説明文を自動生成
        </p>

        <div className="space-y-3 sm:space-y-4 mt-8 sm:mt-16 px-4">
          <Button
            onClick={() => setCurrentScreen('input')}
            className="w-full max-w-md flex items-center justify-center gap-3"
          >
            <Plus size={20} />
            新規作成
          </Button>

          <Button
            onClick={() => setCurrentScreen('restore')}
            variant="secondary"
            className="w-full max-w-md flex items-center justify-center gap-3"
          >
            <FileText size={20} />
            既存から復元
          </Button>

          <Button
            onClick={() => setCurrentScreen('settings')}
            variant="outline"
            className="w-full max-w-md flex items-center justify-center gap-3"
          >
            <Settings size={20} />
            設定
          </Button>
        </div>
      </div>
    </div>
  )
}
