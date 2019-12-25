<template>
    <div class="map-container" ref="mapContainer">
        <div class="chart" ref="map" id="map"></div>
    </div>
</template>

<script>
    import echarts from "echarts"

    let height
    export default {
        props: {
            data: {
                type: Object,
                default: {}
            },
            showLine: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            setTimeout(() => {
                this.drawMap()
            }, 500)
        },
        methods: {
            drawMap() {
                var myChart = echarts.init(document.getElementById("map"))

                let chinaDatas = this.data.chinaDatas
                let chinaGeoCoordMap = this.data.geoCoordMap

                function randomValue() {
                    return Math.ceil(Math.random() * 10000 + 1)
                }

                var convertData = function (data) {
                    var res = []
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i]
                        var fromCoord = (chinaGeoCoordMap["总部"]).map(i => Number(i))
                        var toCoord = (chinaGeoCoordMap[dataItem[0].name]).map(i => Number(i))
                        if (fromCoord && toCoord) {
                            res.push([
                                {
                                    coord: fromCoord,
                                    // value: dataItem[0].value
                                    value: randomValue()
                                },
                                {
                                    coord: toCoord
                                }
                            ])
                        }
                    }
                    return res
                }
                var series = [];
                let that = this;
                [["总部", chinaDatas]].forEach(function (item, i) {

                    if (that.showLine) {
                        series.push(
                            // 轨迹线
                            {
                                type: "lines",
                                zlevel: 2,
                                effect: {
                                    show: true,
                                    period: 6, //箭头指向速度，值越小速度越快
                                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                                    symbol: "circle", //箭头图标
                                    symbolSize: 3, //图标大小
                                },
                                blendMode: 'lighter',
                                lineStyle: {
                                    normal: {
                                        color: 'rgb(50, 50, 150)',
                                        opacity: 0.1,
                                        width: 2, //尾迹线条宽度
                                        curveness: 0.3 //尾迹线条曲直度
                                    }
                                },
                                data: convertData(item[1])
                            }
                        )
                    }
                    series.push(
                        // 目标点
                        {
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            zlevel: 2,
                            rippleEffect: {
                                //涟漪特效
                                period: 4, //动画时间，值越小速度越快
                                brushType: "stroke", //波纹绘制方式 stroke, fill
                                scale: 2 //波纹圆环最大限制，值越大波纹越大
                            },
                            symbol: "circle",
                            symbolSize: function (val) {

                                if (val[0] === "120.134933" && val[1] === "30.29459") {     //总部
                                    return 10
                                }else{
                                    return 3
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: "#ff0"
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[0].name,
                                    value: chinaGeoCoordMap[dataItem[0].name].concat([randomValue()])

                                }
                            })
                        },
                        //被攻击点
                        {
                            type: "scatter",
                            coordinateSystem: "geo",
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: "stroke",
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: "center",
                                    offset: [3, 10],
                                    color: "red",
                                    formatter: "{b}",
                                    textStyle: {
                                        color: "#000"
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    color: "#000"
                                }
                            },
                            symbol: "pin",
                            symbolSize: 50,
                            data: [
                                {
                                    name: item[0],
                                    value: chinaGeoCoordMap[item[0]].concat([10])
                                }
                            ]
                        }
                    )
                })

                this.$axios.get("/data/map.json", {baseURL: "/"}).then(res => {
                    echarts.registerMap("world", res.data)
                    var option = {
                        tooltip: {
                            trigger: "item",
                            backgroundColor: "rgba(4, 10, 30, 0.82)",
                            borderColor: "#FFFFCC",
                            showDelay: 0,
                            hideDelay: 0,
                            enterable: true,
                            transitionDuration: 0,
                            extraCssText: "z-index:100",
                            formatter: function (params, ticket, callback) {
                                //根据业务自己拓展要显示的内容
                                if (that.showLine) {
                                    var res = ""
                                    var name = params.name
                                    var value = params.value[params.seriesIndex + 1]
                                    res = "<span style='color:#fff;'>" + name + "</span>"
                                    return res
                                } else {
                                    var res = ""
                                    var name = params.name
                                    var value = params.value[params.seriesIndex + 1]
                                    res = "<span style='color:#fff;'>" + name + "</span>"
                                    return res
                                }
                            }
                        },
                        backgroundColor: "transparent",
                        // dataRange: {
                        //     show: !1,
                        //     min: 0,
                        //     max: 100,
                        //     x: "right",
                        //     calculable: !0,
                        //     color: ["#fff", "red"],
                        //     textStyle: {
                        //         color: "#fff"
                        //     }
                        // },
                        geo: {
                            map: "world",
                            zoom: 7,
                            center: [104.523544, 31.918827], //地图中心点
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true, //是否允许缩放
                            itemStyle: {
                                normal: {
                                    color: "rgba(4, 10, 30, .5)", //地图背景色
                                    borderColor: "#516a89", //省市边界线00fcff 516a89
                                    borderWidth: 1
                                },
                                emphasis: {
                                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                                }
                            },
                            regions: [
                                {
                                    name: "China",
                                    itemStyle: {
                                        normal: {
                                            borderColor: "#0066ff",
                                            borderWidth: 1,
                                            // areaColor: '#00f',
                                            shadowColor: "rgba(128, 217, 248, 1)",
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            shadowBlur: 10
                                        },
                                        emphasis: {
                                            areaColor: "#389BB7",
                                            borderWidth: 0
                                        }
                                    }
                                }
                            ]
                        },
                        series: series
                    }
                    myChart.setOption(option)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .map-container {
        height: 100%;
        border: 2px double #333;

        .chart {
            height: 100%;
        }
    }

    // .map-container {
    //   height: 700px;
    // }
</style>
