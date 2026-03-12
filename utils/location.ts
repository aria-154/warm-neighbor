/**
 * 定位工具
 */

/**
 * 获取当前位置
 */
export function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 计算两点之间距离(公里)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // 地球半径(公里)
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * 选择位置
 */
export function chooseLocation(): Promise<{
  latitude: number
  longitude: number
  address: string
  name: string
}> {
  return new Promise((resolve, reject) => {
    uni.chooseLocation({
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address,
          name: res.name
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 打开地图导航
 */
export function openMapNavigation(options: {
  latitude: number
  longitude: number
  name?: string
  address?: string
}) {
  uni.openLocation({
    latitude: options.latitude,
    longitude: options.longitude,
    name: options.name || '目的地',
    address: options.address || ''
  })
}
