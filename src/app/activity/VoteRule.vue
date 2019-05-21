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
              1.
            </span>
            <div class="content">
              <h3>此投票通道为中国好声音北京海选优客工场专场复活赛投票通道。</h3>
            </div>
          </li>
          <li>
            <span class="icon">
              2.
            </span>
            <div class="content">
              <h3>优鲜集注册会员均可投票。</h3>
            </div>
          </li>
          <li>
            <span class="icon">
              3.
            </span>
            <div class="content">
              <h3>投票时间：2018年11月3日00:00 - 2018年11月6日00:00。</h3>
            </div>
          </li>
          <li>
            <span class="icon">
              4.
            </span>
            <div class="content">
              <h3>每位注册会员每天登录后获得5票，可以投给同一人，也可以投给5个不同的人。</h3>
            </div>
          </li>
          <li>
            <span class="icon">
              5.
            </span>
            <div class="content">
              <h3>优鲜集内投票前十名，可参加复活赛。</h3>
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
        title: '投票规则'
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
    padding: 10px 20px;
  li{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-direction: inherit;
    padding: 15px 0;
  .icon{
    display: inline-block;
    font-size: 15px;
    /*color: #FF7A38;*/
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
