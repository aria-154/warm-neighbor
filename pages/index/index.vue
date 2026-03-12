<!-- 首页 -->
<template>
  <view class="home-page">
    <!-- 顶部天气信息 -->
    <view class="weather-card">
      <view class="weather-info" v-if="weather">
        <text class="temperature">{{ weather.temperature }}°C</text>
        <view class="weather-detail">
          <text class="weather-text">{{ weather.weather }}</text>
          <text class="city-name">{{ weather.city }}</text>
        </view>
      </view>
      <view class="date-info">
        <text>{{ currentDate }}</text>
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="quick-actions">
      <view class="action-item" @tap="goToService('生活服务')">
        <view class="action-icon life">🏠</view>
        <text class="action-text">生活服务</text>
      </view>
      <view class="action-item" @tap="goToService('出行服务')">
        <view class="action-icon travel">🚗</view>
        <text class="action-text">出行服务</text>
      </view>
      <view class="action-item" @tap="goToService('医疗健康')">
        <view class="action-icon medical">🏥</view>
        <text class="action-text">医疗健康</text>
      </view>
      <view class="action-item" @tap="goToService('技能培训')">
        <view class="action-icon skill">📚</view>
        <text class="action-text">技能培训</text>
      </view>
    </view>

    <!-- 语音搜索 -->
    <view class="voice-search" @tap="startVoiceInput">
      <view class="voice-btn">
        <text class="voice-icon">🎤</text>
        <text class="voice-text">点击说出你的需求</text>
      </view>
    </view>

    <!-- 推荐服务 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">推荐服务</text>
        <view class="more-btn" @tap="goToServices">
          <text class="more-text">查看更多</text>
          <text class="arrow-icon">›</text>
        </view>
      </view>
      <scroll-view scroll-x class="service-scroll" show-scrollbar="false">
        <view class="service-card" v-for="service in recommendServices" :key="service.id" @tap="goToDetail(service.id)">
          <view class="service-header">
            <text class="service-title">{{ service.title }}</text>
            <view class="service-arrow">
              <text class="arrow-text">›</text>
            </view>
          </view>
          <text class="service-price">¥{{ service.price }}/{{ getPriceText(service.priceType) }}</text>
          <view class="service-tags">
            <text class="tag" v-for="(tag, index) in service.tags.slice(0, 2)" :key="index">{{ tag }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 最新公告 -->
    <view class="section notice-section">
      <view class="section-header">
        <text class="section-title">最新公告</text>
      </view>
      <view class="notice-item" v-for="(notice, index) in notices" :key="index" @tap="showNoticeDetail(notice)">
        <view class="notice-icon">📢</view>
        <text class="notice-text">{{ notice.title }}</text>
        <text class="notice-date">{{ notice.date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useServiceStore } from '@/store/service'
import { voiceApi } from '@/api'

const serviceStore = useServiceStore()
const weather = ref<any>(null)
const currentDate = ref('')
const recommendServices = ref<any[]>([])
const notices = ref([
  { title: '暖邻帮2.0版本上线,新增语音功能', date: '2024-03-01' },
  { title: '本周志愿者招募活动开始啦', date: '2024-02-28' },
  { title: '老年人智能手机公益课堂报名中', date: '2024-02-25' }
])

onMounted(async () => {
  loadDate()
  loadWeather()
  loadServices()
})

function loadDate() {
  const now = new Date()
  currentDate.value = `${now.getMonth() + 1}月${now.getDate()}日 ${['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()]}`
}

async function loadWeather() {
  // 模拟天气数据
  weather.value = {
    temperature: 18,
    weather: '晴',
    city: '北京'
  }
}

async function loadServices() {
  await serviceStore.loadServices()
  recommendServices.value = serviceStore.services.slice(0, 5)
}

function goToService(category: string) {
  // 先切换到服务大厅页面
  uni.switchTab({
    url: '/pages/services/services'
  })

  // 使用全局事件或 storage 传递分类信息
  setTimeout(() => {
    uni.setStorageSync('selectedCategory', category)
  }, 100)
}

function goToServices() {
  uni.switchTab({
    url: '/pages/services/services'
  })
}

function goToDetail(id: string) {
  uni.navigateTo({
    url: `/pages/service-detail/service-detail?id=${id}`
  })
}

function getPriceText(type: string) {
  const map: any = {
    fixed: '次',
    hourly: '小时',
    negotiable: '议价'
  }
  return map[type] || '次'
}

function startVoiceInput() {
  voiceApi.voiceToText().then((res: any) => {
    uni.showToast({
      title: `识别: ${res.text}`,
      icon: 'none'
    })
    // 根据语音内容跳转
    if (res.text.includes('生活') || res.text.includes('家政')) {
      goToService('生活服务')
    } else if (res.text.includes('出行') || res.text.includes('轮椅')) {
      goToService('出行服务')
    } else if (res.text.includes('医疗') || res.text.includes('医院')) {
      goToService('医疗健康')
    } else {
      goToServices()
    }
  }).catch(() => {
    uni.showToast({
      title: '语音识别失败',
      icon: 'none'
    })
  })
}

function showNoticeDetail(notice: any) {
  uni.showModal({
    title: '公告详情',
    content: notice.title,
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: 20rpx 30rpx;
  padding-bottom: 150rpx;
  background: #f8f8f8;
  min-height: 100vh;
}

.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin-bottom: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.25);
}

.weather-info {
  display: flex;
  flex-direction: column;
}

.temperature {
  font-size: 72rpx;
  font-weight: bold;
  line-height: 1;
}

.weather-detail {
  margin-top: 12rpx;
}

.weather-text {
  font-size: 28rpx;
  margin-right: 16rpx;
}

.city-name {
  font-size: 24rpx;
  opacity: 0.9;
}

.date-info {
  font-size: 24rpx;
  opacity: 0.9;
}

.quick-actions {
  display: flex;
  justify-content: space-around;
  background: #fff;
  border-radius: 24rpx;
  padding: 45rpx 20rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
}

.action-icon {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.action-icon.life { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }
.action-icon.travel { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
.action-icon.medical { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.action-icon.skill { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }

.action-text {
  font-size: 26rpx;
  color: #666;
  font-weight: 500;
}

.voice-search {
  background: #fff;
  border-radius: 24rpx;
  padding: 35rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

.voice-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 100rpx;
  padding: 32rpx;
  box-shadow: 0 6rpx 20rpx rgba(102, 126, 234, 0.35);
  transition: all 0.3s;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
  }
}

.voice-icon {
  font-size: 44rpx;
  margin-right: 16rpx;
}

.voice-text {
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
}

.section {
  background: #fff;
  border-radius: 24rpx;
  padding: 35rpx 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.more-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.7;
  }
}

.more-text {
  font-size: 26rpx;
  color: #667eea;
  font-weight: 500;
}

.arrow-icon {
  font-size: 40rpx;
  color: #667eea;
  line-height: 1;
  font-weight: 300;
}

.service-scroll {
  white-space: nowrap;
}

.service-card {
  display: inline-block;
  width: 300rpx;
  padding: 30rpx;
  margin-right: 20rpx;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20rpx;
  vertical-align: top;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &:active {
    transform: translateY(-4rpx);
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
  }

  &:last-child {
    margin-right: 0;
  }
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.service-title {
  flex: 1;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8rpx;
}

.service-arrow {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .arrow-text {
    font-size: 36rpx;
    color: #667eea;
    line-height: 1;
    font-weight: 300;
  }
}

.service-price {
  font-size: 36rpx;
  font-weight: bold;
  color: #E34D59;
  display: block;
  margin-bottom: 16rpx;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag {
  font-size: 20rpx;
  padding: 8rpx 14rpx;
  background: linear-gradient(135deg, #E6F7FF 0%, #BAE7FF 100%);
  color: #1890FF;
  border-radius: 12rpx;
  font-weight: 500;
}

.notice-section {
  .notice-item {
    display: flex;
    align-items: center;
    padding: 28rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    transition: background-color 0.2s;

    &:active {
      background-color: #f9f9f9;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .notice-icon {
    font-size: 40rpx;
    margin-right: 16rpx;
  }

  .notice-text {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .notice-date {
    font-size: 24rpx;
    color: #999;
    margin-left: 16rpx;
  }
}
</style>
