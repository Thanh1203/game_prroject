<template lang="en">
    <div id="start">
        <navigateGame></navigateGame>
    </div>
</template>
<script>
import NavigateGame from '@/components/StartGame/navigateGame.vue';

export default {
    components: {
        NavigateGame
    }    
}
</script>
<style>
#start {
    margin: 0 auto;
    position: relative; 
    width: 800px;
}
</style>