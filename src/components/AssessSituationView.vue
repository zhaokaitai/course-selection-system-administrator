<template>
    <div class="layout">
        <div class="search">
            <el-input v-model="input" placeholder="请输入需要查询的课程" clearable />
            <el-button color="orange" @click="search" plain>搜索</el-button>
            <el-button color="orange" @click="exportCurriculaVariable" plain>导出选课信息</el-button>
        </div>
        <div class="content">
            <div class="classList">
                <div class="classListItem" v-for="item in classList" :key="item.id">
                    <div>{{ item.name }}</div>
                    <div>{{ item.teacher }}</div>
                    <div>已选{{ item.selectNum }}人</div>
                    <div>容量{{ item.capacity }}人</div>
                </div>
            </div>
            <el-table :data="tableData">
                <el-table-column label="学号" prop="date" />
                <el-table-column label="姓名" prop="name" />
                <el-table-column align="right">
                    <template #header>
                        <div>课程名</div>
                        <el-button size="small" type="success" @click="centerDialogVisible = true">添加学生</el-button>
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            Delete
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
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-04',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    }
]
const classList = ref<User[]>([
    {
        id: 1,
        name: '软件工程1班',
        teacher: '张三',
        selectNum: 5,
        capacity: 50
    }
])
const input = ref('')
const centerDialogVisible = ref(false)
const student = ref('');

const search = () => {
    console.log(input.value)
}

const exportCurriculaVariable = () => {
    getCurriculaVariable()
}

interface User {
    id: number
    name: string
    teacher: string
    selectNum: number
    capacity: number
}

const addStudent = () => {
    console.log(student.value);

    centerDialogVisible.value = false;
    ElMessage.success('添加成功');
}

const handleDelete = (row: User) => {
    console.log(row)
}
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