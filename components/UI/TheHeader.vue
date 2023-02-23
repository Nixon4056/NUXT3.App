<template>
  <header class="p-8 flex flex-row space-x-3 items-center overflow-hidden">
    <div class="logo">
      <img src="nicode-logo.svg" alt="" />
    </div>
    <ul class="list-none flex flex-center space-x-2">
      <!-- <li>wyceny</li>
      <li>firmy</li> -->
    </ul>
    <div @click="logout" class="logout">
      <h1>Wyloguj</h1>
      <img src="/icons/log-out.svg" alt="LogOut" />
    </div>
  </header>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const logout = () => client.auth.signOut()
</script>

<style scoped>
header {
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
}
.logout {
  position: absolute;
  right: 0;
  background-color: white;
  padding: 0.4rem 1rem;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #fca311;
  font-weight: 500;
  transition: 0.3s all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.logout h1{
  opacity: 0;
  transition: 0.3s all;
  font-size: .9rem;
}
.logout img{
  width: 20px;
  margin-left: 10px;
}
.logout:hover h1{
  opacity: 1;
}
</style>
