import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/Home")
const Screen = () => import(/* webpackChunkName: "Screen" */ "@/views/Screen")
const PPTVideo = () => import(/* webpackChunkName: "Screen" */ "@/views/Video")
const HostScreen = () => import(/* webpackChunkName: "Screen" */ "@/views/HostScreen")
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/screen',
        component: Screen
    },
    {
        path: '/video',
        component: PPTVideo
    },
    {
        path: "/host-screen",
        component: HostScreen
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
