<template>
    <div class="container">
        <n-button @click="back">Back</n-button>
        <n-divider />
        <n-h1 prefix="bar" align-text type="info">{{ blogInfo.title }}</n-h1>
        <n-divider />
        <div class="blog-content">
            <n-p>
                <div v-html="blogInfo.content"></div>
            </n-p>
        </div>
    </div>
</template>

<script setup>
import { NDivider, NButton, NH1, NP, } from 'naive-ui'
import { ref, inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const axios = inject("axios")

const blogInfo = ref([])

onMounted(() => {
    loadBlog()
})

const loadBlog = async () => {
    let res = await axios.get("/blog/detail?id=" + route.query.id)
    blogInfo.value = res.data.rows[0]
}

const back = () => {
    router.push("/")
}

</script>

<style>
.blog-content img {
    max-width: 100% !important;
}
</style>


<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}
</style>