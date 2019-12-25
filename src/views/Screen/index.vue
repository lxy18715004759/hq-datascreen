<template>
    <section class="page-container">
        <section class="top-head">
            <section class="title">
                用户服务处2019年度差旅数据统计
            </section>
            <section class="time">
                {{nowDateTime}}
            </section>
        </section>
        <section class="bottom-container">
            <section class="left-container">
                <section class="count-container">
                    <section class="count-label">累计出差人次</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
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
                    <section class="count-label">累计出差天数</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
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
                    <section class="count-label">人均出差天数</section>
                    <dv-border-box-7 :color="['transparent', '#5ed9f4']" class="count-number">
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
                        国内外出差情况
                    </section>
                    <section class="business-bot">
                        <section class="location-business-chart">
                            <LocationBusinessChart :title="'出差天数'" :data="locationBusinessChartData"
                                                   key="locationBusinessChartOfPerson"
                                                   :colors="locationBusinessChartLegendColors"/>
                        </section>
                        <section class="foreign-business-chart">
                            <LocationBusinessChart :title="'出差次数'" :data="foreignBusinessChartData"
                                                   key="foreignBusinessChartOfPerson"
                                                   :colors="foreignBusinessChartLegendColors"/>
                        </section>
                    </section>
                </section>

            </section>
            <section class="center-container">
                <section class="map-chart">
                    <MapChart :data="mapChartData" :showLine="true"/>
                </section>
                <section class="center-bot">
                    <section class="location-chart">
                        <LocationChart :title="'国内出差TOP榜'" :data="locationChartData" key="locationChartOfPerson"/>
                    </section>
                    <section class="foreign-chart">
                        <LocationChart :title="'国外出差TOP榜'" :data="foreignChartData" key="foreignChartOfPerson"/>
                    </section>
                </section>
            </section>
            <section class="right-container">
                <section class="right-top">
                    <section class="progress-chart">
                        <ProgressChart :data="progressChartData" key="progressChartOfPerson"/>
                    </section>
                    <section class="right-top-right">
                        <section class="resolve-chart">
                            <ResolveChart :title="'处理情况'" :data="resolveChartData" :colors="resolveChartLegendColors"
                                          :showLegend="resolveChartLegendShow" key="resolveChartOfPerson"/>
                        </section>
                        <section class="status-chart">
                            <StatusChart :title="'科员状态'" :data="statusChartData" key="statusChartOfPerson"/>
                        </section>
                    </section>
                </section>
                <section class="area-chart">
                    <AreaChart :title="'服务地域统计（次）'" :data="areaChartData" key="areaChartOfPerson"/>
                </section>
            </section>
        </section>
        <p class="copy-right">©仙林科技提供技术支持</p>
    </section>
</template>

<script>
    import {dateFormatter, toggleTime} from "../../utils";
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
                endValData: [2962, 8886, 3],
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
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','二科-王大治', '出差30次', '出差86天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/silver.png" />','三科-吕强', '出差30次', '出差86天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-李星', '出差28次', '出差65天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-王强', '出差28次', '出差65天'],
                    // ['<img style="width:20px;height:20px;margin-top:15px;" src="/statics/images/cupper.png" />','一科-陆龙', '出差28次', '出差65天'],
                ],
                progressChartData: [
                    // {serviceItem: '派员交底', count: 862},
                    // {serviceItem: '安装指导', count: 780},
                    // {serviceItem: '调试指导', count: 754},
                    // {serviceItem: '问题处理', count: 283},
                    // {serviceItem: '商务出差', count: 283}
                ],
                resolveChartData: [                                         // showItem 是否显示条目
                    // {item: '已处理', count: 40, percent: 0.4,showItem:false},
                    // {item: '处理中', count: 21, percent: 0.21,showItem:false},
                    // {item: '未处理', count: 17, percent: 0.17,showItem:false}
                ],
                resolveChartLegendShow: true,           //是否显示图例
                resolveChartLegendColors: ["#4d7bd7", "#4db990", "#d98644"],
                statusChartData: [
                    // {class: "出差", "一科": 10, "二科": 5, "三科": 9, "四科": 17},
                    // {class: "在杭", "一科": 10, "二科": 15, "三科": 11, "四科": 3}
                ],
                areaChartData: [
                    // {area: "新疆&西北地区", value: 385},
                    // {area: "东北&西南地区", value: 888},
                    // {area: "国内剩余地区", value: 349},
                    // {area: "国外", value: 468}
                ],
                mapChartData: {}
                //图表数据 end


            }
        },
        mounted() {
            let {setIntervalTime, initData} = this;
            clearInterval(this.time)
            setIntervalTime();
            initData()
        },
        methods: {
            initData() {

                this.$axios.post("/getBusinessDataOfTest").then(res => {

                    let result = res.data.data
                    if (res.data.code === 200) {
                        this.endValData = result.endValData;
                        this.locationBusinessChartData = result.locationBusinessChartData
                        this.foreignBusinessChartData = result.foreignBusinessChartData

                        // this.locationChartData = this.addIcon(result.locationChartData)
                        // this.foreignChartData = this.addIcon(result.foreignChartData)
                        this.locationChartData = result.locationChartData
                        this.foreignChartData = result.foreignChartData

                        this.progressChartData = result.progressChartData
                        this.resolveChartData = result.resolveChartData
                        this.statusChartData = result.statusChartData
                        this.areaChartData = result.areaChartData

                        this.mapChartData={
                            "chinaDatas":result.mapData.chinaDatas,
                            "geoCoordMap":result.mapData.geoCoordMap
                        }

                    } else {

                        Message({
                            type: 'error',
                            message: res.data.msg
                        })
                        console.log("%c" + res.data.msg, "color:red");

                    }

                }).catch(err => {
                    console.log("获取数据失败", err);
                })
            },
            addIcon(arr) {
                if (!Array.isArray(arr)) {
                    return []
                }
                let icon = ["gold", "silver", "silver", "cupper", "cupper", "cupper"]
                arr.map((item, key) => {
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
