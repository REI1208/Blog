import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {
        path: "/",
        component: () => import("../views/HomePage.vue")
    },
    {
        path: "/login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/datail",
        component: () => import("../views/Datail.vue")
    },
    {
        path: "/dashboard",
        component: () => import("../views/dashboard/Dashboard.vue"),
        children: [
            { path: "/dashboard/category", component: () => import("../views/dashboard/Category.vue") },
            { path: "/dashboard/article", component: () => import("../views/dashboard/Article.vue") }
        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router, routes }