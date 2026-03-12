/**
 * API 基础配置
 */
const BASE_URL = 'https://api.example.com' // 替换为实际API地址

/**
 * 环境配置
 */
export const ENV = {
  development: true,
  version: '1.0.0'
}

/**
 * 请求配置
 */
export const CONFIG = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

/**
 * 支付宝配置
 */
export const ALIPAY_CONFIG = {
  appId: 'your_app_id'
}

/**
 * 微信配置
 */
export const WX_CONFIG = {
  appId: 'your_app_id'
}

/**
 * 腾讯地图配置
 */
export const QQMAP_CONFIG = {
  key: 'your_qqmap_key' // 申请地址: https://lbs.qq.com/console/key.html
}

/**
 * 天气API配置
 */
export const WEATHER_CONFIG = {
  key: 'your_weather_api_key'
}

/**
 * 语音识别配置
 */
export const VOICE_CONFIG = {
  appId: 'your_voice_app_id',
  apiKey: 'your_voice_api_key'
}
