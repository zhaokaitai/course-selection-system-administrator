// src/vue-shim.d.ts
import { Store } from 'vuex';

// 声明模块来扩展 Vue 实例
declare module '@vue/runtime-core' {
    // 为 this.$store 提供类型定义
    interface ComponentCustomProperties {
        $store: Store<any>;
    }
}
