<template>
    <section class="panel-container" ref="panelContainer" key="locationBusinessChart">
        <section class="item-title">{{title}}</section>
        <section class="chart" ref="chart"></section>
    </section>
</template>

<script>
    let height = 0;
    export default {
        name: "LocationBusinessChart",
        props:{
            title:{
                type:String,
                default:""
            },
            data:{
               type:Array,
                default:[]
            },
            colors:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                chart:null,         //图标
            }
        },
        mounted() {
            let { initDraw,$refs } = this;
            setTimeout(() => {
                height = $refs.panelContainer.clientHeight-22
                initDraw()
            }, 500)
        },
        methods:{
            initDraw(){
                let {$refs,data,colors} = this
                this.chart = new G2.Chart({
                    container: $refs.chart,
                    forceFit: true,
                    height: height,
                    background:{
                      fill:"transparent"
                    },
                    plotBackground:{
                        fill:"transparent"
                    },
                    padding:[20,0,0,0]
                });
                this.chart.source(data, {
                    percent: {
                        formatter: val => {
                            val = (val * 100) + '%';
                            return val;
                        }
                    }
                });

                this.chart.legend('legend',false)     //关闭图例

                this.chart.coord('theta', {
                    radius: 0.75
                });
                this.chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });

                // const COLORS = [ '#5b8ff9', '#5ad8a6' ];        // 颜色

                this.chart.intervalStack()
                    .position('percent')
                    .color('legend',colors)
                    .label('label', {
                        offset:-10,
                        useHtml:true,
                        htmlTemplate:(text, item) => {
                            let isLocation =  text==="国内"?true:false;
                            return `<div style="font-size:12px;width:30px"><p style="text-align: center;">${text}</p><p style="text-align: center;">${item.point.count}</p></div>`;
                        }
                    })
                    .tooltip('legend*percent', (item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                            name: item,
                            value: percent
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff',
                    });
                this.chart.render();
            }
        }
    }
</script>

<style scoped lang="scss">
    .panel-container{
        position: relative;
        .item-title{
            /*font-size: 14px;*/
            font-size: 0.875rem;
            position: absolute;
            /*top:20px;*/
            top:1.25rem;
            /*left:15px;*/
            left:1rem;
        }
    }
</style>
