/**
 * 解析用户输入的swagger地址
 * @param url
 */
export const parseSwaggerUrl = url => {
  if (!url) return ''
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url
  }
  if (url.substring(url.length - 1) === '/') {
    url = url.substring(0, url.length - 1)
  }
  const position = url.indexOf('/apidoc.html#/')
  if (position !== -1) {
    return url.substring(0, position)
  }
  return url
}

/**
 * 转换名称
 * @param refName
 */
export const transformRefName = refName => refName.replace('#/definitions/', '')

/**
 * 复制内容到剪贴板
 */
export const copyTextToSystem = text => {
  const input = document.createElement('textarea')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

/**
 * 递归 转JSON View
 */
export const rawDataToJSON = rawData => {
  return rawData.reduce((obj, item) => {
    return Object.assign(obj, {[item.name]: item?.children?.length > 0 ? rawDataToJSON(item.children) : `[${item.type}] ${item.description}`})
  }, {})
}