<!-- 服务大厅 -->
<template>
  <view class="services-page">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input class="search-input" placeholder="搜索服务" v-model="keyword" @confirm="handleSearch" />
      <view class="search-btn" @tap="handleSearch">搜索</view>
    </view>

    <!-- 分类筛选 -->
    <scroll-view scroll-x class="category-scroll">
      <view
        class="category-item"
        :class="{ active: selectedCategory === item }"
        v-for="item in categories"
        :key="item"
        @tap="selectCategory(item)"
      >
        <text>{{ item }}</text>
      </view>
    </scroll-view>

    <!-- 服务列表 -->
    <view class="service-list">
      <view class="service-item" v-for="service in filteredServices" :key="service.id" @tap="goToDetail(service.id)">
        <view class="service-header">
          <text class="service-title">{{ service.title }}</text>
          <text class="service-price">¥{{ service.price }}/{{ getPriceText(service.priceType) }}</text>
        </view>
        <text class="service-desc">{{ service.description }}</text>
        <view class="service-info">
          <view class="provider-info">
            <image class="provider-avatar" :src="service.providerAvatar" mode="aspectFill" />
            <text class="provider-name">{{ service.providerName }}</text>
            <text class="provider-rating">⭐ {{ service.providerRating }}</text>
          </view>
          <text class="service-distance">距离 {{ service.location.address }}</text>
        </view>
        <view class="service-tags">
          <text class="tag" v-for="(tag, index) in service.tags" :key="index">{{ tag }}</text>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredServices.length === 0">
        <text class="empty-icon">🔍</text>
        <text class="empty-text">暂无相关服务</text>
      </view>
    </view>

    <!-- 发布服务按钮 -->
    <view class="publish-btn" @tap="goToPublish">
      <text class="btn-text">+ 发布服务</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServiceStore } from '@/store/service'
import type { Service } from '@/store/service'

const serviceStore = useServiceStore()
const keyword = ref('')
const selectedCategory = ref('全部')
const categories = ['全部', '生活服务', '出行服务', '医疗健康', '技能培训']

const filteredServices = computed(() => {
  let services = serviceStore.services

  if (selectedCategory.value !== '全部') {
    services = services.filter(s => s.category === selectedCategory.value)
  }

  if (keyword.value) {
    const kw = keyword.value.toLowerCase()
    services = services.filter(s =>
      s.title.toLowerCase().includes(kw) ||
      s.description.toLowerCase().includes(kw) ||
      s.tags.some(t => t.toLowerCase().includes(kw))
    )
  }

  return services
})

onMounted(() => {
  serviceStore.loadServices()

  // 检查是否有预选的分类
  const preSelectedCategory = uni.getStorageSync('selectedCategory')
  if (preSelectedCategory) {
    selectedCategory.value = preSelectedCategory
    // 清除存储的分类
    uni.removeStorageSync('selectedCategory')
  }
})

function selectCategory(category: string) {
  selectedCategory.value = category
}

function handleSearch() {
  // 触发计算属性重新计算
}

function goToDetail(id: string) {
  uni.navigateTo({
    url: `/pages/service-detail/service-detail?id=${id}`
  })
}

function goToPublish() {
  uni.navigateTo({
    url: '/pages/publish/publish'
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
</script>

<style lang="scss" scoped>
.services-page {
  padding: 30rpx;
  padding-bottom: 150rpx;
}

.search-bar {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.search-input {
  flex: 1;
  background: #fff;
  border-radius: 100rpx;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
}

.search-btn {
  padding: 20rpx 40rpx;
  background: #0052D9;
  color: #fff;
  border-radius: 100rpx;
  font-size: 28rpx;
}

.category-scroll {
  white-space: nowrap;
  margin-bottom: 30rpx;
}

.category-item {
  display: inline-block;
  padding: 15rpx 30rpx;
  background: #fff;
  border-radius: 100rpx;
  font-size: 28rpx;
  color: #666;
  margin-right: 20rpx;
}

.category-item.active {
  background: #0052D9;
  color: #fff;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.service-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.service-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.service-price {
  font-size: 36rpx;
  font-weight: bold;
  color: #E34D59;
  margin-left: 20rpx;
}

.service-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.provider-info {
  display: flex;
  align-items: center;
}

.provider-avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 15rpx;
}

.provider-name {
  font-size: 26rpx;
  color: #333;
  margin-right: 15rpx;
}

.provider-rating {
  font-size: 24rpx;
  color: #FFA500;
}

.service-distance {
  font-size: 24rpx;
  color: #999;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 22rpx;
  padding: 6rpx 15rpx;
  background: #E6F7FF;
  color: #1890FF;
  border-radius: 8rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.publish-btn {
  position: fixed;
  bottom: 150rpx;
  right: 30rpx;
  background: linear-gradient(135deg, #0052D9 0%, #1890FF 100%);
  border-radius: 100rpx;
  padding: 25rpx 50rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 82, 217, 0.3);
}

.btn-text {
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
}
</style>
