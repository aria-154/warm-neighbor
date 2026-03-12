<!-- 无障碍地图 -->
<template>
  <view class="map-page">
    <map
      class="map"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      :polyline="polyline"
      @markerTap="onMarkerTap"
      show-location
      :enable-3D="false"
      :show-compass="true"
      :enable-overlooking="false"
    >
      <!-- 控制按钮 -->
      <cover-view class="map-controls">
        <cover-view class="control-btn" @tap="refreshLocation">📍 定位</cover-view>
        <cover-view class="control-btn" @tap="toggleLayer">🗺️ 切换图层</cover-view>
      </cover-view>
    </map>

    <!-- 底部信息面板 -->
    <view class="bottom-panel" v-if="selectedPlace">
      <view class="panel-content">
        <view class="place-header">
          <text class="place-name">{{ selectedPlace.name }}</text>
          <text class="place-category">{{ selectedPlace.category }}</text>
        </view>
        <text class="place-address">{{ selectedPlace.address }}</text>
        <view class="place-features">
          <view class="feature-item" v-for="(feature, index) in selectedPlace.features" :key="index">
            <text class="feature-icon">{{ feature.icon }}</text>
            <text class="feature-text">{{ feature.text }}</text>
          </view>
        </view>
        <view class="place-actions">
          <button class="action-btn primary" @tap="navigate">🧭 导航前往</button>
          <button class="action-btn secondary" @tap="callPhone">📞 联系</button>
        </view>
      </view>
    </view>

    <!-- 类型筛选 -->
    <view class="filter-bar">
      <scroll-view scroll-x class="filter-scroll">
        <view
          class="filter-item"
          :class="{ active: selectedType === item.value }"
          v-for="item in filterTypes"
          :key="item.value"
          @tap="selectType(item.value)"
        >
          <text>{{ item.label }}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const latitude = ref(39.9042)
const longitude = ref(116.4074)
const selectedType = ref('all')
const selectedPlace = ref<any>(null)

const filterTypes = [
  { label: '全部', value: 'all' },
  { label: '🏥 医院', value: 'hospital' },
  { label: '🏠 社区', value: 'community' },
  { label: '🛒 商场', value: 'mall' },
  { label: '🚌 公交', value: 'bus' },
  { label: '♿ 无障碍', value: 'accessible' }
]

const markers = ref([
  {
    id: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    title: '朝阳医院',
    iconPath: '/static/marker-hospital.png',
    width: 30,
    height: 30,
    callout: {
      content: '朝阳医院',
      color: '#333',
      fontSize: 12,
      borderRadius: 10,
      bgColor: '#fff',
      padding: 10,
      display: 'ALWAYS'
    }
  },
  {
    id: 2,
    latitude: 39.9142,
    longitude: 116.4174,
    title: '望京社区服务中心',
    iconPath: '/static/marker-community.png',
    width: 30,
    height: 30
  }
])

const polyline = ref([
  {
    points: [
      { latitude: 39.9042, longitude: 116.4074 },
      { latitude: 39.9142, longitude: 116.4174 }
    ],
    color: '#0052D9',
    width: 4,
    dottedLine: true
  }
])

onMounted(() => {
  getLocation()
})

function getLocation() {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      latitude.value = res.latitude
      longitude.value = res.longitude
      loadNearbyPlaces()
    },
    fail: () => {
      uni.showToast({
        title: '定位失败',
        icon: 'none'
      })
    }
  })
}

function refreshLocation() {
  uni.showLoading({ title: '定位中...' })
  getLocation()
  setTimeout(() => uni.hideLoading(), 1000)
}

function loadNearbyPlaces() {
  // 模拟加载附近地点
}

function selectType(type: string) {
  selectedType.value = type
  // 根据类型筛选标记点
}

function onMarkerTap(e: any) {
  const marker = markers.value.find(m => m.id === e.markerId)
  if (marker) {
    selectedPlace.value = {
      name: marker.title,
      address: marker.title + '附近',
      category: '公共服务',
      features: [
        { icon: '♿', text: '无障碍通道' },
        { icon: '🚗', text: '停车场' }
      ]
    }
  }
}

function navigate() {
  if (selectedPlace.value) {
    uni.openLocation({
      latitude: latitude.value,
      longitude: longitude.value,
      name: selectedPlace.value.name,
      address: selectedPlace.value.address
    })
  }
}

function callPhone() {
  uni.showToast({
    title: '拨打联系电话',
    icon: 'none'
  })
}

function toggleLayer() {
  uni.showToast({
    title: '切换地图图层',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.map-page {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.control-btn {
  background: #fff;
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.filter-bar {
  position: absolute;
  top: 150rpx;
  left: 30rpx;
  right: 30rpx;
  background: #fff;
  border-radius: 100rpx;
  padding: 15rpx 30rpx;
}

.filter-scroll {
  white-space: nowrap;
}

.filter-item {
  display: inline-block;
  padding: 12rpx 24rpx;
  border-radius: 50rpx;
  font-size: 26rpx;
  color: #666;
  margin-right: 15rpx;
}

.filter-item.active {
  background: #0052D9;
  color: #fff;
}

.bottom-panel {
  position: absolute;
  bottom: 150rpx;
  left: 30rpx;
  right: 30rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.panel-content {
  padding: 30rpx;
}

.place-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.place-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.place-category {
  font-size: 24rpx;
  padding: 8rpx 16rpx;
  background: #E6F7FF;
  color: #1890FF;
  border-radius: 8rpx;
}

.place-address {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.place-features {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  background: #f8f8f8;
  border-radius: 50rpx;
}

.feature-icon {
  font-size: 28rpx;
  margin-right: 10rpx;
}

.feature-text {
  font-size: 24rpx;
  color: #666;
}

.place-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  padding: 25rpx;
  border-radius: 100rpx;
  font-size: 28rpx;
  border: none;
}

.action-btn.primary {
  background: #0052D9;
  color: #fff;
}

.action-btn.secondary {
  background: #f0f0f0;
  color: #333;
}
</style>
