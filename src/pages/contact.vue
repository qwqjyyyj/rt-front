<template>
  <v-parallax src="@/assets/pexels-pixabay-40568.jpg" height="650">
    <div class="d-flex flex-column fill-height justify-end align-center text-white">
      <h1 style="font-size: 180px; opacity: 0.7; padding: 30px">Contact</h1>
    </div>
  </v-parallax>
  <v-cotainer>
    <v-row justify="center">
      <v-col cols="12" class="mt-13 mb-10">
        <h1 class="text-center">建議&nbsp;/&nbsp;報錯&nbsp;/&nbsp;其他</h1>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row justify="center" style="height: 600px">
      <v-col cols="6" align-self="center">
        <v-form>
          <v-text-field label="暱稱" class="mb-5"></v-text-field>
          <v-textarea label="留言" class="mb-8"></v-textarea>
          <div class="text-center">
            <v-btn type="submit" color="white" height="50" width="80">送出</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-cotainer>
</template>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: '聯絡'
</route>
