<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header :isHeadroom="false">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">{{title}}</template>
        <template slot="actions"> <a :href="'rule'">{{right_title}}</a></template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <main id="main" class="station-main">
        <div class="banner">
            <p>{{total}}<span class="icon"></span></p>
        </div>
        <div class="grey">

        </div>
        <!--<ul>-->
          <task-list :apiFn="apiFn"
                :pageSize="10"
                :queryData="{'userId':this.$store.state.userInfo.userId}"
          >
            <template slot-scope="{item}">

              <div class="content">
                <h3>{{item.opRemark}}</h3>
                <p>{{item.opTime}}</p>
              </div>
              <span v-if="item.opAmount.indexOf('+') > -1" class="icon">
                {{item.opAmount}}
              </span>
              <span v-else="" class="icon green">
                {{item.opAmount}}
              </span>

            </template>


          </task-list>
          <!--<li v-for="item in datalist">-->
        <!---->
          <!--</li>-->
        <!--</ul>-->
      </main>

    </page-main>

  </page-wrap>
</template>

<script>
  import apiDetail from 'api/user/apiDetail';
  import TaskList from 'component/list/TaskList';
  import store from 'store';
  export default {
    components: {
      TaskList
    },
    data: () => {
      return {
        show: false,
        title: '积分明细',
        right_title: '积分规则',
        datalist:[],
        total:0,
        apiFn:apiDetail
      }
    },
    methods:{
//       apiFn:function () {
//         apiDetail({
//           data: {"userId":this.$store.state.userInfo.userId,"pn":1,"ps":10}
//         }).then(res => {
//           this.datalist = res.list;
//         })
//       }
    },
    created() {
      this.show = true;
      apiDetail({
        "userId":this.$store.state.userInfo.userId,
        "pn":1,
        "ps":10
      }).then(res => {
        this.total = res.balance;
      })
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .actions{
    font-size: 14px!important;
    padding-right: 15px!important;
  }
  #main{
    .banner{
      height: 90px;
      color: #FFFFFF;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("img/detail_banner_bg.png") no-repeat;
      background-size: 100%;
      p{
        font-size: 28px;
        .icon{
          width: 19px;
          height: 19px;
          margin-left: 5px;
          display: inline-block;
          background: url("img/logo.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    ul{
      padding: 0 20px;
      li{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        flex-direction: inherit;
        justify-content: space-between;
        align-items: center;
        padding: 14px 0;
        position: relative;
        @include border-bottom(#e5e5e5);
        .icon{
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
          color: #FF7A38;
          letter-spacing: 0;
        }
        .green{
          color: #42BD13;
        }
        .content{
          h3{
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
          }
          p{
            margin-top: 8px;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
          }
        }
      }
    }
  }
  .grey{
    height: 8px;
    background: #F5F5F5;
  }
  .nodata{
    top: 145px!important;
  }
</style>

