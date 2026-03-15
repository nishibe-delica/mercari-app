import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FormData {
  productNumber: string
  category: string
  productType: string
  color: string
  features: string
  target: string
  charCount: number
  additionalInstructions: string
  imageFile: File | null
}

export interface Settings {
  headerTemplate: string
  footerTemplate: string
  closingStatement: string
}

export interface GeneratedContent {
  titles: string[]
  description: string
}

interface MercariStore {
  // Form data
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  resetFormData: () => void

  // Settings
  settings: Settings
  setSettings: (settings: Partial<Settings>) => void

  // Generated content
  generatedContent: GeneratedContent | null
  setGeneratedContent: (content: GeneratedContent) => void

  // Current screen
  currentScreen: 'home' | 'input' | 'output' | 'restore' | 'settings'
  setCurrentScreen: (screen: 'home' | 'input' | 'output' | 'restore' | 'settings') => void
}

const defaultFormData: FormData = {
  productNumber: '',
  category: '',
  productType: '',
  color: '',
  features: '',
  target: '',
  charCount: 800,
  additionalInstructions: '',
  imageFile: null,
}

const defaultSettings: Settings = {
  headerTemplate: `------------------------------------
◎送料無料です
◎新品・未使用
◎まとめ買い
　2点で100円引き
　3点で200円引き
※1000円以下の商品は対象外です。
------------------------------------`,
  footerTemplate: `⑅୨୧┈┈┈┈✿┈┈✿┈┈┈┈୨୧⑅
フォロー割・まとめ割 キャンペーン中！
↓その他の商品はこちらからご覧いただけます
#
⑅୨୧┈┈┈┈✿┈┈✿┈┈┈┈୨୧⑅

注意事項
※1：海外輸入製品（ノーブランド品）のため、ほつれ・小さな傷・縫製の甘さがある場合がございます。
※2：素人採寸のため、若干の誤差が生じる場合がございます。
※3：イメージ違いやサイズ違いなど、お客様都合でのキャンセル・返品はお断りしております。
※4：モニターにより色味が異なって見える場合があります。
※5：お安く提供するため、簡易包装・圧縮梱包となります。
※6：万が一何かございましたら、評価前にお知らせください。`,
  closingStatement: '上記をご理解いただける方に、ご縁がありますと嬉しいです✿',
}

export const useMercariStore = create<MercariStore>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      resetFormData: () => set({ formData: defaultFormData }),

      settings: defaultSettings,
      setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

      generatedContent: null,
      setGeneratedContent: (content) => set({ generatedContent: content }),

      currentScreen: 'home',
      setCurrentScreen: (screen) => set({ currentScreen: screen }),
    }),
    {
      name: 'mercari-store',
    }
  )
)
