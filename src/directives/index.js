import copy from './copy'
import longpress from './longpress'
import water from './water'
import debounce from './debounce'
import permission from './permission'
import draggable from './draggable'
import lazyload from './lazyload'
// 自定义指令
const directives = {
  copy,
  longpress,
  water,
  debounce,
  permission,
  draggable,
  lazyload
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}

// export function setupDirectives(app) {
//     app.use(directives);
// }