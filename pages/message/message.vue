<!-- 消息中心 -->
<template>
  <view class="message-page">
    <!-- 消息列表 -->
    <view class="message-list">
      <view class="message-item" v-for="msg in messages" :key="msg.id" @tap="goToDetail(msg.id)">
        <image class="avatar" :src="msg.avatar" />
        <view class="message-content">
          <view class="message-header">
            <text class="title">{{ msg.title }}</text>
            <text class="time">{{ formatTime(msg.time) }}</text>
          </view>
          <text class="content">{{ msg.content }}</text>
          <view class="unread-badge" v-if="!msg.read">●</view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="messages.length === 0">
        <text class="empty-icon">📬</text>
        <text class="empty-text">暂无消息</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const messages = ref([
  {
    id: 1,
    title: '订单已确认',
    content: '您的服务订单已确认，服务提供者将尽快与您联系',
    time: new Date().toISOString(),
    avatar: '/static/message-order.png',
    read: false,
    type: 'order'
  },
  {
    id: 2,
    title: '新服务推荐',
    content: '根据您的需求，为您推荐附近的智能手机教学服务',
    time: new Date(Date.now() - 3600000).toISOString(),
    avatar: '/static/message-recommend.png',
    read: true,
    type: 'recommend'
  },
  {
    id: 3,
    title: '系统通知',
    content: '暖邻帮2.0版本已上线，新增语音识别功能',
    time: new Date(Date.now() - 7200000).toISOString(),
    avatar: '/static/message-system.png',
    read: true,
    type: 'system'
  }
])

onMounted(() => {
  loadMessages()
})

function loadMessages() {
  // 从store加载消息
}

function formatTime(time: string) {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}

function goToDetail(id: number) {
  // 标记为已读
  const msg = messages.value.find(m => m.id === id)
  if (msg) {
    msg.read = true
  }

  uni.showModal({
    title: '消息详情',
    content: messages.value.find(m => m.id === id)?.content || '',
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.message-page {
  padding: 30rpx;
  padding-bottom: 150rpx;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.message-item {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  position: relative;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 25rpx;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15rpx;
}

.title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.content {
  font-size: 26rpx;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.unread-badge {
  position: absolute;
  top: 25rpx;
  right: 25rpx;
  width: 16rpx;
  height: 16rpx;
  background: #E34D59;
  border-radius: 50%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
