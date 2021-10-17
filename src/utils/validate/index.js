/**
* @description 验证模块
* isUrl() eg: http://www.baidu.com|https://baidu.com
* isMobile() eg: 13588888888
* isSms() eg: 123456六位有效数字
* isEmail() eg: barry@jwis.cn
* isAccount() eg: barry_12字母开头,字母开头，允许数字、下划线4-25
* isPassword() eg: Barry@123; 必须包含大小写字母和数字的组合，可以使用特殊字符 8-25
* isIp4() eg: 127.0.0.0
* isip6() eg: 5e:0:0:023:0:0:5668:eeee
* isPort() eg: 8080
* isMac() eg: ff-ff-ff-ff-ff-ff或ff：ff：ff：ff：ff：ff
* @author Barry
* @email barry.li@jwis.cn
*/

const isUrl = ({rule}, value, callback) => {
  if(rule && rule.test(value) || /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\\/%=~_|$])/igm.test(value)) {
    callback()
  } else {
    callback(new Error('Url Error'));
  }
}

const isSms = ({rule}, value, callback) => {
  if(rule && rule.test(value) || /^\d{6}$/.test(value)) {
    callback()
  } else {
    callback(new Error('Sms Error'));
  }
}

const isMobile = ({rule}, value, callback) => {
  if(rule && rule.test(value) || /^(13|14|15|16|17|18|19)[0-9]{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('Mobile Error'));
  }
}

const isEmail = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value)) {
    callback();
  } else {
    callback(new Error('Email Error'));
  }
}

const isAccount = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^[a-zA-Z][a-zA-Z0-9_]{4,25}$/.test(value)) {
    callback()
  } else {
    callback(new Error('Account Error'))
  }
}

const isPassword = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/.test(value)) {
    callback();
  } else {
    callback(new Error('Password Error'));
  }
}

const isIp4 = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(value)) {
    callback()
  } else {
    callback(new Error('Ip4 Error'))
  }
}

const isIp6 = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/.test(value)) {
    callback()
  } else {
    callback(new Error('Ip6 Error'))
  }
}

const isPort = ({rule}, value, callback) => {
if (rule && rule.test(value) || /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(value)) {
  callback()
} else {
  callback(new Error('Port Error'))
}
}

const isMac = ({rule}, value, callback) => {
  if (rule && rule.test(value) || /^([0-9a-fA-F]{2})(([/\s:][0-9a-fA-F]{2}){5})$|^([0-9a-fA-F]{2})(([/\s-][0-9a-fA-F]{2}){5})$/.test(value)) {
    callback()
  } else {
    callback(new Error('Mac Error'))
  }
}

export {
isUrl,
isMobile,
isSms,
isEmail,
isAccount,
isPassword,
isIp4,
isIp6,
isPort,
isMac
}