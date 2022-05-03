<template>
  <a-card>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary" icon="plus">申请支付通道</a-button>

        <router-link to="/dashboard">
                <h1 style="color:#3eaf7c">《PANDA PAY 个人支付签约要求》</h1>
        </router-link>  
      </a-space>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="appid_appsecret" slot-scope="{record}">
            <a-row>
                APP_ID: <a-tag color="green">{{record.appid}}</a-Tag> 
                <a style="margin-right: 8px">
                    <a-icon type="delete"/>删除
                </a>
            </a-row>
            <a-row>
                APP_SECRET: <a-tag color="red">{{record.appsecret}}</a-tag>
                <a-button>重置密钥</a-button>
            </a-row>
            <a-row>
                支付网关: https://api.pandapay.com/pay/do
            </a-row>
        </div>
        <div slot="shop" slot-scope="{record}">
            <a-row>
                {{record.shopName}}
            </a-row>
            <a-row>
               <a href="#"> {{record.shopHost}}</a>
            </a-row>
             <a-row>
               申请编号: <a-tag color="gray">{{record.requestSn}}</a-tag>
            </a-row>
        </div>
        <div slot="channel" slot-scope="{record}">
            <a-row>
                {{record.channelName}}
            </a-row>
            <a-row>
                费率: <a-tag color="blue">{{record.rate}}</a-tag>
            </a-row>
             <a-row>
               商户号: <a-tag color="blue">{{record.merchantSn}}</a-tag>
            </a-row>
        </div>
        <div slot="action" slot-scope="{text, record}">
        <a-row>
          <a style="margin-right: 8px">
            <a-icon type="eye"/>查看
          </a>
          <a style="margin-right: 8px">
            <a-icon type="money-collect"/>支付测试
          </a>
          <a @click="deleteRecord(record.key)">
            <a-icon type="qrcode" />生成收款二维码
          </a>
          </a-row>
          <a-row>
          <a @click="deleteRecord(record.key)" >
            <a-icon type="pay-circle" />提现
          </a>
          <a @click="deleteRecord(record.key)">
            <a-icon type="account-book" />提现记录
          </a>
          </a-row>
        </div>
        <div slot="progress" slot-scope="{record}">
            <a-steps :current="record.progressStep" :status="record.progressStatus" direction="vertical" size="small">
                <a-step>
                <template #title><a href="#">提交资料</a></template>
                <template #description>
                    <span>申请样例</span>
                </template>
                </a-step>
                <a-step title="本站管理员初审" description="如有问题请发邮件至support@pandapay.com" />
                <a-step title="支付通道官方审核" :description="record.auditError" />
                <a-step title="签约成功" />
            </a-steps>
        </div>
      </standard-table>
    </div>   
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
const columns = [
  {
    title: 'AppId/AppSecret',
    dataIndex: 'appid',
    scopedSlots: { customRender: 'appid_appsecret' },
    needTotal: true,
    needTotalList: true
  },
  {
    title: '店铺',
    dataIndex: 'shop',
    scopedSlots: { customRender: 'shop' }
  },
  {
    title: '支付通道',
    dataIndex: 'channel',
    scopedSlots: { customRender: 'channel' }
  },
  {
    title: '签约状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'progress' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const dataSource = []


dataSource.push({
    key: 1,
    appid: '202204145253',
    appsecret: '7721sdfsdjj12312j12hj3h1j23hj12h3j96a6b5',
    shopName: '王先生测试店铺',
    shopHost: 'https://youtube.com/alipay',
    requestSn: "2000002122480155521",
    channelName: "支付宝V2当面付",
    rate:"2%",
    merchantSn: "null",
    progressStep:2,
    progressStatus: "error",
    auditError:"门店门头照不符合要求"
});
dataSource.push({
    key: 1,
    appid: '2022051255251',
    appsecret: '34893j43kdfsdjj12312j12hj3h1j23sdfkjkj342k3b5',
    shopName: '王先生测试店铺',
    shopHost: 'https://youtube.com/wechat',
    requestSn: "30009832822480232124",
    channelName: "微信支付WAP",
    rate:"2%",
    merchantSn: "1547192923747",
    progressStep:4,
    progressStatus: "finish",
    auditError:""
});

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
