<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <Loader v-if="loading" />
      <div class="row" v-else-if="record">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red': record.type === 'income',
              'green': record.type === 'outcome',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.categoryName }}</p>
              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
      <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
  name: 'Details',
  data: () => ({
    record: {},
    loading: true
  }),
  async mounted () {
    const record = await this.$store.dispatch('fetchOneRecord', this.$route.params.id)
    this.record = {
      ...record,
      categoryName: (await this.$store.dispatch('fetchCategory', record.categoryId)).title
    }
    this.loading = false
  }
}
</script>
