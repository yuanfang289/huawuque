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
          <div class="title">
            <h2>优客工场经营者资质信息公示</h2>
            <p>根据国家相关政策要求对经营者资质信息公示如下</p>
          </div>
          <div class="content">
            <a v-for="item in list" :href="item.url">
              <p>
                <span>{{item.name}}</span>
                <i class="uricon-arrow-right"></i>
              </p>
            </a>
          </div>
        </ul>
        <!--<div class='p'>-->
          <!--客户服务热线：[ <a href="tel:400-1188-891">400-1188-891</a> ]<br>-->
          <!--服务网站：[ <a href="https://www.ucommune.com/">https://www.ucommune.com/</a> ]-->
        <!--</div>-->
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
        title: '经营证照',
        list:[
          {name:'优客工场（北京）创业投资有限公司',url:'/v2/license/img'},
            ]
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
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .uricon-arrow-right{
    color: #999999;
    font-size: 12px;
  }
  #main{
    ul{
      .title{
        height: 120px;
        background: #F9F8F6;
        text-align: center;
        h2{
          font-size: 22px;
          padding-top: 32px;
        }
        p{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
        }
      }
      .content{
        padding: 0 25px;
        p{
          height: 50px;
          line-height: 50px;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          /*text-indent: 2em;*/
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          @include border-bottom(#e5e5e5);
          span{
          }
        }
        a{
          &:last-of-type{
            p{
              @include border-bottom(#ffffff);
            }
          }
        }
      }
    }
    >.p{
      text-align: center;
      padding: 10px;
      a{
        color: #2c67b2;
      }
    }
  }
</style>
