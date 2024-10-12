<template>
    <div class="layout">
        <div class="title">您访问的页面不存在</div>
        <img src="../assets/404.png" alt="">
        <div class="action">
            <el-button color="orange" @click="router.push('/')">点击返回主页面</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #FFDAAA 0%, #80D6FF 100%);
    --el-color-primary: orange;
    --el-input-focus-border-color: orange;

    .title {
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        color: #000;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    img {
        width: 40vw;
    }

    .action {
        margin-top: 2vw;

        .el-button {
            width: 100%;
            height: 3vw;
            font-size: 16px;
            font-weight: bold;
            --el-input-focus-border-color: orange;
            margin-bottom: 2vw;
            color: #fff;

            &:focus {
                outline: unset;
            }
        }
    }
}
</style>