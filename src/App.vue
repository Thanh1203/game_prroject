<template>
<RouterView v-slot="{ Component }">
  <Transition name="page-slide" mode="out-in">
    <component :is="Component"/>
  </Transition>
</RouterView>
</template>

<script setup lang="ts">

</script>
<style>
#app {
  height: 100%;
  width: 100%;
}

.page-slide-leave-active {
  transition: 0.6s ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(300px);
}
</style>
