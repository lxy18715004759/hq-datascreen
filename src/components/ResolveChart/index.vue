<template>
    <section class="panel-container" ref="panelContainer">
        <p class="item-title">{{title}}</p>
        <section class="chart" ref="chart"></section>
    </section>
</template>

<script>
    let height = 0;
    export default {
        name: "ResolveChart",
        props: {
            title: {
                type: String,
                default: ""
            },
            data: {
                type: Array,
                default: []
            },
            colors: {
                type: Array,
                default: []
            },
            showLegend: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                chart: null,
            }
        },
        mounted() {
            let {initDraw, $refs} = this;
            setTimeout(() => {
                height = $refs.panelContainer.clientHeight - 20
                initDraw()
            }, 500)
        },
        methods: {
            initDraw() {

                let {data, $refs, colors, showLegend} = this;

                this.chart = new G2.Chart({
                    container: $refs.chart,
                    forceFit: true,
                    height: height,
                    background: {
                        fill: "transparent",
                    },
                    padding: [20, 20, 20, 0],
                    plotBackground: {
                        fill: "transparent"
                    },
                    animate: false
                });

                this.chart.source(data);


                if (showLegend) {
                    this.chart.legend("item", {
                        position: "right-top",
                        offsetX: -50,
                        offsetY: 0
                    })
                } else {
                    this.chart.legend('item', false)
                }


                this.chart.coord('theta', {
                    radius: 0.75,
                    innerRadius: 0.6
                });
                this.chart.tooltip({
                    showTitle: false,
                    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
// 辅助文本

                const interval = this.chart.intervalStack()
                    .position('percent')
                    .color('item', colors)
                    .label('percent', {
                        // formatter:function (val,item) {
                        //     return item.point.item + val;
                        // }
                        htmlTemplate: (text, outItem, index) => {
                            let {count, item, showItem} = outItem.point;
                            let dom = showItem ? `<div style="font-size: 12px;text-align: center;"><p style="white-space: nowrap;">${item + text * 100 + "%"}</p><p>${count}</p></div>` : `<p style="font-size: 12px;">${count}</p>`
                            return dom
                        }
                    })
                    .tooltip('item*percent', (item, percent) => {
                        percent = percent * 100 + '%';
                        return {
                            name: item,
                            value: percent
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.chart.render();
                // interval.setSelected(data[0]);       //关闭默认选中
            }
        }
    }
</script>

<style scoped lang="scss">

    $bg-color: #02132a; // 背景色
    .panel-container {

        background: linear-gradient(90deg, rgba(20, 28, 42, 1) 50%, transparent 0),
        linear-gradient(rgba(20, 28, 42, 1) 50%, transparent 0);
        background-size: 3px 3px;
        /*<!--border-left: 20px solid $bg-color;-->*/
        border-left: 1.25rem solid $bg-color;

        .item-title {
            background: #000d1a;
            /*height:30px;*/
            height: 1.875rem;
            /*line-height: 30px;*/
            line-height: 1.875rem;
            /*font-size:16px;*/
            font-size: 1rem;

            &:before {
                content: "";
                display: inline-block;
                width: 5px;
                /*height:12px;*/
                height: 0.75rem;
                background: #00ffff;
                /*margin-right: 10px;*/
                margin-right: 0.625rem;
            }
        }
    }
</style>
