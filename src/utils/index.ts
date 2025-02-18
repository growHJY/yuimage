const filterTime = (time: string) => {
  const date = new Date(time)

  // 转换为北京时间（UTC+8）
  const chinaTime = new Date(date.getTime() + 8 * 3600 * 1000)
  // 格式化为 YYYY-MM-DD HH:mm:ss
  const year = chinaTime.getFullYear()
  const month = String(chinaTime.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
  const day = String(chinaTime.getDate()).padStart(2, '0')
  const hours = String(chinaTime.getHours()).padStart(2, '0')
  const minutes = String(chinaTime.getMinutes()).padStart(2, '0')
  const seconds = String(chinaTime.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

type SizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

function formatFileSize(size: string): string {
  size = parseFloat(size)
  if (size < 0) {
    throw new Error('Size cannot be negative')
  }

  const units: SizeUnit[] = ['B', 'KB', 'MB', 'GB', 'TB']
  let currentUnitIndex = 0

  while (size >= 1024 && currentUnitIndex < units.length - 1) {
    size /= 1024
    currentUnitIndex++
  }

  return `${size.toFixed(2)} ${units[currentUnitIndex]}`
}

export { filterTime, formatFileSize }
