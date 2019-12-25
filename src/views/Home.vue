<template>
    <FullScreenContainer>
        <el-carousel indicator-position="none" :autoplay="true" @change="changeCarousel" :loop="true"
                     :interval="showTimeLength">
            <el-carousel-item class="item-container">
                <Screen v-if="showScreen"></Screen>
            </el-carousel-item>
            <el-carousel-item class="item-container">
                <Video v-if="showVideo" @getVideoTimeLength="getVideoTimeLength"></Video>
            </el-carousel-item>
            <el-carousel-item class="item-container">
                <HostScreen v-if="showHostScreen"></HostScreen>
            </el-carousel-item>
        </el-carousel>

        <el-dialog
                v-if="false"
                title="上传文件"
                :visible.sync="dialogVisible"
                class="dialog-container"
                destroy-on-close
                width="70%">
            <el-form
                    ref="form"
                    :model="form"

            >
                <el-form-item label="出差数据">
                    <el-upload
                            class="upload-demo"
                            action="actionOfBusiness"
                            :http-request="uploadMyfile"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            accept=".xlsx"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileListOfBusiness">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="机组数据">
                    <el-upload
                            class="upload-demo"
                            action="actionOfHost"
                            :http-request="uploadMyfile"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-upload="beforeUpload"
                            :before-remove="beforeRemove"
                            accept=".xlsx"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileListOfHost">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="视频数据">
                    <el-upload
                            class="upload-demo"
                            action="actionOfVideo"
                            :http-request="uploadMyfile"
                            :on-preview="handlePreviewOfVideo"
                            :on-remove="handleRemoveOfVideo"
                            :before-remove="beforeRemoveOfVideo"
                            multiple
                            accept=".mp4"
                            :limit="1"
                            :on-exceed="handleExceedOfVideo"
                            :file-list="fileListOfVideo">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="refreshComponents">确 定</el-button>
              </span>
        </el-dialog>

        <el-dialog
                title="上传文件"
                :visible.sync="dialogVisibleOfTest"
                class="dialog-container"
                destroy-on-close
                width="70%">
            <el-form
                    ref="form"
                    :model="form"

            >
                <el-form-item label="出差数据">
                    <el-upload
                            class="upload-demo"
                            action="businessOfTest"
                            :http-request="uploadMyfileOfTest"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileListOfBusinessOfTest">
                        <el-button size="small" type="primary" :loading="csvUploading">点击上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="视频数据">
                    <el-upload
                            class="upload-demo"
                            action="videoOfTest"
                            :http-request="uploadMyfileOfTest"
                            :on-preview="handlePreviewOfVideo"
                            :on-remove="handleRemoveOfVideo"
                            :before-remove="beforeRemoveOfVideo"
                            multiple
                            accept=".mp4"
                            :limit="1"
                            :on-exceed="handleExceedOfVideo"
                            :file-list="fileListOfVideoOfTest">
                        <el-button size="small" type="primary" :loading="videoUploading">点击上传</el-button>
                        <!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleOfTest = false">取 消</el-button>
                    <el-button type="primary" @click="refreshComponents" :loading="uploadSuccess">确 定</el-button>
              </span>
        </el-dialog>
    </FullScreenContainer>
</template>

