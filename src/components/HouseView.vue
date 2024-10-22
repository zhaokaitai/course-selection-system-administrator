<template>
  <div class="layout">
    <el-row>
      <el-col :span="6">
        <el-statistic title="总课程数量" :value="data.totalCourse" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="总教学班数量" :value="data.totalClass" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="未能开课教学班数量" :value="data.unCourseClass" />
      </el-col>
    </el-row>
    <div class="list">
      <div>未能开课教学班名单</div>
      <el-button color="orange" @click="exportList" plain>导出未能开课教学班名单</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column label="教学班名称" prop="className" />
      <el-table-column label="教师姓名" prop="teacherName" />
      <el-table-column label="上课地点" prop="place" />
      <el-table-column label="上课时间" prop="time" />
      <el-table-column label="已选人数" prop="number" />
      <el-table-column label="课程容量" prop="capacity" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getUnCurriculaVariable } from '../api/data';
import { getCount } from '../api/count';

const tableData = ref([]);
const data = ref({
  totalCourse: 555,
  totalClass: 666,
  unCourseClass: 222
})

const exportList = () => {
  getUnCurriculaVariable();
}
const init = () => {
  getCount().then((res: any) => {
    data.value.totalClass = res.data.data.totalClass;
    data.value.totalCourse = res.data.data.totalCourse;
    data.value.unCourseClass = res.data.data.unCourseClass;

    tableData.value = res.data.data.teachingClasses.map((item: any) => ({
      className: item.className,
      teacherName: item.teacherName,
      place: item.classPlace+item.classroom,
      time: `${item.classTime.split('/')[2]}周/${item.classTime.split('/')[0]}/${item.classTime.split('/')[1]}节`,
      number: item.selectedNum,
      capacity: item.capacity
    }));
    
  })
}

init();
</script>
<style lang="scss" scoped>
.layout {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3vw 1vw 1vw;

    div {
      flex: 1;
      font-size: 1.2em;
      font-weight: bold;
    }

    .el-button {
      &:focus{
        outline: none;
      }
    }
  }
}
</style>