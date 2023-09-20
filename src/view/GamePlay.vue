<template>
    <div id="play">
        <PlayArea/>
        <storeItem/>
    </div>
</template>
<script>
import storeItem from '@/components/PlayGame/storeItem.vue';
import PlayArea from '@/components/PlayGame/PlayArea.vue';

export default {
    components: {
        storeItem,
        PlayArea
    }
}
</script>
<style>
#play{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}
</style>