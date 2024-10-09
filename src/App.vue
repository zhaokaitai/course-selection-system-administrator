<template>
  <div class="common-layout" v-if="$store.getters.isLogin">
    <el-container>
      <el-aside>
        <h3>选课系统</h3>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1">
            <el-icon>
              <House />
            </el-icon>
            <span>总览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <Search />
            </el-icon>
            <span>查看选课信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <Money />
            </el-icon>
            <span>查看数据信息</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <AlarmClock />
            </el-icon>
            <span>选课时间设置</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon>
              <Setting />
            </el-icon>
            <span>个人信息设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">昵称</div>
          <div class="right">
            <el-avatar>管理</el-avatar>
            <div class="logout">退出登录</div>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="login-page" v-else>
    <div class="login-title">
      <img src="./assets/logo.png" alt="">
      <div>学生选课系统管理端</div>
    </div>
    <div class="login-form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
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
      <el-button color="orange">立即登录</el-button>
      <div class="forgot-password">忘记密码?</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { House, Search, Money, AlarmClock, Setting, User, Lock, Phone, Key } from '@element-plus/icons-vue';
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus'

const account = ref('');
const password = ref('');
const phone = ref('');
const smsCode = ref('');
const activeName = ref('account')

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  text-align: center;

  .el-container {
    height: 100%;

    .el-aside {
      width: 200px;
      height: 100%;
      padding-top: 1vw;
      border-right: 1px solid var(--el-menu-border-color);

      h3 {
        margin-bottom: 2vw;
      }

      .el-menu {
        border: none;

        .el-menu-item {
          user-select: none;
          -webkit-user-select: none;
        }
      }
    }

    .el-container {
      .el-header {
        height: 70px;
        line-height: 60px;
        border-bottom: 1px solid var(--el-menu-border-color);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right {
          display: flex;
          align-items: center;

          .el-avatar,
          .logout {
            user-select: none;
            -webkit-user-select: none;
          }

          .el-avatar {
            margin-right: 10px;
          }

          .logout {
            cursor: pointer;

            &:hover {
              color: var(--el-color-primary);
            }
          }
        }
      }

      .el-main {
        min-height: 200px;
      }
    }
  }
}

.login-page {
  width: 100%;
  height: 100%;
  background-image: url('./assets/login-background.png');
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
