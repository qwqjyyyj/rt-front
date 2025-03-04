<template>
  <!-- 圖表 -->
  <v-container>
    <v-card>
      <v-card-title class="text-center"><h3>呼吸器波形</h3></v-card-title>
      <v-card-text>
        <div ref="chart" class="chart-container" style="text-align: center"></div>
        <v-row justify="center" style="margin-top: 4px">
          <v-col cols="7" style="padding: 0px; height: 55px">
            <v-slider v-model="amplitude" min="0" max="50" step="1" label="PRESSURE(cmH2O)">
              <template #append>
                <v-text-field
                  v-model="amplitude"
                  type="number"
                  style="width: 70px"
                  dense
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row justify="center" style="margin-top: 18px">
          <v-col cols="7" style="padding: 0px; height: 55px">
            <v-slider v-model="wavelength" min="0" max="10" step="0.1" label="Ti(sec.)">
              <template #append>
                <v-text-field
                  v-model="wavelength"
                  type="number"
                  style="width: 70px"
                  dense
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row justify="center" style="margin-top: 18px">
          <v-col cols="7" style="padding: 0px; height: 55px">
            <v-slider v-model="offset" min="0" max="20" step="1" label="PEEP(cmH2O)">
              <template #append>
                <v-text-field
                  v-model="offset"
                  type="number"
                  style="width: 70px"
                  dense
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row justify="center" style="margin-top: 25px">
          <v-btn color="primary" @click="toggleAnimation">{{ isPaused ? '開始' : '暫停' }}</v-btn>
          <v-btn color="secondary" style="margin-left: 10px" @click="resetSliders">重設</v-btn>
          <v-btn color="grey" style="margin-left: 10px" @click="openDialog(null)">{{
            '新增設定'
          }}</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <!-- 設定儲存區 -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">{{ '設定紀錄' }}</h2>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="PressureSettings" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                veriant="underlined"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <!-- 新增視窗 -->
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ dialog.id ? '編輯設定' : '新增設定' }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="'名稱'"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="pressure.value.value"
            :label="'pressure'"
            :error-messages="pressure.errorMessage.value"
            type="number"
            min="0"
            max="50"
          ></v-text-field>
          <v-text-field
            v-model="ti.value.value"
            :label="'吸氣時間'"
            :error-messages="ti.errorMessage.value"
            type="number"
            min="0"
            max="10"
            step="0.1"
          ></v-text-field>
          <v-text-field
            v-model="PEEP.value.value"
            :label="'PEEP'"
            :error-messages="PEEP.errorMessage.value"
            type="number"
            min="0"
            max="20"
          ></v-text-field>
          <v-textarea
            v-model="description.value.value"
            :label="'說明'"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ '取消' }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ '送出' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import * as d3 from 'd3'
import { ref, onMounted, watch, onBeforeUnmount, reactive, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// 圖表
// 定義初始數值
const initialValues = {
  amplitude: 30,
  wavelength: 2,
  offset: 0,
}

// 響應式變數
const chart = ref(null)
const amplitude = ref(initialValues.amplitude)
const wavelength = ref(initialValues.wavelength)
const offset = ref(initialValues.offset)
const isPaused = ref(false)

// 定義 D3.js 變數
let svg, xScale, yScale, line, path, data, xAxis
const width = 600
const height = 300
const margin = { top: 20, right: 20, bottom: 40, left: 50 }
const duration = 50
let time = 0
let animationFrame

// 初始化 D3.js 圖表
function initChart() {
  svg = d3
    .select(chart.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // 設定 X、Y 軸比例尺
  xScale = d3.scaleLinear().domain([0, 10]).range([0, width])
  yScale = d3.scaleLinear().domain([-50, 70]).range([height, 0])

  // 添加 Y 軸
  svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale))

  // 添加 X 軸短刻度
  xAxis = svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickValues(d3.range(0, 11, 1))
        .tickSize(-5)
        .tickFormat(''),
    )

  // 添加基準線
  svg
    .append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0))
    .attr('stroke', 'black')
    .attr('stroke-width', 1)

  // 設定波形繪製方式
  line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y + offset.value))
    .curve(d3.curveBasis)

  // 初始化波形數據
  data = d3.range(101).map((i) => ({ x: i * (10 / 100), y: 0 }))
  path = svg
    .append('path')
    .datum(data)
    .attr('class', 'wave')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)

  animateWave()
}

