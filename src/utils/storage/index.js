/**
 * Cookie操作
 * getCookie(name) 获取cookie
 * setCookie(name, value, 有效期, 域, 路径) 设置cookie
 * delCookie(name, 域) 删除cookie
 * 
 * Session操作
 * getSession(name, isJson) 获取session
 * setSession(name, value) 设置session
 * delSession(name) 删除session
 * 
 * Local操作
 * getLocal(name, isJson) 获取local
 * setLocal(name, value) 设置local
 * delLocal(name) 删除local
 * 
 * 跳转登录页
 * jumpLogin()
 * @author barry@jwis.cn
 */

const getCookie = function(name) {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

const setCookie = function(name, value, exdays = 1, domain = "", path = "/") {
  let expires = new Date();
  expires.setTime(expires.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toGMTString()};domain=${domain};path=${path}`;
};

const delCookie = function(name, domain = "") {
  const cname = getCookie(name);
  if (cname != null) {
    setCookie(name, "", -1, domain);
  }
};

const getSession = function(name, isJson = false) {
  let session = window.sessionStorage.getItem(name)
  return isJson ? JSON.parse(session) : session
}

const setSession = function(name, value) {
  window.sessionStorage.setItem(name, value)
}

const delSession = function(name) {
  window.sessionStorage.removeItem(name)
}

const getLocal = function(name, isJson = false) {
  let local = window.localStorage.getItem(name)
  return isJson ? JSON.parse(local) : local
}

const setLocal = function(name, value) {
  window.localStorage.setItem(name, value)
}

const delLocal = function(name) {
  window.localStorage.removeItem(name)
}

const jumpLogin = function() {
  window.Jw.userInfo = {};
  delSession('token');
  delLocal('logined');
  let href = window.location.origin + window.location.pathname + '#'
  window.location.href = href
  window.location.reload();
};

export { getCookie, setCookie, delCookie, getSession, setSession, delSession, getLocal, setLocal, delLocal, jumpLogin };
