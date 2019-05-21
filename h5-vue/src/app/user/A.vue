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
          <h2>{{question.split('.')[1]}}</h2>
          <li>
            <!--<span class="icon">-->
              <!--A-->
            <!--</span>-->
            <div class="content" v-html="ask">
              <!--<p>{{ask}}</p>-->
            </div>

          </li>
        </ul>
        <div class="phone">
           <p>没找到相关问题？<a href="tel:4001188891">联系客服</a></p>
        </div>
      </main>

    </page-main>

  </page-wrap>
</template>

<script>
  import apiGetJson from 'api/user/apiGetJson';
  export default {
    components: {
    },
    data: () => {
      return {
        show: false,
        title: '会员帮助中心',
        code: '1-1',
        list:'',
        question:'',
        ask:'答案更新中....'
      }
    },
    methods:{
      getMydata:function () {
        apiGetJson().then(res => {
          this.list = res.data;
          this.list.map( (obj,idx) => {
              if(this.code.split('-')[0] == obj.id){
                  obj.list.map( (obj,idx) => {
                     obj.code == this.code ? this.ask = obj.answer  :  '';
                     obj.code == this.code ? this.question = obj.ask  :  '';
                  })
              }
          })
          this.show = true;
        });
      },
    },
    created() {
        this.code = this.$route.query.code;
        this.getMydata();
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  #main{
    min-height: 85vh;
    position: relative;
    ul{
      padding: 0 20px;
      h2{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
        text-align: left;
        margin-top: 30px;
        font-weight: 600;
        padding-left: 32px;
        position: relative;
        &::before{
          content: 'Q：';
          display: inline-block;
          color:  #436EFF;
          position: absolute;
          left: 0;
          font-size: 15px;
        }
      }
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
          p{
            /*text-indent: 2em;*/
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            text-align: justify;
            line-height: 22px;
            padding-left: 32px;
            word-break:break-all;
            &:nth-of-type(1){
              &::before{
                content: 'A：';
                display: inline-block;
                color:  #436EFF;
                position: absolute;
                left: 20px;
                font-size: 15px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
    .phone{
      width: 100%;
      height: 60px;
      background: #ffffff;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      -ms-transform: translate(-50%,0);
      -webkit-transform: translate(-50%,0);
      -o-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
     p{
       height: 100%;
       line-height: 60px;
       a{
         font-family: PingFangSC-Regular;
         font-size: 14px;
         color: #436EFF;
         letter-spacing: 0;
         text-align: left;
         line-height: 40px;
       }
     }
    }
    .barcode{
      width: 100%;
      text-align: center;
    }
  }
</style>


