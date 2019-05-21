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
            <span class="icon">
              Q
            </span>
            <div class="content">
              <h3>什么是积分？</h3>
              <p>积分是优鲜集推出的一种专属虚拟货币。</p>
            </div>
          </li>
          <li>
            <span class="icon">
              Q
            </span>
            <div class="content">
              <h3>积分可以干什么？</h3>
              <p>积分可以在客户端的积分商城中兑换商品或参与抽奖（暂未开放，敬请期待）。</p>
            </div>
          </li>
          <li>
            <span class="icon">
              Q
            </span>
            <div class="content">
              <h3>如何获得积分？</h3>
              <p>你可以通过签到、完成任务来获得积分，更多的积分任务将陆续上线，敬请期待。</p>
            </div>
          </li>
          <li>
            <span class="icon">
              Q
            </span>
            <div class="content">
              <h3>积分有多长时间的有效期？</h3>
              <p>积分是优鲜集提供的一种福利，暂时不存在有效期。</p>
            </div>
          </li>
          <li>
            <span class="icon">
              Q
            </span>
            <div class="content">
              <h3>我会进行反作弊</h3>
              <p>为保证所有用户的正当权益，我们会严厉打击违规作为。</p>
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
        title: '积分规则'
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

<style lang="scss">
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
