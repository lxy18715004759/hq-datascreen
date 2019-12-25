<template>
    <section class="page-container">
        <video src="" id="myVideo" autoplay="autoplay" loop="loop"></video>
    </section>
</template>

<script>
    import FullScreenContainer from './../../components/FullScreenContainer'
    import {Message} from 'element-ui'

    export default {
        name: "Video",
        components: {FullScreenContainer},
        data() {
            return {
                timeLength: 0
            }
        },
        mounted() {

            let {initData} = this;
            initData()

        },
        methods: {
            initData() {
                let dom = document.getElementById('myVideo')
                this.$axios.post("/getVideoDataOfTest").then(res => {
                    if (res.data.code === 200) {
                        let result = res.data.data;
                        dom.src = this.$resourceHost + result.url;
                        dom.load()
                    } else {
                        Message({
                            type: 'error',
                            message: res.data.msg||"Try again!",
                        })
                        console.log("%c" + res.data.msg, "color:red");
                    }

                }).catch(err => {

                    console.log("获取视频数据服务错误", err);
                })

                setTimeout(() => {
                    this.$emit("getVideoTimeLength", parseInt(dom.duration) * 1000)
                }, 1000)
            }
        }
    }
</script>

<style scoped lang="scss">

    .page-container {
        padding: 50px;

        video {
            height: 100%;
        }
    }

    .page {
        width: 100%;
        height: 100%;
        padding: 0;
    }
</style>
