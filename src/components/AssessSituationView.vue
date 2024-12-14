<template>
    <div class="layout">
        <div class="search">
            <el-input v-model="input" placeholder="请输入需要查询的教学班名称" clearable />
            <el-button color="orange" @click="search" plain>搜索</el-button>
            <el-button color="orange" @click="exportCurriculaVariable" plain>导出选课信息</el-button>
        </div>
        <div class="content">
            <div class="classList">
                <div class="classListItem" v-for="item in classList" :key="item.id" @click="classClick(item.id, item.name)">
                    <div>{{ item.name }}</div>
                    <div>{{ item.teacher }}</div>
                    <div>已选{{ item.selectNum }}人</div>
                    <div>容量{{ item.capacity }}人</div>
                </div>
            </div>
            <el-table :data="tableData">
                <el-table-column label="学号" prop="studentNumber" />
                <el-table-column label="姓名" prop="userName" />
                <el-table-column align="right">
                    <template #header>
                        <div>{{ selectClassName }}</div>
                        <el-button v-show="selectId" size="small" type="success" @click="centerDialogVisible = true">添加学生</el-button>
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="添加学生" width="500" align-center>
        <el-input v-model="student" placeholder="请输入学号" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addStudent">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getCurriculaVariable } from '../api/data';
import { addOneStudent, deleteOneStudent, getAll, getStudentList, searchClass } from '../api/assessSituation';

const tableData = ref([]);
const classList = ref<User[]>([])
const input = ref('')
const centerDialogVisible = ref(false)
const student = ref('');
const selectId = ref(0);
const selectClassName = ref('');

const search = () => {
    searchClass(input.value).then((res: any) => {
        tableData.value = [];
        classList.value = res.data.data.map((item: any) => ({
            id: item.id,
            name: item.className,
            teacher: item.teacherName,
            selectNum: item.selectedNum,
            capacity: item.capacity
        }));
    })
}

const exportCurriculaVariable = () => {
    getCurriculaVariable()
}

const classClick = (id: number, className: string) => {
    selectId.value = id;
    selectClassName.value = className;
    getStudentList(id).then((res: any) => {
        tableData.value = res.data.data.map((item: any) => ({
            studentNumber: item.studentNumber,
            userName: item.userName
        }))
    })
}

interface User {
    id: number
    name: string
    teacher: string
    selectNum: number
    capacity: number
}
const addStudent = () => {
    addOneStudent({
        classId: selectId.value,
        studentNumber: student.value
    }).then((res: any) => {
        if (res.data.data === 0) {
            ElMessage.error('添加失败');
            centerDialogVisible.value = false;
            return;
        }
    })
    centerDialogVisible.value = false;
    ElMessage.success('添加成功');
}
const handleDelete = (row: any) => {
    deleteOneStudent({
        classId: selectId.value,
        studentNumber: row.studentNumber
    }).then((res: any) => {
        if (res.data.data === 0) {
            ElMessage.error('删除失败');
            return;
        }

        ElMessage.success('删除成功');
        classClick(selectId.value, selectClassName.value);
    })
}
const init = () => {
    getAll().then((res: any) => {
        classList.value = res.data.data.map((item: any) => ({
            id: item.id,
            name: item.className,
            teacher: item.teacherName,
            selectNum: item.selectedNum,
            capacity: item.capacity
        }));
    })
}
init();
</script>

<style lang="scss" scoped>
.layout {
    .search {
        .el-input {
            width: 35vw;
            min-width: 240px;

            --el-input-focus-border-color: orange;
        }

        .el-button {
            margin-left: 20px;

            &:focus {
                outline: none;
            }
        }

        margin-bottom: 20px;
    }

    .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        .classList {
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 75vh;
            overflow: auto;

            .classListItem {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                padding: 10px;
                border-bottom: 1px solid #ccc;

                &:hover {
                    background-color: #f5f7fa;
                }

                &:active {
                    background-color: #e6e6e6;
                }
            }
        }

        .el-table {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 75vh;
        }
    }
}
</style>