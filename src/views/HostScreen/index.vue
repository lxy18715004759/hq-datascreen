<template>
    <section class="page-container">
        <section class="top-head">
            <section class="title">
                用户服务处2019年度机组数据统计
            </section>
            <section class="time">
                {{nowDateTime}}
            </section>
        </section>
        <section class="bottom-container">
            <section class="left-container">
                <section class="count-container">
                    <section class="count-label">累计服务机组（个）</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
                        <!--            <dv-digital-flop :config="config1" style="width:100%;height:100%;font-family: 'UnidreamLED'"/>-->
                        <div class="iCountUp">
                            <ICountUp
                                    :delay="delay"
                                    :endVal="endValData[0]"
                                    :options="options"
                                    @ready="onReady"
                            />
                        </div>
                    </dv-border-box-7>
                </section>
                <section class="count-container">
                    <section class="count-label">重点项目（个）</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
                        <!--            <dv-digital-flop :config="config2" style="width:100%;height:100%;"/>-->
                        <div class="iCountUp">
                            <ICountUp
                                    :delay="delay"
                                    :endVal="endValData[1]"
                                    :options="options"
                                    @ready="onReady"
                            />
                        </div>
                    </dv-border-box-7>
                </section>
                <section class="count-container">
                    <section class="count-label">普通项目（个）</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
                        <!--            <dv-digital-flop :config="config3" style="width:100%;height:100%;"/>-->
                        <div class="iCountUp">
                            <ICountUp
                                    :delay="delay"
                                    :endVal="endValData[2]"
                                    :options="options"
                                    @ready="onReady"
                            />
                        </div>
                    </dv-border-box-7>
                </section>
                <section class="business-container">
                    <section class="chat-title">
                        国内外服务情况
                    </section>
                    <section class="business-bot">
                        <section class="location-business-chart">
                            <LocationBusinessChart :title="'服务机组'" :data="locationBusinessChartData"
                                                   key="locationBusinessChartOfHost"
                                                   :colors="locationBusinessChartLegendColors"/>
                        </section>
                        <section class="foreign-business-chart">
                            <LocationBusinessChart :title="'重点项目'" :data="foreignBusinessChartData"
                                                   key="foreignBusinessChartOfHost"
                                                   :colors="foreignBusinessChartLegendColors"/>
                        </section>
                    </section>
                </section>

            </section>
            <section class="center-container">
                <section class="map-chart">
                    <MapChart :data="hostMapChartData" :showLine="false"/>
                </section>
                <section class="center-bot">
                    <section class="location-chart">
                        <LocationChart :title="'国内服务TOP榜'" :data="locationChartData" key="locationChartOfHost"/>
                    </section>
                    <section class="foreign-chart">
                        <LocationChart :title="'国外服务TOP榜'" :data="foreignChartData" key="foreignChartOfHost"/>
                    </section>
                </section>
            </section>
            <section class="right-container">
                <section class="right-top">
                    <ResolveChart :title="'项目完成情况'" :data="resolveChartData" :colors="resolveChartLegendColors" :showLegend="resolveChartLegendShow" key="resolveChartOfHost"/>
                </section>
                <section class="area-chart">
                    <AreaChart :title="'机组地域分布（个）'" :data="areaChartData" key="areaChartOfHost"/>
                </section>
            </section>
        </section>
        <p class="copy-right">©仙林科技提供技术支持</p>
    </section>
</template>

