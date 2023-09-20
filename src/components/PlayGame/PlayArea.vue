<template>
    <div class="play-container">
        <div class="play-icon">
            <a href="https://littlealchemy2.com/" class="icon"></a>
            <div class="icon iconClear" @click="clearEle"></div>
            <div class="icon iconMenu"></div>
        </div>
        <div class="play-content">
            <a href="https://littlealchemy2.com/" class="txt_link">Little Alchemy 2 is out now!</a>
        </div>
        <div class="play-zoom" @click="fullScreen">
           <font-awesome-icon :icon="isFullscreen ? ['fas', 'minimize'] : ['fas', 'maximize']" size="2xl" style="color: #938671;" class="icon"/>
        </div>
        <div class="play-count"><p>{{ natureElementsLength }} / 580 </p></div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

let isFullscreen = ref(false)

const store = useStore();
const natureElements = store.getters['natureElements'];
const natureElementsLength = natureElements.length;

const fullScreen = () => {
    isFullscreen.value = !isFullscreen.value
    if (!document.fullscreenElement) {
        // Chuyển sang chế độ toàn màn hình
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Thoát chế độ toàn màn hình
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}


</script>
<style>
.play-container {
    height: 100%;
    width: 78%;
    background-image: url(../../assets/workspace-background.png);
    position: relative;
    top: 0;
    left: 0;
}

.play-icon{
    display: flex;
    flex-direction: column;
    width: 35px;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.play-icon > a {
    background-image: url(../../assets/la2button.png);
    margin-top: 10px;
    
}

.iconClear {
    background-image: url(../../assets/clear.png);
    margin-top: 10px;
}

.iconMenu {
    background-image: url(../../assets/menu.png);
    margin-top: 10px;
}

.play-content{
    position: absolute;
    right: 10px;
    width: 170px;
}

.play-zoom {
    position: absolute;
    top: 10px;
    left: 10px;
}

.play-count{
    position: absolute;
    bottom: 5px;
    left: 10px;
}

.play-count > p {
    font-size: 72px;
    margin: 0;
    opacity: 0.6;
}
</style>