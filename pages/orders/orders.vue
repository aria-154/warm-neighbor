<!-- 订单中心 -->
<template>
  <view class="orders-page">
    <!-- 标签页 -->
    <view class="tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        v-for="tab in tabs"
        :key="tab.value"
        @tap="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
        <text class="badge" v-if="tab.count > 0">{{ tab.count }}</text>
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view class="order-item" v-for="order in filteredOrders" :key="order.id" @tap="goToDetail(order.id)">
        <view class="order-header">
          <text class="order-title">{{ order.serviceName }}</text>
          <text class="order-status" :class="order.status">{{ getStatusText(order.status) }}</text>
        </view>
        <view class="order-info">
          <image class="provider-avatar" :src="order.providerAvatar" mode="aspectFill" />
          <view class="info-text">
            <text class="provider-name">服务提供者: {{ order.providerName }}</text>
            <text class="order-time">{{ formatTime(order.createTime) }}</text>
          </view>
        </view>
        <view class="order-price">
          <text class="price-text">¥{{ order.price }}</text>
        </view>
        <view class="order-actions" v-if="order.status === 'pending'">
          <button class="action-btn cancel" @tap.stop="cancelOrder(order.id)">取消订单</button>
          <button class="action-btn confirm" @tap.stop="confirmOrder(order.id)">确认订单</button>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredOrders.length === 0">
        <text class="empty-icon">📋</text>
        <text class="empty-text">暂无订单</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/store/order'
import { useUserStore } from '@/store/user'

const orderStore = useOrderStore()
const userStore = useUserStore()
const activeTab = ref('all')

const tabs = computed(() => [
  { label: '全部', value: 'all', count: orderStore.orders.length },
  { label: '待确认', value: 'pending', count: orderStore.getOrdersByStatus('pending').length },
  { label: '进行中', value: 'in_progress', count: orderStore.getOrdersByStatus('in_progress').length },
  { label: '已完成', value: 'completed', count: orderStore.getOrdersByStatus('completed').length }
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orderStore.orders
  }
  return orderStore.orders.filter(o => o.status === activeTab.value)
})

onMounted(() => {
  if (userStore.userInfo) {
    orderStore.loadOrders(userStore.userInfo.id)
  }
})

function switchTab(tab: string) {
  activeTab.value = tab
}

function getStatusText(status: string) {
  const map: any = {
    pending: '待确认',
    confirmed: '已确认',
    in_progress: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return map[status] || status
}

function formatTime(time: string) {
  const date = new Date(time)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
}

function goToDetail(id: string) {
  uni.navigateTo({
    url: `/pages/order-detail/order-detail?id=${id}`
  })
}

function cancelOrder(id: string) {
  uni.showModal({
    title: '取消订单',
    content: '确定要取消这个订单吗?',
    success: (res) => {
      if (res.confirm) {
        orderStore.updateOrderStatus(id, 'cancelled')
        uni.showToast({
          title: '订单已取消',
          icon: 'success'
        })
      }
    }
  })
}

function confirmOrder(id: string) {
  orderStore.updateOrderStatus(id, 'confirmed')
  uni.showToast({
    title: '订单已确认',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.orders-page {
  padding: 30rpx;
  padding-bottom: 150rpx;
}

.tabs {
  display: flex;
  background: #fff;
  border-radius: 100rpx;
  padding: 8rpx;
  margin-bottom: 30rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 15rpx;
  border-radius: 100rpx;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  background: #0052D9;
  color: #fff;
}

.badge {
  position: absolute;
  top: 5rpx;
  right: 10rpx;
  background: #E34D59;
  color: #fff;
  font-size: 20rpx;
  padding: 2rpx 8rpx;
  border-radius: 20rpx;
  min-width: 30rpx;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.order-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.order-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.order-status {
  font-size: 24rpx;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

.order-status.pending {
  background: #FFF7E6;
  color: #FA8C16;
}

.order-status.confirmed {
  background: #E6F7FF;
  color: #1890FF;
}

.order-status.in_progress {
  background: #F6FFED;
  color: #52C41A;
}

.order-status.completed {
  background: #F0F0F0;
  color: #999;
}

.order-status.cancelled {
  background: #FFF1F0;
  color: #F5222D;
}

.order-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.provider-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.info-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.provider-name {
  font-size: 26rpx;
  color: #333;
}

.order-time {
  font-size: 24rpx;
  color: #999;
}

.order-price {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20rpx;
}

.price-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #E34D59;
}

.order-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 100rpx;
  font-size: 26rpx;
  border: none;
}

.action-btn.cancel {
  background: #f0f0f0;
  color: #666;
}

.action-btn.confirm {
  background: #0052D9;
  color: #fff;
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
