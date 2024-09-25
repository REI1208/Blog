<template>
    <div>
        <n-button @click="showModal = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categoryList">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(category)"> 修改 </n-button>
                            <n-button @click="DeleteCategory(category)">删除</n-button>
                        </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>

        <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
            <template #header>
                <div>添加分类</div>
            </template>
            <div>
                <n-input v-model:value="add.name" type="text" placeholder="输入分类" />
            </div>
            <template #action>
                <div>
                    <n-button @click="AddCategory()">添加</n-button>
                </div>
            </template>
        </n-modal>

        <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
            <template #header>
                <div>修改分类</div>
            </template>
            <div>
                <n-input v-model:value="update.name" type="text" placeholder="输入分类" />
            </div>
            <template #action>
                <div>
                    <n-button @click="UpdateCategory(category)">修改</n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore'
const adminStore = AdminStore()
import { NInput, NButton, NTable, NSpace, NModal, } from 'naive-ui'
import { ref, inject, reactive, onMounted, nextTick } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';
const router = useRouter()
const route = useRoute

const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const categoryList = ref([])
const showModal = ref(false)
const showUpdateModal = ref(false)

onMounted(() => {
    loadDatas()
})
const loadDatas = async () => {
    let res = await axios.get("/category/list")
    categoryList.value = res.data.rows
}

const add = reactive({
    name: ""
})
const update = reactive({
    name: "",
    id: "",
})

const AddCategory = async () => {
    try {
        let res = await axios.post(
            "/category/_token/add",
            { name: add.name }
        );
        console.log(res)

        if (res.data.code == 200) {
            loadDatas()
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(error.response.data.msg)
    }
    showModal.value = false
}
const DeleteCategory = async (category) => {
    try {
        dialog.warning({
            title: '警告',
            content: '确认删除？',
            positiveText: '确定',
            negativeText: '不确定',
            onPositiveClick: async () => {
                let res = await axios.delete(
                    `/category/_token/delete?id=${category.id}`,
                );
                if (res.data.code == 200) {
                    loadDatas()
                    message.success(res.data.msg)
                } else {
                    message.error(res.data.msg)
                }
            },
            onNegativeClick: () => {
            }
        })

    } catch (error) {
        message.error(error.response.data.msg)
        console.log("其他错误:", error.message);  // 打印其他错误信息
    }
    showModal.value = false
}

const toUpdate = async (category) => {
    showUpdateModal.value = true
    update.id = category.id
    update.name = category.name
}

const UpdateCategory = async () => {
    try {
        let res = await axios.put(
            `/category/_token/update`,
            { id: update.id, name: update.name }
        );
        if (res.data.code == 200) {
            // loadDatas()
            await nextTick()
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(error.response.data.msg)
        console.log("其他错误:", error.message);  // 打印其他错误信息
    }
    showUpdateModal.value = false
}
</script>

<style lang="scss" scoped></style>