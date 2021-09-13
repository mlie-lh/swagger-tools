<template>
  <div>
    <div class="flex items-center py-0.5 px-2 border-b border-gray-300">
      <div class="flex-1">
        请求参数
        <span class='py-0.5 px-1 text-white rounded' :style="`background:${colorMap[curPath.method]}`">{{ curPath.method.toUpperCase() }}</span>
      </div>
      <div>
        <el-button type="text" @click="copyPath" v-text="'复制请求路径'"/>
      </div>
    </div>
    <jsonView :data="codeData"/>
  </div>
</template>

<script setup>
import jsonView from '@/components/jsonView/index.vue'
import {ElMessage} from 'element-plus'
import {computed, inject} from 'vue';
import {copyTextToSystem, rawDataToJSON} from "@/util";

const store = inject('store')
const colorMap = inject('colorMap')

console.log(jsonView)
const curPath = computed(() => store.state.curPath)
const codeData = computed(() => rawDataToJSON(store.state.curPath.parameters))
const copyPath = () => (copyTextToSystem(curPath.value.url), ElMessage.success('复制成功'))
</script>
<style>
</style>