<template>
  <div class="common-layout">
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
        <el-header>Header
          <div class="right">
            <el-avatar>管理</el-avatar>
            <div class="logout">退出登录</div>
          </div>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { House, Search, Money, AlarmClock, Setting } from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
</style>
