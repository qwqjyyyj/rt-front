<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-parallax
      src="@/assets/pexels-karolina-grabowska-7269617.jpg"
      class="hover1"
      :class="{ 'on-hover1': isHovering }"
      :elevation="isHovering ? 10 : 2"
      v-bind="props"
    >
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
        style="font-size: 30px"
      >
        呼&nbsp;&nbsp;&nbsp;吸。
      </div>
    </v-parallax>
  </v-hover>
  <v-container height="500">
    <v-row style="margin-top: 140px" justify="center" align="center">
      <v-col cols="6" justify="center" align="center" style="font-size: 20px"> 呼吸器模擬 </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <a class="circle1" href="https://qwqjyyyj.github.io/rt-front/#/simulator_ins">GO</a>
      </v-col>
    </v-row>
  </v-container>
  <v-parallax src="@/assets/pexels-marek-piwnicki-3907296-14238476.jpg"></v-parallax>
  <v-container width="600">
    <v-row>
      <v-col
        cols="12"
        align="center"
        style="font-size: 20px; margin-top: 100px; margin-bottom: 20px"
        >學習參考</v-col
      >
    </v-row>
    <v-carousel show-arrows="hover" cycle height="300">
      <v-carousel-item src="@/assets/egans.jpeg"></v-carousel-item>

      <v-carousel-item src="@/assets/mosbys.jpg"></v-carousel-item>

      <v-carousel-item src="@/assets/vanders-human-physiology.jpg"></v-carousel-item>
    </v-carousel>
  </v-container>
  <v-container height="500">
    <v-row style="margin-top: 140px" justify="center" align="center">
      <v-col cols="6" justify="center" align="center" style="font-size: 20px"> 小遊戲 </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <a class="circle1" href="https://qwqjyyyj.github.io/rt-front/#/game_ins">GO</a>
      </v-col>
    </v-row>
  </v-container>
  <v-hover v-slot="{ isHovering, props }">
    <v-parallax
      src="@/assets/pexels-cottonbro-5722164.jpg"
      height="800"
      class="hover2"
      :class="{ 'on-hover2': isHovering }"
      :elevation="isHovering ? 5 : 2"
      v-bind="props"
    >
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white hover3"
        :class="{ 'on-hover3': isHovering }"
        :elevation="isHovering ? 10 : 2"
        v-bind="props"
      >
        <h1 class="text-h4 font-weight-thin mb-4">這是什麼？</h1>
        <h4 class="subheading text-center">
          方便練習的小東西<br />
          可以直接使用操作<br />
          也可以註冊登入儲存資料<br />
          目前正在施工中<br />
          我會努力TT
        </h4>
      </div>
    </v-parallax>
  </v-hover>
  <v-container height="500">
    <v-row style="margin-top: 140px" justify="center" align="center">
      <v-col cols="6" justify="center" align="center" style="font-size: 20px"> CONTACT </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <a class="circle1" href="https://qwqjyyyj.github.io/rt-front/#/contact">MORE</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover1 {
  transition: filter 1s ease-in-out;
}
.hover1:not(.on-hover1) {
  filter: blur(3px);
}

.circle1 {
  display: flex;
  width: 100px;
  height: 100px;
  /* background: yellow; */
  border: 1px solid black;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
}

.circle1:hover {
  font-size: 30px;
  transition: 0.8s;
  color: black;
}

.hover2 {
  transition: opacity 0.3s ease-in-out;
}
.hover2:not(.on-hover2) {
  opacity: 0.7;
}

.hover3 {
  transition: opacity 0.3s ease-in-out;
}
.hover3:not(.on-hover3) {
  opacity: 0.1;
}
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '首頁'
</route>
