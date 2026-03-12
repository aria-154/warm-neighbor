/**
 * HTTP 请求封装
 */
import { useUserStore } from '@/store/user'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: any
  showLoading?: boolean
  showError?: boolean
}

interface Response<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 统一请求方法
 */
export function request<T = any>(options: RequestOptions): Promise<Response<T>> {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    showLoading = true,
    showError = true
  } = options

  const userStore = useUserStore()

  // 显示加载提示
  if (showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
  }

  // 添加 token
  if (userStore.token) {
    header['Authorization'] = `Bearer ${userStore.token}`
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      timeout: 10000,
      success: (res: any) => {
        if (showLoading) {
          uni.hideLoading()
        }

        const { statusCode, data } = res

        if (statusCode === 200) {
          if (data.code === 0 || data.code === 200) {
            resolve(data)
          } else {
            if (showError) {
              uni.showToast({
                title: data.message || '请求失败',
                icon: 'none'
              })
            }
            reject(data)
          }
        } else if (statusCode === 401) {
          // token 失效
          userStore.logout()
          uni.showToast({
            title: '登录已过期,请重新登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login'
            })
          }, 1500)
          reject(new Error('登录已过期'))
        } else {
          if (showError) {
            uni.showToast({
              title: '网络请求失败',
              icon: 'none'
            })
          }
          reject(new Error('网络请求失败'))
        }
      },
      fail: (err) => {
        if (showLoading) {
          uni.hideLoading()
        }

        if (showError) {
          uni.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        }

        reject(err)
      }
    })
  })
}

/**
 * GET 请求
 */
export function get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
  return request<T>({ url, method: 'GET', data, ...options })
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
  return request<T>({ url, method: 'POST', data, ...options })
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
  return request<T>({ url, method: 'PUT', data, ...options })
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
  return request<T>({ url, method: 'DELETE', data, ...options })
}
