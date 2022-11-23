<template>
    <view>
        <view class="tc">用户登录</view>
        <view class="div_input">
            <input type="text" v-model="user.username" placeholder="用户名" />
            <input type="safe-password" v-model="user.password" placeholder="密码" />
            <view>
                <button @click="login">登录</button>
                <button>重填</button>
            </view>
        </view>
        {{ user }}
    </view>
</template>

<script>
import tools from '../../../js/tools';
let app;
export default {
    data() {
        return {
            title: '用户登录',
            user: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            // 完成省份城市联动
            this.user.password = tools.md5(this.user.password);
            tools.ajax('/user/auth/login', this.user, data => {
                console.log('查看this', this);
                uni.showToast({
                    title: data.message,
                    duration: 3000,
                    complete: () => {
                        if (data.success) {
                            uni.navigateTo({
                                url: '/pages/index/index'
                            });
                        }
                    }
                });
            });
        }
    },
    onLoad() {
        app = this;
    }
};
</script>

<style>
.tc {
    text-align: center;
}

.div_input {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.div_input input {
    border: 1px solid #000;
}
</style>