<script>

    import FullScreenContainer from './../components/FullScreenContainer'
    import Screen from "./Screen"
    import Video from './Video'
    import HostScreen from './HostScreen'
    import {Message} from "element-ui"

    const d3 = require("d3-dsv")
    const _ = require("lodash")

    export default {
        name: "Home",
        components: {FullScreenContainer, Screen, HostScreen, Video},
        data() {
            return {
                showTimeLength: 60000,            //每页显示时长
                showScreen: true,
                showVideo: false,
                showHostScreen: false,
                showIndex: 0,
                videoTimeLength: 0,              // 视频时长

                dialogVisible: false,
                form: {},

                fileListOfBusiness: [],
                fileListOfHost: [],
                fileListOfVideo: [],

                //出差数据
                dialogVisibleOfTest: false,
                fileListOfBusinessOfTest: [],
                fileListOfVideoOfTest: [],
                targetArr: [],
                searchTargetData: [],
                csvUploading: false,
                videoUploading: false,
                uploadSuccess: false,            // 上传按钮
            }
        },
        created() {
            document.addEventListener('keydown', this.openForm)
        },
        mounted() {

        },
        methods: {
            //读取csv文件
            readCSVFile() {

                let csvFile = "/statics/csv/source.csv"
                this.$axios.get(csvFile, {baseURL: "/"}).then(res => {
                    let ret = d3.csvParse(res.data)

                    let position = {}
                    let isForeign = {}
                    let location = {}
                    ret.map(outItem => {
                        for (let innerKey in outItem) {
                            // if (innerKey === "用户名称") {
                            //     if (outItem.location !== "暂无数据" && !position.hasOwnProperty(outItem[innerKey])) {
                            //         position[outItem[innerKey]] = outItem.formatted_address
                            //     }
                            // }
                            // if (innerKey === "country") {
                            //
                            //     let address = outItem.country + outItem.province + outItem.district
                            //     if (outItem[innerKey] === "中国") {
                            //
                            //         if (!isForeign.hasOwnProperty(address)) {
                            //             isForeign[address] = false
                            //         }
                            //     } else {
                            //         isForeign[address] = true
                            //     }
                            // }
                            if (innerKey === "location") {
                                if (outItem.location !== "暂无数据" && !location.hasOwnProperty(outItem['用户名称'])) {
                                    let mid = outItem.formatted_address
                                    let midArr = outItem.location.split(",")
                                    location[mid] = midArr
                                }
                            }
                        }
                    })
                })

            },
            //导出csv文件
            exportExl() {
                this.$axios.post("/getHostNameList").then(res => {
                    let result = res.data.data
                    require.ensure([], () => {                            // 用 webpack Code Splitting xlsl还是很大的
                        const {export_json_to_excel} = require('@/vendor/Export2Excel');
                        const tHeader = ["项目指令", "用户名称"]; // excel 表格头
                        const filterVal = ["项目指令", "用户名称"];
                        const list = result
                        const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
                        export_json_to_excel(tHeader, data, '列表excel');
                    })
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (v[j] === "") {
                        return v[j] = "暂无数据"
                    } else {
                        return v[j]
                    }
                }))
            },
            refreshComponents() {

                if (!this.csvUploading && !this.videoUploading) {
                    this.dialogVisibleOfTest = false;

                    this.showScreen = false;
                    this.showHostScreen = false;
                    this.showVideo = false

                    setTimeout(() => {
                        if (this.showIndex === 0) {
                            this.showScreen = true;
                        } else if (this.showIndex === 1) {
                            this.showVideo = true;
                        } else {
                            this.showHostScreen = true;
                        }
                    })
                } else {
                    Message({
                        message: "文件上传中....",
                        type: "info"
                    })
                }
            },
            uploadMyfile(params) {

                let file = params.file
                let type = params.action.split("Of")[1].toLowerCase()

                switch (type) {
                    case "business":
                        this.uploadFile(type, file)
                        break;
                    case "host":
                        this.uploadFile(type, file)
                        break;
                    case "video":
                        this.uploadFile(type, file)
                        break;
                }
            },
            uploadMyfileOfTest(params) {

                let file = params.file
                let actionArr = params.action.split("Of")
                let type = actionArr[0].toLowerCase()               // business   video
                let fileType = actionArr[1].toLowerCase()           // test

                switch (type) {
                    case "business":
                        this.csvUploading = true;
                        this.uploadFileOfTest(type, fileType, file)
                        break;
                    case "video":
                        this.videoUploading = true;
                        this.uploadFileOfTest(type, fileType, file)
                        break;
                }
            },
            uploadFile(type, file) {
                let formData = new FormData()
                formData.append("fileName", type)
                formData.append("file", file)
                this.$axios.post("/uploadFile", formData, {headers: {"Content-Type": "multipart/form-data"}}).then(_ => {

                    let data = {
                        fileType: type
                    }
                    this.$axios.post("/upDownFile", data, {headers: {"Content-Type": "application/json"}}).then(upDownFileRes => {

                    }).catch(err => {
                        console.log("%c 文件下载失败！" + err, "color:red");
                    })
                }).catch(err => {
                    console.log("%c 文件上传失败！" + err, "color:red");
                })
            },                      // type ： business  host  video
            uploadFileOfTest(type, fileType, file) {

                let formData = new FormData()
                formData.append("fileName", type)               // business video
                formData.append("fileType", fileType)               // test
                formData.append("file", file)

                this.$axios.post("/uploadFile", formData, {headers: {"Content-Type": "multipart/form-data"}}).then(_ => {

                    let data = {
                        fileType: type      // business video
                    }
                    this.$axios.post("/upDownFile", data, {headers: {"Content-Type": "application/json"}}).then(upDownFileRes => {
                        if (type === "business") {
                            this.csvUploading = false;
                        } else if (type === "video") {
                            this.videoUploading = false;
                        }
                    }).catch(err => {
                        console.log("%c 文件下载失败！" + err, "color:red");
                    })
                }).catch(err => {
                    console.log("%c 文件上传失败！" + err, "color:red");
                })
            },
            openForm(event) {

                let key = window.event.keyCode ? window.event.keyCode : window.event.which
                // F8 事件
                if (key === 119) {
                    // this.dialogVisible = true;
                    this.dialogVisibleOfTest = true
                    event.preventDefault()
                }
            },
            getVideoTimeLength(timeLength) {
                this.videoTimeLength = timeLength
            },
            changeCarousel(next, pre) {

                this.showIndex = next;
                if (next === 1) {
                    setTimeout(() => {
                        this.showScreen = false;
                        this.showHostScreen = false;
                    }, 400)
                    this.showVideo = true;
                } else if (next === 2) {
                    setTimeout(() => {
                        this.showScreen = false;
                        this.showVideo = false;
                    }, 400)
                    this.showHostScreen = true;
                } else if (next === 0) {
                    setTimeout(() => {
                        this.showVideo = false;
                        this.showHostScreen = false;
                    }, 400)
                    this.showScreen = true;
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeUpload(file) {
                console.log("beforeUpload", file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemoveOfVideo(file, fileList) {
                console.log(file, fileList);
            },
            handlePreviewOfVideo(file) {
                console.log(file);
            },
            handleExceedOfVideo(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemoveOfVideo(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },

        },
        destroyed() {
            document.removeEventListener('keydown', this.openForm)
        }
    }
</script>

<style lang="scss">
    .el-carousel, .el-carousel__container {
        width: 100%;
        height: 100%;
    }
</style>
