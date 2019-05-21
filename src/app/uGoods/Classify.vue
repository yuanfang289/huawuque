<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <!--<page-header>-->
    <!--<topbar :type="'back'" :hideShareBtn="true">-->
    <!--<template slot="title">{{title}}</template>-->
    <!--</topbar>-->
    <!--</page-header>-->
    <page-header :isHeadroom="false">
      <topbar type="search" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
      </topbar>
       <div :class="{ 'search': !isApp, 'search_app': isApp}">
         <div class="navigate"><a @click="back()" class="action"><i class="uricon-arrow-left"></i></a></div>
        <input placeholder="请输入商品名称" v-model="searchKey" @click="searchPage()">
        <a class="go_search" @click="search()">
          搜索
        </a>
        <span class="search_icon">

        </span>
      </div>
    </page-header>

    <page-main :show="show">
      <div :class="{ 'left': !isApp, 'left_app': isApp}">
        <ul>
            <li v-for="(item,index) in firstCategory" :class="{ 'normal': item.active, 'active': !item.active}" :code="item.id" @click="firstLevelClick(item,index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="right" @scroll="handleScroll" ref="content">
        <ul>
          <li v-for="(item,index) in firstCategory" :code="item.id">
              <h4 :id="item.id">{{item.name}}</h4>
              <div class="childrenList">
                 <a :href="'/product/getList?category1='+item.id" :code="item.id">全部</a>
                 <a v-for="obj in item.children" :href="'/product/getList?category2='+obj.id" :code="obj.id">{{obj.name}}</a>
              </div>
          </li>
        </ul>
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apigetSecondLevelCategory from 'api/uGoods/apigetSecondLevelCategory';
  export default {
    components: {

    },
    data: () => {
      return {
        isApp: isApp(),
        offsetTopplus:70,
        show: false,
        searchKey:'',
        scrollTop:'',
        title: 'U物分类页',
        firstCategory: []
      }
    },
    methods:{
      back:function () {
        if(this.isApp) {
          this.$DANativeApi.navigateBack();
        }else{
          window.location.href = document.referrer;
        }
      },
      scroll:function (currentY, targetY) {// 计算需要移动的距离
        let needScrollTop = targetY - currentY
        let _currentY = currentY
        setTimeout(() => {// 一次调用滑动帧数，每次调用会不一样
          const dist = Math.ceil(needScrollTop / 10)
          _currentY += dist
          window.scrollTo(_currentY, currentY) // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
          if (needScrollTop > 10 || needScrollTop < -10) {
            scroll(_currentY, targetY)
          } else {
            window.scrollTo(_currentY, targetY)
          }
        }, 1)
      },
      searchPage:function () {
        let url = getLocation().origin+"/v2/uGoods/search";
        if(this.isApp) {
          this.$DANativeApi.navigateTo({
            url
          })
        }else{
          window.location.href = "/v2/uGoods/search";
        }
      },
      search:function () {
        let url = getLocation().origin+"/product/getList?name="+this.searchKey;
        if(this.isApp) {
          this.$DANativeApi.navigateTo({
            url
          })
        }else{
          window.location.href = "/product/getList?name="+this.searchKey;
        }
      },
      firstLevelClick:function (item,index) {
          var _this = this;
//        alert(item.name);
//        alert(index);
        _this.firstCategory.map(function (obj) {
          obj.active = true;
        })

//        this.$set(this.firstCategory[index],'active',false);

        _this.firstCategory.map(function (obj,idx) {
          if(idx == index){
            _this.firstCategory.map(function (obj) {
              obj.active = true;
            })
            let Arry = _this.firstCategory;
            Arry[idx].active = false;
            Arry.splice(0,0);
            _this.firstCategory = Arry;
            return false;
          }
        })

       var id =  251;
        if(item != 1){
          id = item.id;
        }
        const currentY = document.documentElement.scrollTop || document.body.scrollTop;
        _this.scroll(currentY,document.getElementById(id).offsetTop-this.offsetTopplus);
      },
      handleScroll (el) {
        let  _this = this;
        _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        _this.firstCategory.map(function (obj,idx) {
            let elh =  document.getElementById(obj.id).offsetTop;
            if(Math.abs(elh-_this.scrollTop)< _this.offsetTopplus+20){
              _this.firstCategory.map(function (obj) {
                obj.active = true;
              })
              let Arry = _this.firstCategory;
              Arry[idx].active = false;
              Arry.splice(0,0);
              _this.firstCategory = Arry;
              return false;
            }
        })
      }
    },
    created() {
      this.show = true;
      apigetSecondLevelCategory().then((res) => {
         var Arry = res;
         console.log(Arry);
        Arry.map(function (obj,idx) {
          if(idx == 0){
            obj.active = false;
          }else{
            obj.active = true;
          }
        })
        this.firstCategory = Arry;
      })
      if(this.isApp){
        this.offsetTopplus = 90;
      }
    },
    mounted() {
      this.firstLevelClick(1,0);
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  #main{
    .left{
      width: 125px;
      height: 100vh;
      padding-bottom: 55px;
      overflow: scroll;
      position: fixed;
      top: 55px;
      left: 0;
      ul{
        li{
          width: 100%;
          height: 53px;
          line-height: 53px;
          text-align: center;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        .normal{
          border-left: 4px solid transparent;
        }
        .active{
          border-left: 4px solid #FFD400;
          background: #F8F8F8;
          color: #333333;
          font-weight: 600;
        }
      }
    }
    .left_app{
      width: 125px;
      height: 100vh;
      padding-bottom: 75px;
      overflow: scroll;
      position: fixed;
      top: 75px;
      left: 0;
      ul{
        li{
          width: 100%;
          height: 53px;
          line-height: 53px;
          text-align: center;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        .normal{
          border-left: 4px solid transparent;
        }
        .active{
          border-left: 4px solid #FFD400;
          background: #F8F8F8;
          color: #333333;
          font-weight: 600;
        }
      }
    }
    .right{
      margin-left: 125px;
      font-size: 20px;
      background: #F8F8F8;
      margin-top: -20px;
      ul{
        padding-bottom: 500px;
        li{
          margin: 20px;
          h4{
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            padding-bottom: 10px;
          }
          &:first-child{
            padding-top: 20px;
          }
          .childrenList{
            border-radius: 4px;
            overflow: hidden;
            a{
              background: #FFFFFF;
              width: 50%;
              height: 40px;
              line-height: 40px;
              font-size: 12px;
              color: #666666;
              text-align: center;
              letter-spacing: 0;
              border-top: 1px solid #E6E6E6;
              display: inherit;
              float: left;
              &:nth-of-type(odd){
                border-right: 1px solid #E6E6E6;
              }
              &:nth-of-type(1){
                border-top: none;
              }
              &:nth-of-type(2){
                border-top: none;
              }
            }
          }
        }
      }
    }
  }
  .search{
    padding: 10px 20px;
    position: relative;
    background: #ffffff;
    @include border-bottom(#e5e5e5);
    .go_search{
      font-size: 14px;
      color: #333333;
      float: right;
      line-height: 35px;
    }
    .search_icon{
      width: 15px;
      height: 15px;
      display: inline-block;
      background:url("./img/search.png") no-repeat;
      background-size: 100%;
      position: absolute;
      bottom: 20px;
      left: 52px;
    }
    input{
      width: 82%;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      color: #999999;
      letter-spacing: 0;
      border: transparent;
      border-radius: 18px;
      text-indent: 2.5em;
      background: #EEEFF3;
      /*background:#EEEFF3 url("./img/search.png") no-repeat 15px;*/
      /*background-size: 5%;*/
    }
    .navigate{
      width: 20px;
      height: 35px;
      line-height: 35px;
      float: left;
    }
  }
  .search_app{
    padding: 30px 20px 10px 20px;
    position: relative;
    background: #ffffff;
    @include border-bottom(#e5e5e5);
    .go_search{
      font-size: 14px;
      color: #333333;
      float: right;
      line-height: 35px;
    }
    .search_icon{
      width: 15px;
      height: 15px;
      display: inline-block;
      background:url("./img/search.png") no-repeat;
      background-size: 100%;
      position: absolute;
      bottom: 20px;
      left: 52px;
    }
    input{
      width: 82%;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      color: #999999;
      letter-spacing: 0;
      border: transparent;
      border-radius: 18px;
      text-indent: 2.5em;
      background: #EEEFF3;
      /*background:#EEEFF3 url("./img/search.png") no-repeat 15px;*/
      /*background-size: 5%;*/
    }
    .navigate{
      width: 20px;
      height: 35px;
      line-height: 35px;
      float: left;
    }
  }
</style>

