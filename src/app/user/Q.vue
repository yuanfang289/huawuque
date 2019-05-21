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
        <div class="search">
            <i v-show="searchKey" class="uricon-clear" @click="delSearchKey()"></i>
            <input  @input='search(1)' :placeholder="'会员服务、内有书屋、工位...'" v-model="searchKey"/>
            <span class="search-btn" @click="search()">搜索</span>
            <div class="search_icon"></div>
        </div>
        <div class="tab">
          <ul ref='box'>
              <li v-for="item in list" :class="{ 'click': item.show}"  v-show="item.display" @click="tab(item)">
                {{item.suTitle}}
              </li>
          </ul>
        </div>
        <ul class="list">
          <li v-for="item in list" v-show="item.show">
            <!--<span class="icon">-->
              <!--Q-->
            <!--</span>-->
            <!--<h3 v-if="item['show']">{{item.suTitle}}</h3>-->
            <div class="content" v-if="item.id ==10">
              <a v-for="(role,index) in item.list" v-if="role['show']" :href="role.url">
                <p><span v-if="role['show']">{{role.ask.split('.')[1]}}</span></p>
              </a>

              <a>
                <p class="noask"><span v-if="item.answerShow">暂时没有相关问题</span></p>
              </a>
            </div>

            <div class="content" v-else="">
              <a v-for="(role,index) in item.list" v-if="role['show']" :href="'a?code='+role.code">
                <p><span v-if="role['show']">{{role.ask.split('.')[1]}}</span></p>
              </a>

              <a>
                <p class="noask"><span v-if="item.answerShow">暂时没有相关问题</span></p>
              </a>
            </div>
          </li>
        </ul>
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
        myData:'',
        list:[],
        showed:0,
        searchKey:'',
        nodatatext:[{name:'a1'},{name:'a2'},{name:'a3'},{name:'a4'},{name:'a5'}],
        id:0
      }
    },
    methods: {
      tab(data) {
        this.list.map((obj,idx)=>{
          data.id == obj.id ?  obj['show']=true : obj['show']=false;
        })
        this.$forceUpdate();
      },
      getMydata: function () {
        apiGetJson().then(res => {
          this.myData = res;
          let data=res.data;
          if(this.id){
            let item=data.pop();
            data.unshift(item);
          }
          data.map((item,index)=>{
              index == 0 ? item['show']=true : item['show']=false;
              item['display']=true;
               item.list.map((item1,index1)=>{
                 item.list[index1]['show']=true;
               })
            return item;
          })
          this.list =data;
          this.show = true;
        });
      },
      search(n){
        let searchvalue = this.searchKey;
        searchvalue=searchvalue.toLowerCase();
        let sel=0;
        let hasRes=-1;
        this.list.map((item,index)=>{
          let flag=false;
         this.$set(this.list[index],'show',false)
          item.list.map((item1,index1)=>{
            if(item1['ask'].toLowerCase().indexOf(searchvalue) != -1||item1['answer'].toLowerCase().indexOf(searchvalue) != -1){
              this.$set(this.list[index]['list'][index1],'show',true);
              flag = true;
              if(hasRes==-1){
                hasRes=index;
              }
              if(item.show){
                sel=index;
              }
            }else{
              this.$set(this.list[index]['list'][index1],'show',false);
            }
          })
          this.$set(this.list[index],'answerShow',!flag);
          this.$set(this.list[index],'display',flag);
        })
        if(sel==0&&hasRes>-1){
          this.$set(this.list[hasRes],'show',true);
        }else{
          this.$set(this.list[sel],'show',true);
        }
        this.$forceUpdate();
        this.$nextTick(() => {
          this.$refs.box.scrollLeft = document.getElementsByClassName('click')[0].offsetLeft;
        })
      },
      delSearchKey() {
          this.searchKey = '';
          this.search();
      }
    },
    created() {
        let tab=this.$route.query.tab;
        if(tab&&parseInt(tab)) {
          this.id = parseInt(tab);
        }
        this.getMydata();


    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  #main{
    .search{
      padding: 15px;
      position: relative;
      background: #ffffff;
      >input{
        width: calc(100% - 70px);
        height: 35px;
        border: none;
        line-height: 35px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #7A808F;
        letter-spacing: 0;
        text-indent: 2em;
        background: #f5f5f5;
        border-radius: 4px;
      }
      .search_icon{
        width: 15px;
        height: 15px;
        display: inline-block;
        background:url("../uGoods/img/search.png") no-repeat;
        background-size: 100%;
        position: absolute;
        bottom: 25px;
        left: 23px;
      }
      .uricon-clear{
        position: absolute;
        top: 25px;
        left: calc(100% - 108px);
        opacity: 0.4;
      }
      .search-btn{
        width: 60px;
        height: 35px;
        margin-left: 5px;
        display: inline-block;
        line-height: 35px;
        background: #436EFF;
        border-radius: 5px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .list{
      padding: 0 20px;
      background: #ffffff;
      li{
        /*padding: 20px 0;*/
        h3{
          font-size: 15px;
          color: #000000;
          font-weight: 600;
        }
        .content{
          p{
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            text-align: left;
            letter-spacing: 0;
            padding: 20px 0;
            /*text-indent: 2em;*/
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            @include border-bottom(#e5e5e5);
            span{
              padding-left: 11px;
              position: relative;
              &::before{
                content: '';
                width: 3px;
                height: 3px;
                display: inline-block;
                background: #436EFF;
                border-radius: 50%;
                position: absolute;
                left: 0;
                top: 12px;
              }
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
    }
    .tab{
      overflow: hidden;
      background: #ffffff;
      border-top: 8px solid #f5f5f5;
      margin-bottom: 8px;
      box-shadow: 0 3px 10px 0 rgba(220,220,220,0.50);
      ul{
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        margin-bottom: -10px;
        li{
          list-style: none;
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          padding: 12px 18px 22px 18px;
          position: relative;
          &:nth-of-type(1){
            padding-left: 20px;
          }
          &:last-of-type{
            padding-right: 20px;
          }
        }
        .click{
          color: #436EFF;
          font-weight: 700;
          &::before {
            width: 20px;
            height: 2px;
            background: #436EFF;
            position: absolute;
            top: 46px;
            left: 50%;
            margin-left: -10px;
            content: "";
          }
        }
      }
    }
    .noask{
      text-align: center;
      span{
        width: 100%;
        text-align: center;
        color: #999999;
        &::before{
          background: #ffffff!important;
        }
      }
    }
  }
</style>

