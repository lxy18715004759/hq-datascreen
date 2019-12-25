<template>
    <section class="panel-container">
        <section class="item-title">{{title}}</section>
        <dv-scroll-board :config="config" style="width:90%;height: 9.375rem;margin:0 auto;font-size: 0.625rem"/>
    </section>
</template>

<script>

    export default {
        name: "LocationChart",
        props: {
            title: {
                type: String,
                default: ""
            },
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                config: {}
            }
        },
        mounted() {
            setTimeout(() => {
                this.config = {
                    oddRowBGC: "#000d1a",
                    evenRowBGC: "#000d1a",
                    rowNum: 3,                // 限制滚动条目
                    columnWidth: [30, 170, 150, 120],
                    data: this.data,
                    index: true
                }
            }, 500)
        }
    }
</script>

<style scoped lang="scss">
    $bg-color: #02132a; // 背景色
    .panel-container {
        background: #000d1a;

        .item-title {
            /*padding: 10px 0 20px 0px;*/
            padding: 0.625rem 0 1.25rem 0;
            /*font-size: 20px;*/
            font-size: 1.25rem;
            /*line-height: 20px;*/
            line-height: 1.25rem;

            &:before {
                content: "";
                display: inline-block;
                width: 5px;
                height: 1.25rem;
                vertical-align: top;
                background: #00ffff;
                margin-right: 10px;
            }
        }
    }

    .dv-scroll-board .rows .row-item {
        font-size: 0.875rem;
    }
</style>
