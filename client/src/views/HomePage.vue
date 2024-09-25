<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectCategory" :options="categoryOptions"
                    trigger="click">
                    <div> 分类<span>{{ categoryname }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台</div>
        </div>

        <n-divider />

        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: `500px` }" placeholder="请输入关键字"></n-input>
            <n-button type="primary" ghost @click="loadBlogs(0)">搜索</n-button>
        </n-space>

        <div v-for="(blog, index) in blogList">
            <n-card :title="blog.title" @click="toDetail(blog)">
                {{ blog.content }}

                <template #footer>
                    <n-space align="center">
                        <div>
                            {{ blog.create_time }}
                        </div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />
        <n-divider />

        <div class="footer">
            <div>Power by Rei</div>
            <div>XCIP 备 XXXXX号</div>
        </div>
    </div>
</template>

<script setup>
import { NPopselect, NDivider, NCard, NSpace, NPagination, NInput, NButton } from 'naive-ui'
import { ref, inject, reactive, onMounted, nextTick, toValue, computed } from 'vue';
import { useRouter, useRoute, RouterView } from 'vue-router';

const router = useRouter()
const route = useRoute

const axios = inject("axios")
const message = inject("message")

const selectCategory = ref(0)
const categoryOptions = ref([])

let blogList = ref([])


onMounted(() => {
    loadCategorys()
    loadBlogs()
})

const searchByCategory = (categoryId) => {
    pageInfo.categoryId = categoryId
    loadBlogs()
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

const categoryname = computed(() => {
    let categoryOption = categoryOptions.value.find((option) => {
        return option.value === selectCategory.value
    })
    return categoryOption ? categoryOption.label : ""
})

const toDetail = (blog) => {
    router.push({ path: "/datail", query: { id: blog.id } })

}


const homePage = () => {
    router.push("/")

}
const dashboard = () => {
    router.push("/login")
}

const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 0,
    count: 0,
    keyword: "",
    categoryId: 0
})

const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
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


</script>

<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #999;

    div {
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: orange;
        }

        span {
            font-size: 12px;
        }
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #999;
}

.search {
    margin-bottom: 15px;
}
</style>