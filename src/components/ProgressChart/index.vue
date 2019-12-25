<template>
    <section class="panel-container" ref="panelContainer">
        <ul class="progress-ul">
            <li v-for="(item,key) in data" class="progress-container" :key="'progress'+key">
                <section class="progress-top">
                    <span>{{item.serviceItem}}</span>
                    <span>{{item.count}}次</span>
                </section>
                <Progress class="progress-mid" :color="color[key]" :maxProgress="maxProgress" :item="item"/>
                <p class="progress-bot">{{ parseInt(item.count/maxProgress*100) + '%' }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
    import Progress from "./../Progress"

    let height = 0;
    export default {
        name: "ProgressChart",
        components: {Progress},
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                color: ["#44d7b6", "#6dd400", "#32c5ff", "#e02020", "#4d7bd7"],        // 进度条颜色
                maxProgress: 10,

            }
        },
        mounted() {
            let {initDraw} = this;
            setTimeout(() => {
                initDraw()
            }, 500)
        },
        methods: {
            initDraw() {
                let {data, $refs, adaptationProgress} = this;
                this.maxProgress = adaptationProgress(data, 'count')         //   progress上限
            },
            adaptationProgress(data, param) {
                let maxValue = 0;
                data.map(item => {
                    if (item[param] >= maxValue) {
                        maxValue = item[param]
                    }
                })

                let arr = []
                let index = 0;
                let unitsDigit = maxValue % 10;
                let tensDigit = parseInt(maxValue / 10) % 10
                let hundredth = parseInt(maxValue / 100) % 10
                let thousand = parseInt(maxValue / 1000) % 10
                let tenThousand = parseInt(maxValue / 10000) % 10;

                arr.push(unitsDigit, tensDigit, hundredth, thousand, tenThousand)

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] < 1) {
                        index = i;
                        break;
                    }
                }
                return Math.pow(10, index)
            },
        }
    }
</script>

<style scoped lang="scss">
    .panel-container {
        /*border:6px solid transparent;*/
        border: 0.375rem solid transparent;
        background: linear-gradient(90deg, rgba(20, 28, 42, 1) 50%, transparent 0),
        linear-gradient(rgba(20, 28, 42, 1) 50%, transparent 0);
        background-size: 3px 3px;
    }

    .progress-ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        /*padding:0 30px;*/
        padding: 0 1.875rem;

        .progress-container {
            /*padding:10px 0px;*/
            padding: 0.625rem 0px;

            .progress-top {
                display: flex;
                justify-content: space-between;
                /*font-size: 20px;*/
                font-size: 1.25rem;
                /*line-height: 20px;*/
                line-height: 1.25rem;
                /*margin-bottom: 10px;*/
                margin-bottom: 0.625rem;
            }

            .progress-mid {
                /*height:10px;*/
                height: 0.625rem;
            }

            .progress-bot {
                /*margin-top:10px;*/
                margin-top: 0.625rem;
                /*font-size: 12px;*/
                font-size: 0.75rem;
                color: #ccc;
            }
        }
    }
</style>
