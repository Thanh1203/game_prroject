<template>
    <div class="slide-store">
        <div class="alphabet">
            <ul class="alphabet-list">
                <li v-for="(alphabet, index) in alphabets" :key="index" @click="scrollList">{{ alphabet }}</li>
            </ul>
        </div>
        <draggable v-model="natureEleSort" :group="{ name: 'natureElements', pull: 'clone'}" 
        item-key="name" class="element-container" :sort="false" :clone="cloneNature" @change="log">
            <template #item="{ element }">
                <div class="nature-ele" @dragstart="dragStart($event)" :name="`${element.name}`">
                    <img :src="require(`@/assets/${element.img}`)" :alt="`${element.name}`" class="ele-img">
                    <div class="nature-ele-name">{{ element.name }}</div>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import draggable from 'vuedraggable'
import { computed, ref } from 'vue';
import storageLocal from '@/Store/storageLocal';

const alphabets = ref('abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''));
const store = useStore()

//handle drag
const natureElements = computed({
    get: () => store.state.natureElements,
    set: (data) => store.commit("update",data)
})


const getId = storageLocal.getCombineNatureEle()
let idCount
let temp = []

if (getId.length == 0) {
    idCount = 0
} else {
    getId.forEach(item => {
        temp.push(item.id)
    })
    idCount = Math.max(...temp) + 1
}

const natureEleSort = computed(() => {
    return natureElements.value.slice().sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
});

const cloneNature = (item) => {
    const newItem = {
        id: idCount,
        name: item.name,
        img: item.img,
        x: 0,
        y: 0
    };
    return newItem;
}

function dragStart(ev) {
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    // const newItem = JSON.stringify(cloneItem(item))
    // ev.dataTransfer.setData('item', newItem)
    const dragItem = ev.target
    dragItem.id = idCount
    setTimeout(() => {
        idCount++
    }, 1);
    ev.dataTransfer.setData("itemDragId", dragItem.id)
}

function log(ev) {
    if (ev.added) {
        natureElements.value.forEach((item, index) => {
            if (Object.prototype.hasOwnProperty.call(item, 'id')) {
                natureElements.value.splice(index, 1);
            }
        });
    }
}

//handle scroll
function scrollList(ev) {
    const char = ev.target.innerHTML.toLowerCase()
    const ele = natureEleSort.value.find((item) => item.name.startsWith(char))
    if (ele) {
        const htmlEle = document.getElementsByName(ele.name);
        if (htmlEle.length > 0) {
            htmlEle[0].scrollIntoView({
                behavior: "smooth",
            });
        }
    }
}
</script>
<style>
.slide-store{
    width: 280px;
    height: 100%;
    background-image: url('../../assets/library-background.png');
    position: relative;
    right: 0;
    display: flex;
}

.alphabet{
    width: 30px;
    height: 100%;
}

.alphabet-list {
    background: transparent;
    border-right: 1px solid white;
    list-style: none;
    padding: 0;
    overflow-y: scroll;
    height: 100%;
}

.alphabet-list::-webkit-scrollbar {
  display: none;
}

.alphabet-list li {
    width: 30px;
    height: 34px;
    padding: 4px 0;
    cursor: pointer;
}

.slide-store .element-container {
    width: 250px;
    overflow-y: scroll;
}

.slide-store .element-container::-webkit-scrollbar {
    display: none;
}

.nature-ele {
    height: 60px;
    padding: 5px 0 5px 2px;
    display: flex;
}

.nature-ele-name {
    padding: 12px 0 12px 5px;
    width: 200px;
    text-align: left;
    font-size: 18px;
    font-weight: 300;
    cursor: default;
}

</style>