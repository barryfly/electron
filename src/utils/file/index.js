/**
 * 处理文件大小
 * @param bytes - 字节
 * @param isUnit - 是否需要单位，默认 `true`
 */
export const getFileSize = (bytes, isUnit = true) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) {
    return isUnit ? '0B' : '0'
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  if (i === 0) {
    return bytes + (isUnit ? sizes[i] : '')
  }
  return (bytes / 1024 ** i).toFixed(2) + (isUnit ? sizes[i] : '')
}