<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

onLaunch(() => {
  console.log('App Launch')
  // 检查用户登录状态
  userStore.checkLoginStatus()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 全局样式 */
@import '@/uni.scss';

page {
  background-color: #F8F8F8;
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
}

/* 无障碍模式 - 大字体 */
.accessibility-large {
  font-size: 36rpx !important;
}

/* 无障碍模式 - 高对比度 */
.accessibility-high-contrast {
  filter: contrast(1.3);
}

/* 通用类 */
.container {
  padding: 30rpx;
}

.page-section {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
  color: #333;
}

.btn-large {
  padding: 24rpx 40rpx;
  font-size: 32rpx;
  border-radius: 12rpx;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: #0052D9;
}

.text-secondary {
  color: #666;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* 安全区域适配 */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
