<template>
  <div>
    <div class="flex items-center py-0.5 px-2 border-b border-gray-300">
      <div class="flex-1">返回参数</div>
      <div>
        <el-button type="text"></el-button>
      </div>
    </div>
    <jsonView :data="codeData"/>
  </div>
</template>

<script setup>
import {computed, inject} from 'vue'
import jsonView from '@/components/jsonView/index.vue'
import {rawDataToJSON} from "@/util"

console.log(jsonView)
const store = inject('store')
const codeData = computed(() => rawDataToJSON(store.state.curPath.properties))
</script>