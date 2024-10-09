<template>
    <div class="login-panel">
        <n-card title="一个未知的地方" hoverable>
            <template #header-extra>
                <n-button attr-type="button" @click="backToHome">
                    Back
                </n-button>
            </template>
            <n-tabs class="card-tabs" default-value="signin" size="large" animated pane-wrapper-style="margin: 0 -4px"
                pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
                <n-tab-pane name="signin" tab="登录">
                    <n-form inline :label-width="80" :model="admin" :rules="rules" :size="size">
                        <n-form-item label="账号" path="account">
                            <n-input v-model:value="admin.account" placeholder="输入账号" />
                        </n-form-item>
                        <n-form-item label="密码" path="password">
                            <n-input v-model:value="admin.password" placeholder="输入密码" />
                        </n-form-item>
                    </n-form>
                </n-tab-pane>
            </n-tabs>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember">记住我</n-checkbox>
                <n-button attr-type="button" @click="login">
                    登录
                </n-button>
            </template>
        </n-card>
    </div>
</template>

<script setup>
import { NCard, NForm, NFormItem, NInput, NCheckbox, NButton, NTabs, NTabPane } from 'naive-ui'
import { ref, inject, reactive, } from 'vue';
import { AdminStore } from '../stores/AdminStore'

import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute

const axios = inject("axios")
const message = inject("message")


const adminStore = AdminStore()

const size = ref("medium");

const admin = reactive({
    account: localStorage.getItem("account") || "",
    password: localStorage.getItem("password") || "",
    rember: localStorage.getItem("rember") === '1',
});
const rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度3-12个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 18, message: "密码长度6-18个字符", trigger: "blur" }
    ],
}

const login = async () => {
    let result = await axios.post("/admin/login", {
        account: admin.account,
        password: admin.password
    })
    if (result.data.code == 200) {
        message.success("登陆成功")
        adminStore.id = result.data.data.id
        adminStore.token = result.data.data.token
        adminStore.account = result.data.data.account

        if (admin.rember) {
            localStorage.setItem("account", admin.account)
            localStorage.setItem("rember", '1')
        }
        else {
            localStorage.removeItem("account"); // 如果不需要记住账号，清除存储的账号
            localStorage.setItem("rember", '0'); // 存储字符串 '0'
        }
        router.push('/dashboard')
    } else {
        message.error("登陆失败")
    }
    console.log(result)
}
const backToHome = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.login-panel {
    width: 500px;
    margin: 0 auto;
    margin-top: 200px;
}
</style>