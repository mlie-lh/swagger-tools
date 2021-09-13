import {createStore} from 'vuex'
import {Path} from '@/entity/Path'
import {ApiDocs} from '@/entity/ApiDocs'
import axios from "axios"
import {ElMessage} from 'element-plus'

const store = createStore({
  state() {
    return {
      instances: [],
      apiDocs: new ApiDocs(),
      curPath: new Path(),
    }
  },
  mutations: {
    SET_INSTANCES(state, instances) {
      state.instances = instances
    },
    SET_API_DOCS(state, apiDocs) {
      state.apiDocs = apiDocs
    },
    SET_CUR_PATH(state, curPath) {
      state.curPath = curPath
    },
  },
  actions: {
    // 获取注册中心实例列表
    async queryInstances({commit}, url) {
      try {
        const {data: {code, message, data}} = await axios.post('http://localhost:3001/api/instances', {url})
        if (code !== 200) throw message
        const apps = data?.apps
        if (!apps) throw 'apps数据提取失败'
        // 过滤
        const instances = apps.reduce((apps, app) => {
          const {name, instanceInfos} = app
          const {id, url} = instanceInfos?.[0]?.instances?.[0]
          return /apidoc\.html/.test(url) ? [...apps, {name, id, url}] : apps
        }, [])
        commit('SET_INSTANCES', instances)
      } catch (e) {
        ElMessage.error(e)
      }
    },
    // 获取api文档
    async queryApiDocs({commit}, url) {
      try {
        url = url.replace(/apidoc\.html/, 'v2/api-docs')
        const {data: {code, message, data}} = await axios.post('http://localhost:3001/api/apiDocs', {url})
        if (code !== 200) throw message
        // 处理一下path数据，方便后期做处理
        const newPaths = []
        for (const pathsKey in data.paths) {
          const path = data.paths[pathsKey]
          for (const pathKey in path) {
            const pathElement = path[pathKey]
            pathElement.method = pathKey
            pathElement.name = `${path[pathKey].summary} ${pathsKey}`
            pathElement.url = pathsKey
            newPaths.push(new Path(pathElement))
          }
        }
        data.paths = newPaths
        data.tags.forEach((item) => {
          item.children = data.paths.filter((path) => path.tags.indexOf(item.name) !== -1)
        })
        // 提前组装好所有tags数据，方便用户进行搜索
        data.pathOptions = JSON.parse(JSON.stringify(data.tags))
        commit('SET_API_DOCS', data)
      } catch (e) {
        ElMessage.error(e)
      }
    }
  }
})
export default store