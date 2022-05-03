<template>
  <a-card title="查询订单">
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-alert type="warning" message="仅保存最近1年交易订单"></a-alert>
          </a-row>
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="APP_ID"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input placeholder="请输入APP_ID" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="订单号"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input placeholder="请输入订单号" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="商户订单号"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input placeholder="请输入商户订单号" />
            </a-form-item>
          </a-col>
        </a-row>
          <a-row v-if="advanced">
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="起始日期"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-date-picker style="width: 100%" placeholder="请输入查询起始日期" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="截止日期"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-date-picker style="width: 100%" placeholder="请输入截止起始日期" />
            </a-form-item>
          </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <span style="margin-top:5px;"> 
        <strong> 手续费总金额：2324.31 </strong>
      </span>
      <span style="float: right; margin-top: 3px;">
          <a-button type="primary">导出查询结果至Excel</a-button>
      </span>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="channel" slot-scope="{record}">
          <a-row>
            支付通道: <a-tag color="blue">微信支付WAP</a-tag>
          </a-row>
          <a-row>
            交易时间: {{record.createTime}}
          </a-row>
          <a-row>
            交易号: {{record.paySn}}
          </a-row>
        </div>
         <div slot="status" slot-scope="{text}">
          <a-tag color="green">{{text}}</a-tag>
        </div>
        <div slot="action">
          <a style="margin-right: 8px">
            <a-button type="danger"> 退款</a-button>
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
const columns = [
  {
    title: '订单号',
    dataIndex: 'sn'
  },
  {
    title: '商户订单号',
    dataIndex: 'merchantSn'
  },
  {
    title: 'APP',
    dataIndex: 'appName'
  },
  {
    title: '订单标题',
    dataIndex: 'orderTitle'
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    customRender: (text) => '￥' + text 
  },
  {
    title: '订单时间',
    dataIndex: 'createTime'
  },
  {
    title: '手续费金额',
    dataIndex: 'fee',
    customRender: (text) => '￥' + text 
  }
]

const dataSource = []

for (let i = 0; i < 100; i++) {
  dataSource.push({
    sn: Math.floor(Math.random() * 10000000000),
    merchantSn: 'MERCHANT_NO_ ' + Math.floor(Math.random() * 10000000000),
    appName: 'TEST_APP',
    orderTitle: 'ORDER'+Math.floor(Math.random() * 10000000000),
    amount: (Math.floor(Math.random() * 10000)*0.1).toFixed(2),
    createTime: '2022-04-25 15:12:13',
    status:'已支付',
    paySn:Math.floor(Math.random() * 10000000000000),
    fee: (Math.floor(Math.random() * 1000)*0.02).toFixed(2)
  })
}

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: []
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26'
      })
    },
    handleMenuClick (e) {
      if (e.key === 'delete') {
        this.remove()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
