<template>
  <el-dialog title="代码生成-alpha" class="w-10/12" v-model="dialogVisible" :before-close="handleClose">
    <div class="flex ">
      <div class="flex-1 flex flex-col">
        <div class="px-2 py-1">
          <span class="mr-4" @click="renderResultCode">模板</span>
          <el-dropdown>
            <span class="text-blue-400">{{ curCodeTypeObj.label }}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item,index) in codeTypeList" @click="codeTypeIndex = index">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div style="min-height: 400px" id="monacoRef" ref="monacoRef"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {computed, nextTick, reactive, ref, watch} from 'vue'
import {paramsRender, tableRender, vueRender} from '@/config/CodeResolve'
import BeautifierConf from '@/config/BeautifierConf'
import monaco from "./js/monacoHook"
import beautifier from 'js-beautify'
// 生成类型
const codeTypeList = reactive([
  {label: 'params', type: 'javascript', resolve: paramsRender},
  {label: 'table', type: 'html', resolve: tableRender},
  {label: 'vuePage', type: 'html', resolve: vueRender},
])
const codeTypeIndex = ref(0)
// 当前选择生成类型
const curCodeTypeObj = computed(() => codeTypeList[codeTypeIndex.value])
// 数据
const pathData = ref([])
// 生成代码
const renderResultCode = () => {
  const codeStr = curCodeTypeObj.value.resolve(pathData)
  const type = curCodeTypeObj.value.type
  console.log(type)
  // console.log(beautifier(codeStr, BeautifierConf[type]))
  setEditorValue(type, beautifier(codeStr, BeautifierConf[type]))
}
watch(() => codeTypeIndex.value, renderResultCode)
// monaco编辑器
let monacoObj = null
const setEditorValue = async (type, codeStr) => {
  if (monacoObj) {
    monacoObj.setValue(codeStr)
  } else {
    monacoObj = monaco.editor.create(document.getElementById('monacoRef'), {
      value: codeStr,
      theme: 'vs-dark',
      language: type
    })
  }
}
// 弹窗状态
const dialogVisible = ref(false)
const handleClose = () => dialogVisible.value = false
const handleOpen = async path => {
  pathData.value = path
  dialogVisible.value = !dialogVisible.value
  await nextTick()
  renderResultCode()
}
defineExpose({handleOpen})
</script>