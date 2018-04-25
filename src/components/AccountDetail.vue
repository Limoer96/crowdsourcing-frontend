<template>
  <div class="container">
    <van-nav-bar
      title="收支明细"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <Loading v-if="!data && !error"/>
    <Erro v-if="error"/>
    <div class="body">
      <van-cell-group v-if="data && data.length > 0">
        <van-cell 
          v-for="(record, index) in data"
          :key="index"
          is-link
          :title="mapTypes[record.type-1]"
          :value="plusOrdel(record.type) + (record.offset*record.count)"
          :label="new Date(record.date).toLocaleString()"
        />
      </van-cell-group>
      <p v-else>暂无收支记录</p>
    </div>
  </div>
</template>

<script>
import account from '../api/account';
import Loading from './sections/Loading';
import Erro from './sections/Error';

export default {
  name: 'AccountDetail',
  data() {
    return {
      data: null,
      error: false,
      mapTypes: ['任务支付', '用户确认支付', '任务退款', '任务点充值', '任务点提现']
    }
  },
  mounted () {
    // api
    account.getAccountDetail().then((json => {
      this.data = json.data;
    })).catch(err => {
      this.error = true;
    })
  },
  methods: {
    plusOrdel(type) {
      if(type === 1 || type=== 2 || type===5) {
        return '-'
      }else {
        return '+'
      }
    }
  },
  components: {
    Loading,
    Erro
  }
}
</script>

<style scoped>

</style>
