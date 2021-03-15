<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Следующая'"
        :next-text="'Предыдущая'"
        :container-class="'pagination'"
        :page-class="'waves-effect'">>
      </Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import Loader from '../components/app/Loader.vue'
import paginationMixin from '@/mixins/paginations.mixin'
import { Pie } from 'vue-chartjs'
export default {
  name: 'history',
  mixins: [paginationMixin],
  extends: Pie,
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecord')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  },
  methods: {
    setup (categories) {
      let num = 1
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          number: num++,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: '# of Votes',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  components: {
    HistoryTable,
    Loader
  }
}
</script>
