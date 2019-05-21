<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <main id="main" class="station-main">
        <ul>
          <li>
            <div class="content">
              <h3>一、活动时间：2018年12月24日 10:00-19:00</h3>
              <p>1、秒杀活动：活动当天多时段开抢。<br>
                2.超值购：活动时间内可购买。<br>
                3.活动商品数量有限，售完为止。</p>
            </div>
          </li>
          <li>
            <div class="content">
              <h3>二、活动内容：</h3>
              <p>1.注册用户均有参与活动机会。<br>
                2.秒杀商品：同一用户每个商品仅限抢购1次；超值购商品：同一用户每件商品仅限抢购3次。<br>
                （注：使用一个注册账号、同一客户端均为同一用户）</p>
            </div>
          </li>
          <li>
            <div class="content">
              <h3>三、秒杀成功后请及时付款，如在规定时间内未完成支付，则视为用户自动放弃秒杀成功的商品。</h3>
              <p></p>
            </div>
          </li>
          <li>
            <div class="content">
              <h3>四、由于活动期间参与用户量较大，可能造成订单延误发货，请谅解。</h3>
              <p></p>
            </div>
          </li>
          <li>
            <div class="content">
              <h3>五、其他说明：</h3>
              <p>1.禁止使用任何插件、外挂，对于非正常手段参与活动用户，优鲜集有权利取消其活动资格。<br>
                2.如遇不可抗力（包括但不限于重大灾难、活动遭遇严重网络功能等导致不能正常进行的），优鲜集有权取消、修改或暂停本活动。<br>
                3、本活动最终解释权归属优客工场所有。</p>
            </div>
          </li>
        </ul>

      </main>

    </page-main>

  </page-wrap>
</template>

<script>
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '秒杀规则'
      }
    },
    methods:{

    },
    created() {
      this.show = true;
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  #main{
    ul{
      padding: 0 20px;
      li{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        flex-direction: inherit;
        padding: 15px 0;
        .icon{
          display: inline-block;
          font-size: 15px;
          color: #FF7A38;
          letter-spacing: 0;
          margin-right: 10px;
          font-weight: 700;
        }
        .content{
          h3{
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
          }
          p{
            margin-top: 8px;
            font-size: 13px;
            color: #999999;
            letter-spacing: 0;
          }
        }
      }
    }
  }
</style>

