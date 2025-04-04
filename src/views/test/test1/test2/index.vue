<template>
  <div>test2 <input type="text" /></div>
  <el-button type="primary" @click="openDialog">openDialog</el-button>
</template>

<script setup lang="tsx">
const a = ref(1)
const dialog = useDialog()
const openDialog = () => {
  dialog.open({
    dialogProps: {
      title: 'test2',
      width: '300',
    },
    comp: () => (
      <div>
        <h1>close</h1>
        <el-button type="primary" onClick={() => dialog.close()}>
          close
        </el-button>
      </div>
    ),
  } as any)
}
</script>

<style scoped lang="scss"></style>