<script>
    import {dateFormatter,toggleTime} from "../../utils";
    import ICountUp from 'vue-countup-v2';

    import FullScreenContainer from './../../components/FullScreenContainer'
    import LocationBusinessChart from './../../components/LocationBusinessChart'

    import LocationChart from './../../components/LocationChart'

    import MapChart from "../../components/MapChart/index"

    import ProgressChart from "./../../components/ProgressChart"
    import ResolveChart from './../../components/ResolveChart'
    import StatusChart from "./../../components/StatusChart"
    import AreaChart from './../../components/AreaChart'
    import {Message} from 'element-ui'
    export default {
        components: {
            ICountUp,
            FullScreenContainer,
            LocationBusinessChart,
            MapChart,
            LocationChart,
            ProgressChart,
            ResolveChart,
            StatusChart,
            AreaChart
        },
        data() {
            return {
                timeStyle: {fontSize: 38, color: '#00ffff', width: '100%', height: '100%'},
                config1: {
                    number: [0],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                },
                config2: {
                    number: [0],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                },
                config3: {
                    number: [0],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                },
                nowDateTime: "",
                time: null,

                // begin countup
                delay: 1000,
                endValData: [2962, 849,2113],
                options: {
                    useEasing: false,
                    useGrouping: true,
                    separator: '',
                    decimal: '',
                    prefix: '',
                    suffix: ''
                    // end countup
                },
                //图表数据 begin
                locationBusinessChartData: [
                    // {legend: '国内出差天数', label: "国内", count: 40, percent: 0.4},
                    // {legend: '国外出差天数', label: "国外", count: 21, percent: 0.21}
                ],
                locationBusinessChartLegendColors: ['#5b8ff9', '#5ad8a6'],
                foreignBusinessChartData: [
                    // {legend: '国内出差天数', label: "国内", count: 40, percent: 0.4},
                    // {legend: '国外出差天数', label: "国外", count: 21, percent: 0.21}
                ],
                foreignBusinessChartLegendColors: ['#5b8ff9', '#5ad8a6'],
                locationChartData: [
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/gold.png" />','三科-张大山', '出差36次', '出差98天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','二科-王大治', '出差30次', '出差86天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','三科-吕强', '出差30次', '出差86天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-李星', '出差28次', '出差65天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-王强', '出差28次', '出差65天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-陆龙', '出差28次', '出差65天'],
                ],
                foreignChartData: [
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/gold.png" />','三科-张大山', '出差36次', '出差98天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/gold.png" />','二科-王大治', '出差30次', '出差86天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','一科-李梅', '出差28次', '出差65天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','四科-吕强', '出差36次', '出差98天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','三科-王鑫', '出差30次', '出差86天']
                ],
                resolveChartData: [
                    // {item: '安装阶段', count: 392, percent: 0.16,showItem:true},
                    // {item: '调试阶段', count: 204, percent: 0.12,showItem:true},
                    // {item: '问题处理', count: 143, percent: 0.7,showItem:true},
                    // {item: '已完成', count: 2000, percent: 0.72,showItem:true}
                ],
                resolveChartLegendShow:false,
                resolveChartLegendColors:["#7c60af","#5dabcc","#d1a216","#4db990"],
                areaChartData: [
                    // {area: "新疆&西北地区", value: 385},
                    // {area: "东北&西南地区", value: 888},
                    // {area: "国内剩余地区", value: 349},
                    // {area: "国外", value: 468}
                ],
                hostMapChartData:{},
                //图表数据 end

            }
        },
        mounted() {
            let {setIntervalTime,initData} = this;
            clearInterval(this.time)
            setIntervalTime();
            initData()
        },
        methods: {
            initData(){

                this.$axios.post("/getHostDataOfTest").then(res=>{

                    if(res.data.code===200){
                        let result = res.data.data
                        this.endValData = result.endValData;
                        this.locationBusinessChartData = result.locationBusinessChartData;
                        this.foreignBusinessChartData = result.foreignBusinessChartData;
                        // this.locationChartData = this.addIcon(result.locationChartData)
                        // this.foreignChartData = this.addIcon(result.foreignChartData);
                        this.locationChartData = (result.locationChartData)
                        this.foreignChartData = (result.foreignChartData);
                        this.resolveChartData = result.resolveChartData;
                        this.areaChartData = result.areaChartData
                        this.hostMapChartData = {
                            "chinaDatas":result.mapData.chinaDatas,
                            "geoCoordMap":result.mapData.geoCoordMap
                        }

                    }else{
                        Message({
                            type:'error',
                            message:res.data.msg
                        })
                        console.log("%c"+res.data.msg,"color:red");
                    }

                }).catch(err=>{
                    console.log("数据服务错误",err);
                })


            },
            addIcon(arr){
                if(!Array.isArray(arr)){
                    return []
                }
                let icon = ["gold","silver","silver","cupper","cupper","cupper"]
                arr.map((item,key)=>{
                    item.unshift(`<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/${icon[key]}.png">`)
                })

                return arr;
            },
            setIntervalTime() {
                this.time = setInterval(() => {
                    this.nowDateTime = dateFormatter(new Date().getTime());
                }, 1000)
            },
            /**
             * datav 翻牌器
             */
            flopNumber() {
                this.config1 = {
                    number: [2996],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                }
                this.config2 = {
                    number: [8886],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                }
                this.config3 = {
                    number: [3],
                    content: '{nt}',
                    style: {fill: "#00ffff", fontSize: 70},
                    animationCurve: "linear",
                    animationFrame: 60
                }
            },
            /**
             * countup.js 翻牌器
             * @param instance
             * @param CountUp
             */
            onReady: function (instance, CountUp) {
                instance.start();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
