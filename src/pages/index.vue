<template>
  <v-parallax src="@/assets/pexels-karolina-grabowska-7269617.jpg"></v-parallax>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">呼吸器模擬</v-col>
      <v-col cols="6" class="text-center bg-primary">test</v-col>
      <v-col cols="6" class="text-center">test</v-col>
    </v-row>
  </v-container>
  <v-parallax src="@/assets/pexels-marek-piwnicki-3907296-14238476.jpg"></v-parallax>
  <v-container width="500">
    <v-carousel show-arrows="hover" cycle height="300">
      <v-carousel-item src="https://picsum.photos/1500/1000/?random=1" cover></v-carousel-item>

      <v-carousel-item src="https://picsum.photos/1500/1000/?random=2" cover></v-carousel-item>

      <v-carousel-item src="https://picsum.photos/1500/1000/?random=3" cover></v-carousel-item>
    </v-carousel>
  </v-container>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">小遊戲</v-col>
      <v-col cols="6" class="text-center bg-primary">1</v-col>
      <v-col cols="6" class="text-center">2</v-col>
      <v-col cols="12" class="text-center">MORE</v-col>
    </v-row>
  </v-container>
  <v-parallax src="@/assets/pexels-cottonbro-5722164.jpg" height="800">
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">這是什麼？</h1>
      <h4 class="subheading text-center">
        使用呼吸器模擬練習熟悉介面<br />
        點擊操作小遊戲可以陪你記憶<br />
        建議與指教歡迎使用聯絡<br />
        註冊登入可以儲存練習過的畫面<br />
        如果這個拙作能幫助到你的學習<br />
        是我的榮幸<br />
        你很棒，就快成功了
      </h4>
    </div>
  </v-parallax>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">CONTACT</v-col>
      <v-col cols="12" class="text-center">MORE</v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '首頁'
</route>
