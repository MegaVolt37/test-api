<template>
  <div class="page-login">
    <div><span>kminchelle</span><br /><span>0lelplR</span></div>
    <form class="page-login__form" @submit.prevent="sendForm">
      <h1>Авторизация</h1>
      <AppInput
        type="text"
        id="form-username"
        placeholder="username"
        v-model="formData.username"
      />
      <AppInput
        type="password"
        id="form-password"
        placeholder="password"
        v-model="formData.password"
      />
      <AppButton type="submit">Войти</AppButton>
    </form>
  </div>
</template>

<script setup>
import AppInput from "@/components/App/AppInput.vue";
import AppButton from "@/components/App/AppButton.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { auth } = useAuthStore();
const formData = ref({
  username: "",
  password: "",
});
const sendForm = async () => {
  try {
    await auth({ ...formData.value });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  &__form {
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
