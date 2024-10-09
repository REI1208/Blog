<template>
    <div class="main-panel">
        <div class="menu">
            <div v-for="(menu, index) in menus" @click="toPage(menu)">
                {{ menu.name }}
            </div>
        </div>
        <div style="padding: 20px;width: 100%;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute, RouterView } from 'vue-router';
const router = useRouter()

let menus = [
    { name: "文章管理", href: "/dashboard/article" },
    { name: "分类管理", href: "/dashboard/category" },
    { name: "退出登录", href: "logout" },
    { name: "返回网站", href: "backToHome" },
]

const toPage = (menu) => {
    if (menu.href === "logout" || menu.href === "backToHome") {
        if (menu.href === "backToHome") {
            router.push("/")
        } else
            router.push("/login")
    }
    else {
        router.push(menu.href)
    }

}

</script>

<style lang="scss" scoped>
.main-panel {
    display: flex;
    color: #999;
    max-width: 1500px;
    margin: 0 auto;
}

.menu {
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 95vh;
    border-right: 1px solid wheat;

    div {
        cursor: pointer;

        &:hover {
            color: orange;
        }
    }
}
</style>