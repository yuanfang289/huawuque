<template>
  <div id="sel-city-mask" v-show="show">

    <div class="city-dialog">
      <div class="close" @click="close()"></div>
      <div class="all-city">全部</div>
      <div class="title">热门城市</div>
      <div class="select-city pick" v-for="item in hotCity" @click="choseCity(item,$event)">{{item.cityName}}</div>
      <div class="list-main" ref="box">
        <div  class="list">
          <template v-for="(item,index) in allCity">
            <div class="item">
              <div class="letter" :id="index">{{index}}</div>
              <div class="cities">
                <div v-for="item1 in item" @click="choseCity(item1,$event)" class="city-item pick">
                  {{item1.cityName}}
                </div>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import apiCityList from 'src/api/workstage/apiCityList';
  import apihotCityList from 'src/api/workstage/apihotCityList';

  export default {
    name: "SelectCitys",
    components: {
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
        hotCity:[],
        mapCity:'',
      }
    },
    computed: {},
    methods: {
      close(){
        this.$emit('sel-city-close', '');
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
      choseCity(obj,event){
        var el = event.currentTarget;
        document.getElementsByClassName("picked2")[0]?document.getElementsByClassName("picked2")[0].classList.remove("picked2"):''
        el.classList.add("picked2");
//        this.$set(obj,'picked',true);
        this.selCityId=obj.id;
        this.cityName=obj.cityName;
        this.$emit('select-city', obj);
      },
    },
    created(){
        this.selCityId=this.cityCode;
      apihotCityList().then((res) => {
//        res.map((obj,idx)=>{
//          this.$set(obj,'picked',false);
//        })
        this.hotCity = res;
        console.log(res,'热门');
      })
      apiCityList().then((res) => {
        let data = res;
        let map = new Map();
        data.map((item,idx)=>{
          let a = item.cityNameEn.substr(0, 1);
          map.set(item.cityCode,a);
        })
        this.mapCity = map;
        var Array = data;
        var letter = [];
        Array.map((obj, idx) =>{
//          this.$set(obj,'picked',false);
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
        margin-top: 0.5rem;
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
        height: 30px;
        line-height: 30px;
        padding: 0 18px;
        margin-right: 0.18rem;
        margin-bottom: 0.3rem;
        position: relative;
        @include border(#D6D6D6) {
          border-radius: 32px;
        }
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #808080;
        text-align: center;
      }
      .picked2{
        color: #1D1D1D;
        font-weight: 500;
        position: relative;
        @include border(#363636) {
          border-radius: 32px;
        }
      }
     .all-city{
        height: 30px;
        line-height: 30px;
        padding: 0 18px;
        display: inline-block;
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #1D1D1D;
        text-align: center;
        margin-top: 0.6rem;
        position: relative;
        @include border(#363636) {
          border-radius:32px;
        }
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
              margin-top: 0.2rem;
              font-weight: 400;
            }
            .cities {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              margin-top: 0.24rem;
              .city-item {
                display: inline-block;
                height: 30px;
                padding: 0 18px;
                margin-right: 0.18rem;
                margin-bottom: 0.3rem;
                position: relative;
                @include border(#D6D6D6) {
                  border-radius: 32px;
                }
                font-family: PingFangSC-Medium;
                font-size: 13px;
                color: #808080;
                text-align: center;
                line-height: 30px;
              }
              .picked2{
                color: #1D1D1D;
                font-weight: 500;
                position: relative;
                @include border(#363636) {
                  border-radius: 32px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


