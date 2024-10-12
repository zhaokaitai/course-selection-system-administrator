<template>
    <div class="layout">
        <div class="basic-userinfo">
            <div class="avatar">
                <el-avatar :size="75" :src="userInfo.avatarUrl" />
                <div class="set-avatar" @click="setAvatar">设置头像</div>
            </div>
            <div class="userinfo">
                <div class="userinfo-item">
                    <span>账号：</span>
                    <span>{{ userInfo.account }}</span>
                </div>
                <div class="userinfo-item">
                    <span>昵称：</span>
                    <div @mouseover="showIcon = true" @mouseleave="showIcon = false" class="editable-text">
                        <span v-if="!isEditing" @click="startEditing">
                            {{ managerName }}
                            <i v-show="showIcon" class="icon" style="margin-left: 5px;">
                                <el-icon :size="16">
                                    <Edit />
                                </el-icon>
                            </i>
                        </span>
                        <div v-else>
                            <el-input v-model="editText" ref="inputRef" @keyup.enter="saveEdit" @keyup.esc="cancelEdit"
                                clearable />
                            <el-button color="orange" @click="saveEdit">保存</el-button>
                            <el-button color="orange" @click="cancelEdit">取消</el-button>
                        </div>
                    </div>
                </div>
                <div class="userinfo-item">
                    <span>所属单位：</span>
                    <span>{{ userInfo.department }}</span>
                </div>
            </div>
        </div>
        <div class="advanced-userinfo">
            <div class="title">手机号码</div>
            <div class="userinfo">
                <div>{{ userInfo.phone }}</div>
                <el-button color="orange" @click="centerDialogVisible = true">修改手机号</el-button>
            </div>
        </div>
        <div class="advanced-userinfo">
            <div class="title">密码</div>
            <el-button color="orange" @click="router.push('/resetPassword')">重置密码</el-button>
        </div>

        <!-- 修改手机号弹出框 -->
        <el-dialog v-model="centerDialogVisible" title="修改手机号" width="500" align-center :show-close="false" center>
            <div class="balnk"></div>
            <el-input v-model="phone" size="large" placeholder="请输入手机号" clearable />
            <div class="sms-code">
                <el-input v-model="smsCode" size="large" placeholder="请输入验证码" />
                <el-button color="orange" :disabled="smsDisabled" @click="getSmsCode">{{ countdown }}</el-button>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button color="orange" style="color: #fff;" @click="centerDialogVisible = false">提交</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import store from '../store';
import router from '../router';
import { Edit } from '@element-plus/icons-vue';

const userInfo = store.getters.userInfo;
const managerName = ref(userInfo.managerName);
const editText = ref(managerName.value);
const isEditing = ref(false);
const showIcon = ref(false);
const inputRef = ref<HTMLElement | null>(null);
const centerDialogVisible = ref(false);

const phone = ref('');
const smsCode = ref('');
const smsDisabled = ref(false);
const initialTime = ref(60);
const countdown = ref("获取验证码");
let timer: number | NodeJS.Timeout | undefined = undefined;

// 设置头像
const setAvatar = () => {
    ElMessageBox.prompt('请输入您的头像链接', '设置头像', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        showClose: false,
        center: true,
    }).then(({ value }) => {
        // 设置头像
        // TODO 发送请求

        userInfo.avatarUrl = value;
        store.commit('setUserInfo', userInfo);
        ElMessage({
            type: 'success',
            message: '设置头像成功',
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '您取消了设置头像',
        })
    })
};

// 开始编辑
const startEditing = () => {
    isEditing.value = true;
    editText.value = managerName.value;

    // 等待下一次 DOM 更新，自动聚焦到输入框
    nextTick(() => {
        if (inputRef.value) {
            inputRef.value?.focus();
        }
    });
};

// 保存编辑
const saveEdit = () => {
    managerName.value = editText.value;
    isEditing.value = false;
    showIcon.value = false;
};

// 取消编辑
const cancelEdit = () => {
    isEditing.value = false;
    showIcon.value = false;
};

// 获取短信验证码
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

</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    text-align: left;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    :deep(.el-button:focus) {
        outline: none;
    }

    .basic-userinfo {
        display: grid;
        grid-template-columns: 1fr 4fr;
        align-items: center;

        .avatar {
            display: flex;
            flex-direction: column;
            align-items: center;

            .set-avatar {
                color: var(--el-color-primary);
                cursor: pointer;
                margin-top: 10px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .userinfo {
            color: #6f6f6f;

            .userinfo-item {
                margin: 15px 0;

                .editable-text {
                    display: inline-block;
                    position: relative;

                    span {
                        cursor: pointer;

                        .icon {
                            font-size: 14px;
                            cursor: pointer;
                        }
                    }

                    div {
                        display: flex;

                        .el-input {
                            --el-color-primary: orange;
                            width: 15vw;
                        }

                        .el-input,
                        .el-button {
                            height: 1.7vw;
                            min-height: 25px;
                        }

                        .el-button {
                            margin-left: 8px;
                            width: 4vw;
                            min-width: 50px;
                            color: #fff;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .advanced-userinfo {
        margin-top: 5vw;
        padding: 0 5vw;

        .title {
            font-size: 1.2em;
            font-weight: bold;
            margin: 20px 0;
        }

        :deep(.el-button) {
            justify-self: start;
            width: 10vw;
            min-width: 90px;
            color: #fff;
            font-weight: bold;
        }

        .userinfo {
            display: grid;
            grid-template-columns: 1fr 5fr;
            gap: 20px;
            align-items: center;
        }
    }

    .el-overlay {
        .el-overlay-dialog {
            .el-dialog {
                .el-dialog__body {
                    .balnk {
                        height: 10px;
                    }

                    .el-input {
                        height: 2.5vw;
                        min-height: 25px;
                        font-size: 16px;
                        margin-bottom: 1vw;
                        --el-color-primary: orange;
                    }

                    .sms-code {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 1vw;

                        .el-button {
                            height: 2.5vw;
                            min-height: 25px;
                            color: #fff;
                            font-weight: bold;
                        }

                        .el-input,
                        .el-button {
                            width: unset;
                        }

                        .el-button:focus {
                            outline: none;
                        }
                    }
                }

                .el-dialog__footer {
                    .dialog-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1vw;

                        .el-button {
                            font-weight: bold;
                            height: 2.5vw;
                            min-height: 25px;
                            width: unset;
                        }
                    }
                }
            }
        }
    }
}
</style>