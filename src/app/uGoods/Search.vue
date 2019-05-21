<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <!--<page-header>-->
      <!--<topbar :type="'back'" :hideShareBtn="true">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->


    <!--<page-header :isHeadroom="false">-->
      <!--<topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>-->
        <!--<template slot="title">{{ isEn ? field.title.en : field.title.ch}}</template>-->

        <!--<template slot="actions"> <a :href="'task/detail'">{{ isEn ? field.right_title.en : field.right_title.ch}}</a></template>-->

      <!--</topbar>-->
    <!--</page-header>-->



    <page-header>
      <topbar type="search" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
      </topbar>
      <div :class="{ 'search': !isApp, 'search_app': isApp}">
        <div class="navigate"><a @click="back()" class="action"><i class="uricon-arrow-left"></i></a></div>
        <input placeholder="请输入商品名称" v-model="searchKey">
        <a class="go_search" @click="search()">
          搜索
        </a>
        <span class="search_icon">

        </span>
      </div>
    </page-header>

    <page-main :show="show">
          <div class="key search_history" v-if="historyArry.length > 0">
              <h1 class="tit">搜索历史<span class="del_history" @click="delHistory()"></span></h1>
              <ul class="content">
                <template v-for="item in historyArry">
                  <a v-if="item == '%'" :href="'/product/getList?name=%25'">
                    <li>{{item}}</li>
                  </a>
                  <a v-else="" :href="'/product/getList?name='+item">
                    <li>{{item}}</li>
                  </a>
                </template>
              </ul>
          </div>
          <div class="key search_hot">
            <h1 class="tit">热门搜索</h1>
            <ul class="content">
              <a :href="'/product/getList?name='+item" v-for="item in hotData">
              <li>{{item}}</li>
              </a>
            </ul>
          </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import storage from 'utils/storage';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiHotWord from 'api/uGoods/apiHotWord';


  let {setStorage,removeStorageByName,hasStorageByName,getStorageByName} = storage;
  export default {
    components: {

    },
    data: () => {
      return {
        isApp: isApp(),
        show: false,
        searchKey:'',
        historyArry:[],
        title: '搜索页',
        hotData: []
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
      search:function () {
          let arr = [];
          if(hasStorageByName('searchHistory')){
             arr = JSON.parse(getStorageByName('searchHistory'));
          }
          if(arr.indexOf(this.searchKey) == -1&&this.searchKey!=''){
            arr.unshift(this.searchKey);
            if(arr.length>10){
              arr.pop()
            }
          }
        let val =  JSON.stringify(arr);
        setStorage('searchHistory',val);
        this.historyArry = JSON.parse(getStorageByName('searchHistory'));
        console.log(this.historyArry,'历史记录');
//        window.location.href = "/product/getList?name="+this.searchKey;
        let url = getLocation().origin+"/product/getList?name="+this.searchKey;
        if(this.isApp) {
//          this.$DANativeApi.navigateTo({
//            url
//          })
          window.location.replace(url);
        }else{
            if(this.searchKey == '%'){
              window.location.href = "/product/getList?name=%25";
            }else{
              window.location.href = "/product/getList?name="+this.searchKey;
            }

        }
      },
      delHistory:function () {
        removeStorageByName('searchHistory');
        this.historyArry = [];
      },
      getHotData:function (){
        apiHotWord().then((res) => {
          console.log(res,'qwewqeqewq');
          if(!res) return;
          var data = res;
          var arr =  data.split(",");
          var newArry = [];
          arr.map(function (obj) {
            if(obj != ""){
              newArry.push(obj);
            }
          })
          this.hotData =  newArry;
        })
      }
    },
    created() {
      this.show = true;
      this.getHotData();
      this.searchKey = this.$route.query.name || '';
//      localStorage.setItem("urworkulistname",'');
    },
    mounted() {
      if(hasStorageByName('searchHistory')){
        this.historyArry = JSON.parse(getStorageByName('searchHistory'));
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  #main{
    padding: 0 20px;
    .key{
      .tit{
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        margin:20px 0 10px 0;
        .del_history{
          width: 13px;
          height: 13px;
          display: inline-block;
          background: url("./img/del_history.png") no-repeat;
          background-size: 100%;
          float: right;
          margin-top: 3px;
        }
      }
      .content{
        overflow: hidden;
        li{
          font-size: 13px;
          color: #666666;
          padding: 10px;
          margin:0 10px 10px 0;
          background: #F5F5F5;
          border-radius: 4px;
          float: left;
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

