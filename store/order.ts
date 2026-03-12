import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Order {
  id: string
  serviceId: string
  serviceName: string
  providerId: string
  providerName: string
  providerAvatar: string
  userId: string
  userName: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  createTime: string
  updateTime: string
  price: number
  address: string
  contact: string
  remark?: string
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)

  // 加载订单列表
  const loadOrders = (userId: string) => {
    try {
      const savedOrders = uni.getStorageSync(`orders_${userId}`)
      if (savedOrders) {
        orders.value = savedOrders
      } else {
        // 加载默认示例数据
        orders.value = getMockOrders(userId)
        uni.setStorageSync(`orders_${userId}`, orders.value)
      }
    } catch (error) {
      console.error('加载订单失败:', error)
    }
  }

  // 创建订单
  const createOrder = (orderData: Omit<Order, 'id' | 'createTime' | 'updateTime' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: 'order_' + Date.now(),
      status: 'pending',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }

    orders.value.unshift(newOrder)

    // 持久化存储
    if (orderData.userId) {
      uni.setStorageSync(`orders_${orderData.userId}`, orders.value)
    }

    return newOrder
  }

  // 更新订单状态
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const index = orders.value.findIndex(o => o.id === orderId)
    if (index !== -1) {
      orders.value[index].status = status
      orders.value[index].updateTime = new Date().toISOString()

      // 持久化
      if (orders.value[index].userId) {
        uni.setStorageSync(`orders_${orders.value[index].userId}`, orders.value)
      }

      return orders.value[index]
    }
    return null
  }

  // 获取订单详情
  const getOrderDetail = (orderId: string) => {
    return orders.value.find(o => o.id === orderId) || null
  }

  // 根据状态筛选订单
  const getOrdersByStatus = (status: Order['status']) => {
    return orders.value.filter(o => o.status === status)
  }

  return {
    orders,
    currentOrder,
    loadOrders,
    createOrder,
    updateOrderStatus,
    getOrderDetail,
    getOrdersByStatus
  }
})

// 模拟订单数据
function getMockOrders(userId: string): Order[] {
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

  return [
    // 待确认订单
    {
      id: 'order_1',
      serviceId: 'service_1',
      serviceName: '日常购物代购',
      providerId: 'provider_1',
      providerName: '王大姐',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'pending',
      createTime: now.toISOString(),
      updateTime: now.toISOString(),
      price: 30,
      address: '北京市朝阳区建国路88号',
      contact: '138****1234',
      remark: '需要帮忙买点新鲜蔬菜'
    },
    {
      id: 'order_2',
      serviceId: 'service_11',
      serviceName: '就医陪同',
      providerId: 'provider_11',
      providerName: '刘护工',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'pending',
      createTime: now.toISOString(),
      updateTime: now.toISOString(),
      price: 60,
      address: '北京市朝阳区三里屯医院',
      contact: '138****1234',
      remark: '周三下午2点'
    },

    // 进行中订单
    {
      id: 'order_3',
      serviceId: 'service_2',
      serviceName: '家庭清洁打扫',
      providerId: 'provider_2',
      providerName: '刘阿姨',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'in_progress',
      createTime: yesterday.toISOString(),
      updateTime: now.toISOString(),
      price: 80,
      address: '北京市朝阳区望京西园',
      contact: '138****1234',
      remark: '需要打扫客厅和卧室'
    },
    {
      id: 'order_4',
      serviceId: 'service_16',
      serviceName: '智能手机教学',
      providerId: 'provider_16',
      providerName: '李老师',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'in_progress',
      createTime: yesterday.toISOString(),
      updateTime: now.toISOString(),
      price: 120,
      address: '北京市西城区金融街',
      contact: '138****1234',
      remark: '学习如何使用微信视频通话'
    },

    // 已完成订单
    {
      id: 'order_5',
      serviceId: 'service_6',
      serviceName: '轮椅陪同外出',
      providerId: 'provider_6',
      providerName: '张师傅',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'completed',
      createTime: twoDaysAgo.toISOString(),
      updateTime: twoDaysAgo.toISOString(),
      price: 100,
      address: '北京市朝阳区朝阳公园',
      contact: '138****1234',
      remark: '去朝阳公园散步'
    },
    {
      id: 'order_6',
      serviceId: 'service_3',
      serviceName: '家常菜配送',
      providerId: 'provider_3',
      providerName: '陈师傅',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'completed',
      createTime: twoDaysAgo.toISOString(),
      updateTime: twoDaysAgo.toISOString(),
      price: 25,
      address: '北京市西城区广内大街',
      contact: '138****1234',
      remark: '清淡一点'
    },
    {
      id: 'order_7',
      serviceId: 'service_12',
      serviceName: '康复理疗',
      providerId: 'provider_12',
      providerName: '王理疗师',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'completed',
      createTime: threeDaysAgo.toISOString(),
      updateTime: threeDaysAgo.toISOString(),
      price: 80,
      address: '北京市海淀区中关村',
      contact: '138****1234',
      remark: '腰部理疗'
    },
    {
      id: 'order_8',
      serviceId: 'service_17',
      serviceName: '书法绘画课程',
      providerId: 'provider_17',
      providerName: '艺术中心',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'completed',
      createTime: threeDaysAgo.toISOString(),
      updateTime: threeDaysAgo.toISOString(),
      price: 160,
      address: '北京市海淀区文化艺术中心',
      contact: '138****1234',
      remark: '学习基础书法'
    },
    {
      id: 'order_9',
      serviceId: 'service_5',
      serviceName: '家电维修',
      providerId: 'provider_5',
      providerName: '吴师傅',
      providerAvatar: '',
      userId: userId,
      userName: '张三',
      status: 'completed',
      createTime: threeDaysAgo.toISOString(),
      updateTime: threeDaysAgo.toISOString(),
      price: 100,
      address: '北京市丰台区方庄',
      contact: '138****1234',
      remark: '洗衣机不排水'
    }
  ]
}
