import {ApiDocs} from './ApiDocs'
import {Path} from './Path'
import {transformRefName} from '../util'
// @ts-ignore
import store from '../store/index.js'

export class Propertie {
  name = ''
  type = ''
  format = ''
  description = ''
  required = false
  $ref = ''
  items: { format: string, type: string, $ref: string } | undefined
  children: Propertie[] = []
  childDefinition: Path | undefined
  schema: { $ref: '' } | undefined

  get apiDocs(): ApiDocs {
    return store.state.apiDocs
  }

  constructor(props?: any) {
    // @ts-ignore
    Object.assign(this, props)
    let refName = props.$ref || props.items?.$ref || props.schema?.$ref || props.schema?.items?.$ref
    // 如果当前这个属性是个链接，则直接查找子级类数据
    if (refName) {
      refName = transformRefName(refName)
      // 不污染原始数据
      const definition = JSON.parse(JSON.stringify(this.apiDocs.definitions[refName] ?? {}))
      if (definition.properties && !Array.isArray(definition.properties)) {
        const properties: Propertie[] = []
        for (const propKey in definition.properties) {
          // @ts-ignore
          const propertie = definition.properties[propKey]
          // 将所有自己数据转为参数对象，向下递归所有数据
          properties.push(new Propertie({
            ...propertie,
            name: propKey
          }))
        }
        definition.properties = properties
      }
      this.childDefinition = new Path({...definition})
      this.children = (definition.properties as Propertie[])
    }
  }
}
