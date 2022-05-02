<template>
  <div class="analysis">
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('totalSales')" total="￥ 189,345">
          <div>
            <mini-area />
          </div>
          <div slot="footer">{{$ta('daily|visits', 'p')}}<span> 123,4</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('visits')" total=" 201 笔">
          <div>
            <mini-area />
          </div>
          <div slot="footer">{{$ta('daily|visits', 'p')}}<span> 123,4</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" :title="$t('operating')" total="49 元">
          <div>
            <mini-progress target="90" percent="78" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer">
            <span style="color: #FF0000;"> <strong>目前余额已低于警戒线，请尽快充值</strong> </span>
          </div>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :loading="loading" style="margin-top: 24px" :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>{{$t('day')}}</a>
              <a>{{$t('week')}}</a>
              <a>{{$t('month')}}</a>
              <a>{{$t('year')}}</a>
            </div>
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" :tab="$t('sales')" key="1">
            <a-row>
              <a-col :xl="116" :lg="112" :md="112" :sm="124" :xs="124">
                <bar :title="$ta('stores|sales|trend', 'p')" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-card :loading="loading" style="margin-top: 24px" :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>{{$t('day')}}</a>
              <a>{{$t('week')}}</a>
              <a>{{$t('month')}}</a>
              <a>{{$t('year')}}</a>
            </div>
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" :tab="$t('visits')" key="1">
            <a-row>
              <a-col :xl="116" :lg="112" :md="112" :sm="124" :xs="124">
                <bar :title="$ta('stores|sales|trend', 'p')" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import ChartCard from '../../../components/card/ChartCard'
import MiniArea from '../../../components/chart/MiniArea'
import MiniProgress from '../../../components/chart/MiniProgress'
import Bar from '../../../components/chart/Bar'

const rankList = []

for (let i = 0; i < 8; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'Analysis',
  i18n: require('./i18n'),
  data () {
    return {
      rankList,
      loading: true
    }
  },
  created() {
    setTimeout(() => this.loading = !this.loading, 1000)
  },
  components: {Bar, MiniProgress, MiniArea, ChartCard}
}
</script>

<style lang="less" scoped>
  .extra-wrap{
    .extra-item{
      display: inline-block;
      margin-right: 24px;
      a:not(:first-child){
        margin-left: 24px;
      }
    }
  }
  @media screen and (max-width: 992px){
    .extra-wrap .extra-item{
      display: none;
    }
  }
  @media screen and (max-width: 576px){
    .extra-wrap{
      display: none;
    }
  }

</style>
