<!-- 登录页 -->
<template>
  <view class="login-page">
    <!-- Logo -->
    <view class="logo-section">
      <text class="logo">🤝</text>
      <text class="app-name">暖邻帮</text>
      <text class="slogan">温暖邻里，互助相伴</text>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <!-- 微信登录 -->
      <button class="wx-login-btn" open-type="getUserInfo" @getuserinfo="wxLogin" v-if="isMpWeixin">
        <text class="btn-icon">💚</text>
        <text>微信登录</text>
      </button>

      <!-- 手机号登录 -->
      <view class="phone-login">
        <view class="input-group">
          <input class="phone-input" v-model="phone" type="number" placeholder="请输入手机号" :maxlength="11" />
        </view>
        <view class="input-group">
          <input class="code-input" v-model="code" type="number" placeholder="请输入验证码" :maxlength="6" />
          <button class="code-btn" @tap="sendCode" :disabled="countdown > 0">
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </view>
        <button class="login-btn" @tap="handleLogin">登录</button>
      </view>

      <!-- 用户类型选择 -->
      <view class="user-type-section" v-if="showUserType">
        <view class="section-title">选择您的身份</view>
        <view class="type-options">
          <view
            class="type-item"
            :class="{ active: userType === 'elderly' }"
            @tap="selectType('elderly')"
          >
            <text class="type-icon">👴</text>
            <text class="type-name">老年人</text>
          </view>
          <view
            class="type-item"
            :class="{ active: userType === 'disabled' }"
            @tap="selectType('disabled')"
          >
            <text class="type-icon">♿</text>
            <text class="type-name">残障人士</text>
          </view>
          <view
            class="type-item"
            :class="{ active: userType === 'volunteer' }"
            @tap="selectType('volunteer')"
          >
            <text class="type-icon">🤝</text>
            <text class="type-name">志愿者</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 协议 -->
    <view class="agreement">
      <checkbox :checked="agreed" @tap="toggleAgree" />
      <text class="agree-text">我已阅读并同意</text>
      <text class="link" @tap="viewAgreement">《用户协议》</text>
      <text class="agree-text">和</text>
      <text class="link" @tap="viewPrivacy">《隐私政策》</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const phone = ref('')
const code = ref('')
const userType = ref('elderly')
const agreed = ref(false)
const countdown = ref(0)
const showUserType = ref(false)

const isMpWeixin = computed(() => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  return false
})

function sendCode() {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  // 模拟发送验证码
  uni.showLoading({ title: '发送中...' })
  setTimeout(() => {
    uni.hideLoading()
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  }, 1000)
}

function wxLogin(e: any) {
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意协议',
      icon: 'none'
    })
    return
  }

  if (e.detail.userInfo) {
    showUserType.value = true
  }
}

function handleLogin() {
  if (!agreed.value) {
    uni.showToast({
      title: '请先同意协议',
      icon: 'none'
    })
    return
  }

  if (!phone.value || !code.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  // 登录
  userStore.login({
    phone: phone.value,
    userType: userType.value
  }).then((res: any) => {
    if (res.success) {
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 1500)
    }
  })
}

function selectType(type: string) {
  userType.value = type
  // 完成微信登录流程
  if (isMpWeixin.value) {
    userStore.login({
      userType: type
    }).then((res: any) => {
      if (res.success) {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      }
    })
  }
}

function toggleAgree() {
  agreed.value = !agreed.value
}

function viewAgreement() {
  uni.navigateTo({
    url: '/pages/agreement/agreement'
  })
}

function viewPrivacy() {
  uni.navigateTo({
    url: '/pages/privacy/privacy'
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  padding: 60rpx 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.logo-section {
  text-align: center;
  margin-top: 80rpx;
  margin-bottom: 80rpx;
}

.logo {
  font-size: 120rpx;
  display: block;
  margin-bottom: 30rpx;
}

.app-name {
  font-size: 56rpx;
  font-weight: bold;
  color: #fff;
  display: block;
  margin-bottom: 15rpx;
}

.slogan {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
}

.login-form {
  background: #fff;
  border-radius: 24rpx;
  padding: 50rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
}

.wx-login-btn {
  width: 100%;
  padding: 30rpx;
  background: #07C160;
  color: #fff;
  border-radius: 100rpx;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
  border: none;
}

.btn-icon {
  font-size: 36rpx;
  margin-right: 15rpx;
}

.phone-login {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.input-group {
  display: flex;
  align-items: center;
  padding: 25rpx;
  background: #f8f8f8;
  border-radius: 100rpx;
}

.phone-input, .code-input {
  flex: 1;
  font-size: 28rpx;
}

.code-btn {
  padding: 10rpx 30rpx;
  background: #0052D9;
  color: #fff;
  border-radius: 100rpx;
  font-size: 24rpx;
  border: none;
}

.code-btn[disabled] {
  background: #ccc;
}

.login-btn {
  width: 100%;
  padding: 30rpx;
  background: linear-gradient(135deg, #0052D9 0%, #1890FF 100%);
  color: #fff;
  border-radius: 100rpx;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
}

.user-type-section {
  margin-top: 40rpx;
}

.section-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  text-align: center;
}

.type-options {
  display: flex;
  justify-content: space-around;
}

.type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  border: 2rpx solid #f0f0f0;
  border-radius: 16rpx;
  width: 180rpx;
}

.type-item.active {
  border-color: #0052D9;
  background: #E6F7FF;
}

.type-icon {
  font-size: 60rpx;
  margin-bottom: 15rpx;
}

.type-name {
  font-size: 26rpx;
  color: #333;
}

.agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 40rpx 0;
}

.agree-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.link {
  font-size: 24rpx;
  color: #fff;
  text-decoration: underline;
}
</style>
