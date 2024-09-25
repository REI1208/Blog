<template>
    <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"
            style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { watch, ref, shallowRef, onMounted, inject, nextTick } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const server_url = inject("server_url")


// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref();
// 模拟 ajax 异步获取内容

const mode = ref("default")


const toolbarConfig = { excludeKeys: ["uploadVideo"] }
const editorConfig = { placeholder: '请输入内容...' };
// 编辑器回调函数

editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 10 * 1024,// 5kb
    server: server_url + '/upload/rich_editor_upload',
}
// 插入图片
editorConfig.MENU_CONF['insertImage'] = {
    parseImageSrc: (src) => {
        if (src.indexOf("Http") !== 0) {
            return `${server_url}${src}`
        }
        return src
    } // 也支持 async 函数
}

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    clearCommand: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(["update:model-value"])

const handleCreated = (editor) => {
    console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
    emit("update:model-value", valueHtml.value)
}


// 监听 modelValue 的变化，确保编辑器内容更新
watch(() => props.modelValue, (newVal) => {
    if (newVal !== valueHtml.value) {
        valueHtml.value = newVal;  // 确保父组件的数据更新到编辑器
    }
}, { immediate: true });


//提交过后props清除命令，接受清除命令后删除
watch(() => props.clearCommand, (newVal) => {
    if (newVal) {
        valueHtml.value = "";// 这里清空绑定的内容
        console.log("clear")
    }
}, { immediate: true })
</script>

<style lang="scss" scoped></style>