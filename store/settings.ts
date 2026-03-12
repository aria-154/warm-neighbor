import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Settings {
  fontSize: 'small' | 'normal' | 'large' | 'xlarge'
  highContrast: boolean
  voiceAssist: boolean
  voiceInput: boolean
  notifications: boolean
  location: boolean
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    fontSize: 'normal',
    highContrast: false,
    voiceAssist: false,
    voiceInput: false,
    notifications: true,
    location: true
  })

  // 加载设置
  const loadSettings = () => {
    try {
      const savedSettings = uni.getStorageSync('settings')
      if (savedSettings) {
        settings.value = { ...settings.value, ...savedSettings }
      }
    } catch (error) {
      console.error('加载设置失败:', error)
    }
  }

  // 更新设置
  const updateSettings = (key: keyof Settings, value: any) => {
    settings.value[key] = value
    uni.setStorageSync('settings', settings.value)
    applySettings()
  }

  // 应用设置到页面
  const applySettings = () => {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]

    if (!currentPage) return

    // 应用大字体
    if (settings.value.fontSize === 'large' || settings.value.fontSize === 'xlarge') {
      currentPage.setData({ accessibilityLarge: true })
    } else {
      currentPage.setData({ accessibilityLarge: false })
    }

    // 应用高对比度
    if (settings.value.highContrast) {
      currentPage.setData({ accessibilityHighContrast: true })
    } else {
      currentPage.setData({ accessibilityHighContrast: false })
    }
  }

  // 重置设置
  const resetSettings = () => {
    settings.value = {
      fontSize: 'normal',
      highContrast: false,
      voiceAssist: false,
      voiceInput: false,
      notifications: true,
      location: true
    }
    uni.setStorageSync('settings', settings.value)
    applySettings()
  }

  return {
    settings,
    loadSettings,
    updateSettings,
    applySettings,
    resetSettings
  }
})
