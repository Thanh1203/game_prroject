<template>
    <div class="play-container">
        <div class="play-icon">
            <div class="icon iconClear" @click="clearEle"></div>
        </div>
        <div class="play-reset">
            <button class="btn btn-primary btn-reset btn-sm" type="reset" value="Reset" @click="resetGame">Reset</button>
        </div>
        <div class="play-content">
            <a href="https://littlealchemy2.com/" class="txt_link">Little Alchemy 2 is out now!</a>
        </div>
        <div class="play-zoom" @click="fullScreen">
           <font-awesome-icon :icon="isFullscreen ? ['fas', 'minimize'] : ['fas', 'maximize']" size="2xl" style="color: #938671;" class="icon"/>
        </div>
        <div class="play-count"><p>{{ natureElementsLength }} / 580 </p></div>
        <draggable v-model="combineNature" group="natureElements" 
        item-key="id" class="drop-box" @drop="drop" @change="log" style="height: 100%;"> 
            <template #item="{ element }" >
                <div class="item-ele" :id="`${ element.id }`" 
                :style="{
                    opacity: element.x === 0 ? 0 : 1,
                    top: `${element.y}px`,
                    left: `${element.x}px`,
                    position: 'absolute'
                }" draggable="true" @dragstart="dragstart($event)">
                    <img :src="require(`@/assets/${element.img}`)" :alt="`${element.name}`" class="ele-img-play">
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
import { defaultData } from "@/contant/keyLocalStorage";

let isFullscreen = ref(false)
const store = useStore();
const natureElements = computed({
    get: () => store.state.natureElements,
    set: (data) => store.commit('update', data)
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

async function drop(ev) {
    ev.preventDefault();
    const idItemDrop = ev.dataTransfer.getData('itemDragId')
    combineNature.value.find(item => {
        if (item.id == parseInt(idItemDrop)) {
            item.x = ev.x - 50
            item.y = ev.y - 50
        }
    })
    await setStyle(idItemDrop, ev.x, ev.y);
    handleLogicDrop(idItemDrop)
    storageLocal.setCombineNatureEle(combineNature.value)
}

function setStyle(id, x, y) {
    return new Promise((resolve) => {
        setTimeout(() => {
            combineNature.value.find(item => {
                if (item.id == parseInt(id)) {
                    item.x = x- 50,
                    item.y = y - 50
                }
            })
            resolve();
        }, 1);
    });
}

function log(ev) {
    if (ev.removed) {
        storageLocal.setCombineNatureEle(combineNature.value)
    }
}

//get data item
function dragstart(ev) {
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData("itemDragId", ev.target.id)
}


// handle logic
function handleLogicDrop(id) {
    let itemdrop
    combineNature.value.find(item => {
        if (item.id == parseInt(id)) {
            itemdrop = item
        }
    })
    let natureMix = [itemdrop.name]
    let idNature = [itemdrop.id]
    let arrNatureTemp = [itemdrop]
    combineNature.value.filter(item => {
        if (item.id != itemdrop.id && checktop(itemdrop.y, item.y) && checkleft(itemdrop.x, item.x)) {
            natureMix.push(item.name)
            arrNatureTemp.push(item)
        }
    })
    if (natureMix.length >= 2) {
        const newNature = handlerule(natureMix)
        if (newNature) {
            arrNatureTemp.filter(item => {
                if (handleCheck(item.name, newNature.key)) {
                    idNature.push(item.id)
                }
            })
            const newIdNature = getNewIdNature(idNature)
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

function getNewIdNature(arr) {
    const result = Math.min(...arr)
    arr.forEach(item => {
        handleDelte(item)
    })
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

function handleCheck(data, itemKey) {
    return itemKey.includes(data)
}

//handle option
const clearEle = () => {
    combineNature.value = []
    storageLocal.setCombineNatureEle([])
}

function resetGame() {
    clearEle()
    storageLocal.setNatureEle(defaultData)
    store.commit('update', storageLocal.getNatureEle())
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

.play-container .play-icon{
    display: flex;
    flex-direction: column;
    width: 35px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
}

.play-container .play-icon .iconClear {
    background-image: url(../../assets/clear.png);
    margin-top: 10px;
}

.play-container .play-reset {
    position: absolute;
    bottom: 10%;
    right: 1%;
    z-index: 2;
}

.play-container .play-reset .btn-reset {
    background-color: #938671;
    border: none;
}

.play-container .play-content{
    position: absolute;
    right: 10px;
    width: 170px;
}

.play-container .play-zoom {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
}

.play-container .play-count{
    position: absolute;
    bottom: 5px;
    left: 10px;
}

.play-container .play-count > p {
    font-size: 72px;
    margin: 0;
    opacity: 0.6;
}

.item-ele > p {
    margin: 0;
}

.item-ele .ele-img-play{
    height: 75px;
}

</style>