<template>
  <RouterView v-slot="{Component}">
    <Transition name="page-slide" mode="out-in">
      <component :is="Component"/>
    </Transition>
  </RouterView>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
#app{
  height: 100%;
  width: 100%;
}
/* .page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 0.6s ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
} */

.page-slide-leave-active {
  transition: 0.6s ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(300px);
}

</style>
