<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view class="text-area">
            <text class="title">{{title}}</text>
        </view>
    </view>
</template>

<script>
    import tools from "@/js/tools.js"
    export default {
        data() {
            return {
                title: '早安人'
            }
        },
        methods: {
            test() {
                tools.testmd5()
            },
            // get请求 测试
            onLoad() {
                tools.ajax('/', {
                    echo: "黑暗骑士"
                }, (data) => {
                    console.log("get请求结果", data)
                }, "GET")
                tools.ajax("/api/amap/weatherInfo", {
                    city: "430702",
                    extensions: "all"
                }, (data) => {
                    console.log("天气请求结果", data)
                }, "POST")
            },
            // 不可以使用vue的声明周期，要用unipp自己
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50rpx;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>
