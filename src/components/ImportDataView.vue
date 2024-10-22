<template>
    <div class="layout">
        <div class="item">
            <div class="title">导入数据</div>
            <div class="action">
                <el-select v-model="value" placeholder="请选择您要导入的数据">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-upload :file-list="fileList" :before-upload="beforeUpload" :http-request="uploadFile"
                    :on-change="handleChange" :on-remove="handleRemove" accept=".xls,.xlsx" :auto-upload="false"
                    :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>
                    <el-button type="success" :disabled="fileList.length === 0" @click="handleUpload">导入数据</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>
        <el-table :data="fileContent" v-if="fileContent.length > 0">
            <el-table-column v-for="item in Object.keys(fileContent[0])" :key="item" :prop=item :label=item
                min-width="160" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import type { UploadFile } from 'element-plus';
import { uploadDataFile } from '../api/data';

interface ExcelRow {
    [key: string]: any; // 定义每行数据为键值对对象
}

const fileList = ref<UploadFile[]>([]);
const fileContent = ref<ExcelRow[]>([]);
const value = ref('')
const options = [
    {
        value: 'student',
        label: '学生'
    }, {
        value: 'course',
        label: '课程',
    }, {
        value: 'class',
        label: '教学班'
    }, {
        value: 'teacher',
        label: '教师'
    }, {
        value: 'college',
        label: '学院'
    }, {
        value: 'major',
        label: '专业'
    }
]

const beforeUpload = (file: File) => {
    const isExcel = /\.(xls|xlsx)$/.test(file.name);
    if (!isExcel) {
        ElMessage.error('请上传 Excel 文件');
    }
    console.log("aaaaaaa" + isExcel);

    return isExcel;
};

const handleChange = (file: UploadFile) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
            const data = new Uint8Array(e.target.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            // 将解析后的内容保存到 fileContent，格式为对象数组
            fileContent.value = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);
        }
    };
    reader.readAsArrayBuffer(file.raw as Blob);
    fileList.value = [file];
};

// 清空内容的逻辑
const handleRemove = () => {
    // 清空文件内容
    fileContent.value = []; // 清空已读取的内容
    fileList.value = [];
};

// 自定义上传方法
const uploadFile = async (options: { file: File; onSuccess: () => void; onError: (error: Error) => void }) => {
    if (!options.file) {
        ElMessage.warning('请选择文件');
        return;
    }

    if (!value.value) {
        ElMessage.warning('请选择您要导入的数据');
        return;
    }

    await uploadDataFile(options.file, value.value);

    options.onSuccess(); // 成功后调用
};

// 手动上传文件
const handleUpload = () => {
    if (fileList.value.length > 0) {
        const file = fileList.value[0].raw as File;
        uploadFile({
            file, onSuccess: () => {
                ElMessage.success('导入成功');
                // 清空文件内容
                fileContent.value = []; // 清空已读取的内容
                fileList.value = [];
            }, onError: (error) => {
                ElMessage?.error(error.message);
            }
        });
    } else {
        ElMessage?.warning('请先选择文件');
    }
};
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 3vw;

    .item {
        margin-bottom: 1vw;
        min-height: 10px;

        .title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: max(10px, 1vw);
        }

        .action {
            margin-bottom: max(10px, 1vw);
            display: flex;

            .el-select {
                margin-right: max(10px, 1vw);
                width: 200px;
                --el-color-primary: orange;
            }
        }

        :deep(.el-button) {
            width: 9vw;
            min-width: 90px;
            margin-right: max(10px, 1vw);

            &:focus {
                outline: none;
            }
        }
    }

    .el-table {
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        height: 55vh;
    }
}
</style>