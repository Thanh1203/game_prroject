<template>
    <div class="slide-store">
        <div class="alphabet">
            <ul class="alphabet-list">
                <li v-for="(alphabet, index) in alphabets" :key="index">{{ alphabet }}</li>
            </ul>
        </div>
        <draggable v-model="natureElements" 
        :group="{ name: 'natureElements', pull: 'clone', put: false }" 
        item-key="name" class="element-container"
        :sort="false" :clone="cloneItem"
        >
            <template #item="{ element }">
                <div class="nature-ele" @dragstart="dragStart(element, $event)" >
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

const alphabets = ref('abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''));
const store = useStore()


let idCount = 0

const natureElements = computed({
    get: () => store.state.natureElements,
})

const cloneItem = (item) => {
    const newItem = {
        id: idCount,
        name: item.name,
        img: item.img,
    };
    return newItem;
}

function dragStart(item, ev) {
    ev.dataTransfer.dropEffect = 'move'
    ev.dataTransfer.effectAllowed = 'move'
    const newItem = cloneItem(item)
    console.log(newItem.id);
    ev.dataTransfer.setData('itemID', newItem.id)
    setTimeout(() => {
        idCount++
    }, 1);
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

.element-container {
    width: 250px;
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