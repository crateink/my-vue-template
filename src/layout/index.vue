<template>
  layout
  <router-link to="/login">login</router-link><br />
  <router-link to="/system/user">/system/user</router-link><br />
  <router-link to="/system/test">/system/test</router-link><br />
  <router-link to="/test/test1/test2">/test/test1/test2</router-link><br />
  <router-view v-slot="{ Component }">
    <keep-alive :include="['TestTest1Test2', 'SystemUser']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>
