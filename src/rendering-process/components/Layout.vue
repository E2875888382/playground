<template>
    <div 
        class="layout-container"
        :class="[customClass, { 'layout-container_flex':flex }]"
        :style="{
            background: background || '#f5f5f5'
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        // 背景
        background: String,
        // 自定义class
        customClass: String,
        // flex布局
        flex: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="less" scoped>
.layout-container {
    width: 100%;
    height: 100%;
}
.layout-container_flex {
    display: flex;
}
</style>