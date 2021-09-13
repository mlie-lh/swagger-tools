<template>
  <div class="flex flex-col h-screen">
    <pageHeader/>
    <div class="flex-1 flex items-center items-stretch">
      <reqCode class="flex-1 m-2 border border-gray-300 "/>
      <resCode class="flex-1 m-2 border border-gray-300"/>
    </div>
    <genCodeComponents ref="genCode"/>
  </div>
</template>
<script setup lang="ts">
import {provide, ref} from 'vue'
import pageHeader from './views/pageHeader/index.vue'
import reqCode from './views/reqCode/index.vue'
import resCode from './views/resCode/index.vue'
import genCodeComponents from './components/genCode/index.vue'
import colorMap from './config/Color'
import {useStore} from 'vuex'

const genCode = ref(null)
const showGenCode = path => genCode.value.handleOpen(path)
provide('store', useStore())
provide('colorMap', colorMap)
provide('showGenCode', showGenCode)

</script>
