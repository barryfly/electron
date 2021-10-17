import { isObject } from 'utils/is';
import { unref } from 'vue';
export function openWindow (url, opt) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

export function importAll (modulesFiles, resultArray = false) {
  let modules = resultArray ? [] : {};
  modulesFiles.keys().forEach(key => {
      if (resultArray) {
          modules.push(modulesFiles(key).default);
      } else {
    let moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    modules[moduleName] = {
    ...modulesFiles(key).default
    }
      }
  });

  return modules
}

export function deepMerge(src = {}, target = {}) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function getPopupContainer(node) {
  return (node.parentNode) || document.body;
}

export function getDynamicProps(props) {
  const ret = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props)[key]);
  });

  return ret;
}
