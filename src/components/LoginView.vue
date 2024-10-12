<template>
  <div class="login-page">
    <div class="login-title">
      <img src="../assets/logo.png" alt="">
      <div>学生选课系统管理端</div>
    </div>
    <div class="login-form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账号密码登录" name="account">
          <el-input v-model="account" placeholder="Please input account" clearable>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <User />
              </el-icon>
            </template>
          </el-input>
          <el-input v-model="password" type="password" placeholder="Please input password" show-password>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-tab-pane>
        <el-tab-pane label="手机号验证码登录" name="phone">
          <el-input v-model="phone" placeholder="Please input phone" clearable>
            <template #prepend>
              <el-icon :size="25" color="orange">
                <Phone />
              </el-icon>
            </template>
          </el-input>
          <div class="sms-code">
            <el-input v-model="smsCode" placeholder="Please input smsCode">
              <template #prepend>
                <el-icon :size="25" color="orange">
                  <Key />
                </el-icon>
              </template>
            </el-input>
            <el-button color="orange">获取验证码</el-button>
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
import { authLogin } from '../api/login';
import { useRouter } from 'vue-router';

const router = useRouter();
const account = ref('');
const password = ref('');
const phone = ref('');
const smsCode = ref('');
const activeName = ref('account');

const login = () => {
  console.log(activeName.value);

  if (activeName.value === 'account') {
    console.log(account.value, password.value)
    authLogin({
      account: account.value,
      password: password.value
    }).then(() => {
      router.push('/home');
    })
  }

  if (activeName.value === 'phone') {
    console.log(phone.value, smsCode.value)
  }
}
const forgetPassword = () => {

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
