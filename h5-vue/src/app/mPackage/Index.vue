<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :hideNativeTitleBar="true" :nativeBack="true" :type="'back'" :nativeStatusBarStyle=1>
        <template slot="title">{{title}}</template>
        <template  slot="actions"> <a v-if="isApp" href="javascript:void(0)" @click="sharePage()"></a></template>
      </topbar>
    </page-header>

    <page-main :show="show">

      <div class="content">
        <div class="top-banner">
          <div class="title">优客工场会员专享</div>
          <div class="desc">多重会员权益，开启高效办公时代！</div>
        </div>

        <div class="p-list">
          <template v-for="item in data">
        <div class="m-package">
          <div class="title-m-package">
            <p class="m-package-p">
              <span class="m-package-icon"></span> <span class="m-package-txt">{{item.spuName}}<!--优鲜集超惠-新手尝鲜包--></span>
            </p>
          </div>

          <div class="dividers"></div>

          <template v-for="item1 in item.listSku">
          <div @click="toDetail(item1.id,item1.spuId)" class="detail-m-package">
            <div class="left">
              <div class="name">
                <div>{{item1.skuName}}<!--尝鲜套餐--></div>
                <div class="price">
                  <span class="p-txt">体验价</span>
                  <span class="p-nums">¥{{item1.price}}</span>
                </div>
              </div>
              <div class="p-line"></div>
              <ul class="rights">
                <template v-for="desc in item1.des_arr">
                <li>{{desc}}</li>
                </template>
              </ul>
            </div>
            <div class="right">
            <img :src="item1.rightsImage==null?1:item1.rightsImage" onerror="this.src='https://assets.urwork.cn/image/mpackage/pimg.png'">
            </div>
          </div>
          </template>
        </div>
          </template>
        </div>
        <template v-if="data.length==0"> <no-data><slot name="nodata">暂无可以购买的商品</slot></no-data></template>
      </div>
      <div class="to-list" @click="toOrderList"></div>
      <div class="form" v-html="form"></div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import store from 'store';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {passport} from 'src/globalData';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiPackageList from 'api/mPackage/apiPackageList';
  import NoData from 'component/nodata/NoData';
  export default {
    components: {
      NoData
    },
    data: () => {
      return {
        show: false,
        title: '会员服务',
        dialog: false,
        isApp:isApp(),
        rid:'',
        rName:'',
        data: [],
        payment: 1,              // 支付方式 3  微信   1支付宝
        channel: 4,            // 渠道
        form: '<form></form>', //form表单
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
    },
    methods: {
      toDetail(skuId,spuId){

        let toUrl='/v2/mPackage/detail?skuId='+spuId+"_"+skuId;
        if(this.rid&&this.rName){
          toUrl='/v2/mPackage/detail?skuId='+spuId+"_"+skuId+"_0_"+this.rid+"_"+this.rName;
        }
        if(isApp()) {
          let url = getLocation().origin + toUrl;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(toUrl);
        }
      },
      toOrderList(){
        this.$router.push('/v2/mPackage/OrderList');
      },
      sharePage(){
        let _this = this;
        let url = getLocation().origin + '/v2/mPackage/list?user='+this.$store.state.userInfo.userId+'_'+encodeURIComponent(this.$store.state.userInfo.realName);
        this.$DANativeApi.share({
          title: "优客工场会员礼包",
          desc: "会员权益重磅升级，优客工场会员专享",
          url: url,
          imgUrl: 'https://assets.urwork.cn/image/mpackage/share_icon.jpg',
          completion: function (res) {
            //app 分享成功之后的回调！！
          }
        });
      }
    },
    created(){
      if(!this.isLogin){
        passport.toLogin();
      }
      if(this.$route.query.user){
        let user_arr= this.$route.query.user.split("_");
        this.rid=user_arr[0];
        this.rName=user_arr[1];
      }
      apiPackageList().then(res=>{
          if(res.retCode===0){
              let data=res.data;
              data.map((item,index)=>{
                let listSku=item.listSku;
                  for(let i=0;i<listSku.length;i++){
                    let description=listSku[i].description;
                    let arr=description.split(',');
                    arr=arr.slice(0,3);
                    listSku[i].des_arr=arr;
                  }
                  item.listSku=listSku;
                return item;

              });
           this.data=res.data;
            this.show = true;
          }else{
            this.show = true;
          }
      });
    },
    mounted(){

    },

  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .page-topbar .actions{
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding-bottom: 3px;
    padding-right: 15px;
    font-size: 18px;
    text-align: center;
    line-height: 34px;
    a{
      width: 17px;
      height: 17px;
      background: url("https://assets.urwork.cn/image/mpackage/share-icon.png") no-repeat;
      background-size: 100%;
      display: inline-block;
    }
  }
  .content {
    position: relative;
    height: 100%;
    $font-p-m: PingFangSC-Medium;
    $font-p-r: PingFangSC-Regular;

    .top-banner {
      height: 3.11rem;
      width: 7.5rem;
      overflow: hidden;
      background: url("https://assets.urwork.cn/image/mpackage/bac.png") no-repeat;
      background-size: 100% 100%;
      .title {
        height: 0.71rem;
        font-family: JCuYuan;
        font-size: 30px;
        color: #333333;
        //font-weight: bold;
        text-align: center;
        line-height: 0.71rem;
        margin-top: 0.56rem;
      }
      .desc {
        height: 0.4rem;
        padding-left: 0.18rem;
        font-family: $font-p-r;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 0.4rem;
        margin-top: 0.1rem;
      }
    }

    .p-list{
      position: absolute;
      top: 2.34rem;
      padding-bottom: 1.22rem;

    }
    .m-package {
      /*height: 100%;*/
      width: 6.90rem;
      margin-left: 0.3rem;
      padding-bottom: 0.5rem;
      padding-top: 0.40rem;
      margin-bottom: 0.4rem;
      background: #FFFFFF;
      box-shadow: 0 0 20px 0 rgba(219, 219, 219, 0.50);
      border-radius: 5px;

      .title-m-package {
        height: 0.48rem;
        margin-left: 0.30rem;
        margin-right: 0.30rem;
        font-family: $font-p-m;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        font-weight: bold;
        .m-package-p{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp:2;
          /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          .m-package-txt{

          }
        }
        .m-package-icon {
          display: inline-block;
          height: 0.3rem;
          width: 0.3rem;
          background: url("https://assets.urwork.cn/image/mpackage/package-m.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .desc-m-package {
        font-family: $font-p-r;
        font-size: 12px;
        color: #666666;
        height: 0.33rem;
        line-height: 0.33rem;
        margin-left: 0.7rem;
        margin-top: 0.06rem;
      }

      .dividers {
        width: 6.3rem;
        height:0.10rem;
        margin-top: 0.14rem;
        margin-left: 0.3rem;
        position: relative;
        @include border-bottom(#C2C2C2,20,dashed);
      }

      .detail-m-package {
        width: 6.30rem;
        height: 3.6rem;
        margin-top: 0.4rem;
        margin-left: 0.3rem;
        background: #F7F5F1;
        border-radius: 5px;
        .left {
          float: left;
          padding-top: 0.5rem;
          padding-left: 0.4rem;
          width: 3.5rem;
          font-family: $font-p-m;
          .name {
            font-size: 22px;
            color: #333333;
            font-weight: bold;
          }
          .price {
            font-size: 17px;
            color: #333333;

            .p-txt {
              font-family: $font-p-r;
              font-size: 12px;
              color: #333333;
            }
            .p-nums {
              font-family: $font-p-r;
              font-size: 15px;
              color: #333333;
            }
          }
          .p-line {
            position: relative;
            width: 2.14rem;
            height: 0.3rem;
            @include border-bottom(#EFE2C8);
            //margin-top: 0.3rem;
            //background: #EFE2C8;
          }
          .rights {
            margin-top: 0.3rem;
            font-family: $font-p-r;
            font-size: 11px;
            color: #666666;
            li {
              position: relative;
              padding-left: 0.2rem;
              padding-right: 0.2rem;
              height: 0.36rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 3px;
                margin-right: 5px;
                background-color: #999999;
                border-radius: 50%;
                position: absolute;
                top: 40%;
                left: 0;
              }
            }
          }
        }
        .right {
          float: left;
          width: 2.6rem;
          height: 3.2rem;
          //background: url("https://assets.urwork.cn/image/mpackage/pimg.png") no-repeat;
          //background-size: 100% 100%;
          margin-top: 0.2rem;
          //margin-left: 0.96rem;
          border-radius: 5px;
          img{
            width: 100%;
            height:100%;
          }
        }
      }
    }
    .all-list {

    }
  }
  .to-list{
    position: fixed;
    width: 1.68rem;
    height: 1.62rem;
    background: url("https://assets.urwork.cn/image/mpackage/Group.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    bottom: 1.8rem;
    z-index: 1000;
  }
</style>


