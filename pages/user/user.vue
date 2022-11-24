<template>
    <view>
        {{isLogin}}
        {{tbUser}}
        {{tbUserInfo}}
        {{userOtherInfo}}
    </view>
</template>

<script>
import tools from '../../js/tools';
export default {
    data() {
        return {
            isLogin: false,
            tbUser: {},
            tbUserInfo: {},
            userOtherInfo: {}
        };
    },
    methods: {
        getUserInfo() {
            tools.ajax('/user/auth/getUserInfo', {}, data => {
                if (data.success == true) {
                    this.isLogin = data.success;
                    this.tbUser = data.tbUser;
                    this.tbUserInfo = data.tbUserInfo;
                    this.userOtherInfo = data.userOtherInfo;
                } else {
                }
            });
        }
    },
    onShow() {
        this.getUserInfo();
    }
};
</script>

<style></style>
