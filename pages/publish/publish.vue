<!-- 发布服务 -->
<template>
  <view class="publish-page">
    <form @submit="handleSubmit">
      <!-- 基本信息 -->
      <view class="form-section">
        <view class="section-title">基本信息</view>

        <view class="form-item">
          <text class="label">服务标题 *</text>
          <input class="input" v-model="formData.title" placeholder="请输入服务标题" />
        </view>

        <view class="form-item">
          <text class="label">服务描述 *</text>
          <textarea class="textarea" v-model="formData.description" placeholder="请详细描述您的服务内容" :maxlength="500" />
          <text class="char-count">{{ formData.description.length }}/500</text>
        </view>

        <view class="form-item">
          <text class="label">服务分类 *</text>
          <picker :range="categories" @change="onCategoryChange">
            <view class="picker">
              {{ formData.category || '请选择服务分类' }}
            </view>
          </picker>
        </view>
      </view>

      <!-- 价格设置 -->
      <view class="form-section">
        <view class="section-title">价格设置</view>

        <view class="form-item">
          <text class="label">价格 *</text>
          <input class="input" v-model.number="formData.price" type="digit" placeholder="请输入价格" />
          <text class="unit">元</text>
        </view>

        <view class="form-item">
          <text class="label">计费方式 *</text>
          <picker :range="priceTypes" @change="onPriceTypeChange">
            <view class="picker">
              {{ formData.priceTypeText || '请选择计费方式' }}
            </view>
          </picker>
        </view>
      </view>

      <!-- 服务范围 -->
      <view class="form-section">
        <view class="section-title">服务范围</view>

        <view class="form-item">
          <text class="label">服务地址 *</text>
          <view class="location-picker" @tap="chooseLocation">
            <text>{{ formData.address || '请选择服务地址' }}</text>
            <text class="arrow">></text>
          </view>
        </view>

        <view class="form-item">
          <text class="label">服务半径(公里)</text>
          <input class="input" v-model.number="formData.maxDistance" type="number" placeholder="默认5公里" />
        </view>
      </view>

      <!-- 服务标签 -->
      <view class="form-section">
        <view class="section-title">服务标签</view>

        <view class="tags-input">
          <view class="tag-item" v-for="(tag, index) in formData.tags" :key="index">
            <text>{{ tag }}</text>
            <text class="close" @tap="removeTag(index)">×</text>
          </view>
          <input class="tag-input" v-model="tagInput" @confirm="addTag" placeholder="添加标签" />
        </view>
      </view>

      <!-- 联系方式 -->
      <view class="form-section">
        <view class="section-title">联系方式</view>

        <view class="form-item">
          <text class="label">联系电话 *</text>
          <input class="input" v-model="formData.contact" type="number" placeholder="请输入联系电话" />
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" form-type="submit" :disabled="!canSubmit">发布服务</button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useServiceStore } from '@/store/service'

const userStore = useUserStore()
const serviceStore = useServiceStore()

const formData = ref({
  title: '',
  description: '',
  category: '',
  price: '',
  priceType: 'fixed',
  priceTypeText: '按次',
  address: '',
  maxDistance: 5,
  tags: [] as string[],
  contact: ''
})

const tagInput = ref('')
const categories = ['生活服务', '出行服务', '医疗健康', '技能培训']
const priceTypes = ['按次', '按时', '议价']

const canSubmit = computed(() => {
  return formData.value.title &&
         formData.value.description &&
         formData.value.category &&
         formData.value.price &&
         formData.value.address &&
         formData.value.contact
})

function onCategoryChange(e: any) {
  formData.value.category = categories[e.detail.value]
}

function onPriceTypeChange(e: any) {
  const typeMap: any = ['fixed', 'hourly', 'negotiable']
  formData.value.priceType = typeMap[e.detail.value]
  formData.value.priceTypeText = priceTypes[e.detail.value]
}

function chooseLocation() {
  uni.chooseLocation({
    success: (res) => {
      formData.value.address = res.address
      formData.value.latitude = res.latitude
      formData.value.longitude = res.longitude
    }
  })
}

function addTag() {
  if (tagInput.value && !formData.value.tags.includes(tagInput.value)) {
    formData.value.tags.push(tagInput.value)
    tagInput.value = ''
  }
}

function removeTag(index: number) {
  formData.value.tags.splice(index, 1)
}

function handleSubmit() {
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

  const serviceData = {
    title: formData.value.title,
    description: formData.value.description,
    category: formData.value.category,
    price: Number(formData.value.price),
    priceType: formData.value.priceType as 'fixed' | 'hourly' | 'negotiable',
    providerId: userStore.userInfo?.id || '',
    providerName: userStore.userInfo?.nickname || '',
    providerAvatar: userStore.userInfo?.avatar || '',
    providerRating: 5.0,
    location: {
      latitude: formData.value.latitude || 39.9042,
      longitude: formData.value.longitude || 116.4074,
      address: formData.value.address
    },
    tags: formData.value.tags
  }

  serviceStore.createService(serviceData)

  uni.showToast({
    title: '发布成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.publish-page {
  padding: 30rpx;
  padding-bottom: 150rpx;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 30rpx;
  position: relative;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 15rpx;
}

.input {
  width: 100%;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.textarea {
  width: 100%;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  font-size: 28rpx;
  min-height: 200rpx;
}

.char-count {
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
  font-size: 24rpx;
  color: #999;
}

.picker {
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #333;
}

.location-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  font-size: 28rpx;
}

.arrow {
  color: #999;
}

.unit {
  position: absolute;
  right: 20rpx;
  top: 60rpx;
  font-size: 28rpx;
  color: #666;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.tag-item {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  background: #E6F7FF;
  color: #1890FF;
  border-radius: 30rpx;
  font-size: 26rpx;
}

.tag-item .close {
  margin-left: 10rpx;
  font-size: 32rpx;
  line-height: 1;
}

.tag-input {
  flex: 1;
  min-width: 200rpx;
  padding: 10rpx 20rpx;
  background: #f8f8f8;
  border-radius: 30rpx;
  font-size: 26rpx;
}

.submit-section {
  margin-top: 40rpx;
}

.submit-btn {
  width: 100%;
  padding: 30rpx;
  background: linear-gradient(135deg, #0052D9 0%, #1890FF 100%);
  color: #fff;
  border-radius: 100rpx;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
}

.submit-btn[disabled] {
  background: #ccc;
}
</style>
