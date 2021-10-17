const isDevelopment = process.env.NODE_ENV !== 'production'
const isProduction = process.env.NODE_ENV === 'production'
const isWin = process.platform === 'win32'
const isMac = process.platform === 'darwin'

export {
    isDevelopment,
    isProduction,
    isWin,
    isMac
}