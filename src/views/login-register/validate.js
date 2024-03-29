/**
 * 用户名的表单校验
 * @param {*} val 输入的内容
 * @returns true 表示表单校验通过，String 表示表单校验未通过，String 为提示消息
 */
export const validateUsername = (value) => {
  if (!value) {
    return '用户名为必填的'
  }

  if (value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}

/**
 * 密码的表单校验
 */
export const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}

/**
 * 确认密码的表单校验
 * 1、定义方法
 * 2、注册校验
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
