import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Service {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  price: number
  priceType: 'fixed' | 'hourly' | 'negotiable'
  providerId: string
  providerName: string
  providerAvatar: string
  providerRating: number
  location: {
    latitude: number
    longitude: number
    address: string
  }
  tags: string[]
  images: string[]
  status: 'active' | 'inactive' | 'completed'
  createTime: string
  viewCount: number
  maxDistance?: number
}

export const useServiceStore = defineStore('service', () => {
  const services = ref<Service[]>([])
  const currentService = ref<Service | null>(null)
  const servicesLoading = ref(false)

  // 加载服务列表
  const loadServices = async (params?: {
    category?: string
    location?: { latitude: number; longitude: number }
    maxDistance?: number
  }) => {
    servicesLoading.value = true
    try {
      const savedServices = uni.getStorageSync('services')
      if (savedServices) {
        services.value = savedServices
      } else {
        // 加载默认示例数据
        services.value = getMockServices()
        uni.setStorageSync('services', services.value)
      }

      // 筛选
      let filtered = services.value.filter(s => s.status === 'active')

      if (params?.category) {
        filtered = filtered.filter(s => s.category === params.category)
      }

      services.value = filtered
    } catch (error) {
      console.error('加载服务失败:', error)
      services.value = []
    } finally {
      servicesLoading.value = false
    }
  }

  // 获取服务详情
  const getServiceDetail = (serviceId: string) => {
    return services.value.find(s => s.id === serviceId) || null
  }

  // 创建服务
  const createService = (serviceData: Omit<Service, 'id' | 'createTime' | 'viewCount' | 'status'>) => {
    const newService: Service = {
      ...serviceData,
      id: 'service_' + Date.now(),
      createTime: new Date().toISOString(),
      viewCount: 0,
      status: 'active'
    }

    services.value.unshift(newService)

    // 持久化
    uni.setStorageSync('services', services.value)

    return newService
  }

  // 增加浏览量
  const incrementViewCount = (serviceId: string) => {
    const service = services.value.find(s => s.id === serviceId)
    if (service) {
      service.viewCount++
      uni.setStorageSync('services', services.value)
    }
  }

  return {
    services,
    currentService,
    servicesLoading,
    loadServices,
    getServiceDetail,
    createService,
    incrementViewCount
  }
})

