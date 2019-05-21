<template>
  <transition name="fade">
  <div id="sel-city-mask" v-show="show">
    <div class="city-dialog">
      <div class="close" @click="close()"></div>
      <div class="title">定位城市</div>
      <div class="select-city">{{cityName}}</div>
      <div class="list-main" ref="box">
        <div class="index">
          <ul>
            <a href="javascript:void(0)" v-for="item in letter" v-on:click="goAnchor(item)">
              <li>{{item}}</li>
            </a>
            <!--</object>-->
          </ul>
        </div>
        <div  class="list">
          <template v-for="(item,index) in allCity">
            <div class="item">
              <div class="letter" :id="index">{{index}}</div>
              <div class="cities">
                <div v-for="item1 in item" @click="choseCity(item1)" class="city-item">
                  {{item1.cityName}}
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  import apiCityList from 'src/api/workstage/apiCityList';

  export default {
    name: "SelectCitys",
    components: {
    },
    model:{
      prop: 'show',
      event: 'sel-city-close'
    },
    props: {
      show:true,
      cityId:Number,
    },

    data: () => {
      return {
        cityName:'北京',
        myWorkstage: [],
        letter:[],
        allCity:[],
        selCityId:0,
      }
    },
    computed: {},
    methods: {
      close(){
        this.$emit('sel-city-close', false);
      },
      unique:function (arr){
        var newArr = [arr[0]];
        for(var i=1;i<arr.length;i++){
          if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i]);
          }
        }
        return newArr;
      },
      goAnchor:function(selector) {
        this.$nextTick(() => {
          this.$refs.box.scrollTop = document.getElementById(selector).offsetTop;
        });
      },
      choseCity(obj){
          this.selCityId=obj.id;
          this.cityName=obj.cityName;
          this.$emit('select-city', obj);
      },
    },
    created(){
        this.selCityId=this.cityCode;
        console.log("this.selCityId",this.selCityId);
      apiCityList().then((res) => {
        let data = res;
        var Array = data;
        var letter = [];
        Array.map((obj, idx) =>{
          if(obj.cityCode==this.selCityId){
              this.cityName=obj.cityName;
          }
          if (obj.cityNameEn) {
            let a = obj.cityNameEn.substr(0, 1);
            letter.push(a)
          }
        })
        var allCity = {};

        this.letter = this.unique(letter.sort());

        this.unique(letter.sort()).map(function (obj, idx) {
          let letArry = [];
          Array.map(function (ob, id) {
            if (ob.cityNameEn) {
              let a = ob.cityNameEn.substr(0, 1);
              if (obj == a) {
                letArry.push(ob);
                allCity[obj] = letArry
              }
            }
          })
        })
        this.allCity = allCity;
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .6s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  #sel-city-mask {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .dialog {
      margin-top: 0.4rem;
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      .close {
        width: 0.48rem;
        height: 0.48rem;
        background: url("https://assets.urwork.cn/image/v3/close.png") no-repeat;
        background-size: 100% 100%;
      }
      .title {
        margin-top: 0.6rem;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #1D1D1D;
        font-weight: bold;
      }
      .list {
        margin-top: 0.1rem;
        .item {
          display: inline-block;
          margin-top: 0.3rem;
          padding: 0.17rem 0.26rem;
          background: #FFFFFF;
          @include border(#D6D6D6) {
            border-radius: 0.35rem;
          }
        ;

          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #808080;
          line-height: 0.26rem;
        }
        .item-select {
          @include border(#363636) {
            border-radius: 0.35rem;
          }
        ;
          font-family: PingFangSC-Semibold;
          color: #1D1D1D;
        }
      }
    }

    .city-dialog {
      margin-top: 0.4rem;
      margin-left: 0.4rem;
      //margin-right: 0.4rem;
      .close {
        width: 0.48rem;
        height: 0.48rem;
        background: url("https://assets.urwork.cn/image/v3/close.png") no-repeat;
        background-size: 100% 100%;
      }

      .title {
        margin-top: 0.6rem;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #1D1D1D;
        font-weight: bold;
        margin-bottom: 0.24rem;
      }

      .select-city{
        display: inline-block;
        box-sizing: content-box;
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #1D1D1D;
        text-align: center;
        line-height: 13px;

        @include border(#363636) {
          border-radius:32px;
        }
        padding: 0.17rem 0.44rem;
        margin-bottom: 0.55rem;
      }
      .list-main {
        position: relative;
        height: 9.10rem;
        overflow: scroll;

        .index{
          position: fixed;
          top: 20%;
          right: 0.3rem;
          width: 12px;
          ul{
            li{
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #333333!important;
              letter-spacing: 0;
              text-align: center;
              line-height: 19px;
            }
          }
        }
        .list {
          .item {

            .letter {
              font-family: Helvetica;
              font-size: 18px;
              color: #1D1D1D;
              margin-top: 0.5rem;
            }
            .cities {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              margin-top: 0.24rem;
              .city-item {
                display: inline-block;
                height: 0.26rem;
                box-sizing: content-box;
                padding: 0.17rem 0.36rem;
                margin-right: 0.18rem;
                margin-bottom: 0.3rem;
                @include border(#D6D6D6) {
                  border-radius: 32px;
                }
                font-family: PingFangSC-Medium;
                font-size: 13px;
                color: #808080;
                text-align: center;
                line-height: 0.26rem;
              }
            }
          }
        }
      }
    }
  }
</style>


