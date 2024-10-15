<template>
  <div class="login-page">
    <div class="login-title">
      <img src="../assets/logo.png" alt="">
      <div>学生选课系统管理端</div>
    </div>
    <div class="login-form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账号密码登录" name="account">
          <el-input v-model="account" placeholder="请输入账号" clearable>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <User />
              </el-icon>
            </template>
          </el-input>
          <el-input v-model="password" type="password" placeholder="请输入密码" show-password>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="手机号验证码登录" name="phone">
          <el-input v-model="phone" placeholder="请输入手机号" clearable>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <Phone />
              </el-icon>
            </template>
          </el-input>
          <div class="sms-code">
            <el-input v-model="smsCode" placeholder="请输入短信验证码">
              <template #prepend>
                <el-icon :size="25" color="orange">
                  <Key />
                </el-icon>
              </template>
            </el-input>
            <el-button color="orange" :disabled="smsDisabled" @click="getSmsCode">{{ countdown }}</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button color="orange" @click="login">立即登录</el-button>
      <div class="forgot-password" @click="forgetPassword">忘记密码?</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Phone, Key } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { authLogin, authSmsLogin } from '../api/user';
import { useRouter } from 'vue-router';
import store from '../store';

const router = useRouter();
const account = ref('');
const password = ref('');
const phone = ref('');
const smsCode = ref('');
const activeName = ref('account');

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
const login = () => {
  if (activeName.value === 'account') {
    authLogin({
      account: account.value,
      password: password.value
    }).then((res: any) => {
      const userInfo = res.data.data;
      store.commit('setIsLogin', true);
      store.commit('setUserInfo', userInfo);
      router.push('/home');
    })
  }

  if (activeName.value === 'phone') {
    authSmsLogin({
      phone: phone.value,
      smsCode: smsCode.value
    }).then((res: any) => {
      const userInfo = res.data.data;
      console.log(userInfo)
      store.commit('setIsLogin', true);
      store.commit('setUserInfo', userInfo);
      router.push('/home');
    })
  }
}
const forgetPassword = () => {
  router.push('/resetPassword');
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url('../assets/login-background.png');
  background-size: 100% 100%;
  position: relative;

  .login-title {
    position: absolute;
    top: 20%;
    left: 75%;
    transform: translate(-50%, -50%);
    font-size: 2.5vw;
    font-weight: bold;
    text-align: center;
    color: #000;
    font-family: 'STXingkai', 'STKaiti', 'STFangsong', 'MicroSoft YaHei', sans-serif;

    img {
      width: 25vw;
    }
  }

  .login-form {
    position: absolute;
    width: 27vw;
    top: 65%;
    left: 75%;
    transform: translate(-50%, -50%);

    .el-tabs {
      --el-color-primary: orange;

      .el-tabs__content {
        font-size: 18px;

        .el-tab-pane {
          :deep(.el-input) {
            width: 27vw;
            height: 3vw;
            font-size: 16px;
            --el-input-focus-border-color: orange;
            margin-bottom: 2vw;
          }

          .sms-code {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1vw;

            .el-input,
            .el-button {
              width: unset;
            }
          }
        }
      }
    }

    :deep(.el-button) {
      &:focus {
        outline: unset;
      }
    }

    .el-button {
      width: 27vw;
      height: 3vw;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 1vw;
    }

    .forgot-password {
      color: orange;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
