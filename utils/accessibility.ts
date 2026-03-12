/**
 * 无障碍功能工具
 */
import { useSettingsStore } from '@/store/settings'

/**
 * 启用大字体
 */
export function enableLargeFont() {
  const settingsStore = useSettingsStore()
  settingsStore.updateSettings('fontSize', 'large')
}

/**
 * 启用超大字体
 */
export function enableXLargeFont() {
  const settingsStore = useSettingsStore()
  settingsStore.updateSettings('fontSize', 'xlarge')
}

/**
 * 启用高对比度模式
 */
export function enableHighContrast() {
  const settingsStore = useSettingsStore()
  settingsStore.updateSettings('highContrast', true)
}

/**
 * 启用语音辅助
 */
export function enableVoiceAssist() {
  const settingsStore = useSettingsStore()
  settingsStore.updateSettings('voiceAssist', true)
}

/**
 * 朗读文字
 */
export function speakText(text: string) {
  // #ifdef MP-WEIXIN
  const plugin = requirePlugin('WechatSI')
  const manager = plugin.getRecorderManager()

  // 使用微信语音合成
  plugin.textToSpeech({
    lang: 'zh_CN',
    tts: true,
    content: text,
    success: (res: any) => {
      console.log('语音播放成功', res)
    },
    fail: (err: any) => {
      console.error('语音播放失败', err)
    }
  })
  // #endif

  // #ifdef H5
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  window.speechSynthesis.speak(utterance)
  // #endif
}

/**
 * 停止朗读
 */
export function stopSpeaking() {
  // #ifdef H5
  window.speechSynthesis.cancel()
  // #endif
}

/**
 * 开始语音识别
 */
export function startVoiceRecognition(): Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    const plugin = requirePlugin('WechatSI')
    const manager = plugin.getRecordRecognitionManager()

    manager.onStart(() => {
      console.log('开始录音')
    })

    manager.onStop((res: any) => {
      console.log('录音结束', res)
      resolve(res.result)
    })

    manager.onError((err: any) => {
      console.error('录音失败', err)
      reject(err)
    })

    manager.start({
      lang: 'zh_CN',
      duration: 10000
    })
    // #endif

    // #ifdef H5
    if (!('webkitSpeechRecognition' in window)) {
      reject(new Error('浏览器不支持语音识别'))
      return
    }

    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      resolve(result)
    }

    recognition.onerror = (event: any) => {
      reject(event.error)
    }

    recognition.start()
    // #endif
  })
}

/**
 * 检测是否为视障用户
 */
export function isVisuallyImpaired(): boolean {
  const settingsStore = useSettingsStore()
  return settingsStore.settings.highContrast ||
         settingsStore.settings.fontSize === 'large' ||
         settingsStore.settings.fontSize === 'xlarge'
}

/**
 * 应用无障碍样式
 */
export function applyAccessibilityStyles() {
  const settingsStore = useSettingsStore()
  const page = document?.querySelector('.page-content')

  if (!page) return

  // 大字体
  if (settingsStore.settings.fontSize === 'large') {
    page.style.fontSize = '1.2em'
  } else if (settingsStore.settings.fontSize === 'xlarge') {
    page.style.fontSize = '1.5em'
  }

  // 高对比度
  if (settingsStore.settings.highContrast) {
    page.style.filter = 'contrast(1.3)'
  }
}

/**
 * 获取语音播报文本
 */
export function getAccessibleText(element: HTMLElement): string {
  const ariaLabel = element.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel

  const alt = element.getAttribute('alt')
  if (alt) return alt

  return element.textContent || ''
}