// 模拟数据
function getMockServices(): Service[] {
  return [
    // ========== 生活服务 ==========
    {
      id: 'service_1',
      title: '日常购物代购',
      description: '为老年人和行动不便的朋友提供日常购物代购服务,包括超市、菜市场等',
      category: '生活服务',
      price: 30,
      priceType: 'hourly',
      providerId: 'provider_1',
      providerName: '王大姐',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.9042,
        longitude: 116.4074,
        address: '北京市朝阳区'
      },
      tags: ['买菜', '超市', '日用品'],
      images: [],
      status: 'active',
      createTime: '2024-01-15T10:00:00Z',
      viewCount: 128,
      maxDistance: 5
    },
    {
      id: 'service_2',
      title: '家庭清洁打扫',
      description: '提供家庭清洁服务,包括打扫卫生、整理房间、擦窗户等',
      category: '生活服务',
      price: 80,
      priceType: 'fixed',
      providerId: 'provider_2',
      providerName: '刘阿姨',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.9142,
        longitude: 116.4174,
        address: '北京市海淀区'
      },
      tags: ['清洁', '打扫', '整理'],
      images: [],
      status: 'active',
      createTime: '2024-01-16T10:00:00Z',
      viewCount: 215,
      maxDistance: 8
    },
    {
      id: 'service_3',
      title: '家常菜配送',
      description: '为独居老人提供现做家常菜配送,营养均衡,口味清淡',
      category: '生活服务',
      price: 25,
      priceType: 'fixed',
      providerId: 'provider_3',
      providerName: '陈师傅',
      providerAvatar: '',
      providerRating: 4.7,
      location: {
        latitude: 39.8942,
        longitude: 116.3974,
        address: '北京市西城区'
      },
      tags: ['做饭', '配送', '营养'],
      images: [],
      status: 'active',
      createTime: '2024-01-17T10:00:00Z',
      viewCount: 189,
      maxDistance: 3
    },
    {
      id: 'service_4',
      title: '衣物清洗服务',
      description: '上门收取衣物进行清洗,包括衣物、被褥、窗帘等',
      category: '生活服务',
      price: 50,
      priceType: 'fixed',
      providerId: 'provider_4',
      providerName: '周姐',
      providerAvatar: '',
      providerRating: 4.6,
      location: {
        latitude: 39.9242,
        longitude: 116.4274,
        address: '北京市东城区'
      },
      tags: ['洗衣', '晾晒', '被褥'],
      images: [],
      status: 'active',
      createTime: '2024-01-18T10:00:00Z',
      viewCount: 98,
      maxDistance: 6
    },
    {
      id: 'service_5',
      title: '家电维修',
      description: '专业维修各种家用电器,包括冰箱、洗衣机、空调等',
      category: '生活服务',
      price: 100,
      priceType: 'negotiable',
      providerId: 'provider_5',
      providerName: '吴师傅',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.8842,
        longitude: 116.3874,
        address: '北京市丰台区'
      },
      tags: ['维修', '家电', '上门'],
      images: [],
      status: 'active',
      createTime: '2024-01-19T10:00:00Z',
      viewCount: 167,
      maxDistance: 10
    },

    // ========== 出行服务 ==========
    {
      id: 'service_6',
      title: '轮椅陪同外出',
      description: '为轮椅用户提供外出陪同服务,包括就医、公园、商场等',
      category: '出行服务',
      price: 50,
      priceType: 'hourly',
      providerId: 'provider_6',
      providerName: '张师傅',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.9342,
        longitude: 116.4374,
        address: '北京市朝阳区'
      },
      tags: ['轮椅', '就医', '陪同'],
      images: [],
      status: 'active',
      createTime: '2024-01-20T10:00:00Z',
      viewCount: 256,
      maxDistance: 5
    },
    {
      id: 'service_7',
      title: '无障碍车辆接送',
      description: '提供无障碍车辆接送服务,车辆配备升降平台,方便轮椅上下',
      category: '出行服务',
      price: 80,
      priceType: 'fixed',
      providerId: 'provider_7',
      providerName: '顺风车公司',
      providerAvatar: '',
      providerRating: 4.7,
      location: {
        latitude: 39.9142,
        longitude: 116.4174,
        address: '北京市海淀区'
      },
      tags: ['接送', '无障碍', '升降平台'],
      images: [],
      status: 'active',
      createTime: '2024-01-21T10:00:00Z',
      viewCount: 312,
      maxDistance: 15
    },
    {
      id: 'service_8',
      title: '视障人士陪同',
      description: '为视障人士提供出行陪同服务,协助导航、读标识等',
      category: '出行服务',
      price: 40,
      priceType: 'hourly',
      providerId: 'provider_8',
      providerName: '小李',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.8942,
        longitude: 116.3974,
        address: '北京市西城区'
      },
      tags: ['视障', '陪同', '导航'],
      images: [],
      status: 'active',
      createTime: '2024-01-22T10:00:00Z',
      viewCount: 178,
      maxDistance: 8
    },
    {
      id: 'service_9',
      title: '机场火车站接送',
      description: '提供机场、火车站接送服务,协助搬运行李、检票等',
      category: '出行服务',
      price: 150,
      priceType: 'fixed',
      providerId: 'provider_9',
      providerName: '车队老王',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.9242,
        longitude: 116.4274,
        address: '北京市东城区'
      },
      tags: ['接送', '机场', '火车站'],
      images: [],
      status: 'active',
      createTime: '2024-01-23T10:00:00Z',
      viewCount: 423,
      maxDistance: 30
    },
    {
      id: 'service_10',
      title: '公交地铁陪同',
      description: '帮助老年人熟悉公交线路和地铁换乘,安全出行',
      category: '出行服务',
      price: 35,
      priceType: 'hourly',
      providerId: 'provider_10',
      providerName: '赵师傅',
      providerAvatar: '',
      providerRating: 4.6,
      location: {
        latitude: 39.8842,
        longitude: 116.3874,
        address: '北京市丰台区'
      },
      tags: ['公交', '地铁', '陪同'],
      images: [],
      status: 'active',
      createTime: '2024-01-24T10:00:00Z',
      viewCount: 134,
      maxDistance: 6
    },

    // ========== 医疗健康 ==========
    {
      id: 'service_11',
      title: '就医陪同',
      description: '陪同老年人去医院看病,协助挂号、取药、检查等',
      category: '医疗健康',
      price: 60,
      priceType: 'hourly',
      providerId: 'provider_11',
      providerName: '刘护工',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.9442,
        longitude: 116.4474,
        address: '北京市朝阳区'
      },
      tags: ['就医', '陪同', '挂号'],
      images: [],
      status: 'active',
      createTime: '2024-01-25T10:00:00Z',
      viewCount: 287,
      maxDistance: 5
    },
    {
      id: 'service_12',
      title: '康复理疗',
      description: '专业康复理疗师提供上门服务,包括按摩、针灸、推拿等',
      category: '医疗健康',
      price: 80,
      priceType: 'hourly',
      providerId: 'provider_12',
      providerName: '王理疗师',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.9142,
        longitude: 116.4174,
        address: '北京市海淀区'
      },
      tags: ['康复', '按摩', '理疗'],
      images: [],
      status: 'active',
      createTime: '2024-01-26T10:00:00Z',
      viewCount: 356,
      maxDistance: 8
    },
    {
      id: 'service_13',
      title: '健康监测',
      description: '定期上门为老年人测量血压、血糖,提供健康建议',
      category: '医疗健康',
      price: 50,
      priceType: 'fixed',
      providerId: 'provider_13',
      providerName: '社区健康站',
      providerAvatar: '',
      providerRating: 4.7,
      location: {
        latitude: 39.8942,
        longitude: 116.3974,
        address: '北京市西城区'
      },
      tags: ['监测', '血压', '血糖'],
      images: [],
      status: 'active',
      createTime: '2024-01-27T10:00:00Z',
      viewCount: 412,
      maxDistance: 3
    },
    {
      id: 'service_14',
      title: '用药提醒',
      description: '每天定时提醒老年人按时吃药,防止漏服、误服',
      category: '医疗健康',
      price: 20,
      priceType: 'fixed',
      providerId: 'provider_14',
      providerName: '贴心管家',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.9242,
        longitude: 116.4274,
        address: '北京市东城区'
      },
      tags: ['提醒', '用药', '健康'],
      images: [],
      status: 'active',
      createTime: '2024-01-28T10:00:00Z',
      viewCount: 278,
      maxDistance: 5
    },
    {
      id: 'service_15',
      title: '心理咨询',
      description: '为老年人提供心理疏导服务,缓解孤独、焦虑等情绪',
      category: '医疗健康',
      price: 100,
      priceType: 'hourly',
      providerId: 'provider_15',
      providerName: '张心理师',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.8842,
        longitude: 116.3874,
        address: '北京市丰台区'
      },
      tags: ['心理', '疏导', '陪伴'],
      images: [],
      status: 'active',
      createTime: '2024-01-29T10:00:00Z',
      viewCount: 189,
      maxDistance: 10
    },

    // ========== 技能培训 ==========
    {
      id: 'service_16',
      title: '智能手机教学',
      description: '一对一教老年人使用智能手机,包括微信、支付宝等常用应用',
      category: '技能培训',
      price: 60,
      priceType: 'hourly',
      providerId: 'provider_16',
      providerName: '李老师',
      providerAvatar: '',
      providerRating: 5.0,
      location: {
        latitude: 39.9542,
        longitude: 116.4574,
        address: '北京市朝阳区'
      },
      tags: ['智能手机', '微信', '支付宝'],
      images: [],
      status: 'active',
      createTime: '2024-01-30T10:00:00Z',
      viewCount: 456,
      maxDistance: 10
    },
    {
      id: 'service_17',
      title: '书法绘画课程',
      description: '开设书法和国画课程,丰富老年人的文化生活',
      category: '技能培训',
      price: 80,
      priceType: 'hourly',
      providerId: 'provider_17',
      providerName: '艺术中心',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.9142,
        longitude: 116.4174,
        address: '北京市海淀区'
      },
      tags: ['书法', '绘画', '艺术'],
      images: [],
      status: 'active',
      createTime: '2024-01-31T10:00:00Z',
      viewCount: 234,
      maxDistance: 8
    },
    {
      id: 'service_18',
      title: '广场舞教学',
      description: '教老年人跳广场舞,锻炼身体,结交朋友',
      category: '技能培训',
      price: 30,
      priceType: 'hourly',
      providerId: 'provider_18',
      providerName: '舞蹈老师小美',
      providerAvatar: '',
      providerRating: 4.7,
      location: {
        latitude: 39.8942,
        longitude: 116.3974,
        address: '北京市西城区'
      },
      tags: ['广场舞', '健身', '社交'],
      images: [],
      status: 'active',
      createTime: '2024-02-01T10:00:00Z',
      viewCount: 367,
      maxDistance: 5
    },
    {
      id: 'service_19',
      title: '太极养生班',
      description: '教授太极拳,强身健体,改善身体状况',
      category: '技能培训',
      price: 50,
      priceType: 'hourly',
      providerId: 'provider_19',
      providerName: '陈教练',
      providerAvatar: '',
      providerRating: 4.9,
      location: {
        latitude: 39.9242,
        longitude: 116.4274,
        address: '北京市东城区'
      },
      tags: ['太极', '养生', '健身'],
      images: [],
      status: 'active',
      createTime: '2024-02-02T10:00:00Z',
      viewCount: 289,
      maxDistance: 6
    },
    {
      id: 'service_20',
      title: '健康饮食讲座',
      description: '营养师讲解健康饮食知识,搭配营养餐谱',
      category: '技能培训',
      price: 40,
      priceType: 'fixed',
      providerId: 'provider_20',
      providerName: '营养师王女士',
      providerAvatar: '',
      providerRating: 4.8,
      location: {
        latitude: 39.8842,
        longitude: 116.3874,
        address: '北京市丰台区'
      },
      tags: ['营养', '饮食', '讲座'],
      images: [],
      status: 'active',
      createTime: '2024-02-03T10:00:00Z',
      viewCount: 156,
      maxDistance: 8
    }
  ]
}
