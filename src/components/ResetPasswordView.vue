<template>
    <div class="layout">
        <el-card>
            <template #header>
                <div class="title">重置密码</div>
            </template>
            <el-input v-model="phone" size="large" placeholder="请输入手机号" clearable />
            <div class="sms-code">
                <el-input v-model="smsCode" size="large" placeholder="请输入验证码" />
                <el-button color="orange" :disabled="smsDisabled" @click="getSmsCode">{{ countdown }}</el-button>
            </div>
            <el-input v-model="password" size="large" type="password" placeholder="请输入新密码" show-password />
            <el-input v-model="passwordTwo" size="large" type="password" placeholder="请再次输入新密码" show-password />
            <el-button color="orange" @click="resetPassword">重置密码</el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { authResetPassword } from '../api/user';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();
const phone = ref('');
const smsCode = ref('');
const password = ref('');
const passwordTwo = ref('');

const smsDisabled = ref(false);
const initialTime = ref(60);
const countdown = ref("获取验证码");
let timer: number | NodeJS.Timeout | undefined = undefined;

const getSmsCode = () => {
    if (phone.value === '') {
        throw new Error('请输入手机号');
    }

    smsDisabled.value = true;

    timer = setInterval(() => {
        if (initialTime.value > 0) {
            initialTime.value--;
            countdown.value = String(initialTime.value) + "s";
        } else {
            clearInterval(timer);
            timer = undefined;
            initialTime.value = 60;
            countdown.value = "获取验证码";
            smsDisabled.value = false;
        }
    }, 1000);
}
const resetPassword = () => {
    authResetPassword({ phone: phone.value, smsCode: smsCode.value, password: password.value, passwordTwo: passwordTwo.value })
        .then(() => {
            store.commit('setIsLogin', false);
            store.commit('setUserInfo', {});
            ElMessage.success('重置密码成功!');
            router.push('/');
        })
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #FFDAAA 0%, #80D6FF 100%);
    --el-color-primary: orange;
    --el-input-focus-border-color: orange;

    :deep(.title) {
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        color: #000;
    }

    .el-card {
        width: 35vw;
        min-width: 300px;
        min-height: 250px;

        .sms-code {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1vw;

            .el-input,
            .el-button {
                width: unset;
            }
        }

        .el-input,
        .el-button {
            height: 3vw;
            font-size: 16px;
            margin-bottom: 1vw;
        }

        :deep(.el-button) {
            &:focus {
                outline: unset;
            }
        }

        .el-button {
            width: 100%;
            color: #fff;
            font-weight: bold;
        }
    }
}
</style>