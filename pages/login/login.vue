<template>
    <view>
        <view class="tc">用户登录</view>
        <view class="div_input">
            <input type="text" v-model="user.username" placeholder="用户名" />
            <input type="password" v-model="user.password" placeholder="密码" />
            {{ user.password }}
            <view>
                <button @click="login">登录</button>
                <button>重填</button>
            </view>
        </view>
        {{ user }}
    </view>
</template>

<script>
import tools from '@/js/tools';
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
            console.log('没有经过md5加密之前的密码', this.user.password);
            let text = tools.md5(this.user.password);
            this.user.password = tools.md5(this.user.password);
            console.log('查看登录时的密码1', this.user.password);
            console.log('查看登录时的密码2', this.user.password == text);
            tools.ajax('/user/auth/login', this.user, data => {
                console.log('查看date', this.user);
                uni.showToast({
                    title: data.message,
                    duration: 3000,
                    complete: () => {
                        if (data.success == true) {
                            uni.navigateTo({
                                url: '/pages/user/user'
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
