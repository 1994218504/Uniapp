<template>
    <view>
        {{ title }}
        <!-- 多个借口 -->
        <view>
            省份：
            <select v-model="pid" @change="cehngshiss()">
                <option value="-1">选择省份</option>
                <option v-for="d in chengshilist" :value="d.pid" :key="d.pid">{{ d.province }}</option>
            </select>
            {{ pid }}
        </view>
        <view>
            城市：
            <select v-model="cid">
                <option value="-1">选择城市</option>
                <option v-for="d in chengshilists" :value="d.cid" :key="d.cid">{{ d.city }}</option>
            </select>
            {{ cid }}
        </view>
        <!-- 一个借口 -->
        <view>多次调用一个接口区域：</view>
        <view>
            <select v-model="oaid" @change="quertwo">
                <option v-for="d in onepid" :key="d.aid" :value="d.aid">{{ d.name }}</option>
            </select>
            <view></view>
            <select v-model="taid" @change="quersan">
                <option v-for="t in twopid" :key="t.aid" :value="t.aid">{{ t.name }}</option>
            </select>
            <view></view>
            <select v-model="sanaid" @change="quersi">
                <option v-for="s in sanpid" :key="s.aid" :value="s.aid">{{ s.name }}</option>
            </select>
            <view></view>
            <select v-model="siaid">
                <option v-for="s in sipid" :key="s.aid" :value="s.aid">{{ s.name }}</option>
            </select>
        </view>
    </view>
</template>

<script>
import tools from '../../js/tools';
export default {
    data() {
        return {
            title: '省份城市联动',
            chengshilist: [],
            pid: -1,
            chengshilists: [],
            cid: -1,
            //多次回调
            onepid: [],
            oaid: -1,
            //
            twopid: [],
            taid: -1,
            //
            sanpid: [],
            sanaid: -1,
            //
            sipid: [],
            siaid: -1
        };
    },
    methods: {
        chengshi() {
            tools.ajax('/linkinfo/queryAllProvince', {}, data => {
                console.log(data);
                this.chengshilist = data.list;
            });
        },
        cehngshiss() {
            this.chengshilists = [];
            tools.ajax(
                '/linkinfo/queryCityByProvince',
                {
                    pid: this.pid
                },
                data => {
                    this.chengshilists = data.list;
                }
            );
        },
        // 最上面一级
        querone() {
            let app = this;
            tools.ajax(
                '/linkinfo/queryAreaByPid',
                {
                    pid: 0
                },
                function(data) {
                    if (!data.success) {
                        return;
                    }
                    app.onepid = data.list;
                    if (app.onepid.length > 0) {
                        app.oaid = app.onepid[0].aid;
                    }
                    app.quertwo();
                }
            );
        },
        // 市一级
        quertwo() {
            let app = this;
            tools.ajax(
                '/linkinfo/queryAreaByPid',
                {
                    pid: app.oaid
                },
                function(data) {
                    if (!data.success) {
                        return;
                    }
                    app.twopid = data.list;
                    if (app.twopid.length >= 0) {
                        app.taid = app.twopid[0].aid;
                    }
                    app.quersan();
                }
            );
        },
        // 区一级
        quersan() {
            let app = this;
            tools.ajax(
                '/linkinfo/queryAreaByPid',
                {
                    pid: app.taid
                },
                function(data) {
                    if (!data.success) {
                        return;
                    }
                    app.sanpid = data.list;
                    console.log('第三级区', app.sanpid);
                    if (app.sanpid.length > 0) {
                        app.sanaid = app.sanpid[0].aid;
                    }
                    app.quersi();
                }
            );
        },
        // 街道一级
        quersi() {
            let app = this;
            console.log(app.sanaid);
            tools.ajax(
                '/linkinfo/queryAreaByPid',
                {
                    pid: app.sanaid
                },
                function(data) {
                    if (!data.success) {
                        console.log(data.message);
                        return;
                    }
                    app.sipid = data.list;
                    if (app.sipid.length > 0) {
                        app.siaid = app.sipid[0].aid;
                    }
                }
            );
        }
    },
    onLoad() {
        this.chengshi();
        this.querone();
    }
};
</script>

<style></style>
