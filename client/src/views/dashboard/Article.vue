<template>
    <div>
        <n-tabs v-model:value="tabValue" type="line" animated>

            <n-tab-pane name="list" tab="文章列表">
                <div v-for="(blog, index) in blogList">
                    <n-card :title="blog.title">
                        {{ blog.content }}

                        <template #footer>
                            <n-space align="center">
                                <div>
                                    {{ blog.create_time }}
                                </div>
                                <n-button @click="toUpdate(blog)">修改</n-button>
                                <n-button @click="toDelete(blog)">删除</n-button>
                            </n-space>
                        </template>
                    </n-card>
                </div>
                <n-space>
                    <div v-for="pageNum in pageInfo.pageCount" @click="toPage(pageNum)"
                        :style="{ color: pageNum === pageInfo.page ? 'green' : 'black' }">
                        {{ pageNum }}
                    </div>
                </n-space>

            </n-tab-pane>

            <n-tab-pane name="add" tab="添加文章">
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="add.title" placeholder="输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="add.categoryid" :options="categoryOptions" />

                    </n-form-item>
                    <n-form-item label="内容">
                        <rich-text-editor v-model="add.content" :clearCommand="clearCommand"></rich-text-editor>
                    </n-form-item>
                    {{ add.content }}
                </n-form>
                <div>
                    <n-button @click="AddBlog()">添加</n-button>
                </div>
            </n-tab-pane>

            <n-tab-pane name="update" tab="修改文章">
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="update.title" placeholder="输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="update.categoryid" :options="categoryOptions" />

                    </n-form-item>
                    <n-form-item label="内容">
                        <rich-text-editor v-model="update.content" :clearCommand="clearCommand"></rich-text-editor>
                    </n-form-item>
                    {{ update.content }}
                </n-form>
                <div>
                    <n-button @click="Update">修改</n-button>
                </div>
            </n-tab-pane>

        </n-tabs>
    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore'
const adminStore = AdminStore()
import { NTabs, NTabPane, NForm, NFormItem, NInput, NButton, NSelect, NCard, NSpace } from 'naive-ui'
import { ref, inject, reactive, onMounted, nextTick, toValue } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';

import RichTextEditor from '../../components/RichTextEditor.vue';

const router = useRouter()
const route = useRoute

const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const categoryOptions = ref([])
const categoryList = ref([])

const clearCommand = ref(false)  // 指令 props 状态

const tabValue = ref("list")

const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0
})

let blogList = ref([])


onMounted(() => {
    loadCategorys()
    loadBlogs()
})


const loadBlogs = async () => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
    let temp_rows = res.data.rows
    for (let row of temp_rows) {
        row.content += "..."
        let d = new Date(row.create_time)
        row.create_time = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    }
    blogList.value = temp_rows
    console.log(res)
    pageInfo.count = res.data.count
    pageInfo.pageCount = Math.ceil(pageInfo.count / pageInfo.pageSize)
    console.log(pageInfo)
}


const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    console.log(categoryOptions.value)
}

const add = reactive({
    content: "hello",
    title: "",
    categoryid: ""
})

const update = reactive({
    id: "",
    title: "",
    categoryid: "",
    content: ""
})

const AddBlog = async () => {
    try {
        let res = await axios.post(
            "/blog/_token/add",
            { title: add.title, categoryId: add.categoryid, content: add.content }
        );
        console.log(res)
        if (res.data.code == 200) {
            message.success(res.data.msg)
            add.title = ""
            add.categoryid = ""
            clearCommand.value = true  // 更新指令 props 状态
            console.log("command")
            // 立即重置为 false，以便下次可以重新触发
            setTimeout(() => clearCommand.value = false, 0)
        } else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(error.response.data.msg)
    }
}

const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()
}

const toUpdate = async (blog) => {
    tabValue.value = "update"
    let res = await axios.get("/blog/detail?id=" + blog.id)
    console.log(res)
    update.id = blog.id
    update.title = res.data.rows[0].title
    update.content = res.data.rows[0].content
    update.categoryid = res.data.rows[0].category_id
}

const toDelete = async (blog) => {
    try {
        let res = await axios.delete("/blog/_token/delete?id=" + blog.id)
        if (res.data.code == 200) {
            message.success(res.data.msg)
            loadBlogs()
        }
        else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(error.response.data.msg)
    }
}

const Update = async () => {
    try {
        let res = await axios.post(
            "/blog/_token/update", update
        );
        console.log(res)
        if (res.data.code == 200) {
            message.success(res.data.msg)
            tabValue.value = "list"
            loadBlogs()
        }
        else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(error.response.data.msg)
    }
}


</script>

<style lang="scss" scoped></style>