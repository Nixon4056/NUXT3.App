<template>
  <div v-if="!addingCard" class="card">
    <header>
      <h1 class="truncate">{{ cardProps.company }}</h1>
    </header>
    <main>
      <h1 class="truncate">{{ cardProps.price }} PLN</h1>
      <h2 class="truncate">{{ cardProps.title }}</h2>
      <h3 class="truncate">Utworzone: {{ cardProps.created_at }}</h3>
    </main>
    <footer>
      <h3 class="draft">DRAFT</h3>
    </footer>
  </div>
  <div v-else class="adder card flex flex-center">
    <NuxtLink to="/dashboard/add"
      ><img src="/icons/file-plus.svg" alt=""
    /></NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  addingCard: {
    type: Boolean,
  },
  cardProps: {
    type: Object,
  },
});
</script>

<style scoped>
.card {
  background-color: white;
  width: fit-content;
  padding: 0.5rem;
  border-radius: 20px;
  min-height: 220px;
  min-width: 200px;
  transition: 0.3s all;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
}
.adder {
  align-items: center;
  justify-content: center;
}
.adder img {
  width: 100px;
}
.card:hover {
  opacity: 0.5;
}
header {
  font-weight: 500;
  color: #fca311;
  background-color: rgb(228, 228, 228);
  padding: 1rem 2rem;
  border-radius: 15px;
}
header h1 {
  max-width: 140px;
}
main {
  padding: 0.5rem;
  color: #fca311;
  max-width: 180px;
}
main h1 {
  font-weight: 600;
  font-size: 1.3rem;
}
main h2 {
  font-weight: 400;
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}
footer img {
  width: 20px;
}
.draft {
  font-weight: 600;
  color: #42ce50;
}
</style>
