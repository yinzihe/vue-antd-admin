<template>
  <div>
    <a-card title="账户信息">
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 14 }">
        <a-form-item label="账户余额:" name="balance">
          <span class="balance"> <strong> 490.13 </strong></span>
          <a-button type="primary"> 立即充值 </a-button>
          <span class="balance-desc">(请确保余额充足，欠费将无法发起支付)</span>
        </a-form-item>
        <a-form-item label="余额报警阈值:" name="theadhold">
          <strong style="font-size: 14px"> </strong>
          <a-input value="50" prefix="￥" suffix="RMB" style="width: 100px" />
          <span class="balance-desc"
            >(当余额低于此额度时会发送报警邮件通知，该阈值默认为10元)</span
          >
        </a-form-item>
        <a-form-item label="自动提现:" name="autopayroll">
          <a-switch
            checked="true"
            checked-children="开"
            un-checked-children="关"
          />
        </a-form-item>
      </a-form>
      <span style="float: right; margin-top: 3px">
        <a-button type="primary">保存</a-button>
        <a-button style="margin-left: 8px">重置</a-button>
      </span>
    </a-card>
    <a-card title="基本信息">
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 14 }">
        <a-form-item label="邮箱地址:">
          <a-input placeholder="test_email@126.com" disabled="true" />
        </a-form-item>
        <a-form-item label="头像">
          <img src="@/assets/img/avatar.jpg" />
          <p>
            <a-button> 更换头像 </a-button>
          </p>
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password value="sfdsfdsfdsfsd123" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="再次输入密码">
          <a-input-password value="" placeholder="不修改密码，可不填写" />
        </a-form-item>
        <a-form-item label="联系方式">
          <a-input value="" placeholder="请输入电话或微信号" />
        </a-form-item>
        <a-form-item label="订阅微信通知">
          <img src="@/assets/img/panda-qrcode.png" width="150px;" />
          <p style="font-size: 12px">
            关注PANDAY PAY微信公众号获取订单通知消息
          </p>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>


<script>
</script>

<style lang="less" scoped>
.balance {
  color: @orange-4;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 18px;
}
.balance-desc {
  color: @red-4;
  margin-left: 15px;
}
</style>