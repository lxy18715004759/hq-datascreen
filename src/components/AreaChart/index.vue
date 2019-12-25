<template>
    <section class="panel-container" ref="panelContainer">
        <section class="item-title">{{title}}</section>
        <section class="chart" ref="chart"></section>
    </section>
</template>

<script>
    let height=0;
    export default {
        name: "AreaChart",
        props:{
          title:{
              type:String,
              default:""
          },
            data:{
              type:Array,
                default: []
            }
        },
        data(){
            return {
                chart:null,
            }
        },
        mounted(){
          let {$refs,initDraw} = this;
            setTimeout(() => {
                height = $refs.panelContainer.clientHeight - 42
                initDraw()
            }, 500)
        },
        methods:{
            initDraw(){
                let {data,$refs} = this;

                this.chart = new G2.Chart({
                    container: $refs.chart,
                    forceFit: true,
                    background:{
                        fill:"transparent"
                    },
                    plotBackground:{
                      fill:"transparent"
                    },
                    padding:[40,20,40,50],
                    height: height
                });
                this.chart.source(data);
                this.chart.interval().position('area*value');
                this.chart.render();
            }
        }
    }
</script>

<style scoped lang="scss">
    $bg-color:#02132a;     // 背景色

    .panel-container{

        .item-title{
            background: #000d1a;
            font-size:16px;
            line-height: 16px;
            padding:8px 0px 6px 0;
            &:before{
                content: "";
                display: inline-block;
                width:5px;
                height:16px;
                line-height: 16px;
                vertical-align: top;
                background: #00ffff;
                margin-right: 10px;
            }
        }
    }
</style>
