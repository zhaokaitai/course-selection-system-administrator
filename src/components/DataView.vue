<template>
    <div class="layout">
        <div class="item">
            <div class="title">导入数据</div>
            <div class="action">
                <div class="text">导入学生数据：</div>
                <el-upload ref="student" action="/api/data/importStudent" :auto-upload="false"
                    :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importStudent">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入课程数据：</div>
                <el-upload ref="course" action="/api/data/importCourse" :auto-upload="false" :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importCourse">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入教学班数据：</div>
                <el-upload ref="classes" action="/api/data/importClass" :auto-upload="false" :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importClass">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入课表数据：</div>
                <el-upload ref="lesson" action="/api/data/importLearningLesson" :auto-upload="false"
                    :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importLearningLesson">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入学院数据：</div>
                <el-upload ref="college" action="/api/data/college" :auto-upload="false" :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importCollege">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入专业数据：</div>
                <el-upload ref="major" action="/api/data/importMajor" :auto-upload="false" :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importMajor">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入教材数据：</div>
                <el-upload ref="book" action="/api/data/importBook" :auto-upload="false" :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importBook">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="action">
                <div class="text">导入教师数据：</div>
                <el-upload ref="teacher" action="/api/data/importTeacher" :auto-upload="false"
                    :limit="1">
                    <template #trigger>
                        <el-button color="orange">选择文件</el-button>
                    </template>

                    <el-button type="success" @click="importTeacher">导入数据</el-button>

                    <template #tip>
                        <div class="el-upload__tip">
                            目前文件只支持Excel文档
                        </div>
                    </template>
                </el-upload>
            </div>
        </div>

        <div class="item">
            <div class="title">导出选课信息</div>
            <el-button color="orange" @click="exportCurriculaVariable">点击导出</el-button>
        </div>
        <div class="item"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { UploadInstance } from 'element-plus'
import { getCurriculaVariable } from '../api/data';

const student = ref<UploadInstance>();
const course = ref<UploadInstance>();
const classes = ref<UploadInstance>();
const lesson = ref<UploadInstance>();
const college = ref<UploadInstance>();
const major = ref<UploadInstance>();
const book = ref<UploadInstance>();
const teacher = ref<UploadInstance>();

const importStudent = () => {
    console.log('importStudent')
}

const importCourse = () => {
    console.log('importCourse')
}

const importClass = () => {
    console.log('importClass')
}

const importLearningLesson = () => {
    console.log('importLearningLesson')
}

const importCollege = () => {
    console.log('importCollege')
}

const importMajor = () => {
    console.log('importMajor')
}

const importBook = () => {
    console.log('importBook')
}

const importTeacher = () => {
    console.log('importTeacher')
    teacher.value!.submit();
}

const exportCurriculaVariable = () => {
    console.log('exportCurriculaVariable')
    getCurriculaVariable()
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 3vw;

    .item {
        margin-bottom: 3vw;
        min-height: 10px;

        .title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: max(10px, 1vw);
        }

        .action {
            margin-bottom: max(10px, 1vw);
            display: flex;

            .text {
                margin-right: max(10px, 1vw);
                width: 130px;
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
}
</style>