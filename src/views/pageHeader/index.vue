<template>
  <div class="py-5 px-10">
    <el-form :inline="true" :model="formState" size="small">
      <el-form-item label="服务实例">
        <el-select v-model="instancesUrl" filterable @change="instancesChange">
          <el-option v-for="item in instancesOptions" :key="item.id" :label="item.name" :value="item.url">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.url }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择接口">
        <el-cascader v-model="pathId" :options="pathOptions" filterable style="width: 500px" placeholder="选择接口" :props="{  label: 'name',  value: 'operationId' }"
                     popper-class="path-popper"
                     :filter-method="pathFilterMethod"
                     @change="pathChange"
                     clearable
        >
          <template #default="{ node, data }">
            <span>{{ data.name }}</span>
            <span v-if="data.method" :style="`margin-left: 10px;font-size:12px;font-weight:bold;color:${colorMap[data.method]}`">{{ data.method.toUpperCase() }}</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="eurekaUrlChange">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">打开</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">更多</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {computed, inject, onMounted, ref} from 'vue';
import {Path} from '@/entity/Path'
import {Propertie} from '@/entity/Propertie'
import {transformRefName} from '@/util'

const store = inject('store')
const colorMap = inject('colorMap')

const apiDocs = computed(() => store.state.apiDocs)
// 刷新实例表
const instancesUrl = ref('')
const instancesOptions = computed(() => store.state.instances)
const eurekaUrlChange = () => {
  store.dispatch('queryInstances', 'http://192.168.1.21:6001/data/status')
}
onMounted(() => eurekaUrlChange())
// 选择实例
const pathId = ref('')
const instancesChange = e => store.dispatch('queryApiDocs', e)

// 选择接口
const pathOptions = computed(() => store.state.apiDocs.pathOptions)
const pathFilterMethod = ({text}, keyword) => text.toUpperCase().includes(keyword.toUpperCase())
const pathChange = val => {
  if (!val?.length) {
    store.commit('SET_CUR_PATH', new Path())
    return
  }
  const operationId = val[1]
  const filterPaths = apiDocs.value.paths.filter(item => item.operationId === operationId)
  const path = filterPaths[0]
  if (path.parameters?.length) transformParameters(path)
  transformProperties(path)
  store.commit('SET_CUR_PATH', path)
}
// 入参转换
const transformParameters = path => {
  if (path.parameters?.length && !(path.parameters[0] instanceof Propertie)) {
    path.parameters = path.parameters.map(item => new Propertie({...item}))
  }
}
// 出参转换
const transformProperties = path => {
  const refName = path.responses['200']?.schema?.$ref || path.responses['200']?.schema?.items?.$ref
  if (refName) {
    const definition = apiDocs.value.definitions[transformRefName(refName)]
    if (!path.properties.length) {
      for (const propertiesKey in definition.properties) {
        path.properties.push(new Propertie({...definition.properties[propertiesKey], name: propertiesKey}))
      }
    }
  }
}
</script>