import path from 'path';
import fs from 'fs';
import { app } from "electron";
/**
 * 检查文件是否存在
 * @param path - 文件路径
 */
export const isExistFile = (path) => fs.existsSync(path)

/**
 * 获取文件后缀名
 * @param fileName - 文件名
 */
export const getFileExt = (fileName) => path.extname(fileName)

/**
 * 拼接路径
 * @param filePath - 文件路径
 */
export const pathJoin = (...filePath) => path.join(...filePath)

/**
 * 获取文件图标。
 * 系统关联图标
 * @param path - 文件路径
 */
export const getFileIcon = async (path) => {
  const iconDefault = ''
  if (!path) Promise.resolve(iconDefault)

  const icon = await app.getFileIcon(path, {
    size: 'normal',
  })

  return icon.toDataURL()
}


/**
 * 获取文件名
 * @param fileName - 文件名
 * @param defaultName - 默认文件名
 */
export const getFileName = (fileName, defaultName) => {
  // 处理 Windows 文件名不允许的字符
  fileName = fileName.replace(/(\/|\|?:|\?|\*|"|>|<|\|)/g, '') || path.basename(defaultName)
  fileName = /^\.(.*)/.test(fileName) ? defaultName : fileName

  const extName = getFileExt(fileName)
  if (!extName) {
    const ext = getFileExt(defaultName)
    fileName = `${fileName}.${ext}`
  }

  return decodeURIComponent(fileName)
}

/**
 * 获取 base64 图片字节
 * @param base64 - base64 字符串
 */
export const getBase64Bytes = (base64) => {
  if (!/^data:.*;base64/.test(base64)) return 0

  const data = base64.split(',')[1].split('=')[0]
  const { length } = data

  return Math.floor(length - (length / 8) * 2)
}

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