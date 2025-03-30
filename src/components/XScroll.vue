<template>
  <div class="scroll-container" v-resize="handleSizeChange">
    <div class="v-scroll">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Size } from '@/directive/resize'

const size = reactive<Size>({ width: 0, height: 0 })

const handleSizeChange = ({ width, height }: Size) => {
  size.width = width
  size.height = height
}
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  .v-scroll {
    --width: calc(v-bind(size.width) * 1px);
    --height: calc(v-bind(size.height) * 1px);
    width: var(--height);
    height: var(--width);
    position: relative;
    transform-origin: left top;
    transform: translateY(var(--height)) rotate(-90deg);
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .content {
      width: var(--width);
      height: var(--height);
      position: absolute;
      top: 0;
      left: var(--height);
      transform-origin: left top;
      transform: rotate(90deg);
    }
  }
}
</style>
