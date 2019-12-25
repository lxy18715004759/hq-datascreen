<template>
    <section class="panel-container" ref="panelContainer">
        <section class="item-title">科员状态</section>
        <section class="chart" ref="chart"></section>
    </section>
</template>

<script>
    let height = 0;
    export default {
        name: "StatusChart",
        props:{
          data:Array,
          default:[]
        },
        data(){
            return {
                chart:null
            }
        },
        mounted() {
            let {initDraw,$refs} = this;
            setTimeout(() => {
                height = $refs.panelContainer.clientHeight-20
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
                    padding:[50,20,20,30],
                    height: height
                });
                const ds = new DataSet();
                const dv = ds.createView().source(data);

                this.chart.legend("class",{
                   position:"top",
                    offsetY:-13,
                    offsetX:80
                })

                dv.transform({
                    type: 'fold',
                    fields: [ '一科', '二科', '三科', '四科'], // 展开字段集
                    key: '科室', // key字段
                    value: '人员' // value字段
                });
                this.chart.source(dv);
                this.chart.intervalStack()
                    .position('科室*人员')
                    .color('class');
                this.chart.render();
            }
        }
    }
</script>

<style scoped lang="scss">
    $bg-color:#02132a;     // 背景色
    .panel-container{
        position: relative;
        background: linear-gradient(90deg,rgba(20,28,42,1) 50%,transparent 0),
        linear-gradient(rgba(20,28,42,1) 50%,transparent 0);
        background-size: 3px 3px;
        /*<!--border-top: 20px solid $bg-color;-->*/
        border-top: 1.25rem solid $bg-color;
        /*<!--border-left:20px solid $bg-color;-->*/
        border-left:1.25rem solid $bg-color;
        border-right: 0px;

        .item-title{
            background: #000d1a;
            /*line-height: 16px;*/
            line-height: 1rem;
            /*padding:6px 0 8px 0;*/
            padding:0.375rem 0 0.5rem 0;
            /*font-size:16px;*/
            font-size:1rem;
            position: absolute;
            width:100%;
        &:before{
             content: "";
             display: inline-block;
             width:5px;
             /*height:16px;*/
             height:1rem;
            vertical-align: top;
            /*line-height: 16px;*/
            line-height: 1rem;
             background: #00ffff;
             /*margin-right: 10px;*/
             margin-right: 0.625rem;
         }
        }
    }
</style>
