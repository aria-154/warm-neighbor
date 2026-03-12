<!-- 个人中心 -->
<template>
  <view class="profile-page">
    <!-- 用户信息卡片 -->
    <view class="user-card" v-if="userStore.isLoggedIn">
      <view class="avatar-wrapper">
        <image class="avatar" :src="userStore.userInfo?.avatar" mode="aspectFill" />
      </view>
      <view class="user-info">
        <text class="username">{{ userStore.userInfo?.nickname || '用户' }}</text>
        <text class="user-type">{{ getUserTypeText(userStore.userInfo?.userType) }}</text>
      </view>
      <view class="settings-btn" @tap="goToSettings">
        <text class="icon-gear">⚙</text>
      </view>
    </view>

    <!-- 未登录状态 -->
    <view class="login-tip" v-else @tap="goToLogin">
      <view class="login-icon">👤</view>
      <view class="login-content">
        <text class="tip-text">点击登录</text>
        <text class="tip-desc">登录后享受更多服务</text>
      </view>
      <view class="arrow-icon">
        <text class="arrow-text">›</text>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="menu-list">
      <view class="menu-item" @tap="goToMyPublish">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">📝</text>
        </view>
        <text class="menu-text">我的发布</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToMyOrders">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">📋</text>
        </view>
        <text class="menu-text">我的订单</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToMessages">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">💬</text>
        </view>
        <text class="menu-text">消息中心</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
        <view class="badge" v-if="unreadCount > 0">
          <text>{{ unreadCount }}</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToWallet">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">💰</text>
        </view>
        <text class="menu-text">我的钱包</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToFavorite">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">❤</text>
        </view>
        <text class="menu-text">我的收藏</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
    </view>

    <!-- 其他功能 -->
    <view class="menu-list">
      <view class="menu-item" @tap="goToHelp">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">❓</text>
        </view>
        <text class="menu-text">帮助中心</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToAbout">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">ℹ</text>
        </view>
        <text class="menu-text">关于我们</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
      <view class="menu-item" @tap="goToFeedback">
        <view class="menu-icon-wrapper">
          <text class="menu-icon">📧</text>
        </view>
        <text class="menu-text">意见反馈</text>
        <view class="arrow-icon">
          <text class="arrow-text">›</text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-btn" v-if="userStore.isLoggedIn" @tap="handleLogout">
      <text class="logout-text">退出登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const unreadCount = ref(3)

function getUserTypeText(type?: string) {
  const map: any = {
    elderly: '老年用户',
    disabled: '残障用户',
    volunteer: '志愿者'
  }
  return map[type] || '用户'
}

function goToLogin() {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

function goToSettings() {
  uni.navigateTo({
    url: '/pages/settings/settings'
  })
}

function goToMyPublish() {
  if (!checkLogin()) return
  uni.navigateTo({
    url: '/pages/my-publish/my-publish'
  })
}

function goToMyOrders() {
  if (!checkLogin()) return
  uni.navigateTo({
    url: '/pages/orders/orders'
  })
}

function goToMessages() {
  if (!checkLogin()) return
  uni.navigateTo({
    url: '/pages/message/message'
  })
}

function goToWallet() {
  if (!checkLogin()) return
  uni.showToast({
    title: '开发中',
    icon: 'none'
  })
}

function goToFavorite() {
  if (!checkLogin()) return
  uni.showToast({
    title: '开发中',
    icon: 'none'
  })
}

function goToHelp() {
  uni.navigateTo({
    url: '/pages/help/help'
  })
}

function goToAbout() {
  uni.navigateTo({
    url: '/pages/about/about'
  })
}

function goToFeedback() {
  uni.navigateTo({
    url: '/pages/feedback/feedback'
  })
}

function checkLogin() {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录',
      success: (res) => {
        if (res.confirm) {
          goToLogin()
        }
      }
    })
    return false
  }
  return true
}

function handleLogout() {
  uni.showModal({
    title: '退出登录',
    content: '确定要退出登录吗?',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 20rpx 30rpx;
  padding-bottom: 150rpx;
  background: #f8f8f8;
  min-height: 100vh;
}

.user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24rpx;
  padding: 50rpx 40rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.25);
}

.avatar-wrapper {
  margin-right: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.2);
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 38rpx;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
}

.user-type {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  padding: 8rpx 20rpx;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 24rpx;
  display: inline-block;
}

.settings-btn {
  padding: 10rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s;

  &:active {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0.95);
  }

  .icon-gear {
    font-size: 44rpx;
    color: #fff;
  }
}

.login-tip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24rpx;
  padding: 50rpx 40rpx;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
}

.login-icon {
  font-size: 80rpx;
  margin-right: 30rpx;
}

.login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tip-text {
  font-size: 36rpx;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8rpx;
}

.tip-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.menu-list {
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 36rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
  position: relative;
  transition: background-color 0.2s;

  &:active {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
}

.menu-icon-wrapper {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.menu-icon {
  font-size: 40rpx;
}

.menu-text {
  flex: 1;
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.arrow-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;

  .arrow-text {
    font-size: 48rpx;
    color: #c0c0c0;
    line-height: 1;
    font-weight: 300;
  }
}

.badge {
  position: absolute;
  right: 80rpx;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  color: #fff;
  font-size: 20rpx;
  padding: 6rpx 12rpx;
  border-radius: 24rpx;
  min-width: 40rpx;
  height: 40rpx;
  line-height: 28rpx;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.3);
}

.logout-btn {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  text-align: center;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
  transition: all 0.3s;

  &:active {
    background: #f9f9f9;
    transform: scale(0.98);
  }

  .logout-text {
    font-size: 32rpx;
    color: #E34D59;
    font-weight: 500;
  }
}
</style>
