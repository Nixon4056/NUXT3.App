<template>
  <div
    @mouseleave="bounceIconLeave($event.target)"
    @mouseenter="bounceIconEnter($event.target)"
  >
    <slot></slot>
  </div>
</template>

<script>
import gsap from 'gsap';
export default {
  methods: {
    bounceIconEnter(el) {
      gsap.to(el, {
        scale: 1.2,
        ease: 'elastic.out(1, 0.2)',
        duration: 1.3,
      });
    },
    bounceIconLeave(el) {
      gsap.to(el, {
        scale: 1,
        ease: 'elastic.out(1, 0.2)',
        duration: 1.3,
      });
    },
  },
};
</script>

<style scoped>
</style>