// 動畫函數
function animateWave() {
  if (isPaused.value) return
  time += duration / 1000

  data.forEach((d, i) => {
    d.x = time - (100 - i) * (10 / 100)
    d.y = amplitude.value * Math.sin((d.x * 2 * Math.PI) / wavelength.value)
  })

  // 更新 X 軸範圍並渲染波形
  xScale.domain([time - 10, time])
  path.datum(data).attr('d', line)

  // 更新 X 軸刻度
  xAxis.call(
    d3
      .axisBottom(xScale)
      .tickValues(d3.range(Math.floor(time) - 9, Math.floor(time) + 1, 1))
      .tickSize(-5)
      .tickFormat(''),
  )

  animationFrame = setTimeout(animateWave, duration)
}

// 切換動畫播放/暫停
function toggleAnimation() {
  isPaused.value = !isPaused.value
  if (!isPaused.value) animateWave()
}

// **重設拉霸值**
function resetSliders() {
  amplitude.value = initialValues.amplitude
  wavelength.value = initialValues.wavelength
  offset.value = initialValues.offset
}

// 生命週期函式
onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  clearTimeout(animationFrame) // 清除動畫
})

// 監聽數據變化，更新波形
watch([amplitude, wavelength, offset], () => {
  path.datum(data).attr('d', line)
})

// 設定紀錄
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const PressureSettings = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: '名稱', key: 'name', sortable: true },
    { title: 'Pressure', key: 'pressure', sortable: true },
    { title: 'Ti', key: 'ti', sortable: true },
    { title: 'PEEP', key: 'PEEP', sortable: true },
    { title: '說明', key: 'description', sortable: true },
    { title: '建立時間', key: 'createdAt', sortable: true },
    { title: '更新時間', key: 'updatedAt', sortable: true },
    { title: '編輯', key: 'edit', sortable: false },
  ]
})

const getPressureSettings = async () => {
  try {
    const { data } = await apiAuth.get('/PressureSetting/all')
    PressureSettings.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || 'unknownError',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
getPressureSettings()

const dialog = ref({
  open: false,
  id: '',
})
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    pressure.value.value = item.pressure
    ti.value.value = item.ti
    PEEP.value.value = item.PEEP
    description.value.value = item.description
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
}

const schema = yup.object({
  name: yup.string().required('名稱必填'),
  pressure: yup
    .number()
    .typeError('pressure必填')
    .required('pressure必填')
    .min(0, 'pressure需>=0')
    .max(50, 'pressure值需<=50'),
  ti: yup.number().typeError('ti必填').required('ti必填').min(0, 'ti需>=0').max(10, 'ti需<=10'),
  PEEP: yup
    .number()
    .typeError('PEEP必填')
    .required('PEEP必填')
    .min(0, 'PEEP需>=0')
    .max(20, 'PEEP需<=20'),
  description: yup.string().required('說明必填'),
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    pressure: 30,
    ti: 2,
    PEEP: 0,
    description: '',
  },
})
const name = useField('name')
const pressure = useField('pressure')
const ti = useField('ti')
const PEEP = useField('PEEP')
const description = useField('description')

const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('pressure', values.pressure)
    fd.append('ti', values.ti)
    fd.append('PEEP', values.PEEP)
    fd.append('description', values.description)

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/PressureSetting/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/PressureSetting', fd)
    }

    PressureSettings.splice(0, PressureSettings.length)
    getPressureSettings()
    createSnackbar({
      text: dialog.value.id.length > 0 ? '編輯成功' : '新增成功',
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || 'unknownError',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<style>
.chart-container {
  width: 100%;
  height: 320px;
}
</style>

<route lang="yaml">
meta:
  login: true
  admin: false
  title: '呼吸器模擬介面'
</route>
