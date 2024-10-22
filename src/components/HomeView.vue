<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <h3>选课系统</h3>
                <el-menu default-active="house" class="el-menu-vertical-demo" @open="handleOpen" @select="handleOpen">
                    <el-menu-item index="house">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>总览</span>
                    </el-menu-item>
                    <el-menu-item index="assessSituation">
                        <el-icon>
                            <DataAnalysis />
                        </el-icon>
                        <span>查看选课情况</span>
                    </el-menu-item>
                    <el-menu-item index="importData">
                        <el-icon>
                            <Money />
                        </el-icon>
                        <span>导入数据</span>
                    </el-menu-item>
                    <el-menu-item index="timeset">
                        <el-icon>
                            <AlarmClock />
                        </el-icon>
                        <span>选课时间设置</span>
                    </el-menu-item>
                    <el-menu-item index="userinfo">
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>个人信息设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="left">{{ userInfo.managerName }}</div>
                    <div class="right">
                        <el-avatar :src="userInfo.avatarUrl" />
                        <div class="logout" @click="logout">退出登录</div>
                    </div>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { House, DataAnalysis, Money, AlarmClock, Setting } from '@element-plus/icons-vue';
import store from '../store';
import { authLogout } from '../api/user';
import { useRouter } from 'vue-router';

const userInfo = store.getters.userInfo;
const router = useRouter();

const handleOpen = (key: string) => {
    router.push({ name: key });
}
const logout = () => {
    authLogout().then(() => {
        store.commit('setIsLogin', false);
        store.commit('setUserInfo', {});
        ElMessage.success('退出登录成功');
        router.push('/');
    })
}
</script>

<style lang="scss" scoped>
.layout {
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