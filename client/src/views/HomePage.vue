<template>
    <div class="container">
        <div class="nav">
            <div @click="homePage">首页</div>
            <div>
                <n-popselect @update:value="searchByCategory" v-model:value="selectCategory" :options="categoryOptions"
                    trigger="click" scrollable>
                    <div> 分类<span>{{ categoryname }}</span></div>
                </n-popselect>
            </div>
            <div @click="dashboard">后台管理</div>
        </div>

        <n-divider />

        <n-space class="search" justify="space-between">
            <div class="left-box">
                <n-input v-model:value="pageInfo.keyword" :style="{ width: `500px`, marginRight: '10px' }"
                    placeholder="I can see..."></n-input>
                <n-button type="primary" ghost @click="loadBlogs(0)">搜索</n-button>
            </div>
            <div class="number-animation">
                <n-statistic label="你一共处理了" tabular-nums>
                    <n-number-animation ref="numberAnimationInstRef" :from="0" :to="12039" />
                    <template #suffix>
                        条群消息
                    </template>
                </n-statistic>
                <n-space vertical>
                    <n-gradient-text type="danger">
                        这是一个展示数值动画的组件
                    </n-gradient-text>
                    <n-button color="#ff69b4" @click="replayNumber">
                        Once again
                    </n-button>
                </n-space>
            </div>

        </n-space>

        <div v-for="(blog, index) in blogList">
            <n-card :title="blog.title" @click="toDetail(blog)" hoverable :style="{ marginTop: '10px' }">
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
        <n-divider />
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />
        <n-divider />

        <div class="footer">
            <div>
                <n-gradient-text type="info">
                    Power by Rei
                </n-gradient-text>

            </div>
            <div>
                <n-gradient-text type="success">
                    XCIP 备 XXXXX号
                </n-gradient-text>
            </div>
        </div>
    </div>
</template>

<script setup>
import { NPopselect, NDivider, NCard, NSpace, NPagination, NInput, NButton, NStatistic, NNumberAnimation, NGradientText } from 'naive-ui'
import { ref, inject, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute

const axios = inject("axios")
const selectCategory = ref(0)
const categoryOptions = ref([])
const numberAnimationInstRef = ref({})
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
const replayNumber = () => {
    numberAnimationInstRef.value?.play()
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
    // display: flex;
    // align-items: center;

    // /* 使内容垂直居中 */
    // justify-content: end;

    .left-box {
        display: flex;
        /* 使搜索框和按钮在同一行 */
        align-items: center;
        /* 垂直居中 */
        justify-content: flex-start;
        width: 500px;

    }

    .number-animation {
        flex: 1;
        display: flex;
        /* 如果需要，可以再为这个部分添加 flex 属性 */
        align-items: center;
        /* 垂直居中 */
        justify-content: space-around;
        /* 右对齐 */
    }
}
</style>