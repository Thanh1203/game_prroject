<template>
    <div class="slide-store">
        <div class="alphabet">
            <ul class="alphabet-list">
                <li v-for="(alphabet, index) in alphabets" :key="index">{{ alphabet }}</li>
            </ul>
        </div>
        <div class="element-container">
            <div v-for="(ele, index) in natureElements" :key="index" class="nature-ele">
                <img :src="require(`@/assets/${ele.img}`)" :alt="`${ele.name}`">
                <div class="nature-ele-name">{{ ele.name }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

export default {
    computed: {
        ...mapGetters(['natureElements'])
    },
    data() {
        return {
            alphabets,
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

.element-container {
    width: 250px;
}

.nature-ele {
    height: 60px;
    padding: 5px 0 5px 2px;
    display: flex;
}

.nature-ele > img {
    height: 50px;
    width: 50px;
    cursor: pointer;
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