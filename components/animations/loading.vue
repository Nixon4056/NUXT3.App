<template>
    <div class="follow-the-leader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
/**
  * follow-the-leader
  *
  * @author jh3y - jheytompkins.com
*/
@-webkit-keyframes follow-the-leader {
  0% {
    -webkit-transform: rotate(0deg) translateY(-200%);
    transform: rotate(0deg) translateY(-200%);
  }
  60%,
  100% {
    -webkit-transform: rotate(360deg) translateY(-200%);
    transform: rotate(360deg) translateY(-200%);
  }
}
@keyframes follow-the-leader {
  0% {
    -webkit-transform: rotate(0deg) translateY(-200%);
    transform: rotate(0deg) translateY(-200%);
  }
  60%,
  100% {
    -webkit-transform: rotate(360deg) translateY(-200%);
    transform: rotate(360deg) translateY(-200%);
  }
}

.follow-the-leader {
  height: 10px;
  position: relative;
  width: 10px;
}
.follow-the-leader div {
  -webkit-animation: follow-the-leader 1.875s infinite backwards;
  animation: follow-the-leader 1.875s infinite backwards;
  background-color: #fca311;
  border-radius: 100%;
  height: 100%;
  position: absolute;
  width: 100%;
}
.follow-the-leader div:nth-child(1) {
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;
  background-color: #fca311;
  opacity: .9;
}
.follow-the-leader div:nth-child(2) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  background-color: #fca311;
  opacity: .8;
}
.follow-the-leader div:nth-child(3) {
  -webkit-animation-delay: 0.45s;
  animation-delay: 0.45s;
  background-color: #fca311;
  opacity: .7;
}
.follow-the-leader div:nth-child(4) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  background-color: #fca311;
  opacity: .6;
}
.follow-the-leader div:nth-child(5) {
  -webkit-animation-delay: 0.75s;
  animation-delay: 0.75s;
  background-color: #fca311;
  opacity: .5;
}
</style>
