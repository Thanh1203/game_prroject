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
        <draggable v-model="tempElement" group="natureElements" 
        item-key="id" class="drop-box"
        @drop="droped($event)">
            <template #item="{ element }" >
                <div class="item-ele" 
                :style="{
                    position: 'absolute',
                    top: `${element.y}px`,
                    left: `${element.x}px`
                }" 
                :id="`${ element.id }`" 
                @dragstart="dragStart(element, $event)">
                    <img :src="require(`@/assets/${element.img}`)" :alt="`${element.name}`" class="ele-img">
                    <p>{{ element.name }}</p>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable'


let isFullscreen = ref(false)
const store = useStore();
let tempElement = computed({
    get: () => store.state.natureElesTemp,
    set: (data) => store.dispatch('updateNature', data)
})

const natureElements = computed({
    get: () => store.state.natureElements,
});
const natureElementsLength = natureElements.value.length;

// function handle
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

let topScreenY = 0
let leftScreenX = 0


async function droped (ev){
    ev.preventDefault();
    topScreenY = ev.y - 37.5
    leftScreenX = ev.x - 37.5
    const idItemDrop = ev.dataTransfer.getData('itemID')
    await setStyle(idItemDrop)
    await handleLogicDrop(idItemDrop)
}


function setStyle(id) {
    setTimeout(() => {
        tempElement.value.find((item) => {
            if (item.id == id) {
                item.x = leftScreenX,
                item.y = topScreenY
                return {
                    position: 'absolute',
                    top: `${item.y}px`,
                    left: `${item.x}px`
                }
            }
        })
    }, 0.1);
}

async function dragStart(item, ev) {
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('itemID', item.id)
}


function handleLogicDrop(id) {
    let selectItem
    setTimeout(() => {
        tempElement.value.forEach(item => {
            if (item.id == id) {
                selectItem = item
            }
        });
        tempElement.value.forEach(item => {
            if (item.id != selectItem.id && checkleft(selectItem, item.x) && checktop(selectItem, item.y)) {
                console.log(item.name, selectItem.name);
            }
        });
    }, 0.25);
}

function checktop(data, value) {
    const start = data.y - 60
    const end = data.y + 60
    return value >= start && value <= end;
}

function checkleft(data, value) {
    const start = data.x - 60
    const end = data.x + 60
    return value >= start && value <= end;
}


</script>
<style>
.play-container {
    height: 100%;
    width: calc(100% - 280px);
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
    z-index: 2;
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

.item-ele{
    width: 75px;
    height: 75px;
    background-color: rgb(226, 226, 228);
    border-radius: 50%;
}

.item-ele > p {
    margin: 0;
}

.drop-box {
    height: 100%;
}
</style>