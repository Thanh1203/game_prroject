<template>
    <div class="start-ctn">
        <img src="../../assets/loading-screen-logo.png" alt="logo" class="logo1">
        <div class="start-btn">
            <button class="my-btn" @click="goPlay">PLAY</button>
        </div>
        <div class="start-message">
            Signing in will let you sync your progress across devices.
        </div>
        <img src="../../assets/la2logo.svg" alt="logo" class="logo2">
        <div class="start-link">
            <a href="https://littlealchemy2.com/" class="txt_link">Little Alchemy 2 is out! Play it now!</a>
        </div>
        <div class="start-foot">
            Little Alchemy is also available on
            <a href="https://itunes.apple.com/app/little-alchemy/id542467126" class="txt_link">App Store</a>
            and
            <a href="https://play.google.com/store/apps/details?id=com.sometimeswefly.littlealchemy" class="txt_link">Play Store!</a>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goPlay() {
            this.$router.push("/Play")
        }
    }
}
</script>
<style>
.start-ctn {
    height: 100%;
    width: 100%;
    margin-top: 30px;
}

.logo1{
    width: 287px;
    margin-bottom: 20px;
}

.start-btn {
    height: 100px;
    width: 100%;
}

.start-btn > button {
    width: 300px;
    height: 100px;
    background-color: #C226A2;
    color: white;
    font-size: 40px;
    font-weight: 300;
}

.start-message{
    margin: 30px 0 70px 0;
    font-weight: 300;
    letter-spacing: .5px;
}

.logo2 {
    width: 196px;
    height: 90px;
}

.start-link{
    font-weight: 300;
    letter-spacing: .5px;
}


.start-foot{
    font-weight: 300;
    margin-top: 40px;
    margin-bottom: 19px;
    letter-spacing: .5px;
}

</style>