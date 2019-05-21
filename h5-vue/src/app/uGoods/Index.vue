<template>
  <page-wrap
    :hasDownloadBar="false"
  >
    <div v-title>{{title}}</div>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="slide-wrap">
        <Swiper :bannerList="bannerList" :paddingTop="55.970" :column="1" :transformScale="true">
        </Swiper>
      </div>
      <div class="search">
        <input placeholder="物超所值，任我选择" @click="search()">
        <span class="search_icon">

</span>
      </div>
      <div class="main-icon-wrapper">
        <icon-list :iconList="iconListOne" :imgWidth="26">
        </icon-list>
        <div class="last-icon-list">
          <icon-list :iconList="iconListTwo" :imgWidth="26">
          </icon-list>
        </div>
      </div>
      <ad-banner v-if="ad1" :bannerList="ad1"></ad-banner>
      <div class="goods-list-item-wrapper">
        <div class="quailty-title-wrapper">
          <SubTitle title="人气推荐" :asideShow="false"></SubTitle>
        </div>
        <ul>
          <li class="goods-list-item" v-for="item in recommendUGift" :key="item.productId">
            <a :href="'/product/getProduct?spuId='+item.productId">
              <div class="img-wrapper">
                <Img :src="item.mainImg"/>
              </div>
              <div class="goods-text">
                <h2><span class="hot_icon" v-if="item.hotTip">{{item.hotTip}}</span>{{item.name}}</h2>
                <template v-if="item.price == item.marketPrice">
                  <p class="price">
                    <span>￥</span>{{item.marketPrice}}
                  </p>
                </template>
                <template v-else="">
                  <p class="price">
                    <span>￥</span>{{item.price}}
                    <span class="del">￥{{item.marketPrice}}</span>
                  </p>
                </template>
              </div>
            </a>
          </li>
        </ul>
        <!--<a href="/product/getList" class="more-link" >更多 <i class="uricon-arrow-right"></i></a>-->
      </div>
      <ad-banner v-if="ad2" :bannerList="ad2"></ad-banner>
      <div class="goods-list-item-wrapper">
        <div class="quailty-title-wrapper">
          <SubTitle title="新品首发" :asideShow="false"></SubTitle>
        </div>
        <ul>
          <li class="goods-list-item" v-for="item in newProductList" :key="item.productId">
            <a :href="'/product/getProduct?spuId='+item.id">
              <div class="img-wrapper">
                <Img :src="item.mainImg"/>
              </div>
              <div class="goods-text">
                <h2><span class="hot_icon" v-if="item.hotTip">{{item.hotTip}}</span>{{item.name}}</h2>
                <template v-if="item.marketPrice == item.price">
                  <p class="price">
                    <span>￥</span>{{item.marketPrice}}
                  </p>
                </template>
                <template v-else="">
                  <p class="price">
                    <span>￥</span>{{item.price}}
                    <span class="del">￥{{item.marketPrice}}</span>
                  </p>
                </template>
              </div>
            </a>
          </li>

        </ul>
      </div>
      <ad-banner v-if="ad3" :bannerList="ad3"></ad-banner>
      <div class="hot-wrapper" v-if="subjectCarouselList">
        <div class="hot-title-wrapper">
          <SubTitle title="专题精选" :asideShow="false"></SubTitle>
        </div>
        <div class="hot-banner-wrapper">
          <Swiper ref="slide" :showDot="false" :loop="false" :autoPlay="false"
                  :bannerList="carouselList" :paddingTop="56.119" :column="1">

          </Swiper>
        </div>
        <div class="hot-more-wrapper">
          <a href="/product/getSubgectList" class="more-link">更多 <i class="uricon-arrow-right"></i></a>
        </div>
      </div>

      <div class="goods-list-item-wrapper">
        <div class="quailty-title-wrapper">
          <SubTitle title="品质甄选" :asideShow="false"></SubTitle>
        </div>
        <ul>
          <li class="goods-list-item" v-for="item in qualitySelectionUGift" :key="item.productId">
            <a :href="'/product/getProduct?spuId='+item.productId">
              <div class="img-wrapper">
                <Img :src="item.mainImg"/>
              </div>
              <div class="goods-text">
                <h2><span class="hot_icon" v-if="item.hotTip">{{item.hotTip}}</span>{{item.name}}</h2>
                <template v-if="item.marketPrice == item.price">
                  <p class="price">
                    <span>￥</span>{{item.marketPrice}}
                  </p>
                </template>
                <template v-else="">
                  <p class="price">
                    <span>￥</span>{{item.price}}
                    <span class="del">￥{{item.marketPrice}}</span>
                  </p>
                </template>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer">
        没有更多了
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import Swiper from 'lib/swiper/Swiper';
  import AdBanner from 'app/index/modules/AdBanner';
  import IconList from 'app/index/modules/IconList';
  import SubTitle from 'app/classroom/modules/SubTitle';
  import toNativePage from 'nativeFix/component/toNativePage';
  import apiProductIndex from 'src/api/uGoods/apiProductIndex';

  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';

  const iconListOne = [
    {
      linkUrl: '/product/getList?category1=300',
      picUrl: require('static/images/uGoods/zscq.png'),
      text: '知识产权',
      isRouterLink: false
    },
    {
      linkUrl: '/product/getList?category1=236',
      picUrl: require('static/images/uGoods/tsyx.png'),
      text: '图书音像',
      isRouterLink: false
    },
    {
      linkUrl: '/product/getList?category1=107',
      picUrl: require('static/images/uGoods/spyy.png'),
      text: '食品饮料',
      isRouterLink: false
    },
    {
      linkUrl: '/product/getList?category1=239',
      picUrl: require('static/images/uGoods/znjj.png'),
      text: '智能家居',
      isRouterLink: false
    }
  ];
  const iconListTwo = [
    {
      linkUrl: '/product/getList?category1=326',
      picUrl: require('static/images/uGoods/gszc.png'),
      text: '工商注册',
      isRouterLink: false
    },
    {
      linkUrl: '/product/getList?category1=105',
      picUrl: require('static/images/uGoods/smpj.png'),
      text: '数码配件',
      isRouterLink: false
    },
    {
      linkUrl: '/product/getList?category1=242',
      picUrl: require('static/images/uGoods/ylbj.png'),
      text: '医疗保健',
      isRouterLink: false
    },
    {
      linkUrl: '/v2/uGoods/classify',
      picUrl: require('static/images/uGoods/qbsp.png'),
      text: '全部分类',
      isRouterLink: false
    }
  ];

  export default {
    data: () => {
      return {
        isApp:isApp(),
        title: 'U物',
        show: false,
        banners: "", // banner列表
        subjectCarouselList: "", // 热门专题
        subjectList: "", // 推荐商品
        recommendUGift:"", //人气推荐
        newProductList:"", //新品首发
        qualitySelectionUGift:"", //品质甄选
        ad:[{
          "id": 60,
          "title": "优客好声音投票",
          "linkUrl": "http://211.144.5.130:8073/v2/activity/rankingList",
          "image": "http://imgaetest.urwork.cn/e8536842-d6b8-47e7-a2d8-557e881f63c7.png",
          "postionType": "ad1",
          "postionIndex": 1,
          "createUser": 15967,
          "updateUser": 15967,
          "createTime": 1540870716000,
          "updateTime": 1540876241000,
          "status": 1,
          "bannerType": 1
        },
          {
            "id": 52,
            "title": "hey",
            "linkUrl": "http://211.144.5.130:8073/activity/h5Detail?id=10037",
            "image": "http://imgaetest.urwork.cn/ef07014e-7b76-4a35-835f-a6b4ff341774.jpg",
            "postionType": "ad1",
            "postionIndex": 2,
            "createUser": 15821,
            "updateUser": 15821,
            "createTime": 1535371437000,
            "updateTime": 1540870727000,
            "status": 1,
            "bannerType": 1
          },
          {
            "id": 53,
            "title": "sad",
            "linkUrl": "http://www.baidu.com",
            "image": "http://imgaetest.urwork.cn/976e1f5c-1335-4df9-9acd-02fbb6ca4e0e.jpg",
            "postionType": "ad1",
            "postionIndex": 3,
            "createUser": 15821,
            "updateUser": 15821,
            "createTime": 1535371496000,
            "updateTime": 1540870727000,
            "status": 1,
            "bannerType": 1
          }] , // 广告
        ad1:[], //广告1
        ad2:[], //广告2
        ad3:[] //广告3
      }
    },
    components: {
      Swiper,
      IconList,
      SubTitle,
      AdBanner,
      toNativePage
    },
    computed: {
      bannerList() {
        if(!this.banners) return;
        let list = [];
        this.banners.forEach(item => {
          list.push({
            linkUrl: item.linkUrl,
            image: item.image,
            id: item.productId
          })
        });
        return list;
      },
      iconListOne() {
        return iconListOne
      },
      iconListTwo() {
        return iconListTwo
      },
      carouselList() {
        if(!this.subjectCarouselList) return;
        let list = [];
        this.subjectCarouselList.forEach(item => {
          list.push({
            linkUrl: `/product/getProduct?spuId=${item.productId}`,
            image: item.image,
            id: item.productId
          })
        });
        return list;
      }
    },
    methods: {
      init() {
        apiProductIndex().then((res) => {
          console.log(res)
          if(!res) return;
          this.banners = res.banners;
          this.ad1 = res.ad1;
          this.ad2 = res.ad2;
          this.ad3 = res.ad3;
          this.subjectCarouselList = res.subjectCarouselList;
          this.subjectList = res.subjectList;
          this.qualitySelectionUGift = res.qualitySelectionUGift;
          this.newProductList = res.newProductList;
          this.recommendUGift = res.recommendUGift;
          this.show = true;
        })
      },
      search:function () {
//这里的跳转为了兼容 app的webview 采用新窗口跳转
// let routeData = this.$router.resolve({
// name: "search",
// });
// window.open(routeData.href, '_blank');
        let url = getLocation().origin+"/v2/uGoods/search";
        if(this.isApp) {
          this.$DANativeApi.navigateTo({
            url
          })
// window.location.replace(url);
// window.location.href = "/v2/uGoods/search";
        }else{
          window.location.href = "/v2/uGoods/search";
        }
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $border-bottom: 8px solid #f5f5f5;

  .search{
    padding: 20px 20px 3px 20px;
    position: relative;
    .search_icon{
      width: 15px;
      height: 15px;
      display: inline-block;
      background:url("./img/search.png") no-repeat;
      background-size: 100%;
      position: absolute;
      bottom: 13px;
      left: 35px;
    }
    input{
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      border: transparent;
      border-radius: 18px;
      text-indent: 2.5em;
      background: #EEEFF3;
      /*background:#EEEFF3 url("./img/search.png") no-repeat 15px;*/
      /*background-size: 5%;*/
    }
  }

  .slide-wrap {
    padding: 10px 15px 0;
    .is-app & {
      padding-top: 2px;
    }
  }
  .main-icon-wrapper {
    padding: 20px;
  }
  .icon-list{
    p{
      font-size: 12px;
    }
  }
  .last-icon-list {
    padding-top: 20px;
  }
  .hot-title-wrapper {
    padding: 18px;
  }
  .hot-banner-wrapper {
    padding: 0 20px;
  }
  .hot-more-wrapper {
    padding: 20px;
    border-bottom: $border-bottom;
  }

  .goods-list-item-wrapper {
    padding: 0 20px 3px;
    .quailty-title-wrapper{
      padding: 18px 0;
    }
    ul{
      overflow: hidden;
      li{
        width: 3.2rem;
        &:nth-of-type(even){
          float: right;
        }
        &:nth-of-type(odd){
          float: left;
        }
      }
    }
  }
  .goods-list-item {
    /*position: relative;*/
    /*padding: 20px 0;*/
    /*<!--@include border-bottom(#E5E5E5);-->*/
    padding-bottom: 13px;
    .img-wrapper {
      /*width: 160px;*/
      /*height: 160px;*/
      border-radius: 5px;
      .img-wrap{
        width: 3.2rem;
        height: 3.2rem;
        display: inline-block;
        overflow: hidden;
        border-radius: 5px;
        img{
          width: 100%;
          height: 100%;
          display: inline-block;
          border-radius: 5px;
        }
      }
    }
    .goods-text {
      padding-top: 6px;
      text-align: left;
      h2 {
        width: 3.2rem;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .hot_icon{
          width: 28px;
          height: 15px;
          line-height: 15px;
          display:inline-block;
          background: url("./img/hot_icon.png") no-repeat;
          background-size: 100%;
          font-size: 10px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          margin-right: 3px;
        }
      }
      .price{
        font-size: 16px;
        font-weight: bold;
        color: #FF4500;
        margin-top: 5px;
        span{
          font-size: 10px;
          font-weight: bold;
        }
        .del{
          font-size: 11px;
          color: #7A808F;
          letter-spacing: 0;
          text-decoration: line-through;
          margin-left: 5px;
        }
      }
    }
  }
  .footer{
    text-align: center;
    padding: 10px 0;
  }
</style>
