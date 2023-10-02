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
        <draggable v-model="combineNature" group="natureElements" item-key="id" class="drop-box"
        @drop="dropping($event)">
            <template #item="{ element }" >
                <div class="item-ele" :id="`${ element.id }`" 
                @dragstart="dragStart(element, $event)" 
                style="opacity: 0;">
                    <img :src="require(`@/assets/${element.img}`)" :alt="`${element.name}`" class="ele-img">
                    <p>{{ element.name }}</p>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script setup>
import { computed, ref} from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable'
import handlerule from '@/handleRules/handleRule.js'
import storageLocal from '@/Store/storageLocal'

let isFullscreen = ref(false)
const store = useStore();
const natureElements = computed({
    get: () => store.state.natureElements,
})
const natureElementsLength = computed(() => store.state.natureElements.length);
let combineNature = ref(storageLocal.getCombineNatureEle())


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

async function dropping(ev) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('item'));
    data.x = ev.clientX - 37.5;
    data.y = ev.clientY - 37.5;
    const itemDrop = document.getElementById(data.id);
    if (itemDrop) {
        itemDrop.style.opacity = 0;
    }
    await setStyle(data.id, data.x, data.y);
    if (itemDrop) {
        itemDrop.style.opacity = 1;
    }
    handleLogicDrop(data)
    storageLocal.setCombineNatureEle(combineNature.value)
}

function setStyle(id, x, y) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const itemDrop = document.getElementById(id);
            itemDrop.style.opacity = 1;
            itemDrop.style.position = 'absolute';
            itemDrop.style.top = `${y}px`;
            itemDrop.style.left = `${x}px`;
            combineNature.value.find(item => {
                if (item.id == id) {
                    item.x = x,
                    item.y = y
                }
            })
            resolve();
        }, 1);
    });
}

function dragStart(item, ev) {
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('item', JSON.stringify(item))
}

function handleLogicDrop(itemdrop) {
    let natureMix = [itemdrop.name]
    let tempNature
    combineNature.value.filter(item => {
        if (item.id != itemdrop.id && checktop(itemdrop.y, item.y) && checkleft(itemdrop.x, item.x)) {
            tempNature = item
            natureMix.push(item.name)
        }
    })
    if (natureMix.length >= 2) {
        const newNature = handlerule(natureMix)
        if (newNature) {
            const newIdNature = getNewIdNature(itemdrop.id, tempNature.id)
            mapNewEle(newNature, newIdNature, itemdrop)
        }
    }
}

function checktop(data, value) {
    const start = data - 60
    const end = data + 60
    return value >= start && value <= end;
}

function checkleft(data, value) {
    const start = data - 60
    const end = data + 60
    return value >= start && value <= end;
}

function getNewIdNature(id1, id2) {
    let result
    if (id1 > id2) {
        result = id2
    } else {
        result = id1
    }
    handleDelte(id1),
    handleDelte(id2)
    return result
}

function mapNewEle(currentEle, idEle, positionEle) {
    const data = {
        id: idEle,
        name: currentEle.name,
        img: currentEle.img,
        x: positionEle.x,
        y: positionEle.y
    }
    const otherData = {
        name: data.name,
        img: data.img
    }
    combineNature.value.push(data)
    storageLocal.setCombineNatureEle(combineNature.value)
    const check =  natureElements.value.find(item => {
        return item.name == otherData.name
    })
    if (!check) {
        store.dispatch('insertNature', otherData)
    }
}

function handleDelte(id) {
    combineNature.value.forEach((ele, index) => {
        if (ele.id === id) {
            combineNature.value.splice(index, 1)
        }
    })
}

const clearEle = () => {
    combineNature.value = []
    storageLocal.setCombineNatureEle([])
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
    z-index: 2;
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