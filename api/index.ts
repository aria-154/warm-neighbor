/**
 * API 接口定义
 */
import { request, post, get } from '@/utils/request'

// 用户相关 API
export const userApi = {
  /**
   * 微信登录
   */
  wxLogin: (code: string) => {
    return post('/auth/wxlogin', { code })
  },

  /**
   * 手机号登录
   */
  phoneLogin: (phone: string, code: string) => {
    return post('/auth/phonelogin', { phone, code })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: () => {
    return get('/user/info')
  },

  /**
   * 更新用户信息
   */
  updateUserInfo: (data: any) => {
    return post('/user/update', data)
  }
}

// 服务相关 API
export const serviceApi = {
  /**
   * 获取服务列表
   */
  getServiceList: (params: any) => {
    return get('/service/list', params)
  },

  /**
   * 获取服务详情
   */
  getServiceDetail: (id: string) => {
    return get(`/service/detail/${id}`)
  },

  /**
   * 创建服务
   */
  createService: (data: any) => {
    return post('/service/create', data)
  },

  /**
   * 更新服务
   */
  updateService: (id: string, data: any) => {
    return post(`/service/update/${id}`, data)
  },

  /**
   * 删除服务
   */
  deleteService: (id: string) => {
    return post(`/service/delete/${id}`)
  }
}

// 订单相关 API
export const orderApi = {
  /**
   * 创建订单
   */
  createOrder: (data: any) => {
    return post('/order/create', data)
  },

  /**
   * 获取订单列表
   */
  getOrderList: (params: any) => {
    return get('/order/list', params)
  },

  /**
   * 获取订单详情
   */
  getOrderDetail: (id: string) => {
    return get(`/order/detail/${id}`)
  },

  /**
   * 更新订单状态
   */
  updateOrderStatus: (id: string, status: string) => {
    return post(`/order/status/${id}`, { status })
  },

  /**
   * 取消订单
   */
  cancelOrder: (id: string) => {
    return post(`/order/cancel/${id}`)
  }
}

// 腾讯地图 API
export const mapApi = {
  /**
   * 地理编码(地址转坐标)
   */
  geocoder: (address: string) => {
    const QQMAP_CONFIG = require('@/utils/config').QQMAP_CONFIG
    return new Promise((resolve, reject) => {
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/`,
        data: {
          address,
          key: QQMAP_CONFIG.key
        },
        success: (res: any) => {
          if (res.data.status === 0) {
            resolve(res.data.result)
          } else {
            reject(res.data)
          }
        },
        fail: reject
      })
    })
  },

  /**
   * 逆地理编码(坐标转地址)
   */
  reverseGeocoder: (latitude: number, longitude: number) => {
    const QQMAP_CONFIG = require('@/utils/config').QQMAP_CONFIG
    return new Promise((resolve, reject) => {
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/`,
        data: {
          location: `${latitude},${longitude}`,
          key: QQMAP_CONFIG.key
        },
        success: (res: any) => {
          if (res.data.status === 0) {
            resolve(res.data.result)
          } else {
            reject(res.data)
          }
        },
        fail: reject
      })
    })
  },

  /**
   * 附近搜索
   */
  nearbySearch: (keyword: string, latitude: number, longitude: number, radius: number = 1000) => {
    const QQMAP_CONFIG = require('@/utils/config').QQMAP_CONFIG
    return new Promise((resolve, reject) => {
      uni.request({
        url: `https://apis.map.qq.com/ws/place/v1/search/`,
        data: {
          keyword,
          boundary: `nearby(${latitude},${longitude},${radius})`,
          key: QQMAP_CONFIG.key,
          page_size: 20
        },
        success: (res: any) => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            reject(res.data)
          }
        },
        fail: reject
      })
    })
  }
}

// 天气 API
export const weatherApi = {
  /**
   * 获取当前天气
   */
  getCurrentWeather: (city: string) => {
    const WEATHER_CONFIG = require('@/utils/config').WEATHER_CONFIG
    return new Promise((resolve, reject) => {
      uni.request({
        url: `https://restapi.amap.com/v3/weather/weatherInfo`,
        data: {
          city,
          key: WEATHER_CONFIG.key
        },
        success: (res: any) => {
          if (res.data.status === '1') {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: reject
      })
    })
  }
}

// 语音识别 API
export const voiceApi = {
  /**
   * 获取录音管理器实例
   */
  getRecorderManager: () => {
    return uni.getRecorderManager()
  },

  /**
   * 开始录音
   */
  startRecord: () => {
    return new Promise((resolve, reject) => {
      const recorderManager = uni.getRecorderManager()

      recorderManager.onStop((res) => {
        resolve(res.tempFilePath)
      })

      recorderManager.onError((err) => {
        reject(err)
      })

      recorderManager.start({
        format: 'mp3',
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 48000
      })
    })
  },

  /**
   * 停止录音
   */
  stopRecord: () => {
    return new Promise((resolve, reject) => {
      const recorderManager = uni.getRecorderManager()

      recorderManager.onStop((res) => {
        resolve(res.tempFilePath)
      })

      recorderManager.onError((err) => {
        reject(err)
      })

      recorderManager.stop()
    })
  },

  /**
   * 语音转文字(使用录音管理器)
   */
  voiceToText: () => {
    return new Promise((resolve, reject) => {
      const recorderManager = uni.getRecorderManager()

      uni.showToast({
        title: '请开始说话...',
        icon: 'none'
      })

      let audioFilePath = ''

      // 监听录音结束
      recorderManager.onStop((res) => {
        audioFilePath = res.tempFilePath
        console.log('录音文件:', audioFilePath)

        // 这里需要对接语音识别API
        // 暂时返回模拟数据
        // 实际项目中可以调用腾讯云语音识别或其他API
        resolve({
          text: '我想找家政服务',
          duration: 3000,
          tempFilePath: audioFilePath
        })
      })

      // 监听录音错误
      recorderManager.onError((err) => {
        console.error('录音错误:', err)
        reject(err)
      })

      // 开始录音
      recorderManager.start({
        format: 'mp3',
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 48000,
        duration: 60000 // 最长60秒
      })

      // 自动停止录音（3秒后）
      setTimeout(() => {
        recorderManager.stop()
      }, 3000)
    })
  }
}

// 消息相关 API
export const messageApi = {
  /**
   * 获取消息列表
   */
  getMessageList: (params: any) => {
    return get('/message/list', params)
  },

  /**
   * 获取未读消息数
   */
  getUnreadCount: () => {
    return get('/message/unread')
  },

  /**
   * 标记消息已读
   */
  markAsRead: (id: string) => {
    return post(`/message/read/${id}`)
  }
}
