import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface UserInfo {
  id: string
  openid: string
  nickname: string
  avatar: string
  phone: string
  userType: 'elderly' | 'disabled' | 'volunteer'
  needType?: string[]
  volunteerTags?: string[]
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  // 检查登录状态
  const checkLoginStatus = () => {
    try {
      const savedToken = uni.getStorageSync('token')
      const savedUserInfo = uni.getStorageSync('userInfo')

      if (savedToken && savedUserInfo) {
        token.value = savedToken
        userInfo.value = savedUserInfo
      }
    } catch (error) {
      console.error('检查登录状态失败:', error)
    }
  }

  // 登录
  const login = async (loginData: Partial<UserInfo>) => {
    try {
      // 模拟登录 - 实际项目中需要调用后端API
      const mockToken = `mock_token_${Date.now()}`
      const mockUser: UserInfo = {
        id: 'user_' + Date.now(),
        openid: 'openid_' + Date.now(),
        nickname: loginData.nickname || '用户',
        avatar: loginData.avatar || '',
        phone: loginData.phone || '',
        userType: loginData.userType || 'elderly',
        needType: loginData.needType || [],
        volunteerTags: loginData.volunteerTags || []
      }

      token.value = mockToken
      userInfo.value = mockUser

      // 持久化存储
      uni.setStorageSync('token', mockToken)
      uni.setStorageSync('userInfo', mockUser)

      return { success: true, data: mockUser }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败' }
    }
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    userInfo.value = null
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
  }

  // 更新用户信息
  const updateUserInfo = (data: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...data }
      uni.setStorageSync('userInfo', userInfo.value)
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    checkLoginStatus,
    login,
    logout,
    updateUserInfo
  }
})
