<!-- 服务详情 -->
<template>
  <view class="service-detail-page">
    <!-- 服务信息 -->
    <view class="service-header">
      <text class="service-title">{{ service?.title }}</text>
      <view class="service-tags">
        <text class="tag" v-for="(tag, index) in service?.tags" :key="index">{{ tag }}</text>
      </view>
      <view class="price-section">
        <text class="price">¥{{ service?.price }}</text>
        <text class="price-unit">/{{ getPriceText(service?.priceType) }}</text>
      </view>
    </view>

    <!-- 服务提供者 -->
    <view class="provider-card">
      <image class="provider-avatar" :src="service?.providerAvatar" mode="aspectFill" />
      <view class="provider-info">
        <text class="provider-name">{{ service?.providerName }}</text>
        <text class="provider-rating">⭐ {{ service?.providerRating }}</text>
      </view>
      <button class="contact-btn" size="mini">联系</button>
    </view>

    <!-- 服务描述 -->
    <view class="detail-section">
      <view class="section-title">服务描述</view>
      <text class="detail-text">{{ service?.description }}</text>
    </view>

    <!-- 服务位置 -->
    <view class="detail-section">
      <view class="section-title">服务位置</view>
      <view class="location-info">
        <text class="address">{{ service?.location.address }}</text>
        <text class="distance">距离约3km</text>
      </view>
      <view class="map-preview" @tap="viewMap">
        <text>查看地图 >></text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button class="collect-btn" @tap="toggleCollect">
        <text>{{ isCollected ? '❤️ 已收藏' : '🤍 收藏' }}</text>
      </button>
      <button class="order-btn" @tap="createOrder">立即下单</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useServiceStore } from '@/store/service'
import { useUserStore } from '@/store/user'

const serviceStore = useServiceStore()
const userStore = useUserStore()
const service = ref<any>(null)
const isCollected = ref(false)

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const serviceId = currentPage.options?.id

  if (serviceId) {
    service.value = serviceStore.getServiceDetail(serviceId)
    if (service.value) {
      serviceStore.incrementViewCount(serviceId)
    }
  }
})

function getPriceText(type?: string) {
  const map: any = {
    fixed: '次',
    hourly: '小时',
    negotiable: '议价'
  }
  return map[type] || '次'
}

function viewMap() {
  if (service.value) {
    uni.openLocation({
      latitude: service.value.location.latitude,
      longitude: service.value.location.longitude,
      name: service.value.title,
      address: service.value.location.address
    })
  }
}

function toggleCollect() {
  isCollected.value = !isCollected.value
  uni.showToast({
    title: isCollected.value ? '已收藏' : '已取消收藏',
    icon: 'success'
  })
}

function createOrder() {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录',
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({ url: '/pages/login/login' })
        }
      }
    })
    return
  }

  uni.showModal({
    title: '确认下单',
    content: `确认下单"${service.value?.title}"吗?`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '下单成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/orders/orders'
          })
        }, 1500)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.service-detail-page {
  padding: 30rpx;
  padding-bottom: 150rpx;
}

.service-header {
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 20rpx;
}

.service-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
  margin-bottom: 25rpx;
}

.tag {
  padding: 8rpx 16rpx;
  background: #E6F7FF;
  color: #1890FF;
  border-radius: 8rpx;
  font-size: 24rpx;
}

.price-section {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: 48rpx;
  font-weight: bold;
  color: #E34D59;
}

.price-unit {
  font-size: 28rpx;
  color: #666;
  margin-left: 5rpx;
}

.provider-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
}

.provider-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.provider-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.provider-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.provider-rating {
  font-size: 26rpx;
  color: #FFA500;
}

.contact-btn {
  padding: 15rpx 30rpx;
  background: #E6F7FF;
  color: #1890FF;
  border-radius: 100rpx;
  font-size: 26rpx;
  border: none;
}

.detail-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.detail-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  display: block;
}

.location-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.address {
  font-size: 28rpx;
  color: #333;
}

.distance {
  font-size: 24rpx;
  color: #999;
}

.map-preview {
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  text-align: center;
}

.map-preview text {
  font-size: 26rpx;
  color: #0052D9;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  display: flex;
  gap: 20rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}

.collect-btn {
  flex: 1;
  padding: 25rpx;
  background: #f8f8f8;
  color: #666;
  border-radius: 100rpx;
  font-size: 28rpx;
  border: none;
}

.order-btn {
  flex: 2;
  padding: 25rpx;
  background: linear-gradient(135deg, #0052D9 0%, #1890FF 100%);
  color: #fff;
  border-radius: 100rpx;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
}
</style>
