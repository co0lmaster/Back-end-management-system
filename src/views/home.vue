<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/userwanye.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登入的时间 <span> 2023-5-1</span></p>
                    <p>上次登入的地点 <span> 新余</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 350px;">
                <el-table :data="tableData" stripe style="width: 100%;">
                    <!-- <el-table-column prop="date" label="获取日期" >
                    </el-table-column>
                    <el-table-column prop="name" label="角色名称" >
                    </el-table-column>
                    <el-table-column prop="address" label="国度">
                    </el-table-column> -->
                    <el-table-column v-for="(val, key) in tablelabel" :prop="key" :label="val" :key="key">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name"
                    :body-style="{ display: 'flex', height: '80px', padding: '0' }">

                    <i class="icon" :class="`el-icon-${item.icon}`" :style="`background-color:${item.color} ;`"></i>
                    <div class="detail">
                        <p class="number">¥{{ item.value }}</p>
                        <p class="wenan">{{ item.name }}</p>
                    </div>

                </el-card>
            </div>
            <el-card style="height: 240px;margin-bottom: 15px;">
                <!-- 折线图 -->
                <div class="echart1" style="height: 230px;">

                </div>
            </el-card>
            <div class="graph">
                <el-card style="height: 230px; ">
                    <div class="echart2" style="height: 230px; width: 95%;">

                    </div>
                </el-card>
                <el-card style="height: 230px;">
                    <div class="echart3" style="height: 200px;">

                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '甘雨',
                address: '璃月'
            }, {
                date: '2016-05-04',
                name: '胡桃',
                address: '璃月'
            }, {
                date: '2016-05-01',
                name: '钟离',
                address: '璃月'
            }, {
                date: '2016-05-03',
                name: '巴尔 泽布',
                address: '稻妻'
            }],
            tablelabel: {
                date: '获取日期',
                name: '角色名称',
                address: '国度'
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
        }
    },
    mounted() {

        getData().then((item) => {


            const orderData = item.data.data.orderData
            const userData = item.data.data.userData
            const videoData = item.data.data.videoData
            // 数据
            var echart1option = {
            }
            const echartone = echarts.init(document.querySelector('.echart1'));
            const xAxis = Object.keys(orderData.data[0])
            echart1option.xAxis = xAxis
            const xAxisData = {
                data: xAxis
            }
            echart1option.xAxis = xAxisData
            echart1option.yAxis = {}
            echart1option.legend = xAxisData
            echart1option.series = []
            xAxis.forEach(key => {
                echart1option.series.push({
                    name: key,
                    data: orderData.data.map(item => {
                        return item[key]
                    }),
                    type: 'line'
                })
            })
            console.log(echart1option);
            echartone.setOption(echart1option);
            // 柱状图
            const echart2 = echarts.init(document.querySelector('.echart2'));
            const echart2option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echart2.setOption(echart2option)
            const echart3 = echarts.init(document.querySelector('.echart3'));
            const echart3option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
            echart3.setOption(echart3option)
            //饼状图

        })


    },
}
</script>
<style lang="less" scoped>
.user {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-around;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        p {
            line-height: 28px;
            font-size: 14px;
            color: #999999;
        }

        .name {
            color: #333;
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }

}

.login-info {
    span {
        margin-left: 40px;
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .number {
            font-size: 30px;
            margin-bottom: 5px;
            height: 30px;
            line-height: 30px;
        }

        .wenan {
            font-size: 10px;
            color: #999999;
            text-align: center;
        }
    }

    .el-card {
        width: 31%;
        margin-bottom: 20px;
    }
}

.graph {
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}
</style>