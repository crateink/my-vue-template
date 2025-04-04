<template>
  <div class="login">
    <h1 class="app-title">登录{{ title }}</h1>
    <el-form ref="formRef" class="login-form" :model="formData" :rules="formRules">
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
          size="large"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          size="large"
          clearable
          @keyup.enter="handleSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-form__submit"
          type="primary"
          :loading="submitLoading"
          @click="handleSubmit"
          size="large"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
const title = import.meta.env.VITE_APP_TITLE
const submitLoading = ref(false)

const formData = reactive({
  username: 'admin',
  password: 'admin',
})

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
}

const formRef = useTemplateRef('formRef')
const router = useRouter()
const handleSubmit = async () => {
  try {
    submitLoading.value = true
    await formRef.value!.validate()
    router.push('/')
  } finally {
    submitLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .app-title {
    font-size: 26px;
    margin-bottom: 20px;
  }

  .login-form {
    width: 360px;

    .login-form__submit {
      width: 100%;
      font-size: 16px;
    }
  }
}
</style>
