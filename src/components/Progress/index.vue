<template>
    <section>
        <section class="chart" ref="chart"></section>
    </section>
</template>

<script>
    let height = 0;
    export default {
        name: "Progress",
        props:{
            item:{
                type:Object,
                default:{}
            },
            color:{
                type:String,
                default:"#44d7b6"
            },
            maxProgress:{
                type:Number,
                default:10
            }
        },
        mounted() {
             let {initDraw} = this;
             setTimeout(()=>{
                 initDraw();
             },500)
        },
        methods:{
            initDraw(){
                let {item,$refs,color,maxProgress} = this;
                const data = [item];
                const chart = new G2.Chart({
                    container: $refs.chart,
                    forceFit: true,
                    background:{
                        fill:"transparent"
                    },
                    plotBackground:{                //用于设置 chart 绘图区域的背景样式，包括边框，背景色，透明度，圆角等；
                        fill:"#737373"              // 设置背景色
                    },
                    padding:[0],
                    height: 10
                });
                chart.source(data,{
                    "count":{
                        type:"linear",
                        min:0,
                        max:maxProgress
                    }       // 设置条形图的最大值
                });
                chart.axis('serviceItem', false);
                chart.axis('count',false)

                chart.coord().transpose();
                chart.interval().color("count",color).position('serviceItem*count');
                chart.render();
            }
        }
    }
</script>

<style scoped>

</style>
