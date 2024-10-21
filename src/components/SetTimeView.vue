<template>
    <div class="layout">
        <div class="item">
            <div class="item-title">第一轮选课时间</div>
            <el-date-picker v-model="time1" type="datetimerange" range-separator="至" start-placeholder="开启时间"
                end-placeholder="关闭时间" />
        </div>
        <div class="item">
            <div class="item-title">第二轮选课时间</div>
            <el-date-picker v-model="time2" type="datetimerange" range-separator="至" start-placeholder="开启时间"
                end-placeholder="关闭时间" />
        </div>
        <div class="item">
            <div class="item-title">第三轮选课时间</div>
            <el-date-picker v-model="time3" type="datetimerange" range-separator="至" start-placeholder="开启时间"
                end-placeholder="关闭时间" />
        </div>

        <el-button color="orange" @click="submit">提交</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { formatDatetiem, formatDatetimeToDate } from '../utils/formatDatetiem';
import { getTime, setTime } from '../api/setTime';

const time1 = ref<any[]>([]);
const time2 = ref<any[]>([]);
const time3 = ref<any[]>([]);

const submit = () => {
    // 提交
    setTime({
        firstDateTime1: formatDatetiem(time1.value[0]),
        firstDateTime2: formatDatetiem(time1.value[1]),
        secondDateTime1: formatDatetiem(time2.value[0]),
        secondDateTime2: formatDatetiem(time2.value[1]),
        thirdDateTime1: formatDatetiem(time3.value[0]),
        thirdDateTime2: formatDatetiem(time3.value[1])
    }).then(() => {
        ElMessage.success("设置成功");
    })
}

const init = async () => {
    await getTime().then((res: any) => {
        const data = res.data.data;
        time1.value = [formatDatetimeToDate(data.firstDateTime1), formatDatetimeToDate(data.firstDateTime2)];
        time2.value = [formatDatetimeToDate(data.secondDateTime1), formatDatetimeToDate(data.secondDateTime2)];
        time3.value = [formatDatetimeToDate(data.thirdDateTime1), formatDatetimeToDate(data.thirdDateTime2)];
    })
}

init();
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    padding: 3vw;
    text-align: left;

    .item {
        margin-bottom: 3vw;

        .item-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: max(10px, 1vw);
        }

        :deep(.el-date-editor) {
            width: 30vw;
            min-width: 360px;
        }
    }

    .el-button {
        width: 10vw;
        min-width: 90px;
        height: 2.5vw;
        min-height: 25px;
        color: #fff;
        font-weight: bold;
        font-size: max(1.2vw, 16px);

        &:focus {
            outline: none;
        }
    }
}
</style>