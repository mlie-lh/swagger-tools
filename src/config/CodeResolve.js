export const paramsRender = data => {
  const str = data.value.map(item => {
    const {value, key} = item
    if (typeof value === 'string') return `${key}:'${value.replace(/\[.+]\s/, '')}'`
    if (typeof value === 'object') `${key}:{}`
  }).join(',')
  return `const params = {${str}}`
}
export const tableRender = data => {
  const columnStr = data.value.map((item, index) => {
    const {value, key} = item
    if (typeof value === 'string') return `<p-table-column data-index='${key}' title='${value.replace(/\[.+]\s/, '')}' />`
    if (typeof value === 'object') return `<p-table-column data-index='${key}' title='char${index}' />`
  }, '').join('\n')
  return `
        <p-table ref='dataSource' :data-source.sync='dataSource' :loading='spinning' :remote-url='listRemoteUrl' :remoteData='listParams' :selectedRowKeys.sync='selectedRowKeys' bordered dragle row-key='id'>
        ${columnStr}
        <p-table-column data-index='operation' title='操作' :width='140'>
          <template slot-scope='text, record'>
            <a-space>
              <a @click="toEdit('view',record)">详情</a>
              <a @click="toEdit('edit',record)">修改</a>
            </a-space>
          </template>
        </p-table-column>
      </p-table>`
}
export const vueRender = data => {
  const htmlStr = `
  `
  const jsStr = `
  `


  return data.toString()
}