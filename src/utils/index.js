/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export const validPhone = (phone) => {
  const isPhone = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/
  return isPhone.test(phone)
}
