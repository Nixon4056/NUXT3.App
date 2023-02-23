<template>
  <form
    class="card flex flex-col gap-6 mx-auto px-10"
    @submit.prevent="() => (isSignUp ? signUp() : login())"
  >
    <div class="logo">
      <img src="nicode-logo.svg" alt="" />
      <h1 v-if="!isSignUp">Log In</h1>
      <h1 v-else>Register</h1>
    </div>
    <div class="input-group">
      <span>Email address</span>
      <input v-model="email" required name="email" type="text" />
    </div>
    <div class="input-group">
      <span>Password</span>
      <input
        v-model="password"
        minlength="8"
        required
        class="password"
        name="password"
        type="password"
      />
      <img src="icons/lock.svg" alt="" />
      <h2>forgot password?</h2>
    </div>
    <div class="loginWith">
      <h1>Or login with</h1>
      <div class="socialMediaSvgs flex flex-center gap-6">
        <bounce-icon><img src="/icons/github.svg" alt="" /></bounce-icon>

        <bounce-icon><img src="/icons/google.svg" alt="" /></bounce-icon>
        <bounce-icon><img src="/icons/facebook.svg" alt="" /></bounce-icon>
      </div>
    </div>
    <div @click="isSignUp = !isSignUp" class="createAccount">
      <h1>Not registered yet?</h1>
      <h2>create an Account</h2>
    </div>

    <button type="submit" class="circleLogin flex flex-center">
      <div v-if="isLoading"><loading /></div>
      <div v-else>
        <bounce-icon><img src="/icons/arrow-right.svg" alt="" /></bounce-icon>
      </div>
    </button>
  </form>
</template>

<script setup lang="ts">
import BounceIcon from '../animations/BounceIcon.vue';
import loading from '../animations/loading.vue';

let isLoading = ref(false);
const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const client = useSupabaseClient();

const signUp = async () => {
  isLoading.value = true;
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  console.log('error', error);
  console.log('data', data);
  isLoading.value = false;
};

const login = async () => {
  isLoading.value = true;
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  console.log('error', error);
  console.log('data', data);
  isLoading.value = false;
};

const user = useSupabaseUser()
onMounted(() => {
  watchEffect(() => {
    if(user.value){
      navigateTo('/dashboard')
    }
  })
})
</script>

<style scoped>
.logo {
  margin: 2rem 0;
}
.logo h1 {
  font-size: 1rem;
  font-weight: 600;
  color: #fca311;
  margin: 0;
}
.card {
  background: rgba(255, 255, 255, 0.41);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 5% 3%;
  padding-bottom: 70px;
}
.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
}
span {
  position: absolute;
  font-size: 0.8rem;
  color: #cecece;
  transform: translateY(-20px);
  transition: 0.3s all;
  color: #fca311;
}
input {
  position: relative;
  border: none;
  border-bottom: 1px #cecece solid;
  padding: 0 0.5rem;
  transition: 0.3s all;
  background-color: transparent;
  color: #cecece;
}
input:focus {
  outline: none;
  border-bottom: 1px #fca311 solid;
}
.input-group img {
  position: absolute;
  right: 2%;
  top: 8%;
}
.input-group h2 {
  font-size: 0.8rem;
  color: #fca311;
  margin: 0.2rem;
}
.loginWith,
.createAccount {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.loginWith img {
  cursor: pointer;
}
.loginWith h1,
.createAccount h1 {
  color: #cecece;
  font-size: 0.8rem;
  margin: 0.7rem 0;
}
.createAccount {
  cursor: pointer;
}
.createAccount h1 {
  margin: 0;
}
.createAccount h2 {
  color: #fca311;
  font-weight: 400;
  font-size: 1.2rem;
  transition: 0.2s all;
}
.createAccount h2:hover {
  transform: scale(1.1);
}
.circleLogin {
  background-color: white;
  width: fit-content;
  padding: 1rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: -4px -4px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: -30px;
  left: calc(50% - 40px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
