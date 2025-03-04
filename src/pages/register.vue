<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center">註冊</h1>
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
            class="mb-1"
          />
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="信箱"
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            label="密碼"
            minlength="4"
            maxlength="20"
            counter
          />
          <v-text-field
            v-model="passwordConfirm.value.value"
            type="password"
            :error-messages="passwordConfirm.errorMessage.value"
            label="確認密碼"
            minlength="4"
            maxlength="20"
            counter
            class="mb-5"
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="white">註冊</v-btn>
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

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

const schema = yup.object({
  account: yup
    .string()
    .required('必填')
    .min(4, '最少4個字')
    .max(20, '最多20個字')
    .test('isAlphanumeric', '使用者帳號格式不正確', (value) => validator.isAlphanumeric(value)),
  email: yup
    .string()
    .required('必填')
    .test('isEmail', '使用者信箱格式不正確', (value) => validator.isEmail(value)),
  password: yup.string().required('必填').min(4, '密碼太短').max(20, '密碼太長'),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], '密碼不符'),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password,
    })
    createSnackbar({
      text: '註冊成功',
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/login')
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
  title: '註冊'
</route>
