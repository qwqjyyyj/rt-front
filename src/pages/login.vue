<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">登入</h1>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row justify="center" style="height: 500px">
      <v-col cols="6" align-self="center">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            label="帳號"
            minlength="4"
            maxlength="20"
            counter
            class="mb-2"
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            label="密碼"
            minlength="4"
            maxlength="20"
            counter
            class="mb-5"
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="white" height="40">登入</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    .string()
    .required('必填')
    .min(4, '最少4個字')
    .max(20, '最多20個字')
    .test('isAlphanumeric', '使用者帳號格式不正確', (value) => validator.isAlphanumeric(value)),
  password: yup.string().required('必填').min(4, '密碼太短').max(20, '密碼太長'),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/')
  } catch (error) {
    console.log(error)
    createSnackbar({
      // text: t('api.' + (error?.response?.data?.message || 'unknownError')) 改寫如下嗎?
      text: error?.response?.data.message || 'unknownError',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<route lang="yaml">
meta:
  title: '登入'
</route>
