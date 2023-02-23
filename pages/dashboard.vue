<template>
  <div class="dashboard overflow-hidden">
    <the-header />
    <div class="cards__container">
      <the-card
        :cardProps="wycena"
        v-for="wycena in wyceny"
        :key="wycena.id"
      ></the-card>
      <the-card :addingCard="true" />
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '/components/UI/TheHeader.vue';
import TheCard from '/components/layout/TheCard.vue';

const client = useSupabaseClient();
definePageMeta({
  middleware: ['auth'],
});

const user = useSupabaseUser();
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/login');
    }
  });
});

const { data: wyceny } = await useFetch('/api/wyceny', {
  key: `items for ${user.value?.id}`,
  headers: useRequestHeaders(['cookie']),
  body: {
    test: 'test',
    id: user.value?.id
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,500&display=swap');
* {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
}
.dashboard {
  width: 100%;
  height: 100vh;
  background-image: url('/login-bg.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
.cards__container {
  width: 100%;
  padding: 2rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
