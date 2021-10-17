import { getBase64Bytes, getFileIcon, getFileName } from './util'
import {getDownloadPath} from '../index'
import {setCookie} from '../../../utils/storage'
/**
 * 是否存在下载项
 * @param url - 下载地址
 * @param data - 下载记录
 */
export const isExistItem = (url, data) => {
    const item = data.filter(d => d.url === url)

    return item.length ? item[0] : null
}

/**
 * 下载
 * @param win - 窗口
 * @param url - 下载地址
 */
export const downloadFile = (url, win) => {
  if (!win) return
  win.webContents.downloadURL(url)
}

/**
 * 保存下载记录
 * @param data - 下载项
 */
export const setDownloadStore = (data) => {
  setCookie('downloadManager', data)
}


/**
 * 获取下载项下标
 * @param data - 下载记录
 * @param id - 下载项 id
 */
export const getDownloadIndex = (data, id) =>
  data.findIndex(item => item.id === id)


/**
 * 获取下载中的字节数据
 * @param data - 下载项
 */
export const getDownloadBytes = (data) => {
  const allBytes = data.reduce(
    (prev, current) => {
      if (current.state === 'progressing') {
        prev.receivedBytes += current.receivedBytes
        prev.totalBytes += current.totalBytes
      }

      return prev
    },
    { receivedBytes: 0, totalBytes: 0 },
  )

  return allBytes
}

/**
 * 添加下载项
 * @param param
 */
export const addDownloadItem = async ({
  item,
  downloadIds,
  data,
  newDownloadItem,
}) => {
  const id = downloadIds.shift() || ''
  // 判断下载项是否存在，存在先移除，再添加
  const itemIndex = getDownloadIndex(data, id)

  const fileUrl = item.getURL()
  const fileName = getFileName(newDownloadItem.fileName || '', item.getFilename())
  const startTime = item.getStartTime() * 1000
  const totalBytes = getBase64Bytes(fileUrl) || item.getTotalBytes()

  let fileId = new Date().getTime()
  const savePath = newDownloadItem.path || getDownloadPath()

  if (itemIndex > -1) {
    const newItems = data.splice(itemIndex, 1)
    const newItem = newItems[0]

    fileId = newItem.id
    if (newItem.paused) {
      item.pause()
    }
  }

  // 阻止系统保存对话框
  item.setSavePath(savePath)

  const fileIcon = await getFileIcon(savePath)
  const downloadItem = {
    id: fileId,
    url: fileUrl,
    icon: fileIcon,
    fileName,
    path: savePath,
    state: item.getState(),
    startTime,
    speed: 0,
    progress: 0,
    totalBytes,
    receivedBytes: item.getReceivedBytes(),
    paused: item.isPaused(),
    _sourceItem: item,
  }

  data.unshift(downloadItem)
  // setDownloadStore(data)
  // 清空缓存数据
  newDownloadItem = null

  return downloadItem
}


/**
 * 更新下载中数据
 * @param item - 下载项，electron 生成的对象
 * @param downloadItem - 更新的下载项
 * @param prevReceivedBytes - 上一次下载字节数
 * @param state - 下载状态
 */
export const updateDownloadItem = ({
  item,
  downloadItem,
  prevReceivedBytes,
  state,
}) => {
  const receivedBytes = item.getReceivedBytes()

  downloadItem.receivedBytes = receivedBytes
  // 计算每秒下载的速度
  downloadItem.speed = receivedBytes - prevReceivedBytes

  downloadItem.progress = receivedBytes / downloadItem.totalBytes
  downloadItem.state = state
  downloadItem.paused = item.isPaused()

  // setDownloadStore(data)
  return receivedBytes
}