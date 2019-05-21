<template>
  <transition name="fade">
  <div id="sel-area-mask" v-show="show">

    <div class="area-dialog">
      <div class=" area-title">
      <div class="close" @click="close()"></div>
        <div class="title">选择地区</div>
      </div>
      <div class="list-content">
        <div class="list-item">
          <div class="p-list">
            <div v-for="item in provinces" class="sel-item" @click="select_p(item.id,'p')">
              <div :class="{'name':true,'name-sel':item.selected}">{{item.name}}</div>
              <div :class="{'but':true,'sel-but':item.selected}"></div>
            </div>
          </div>
          <div style="height:0.45rem"></div>
        </div>
        <div class="list-item">
          <div class="c-list">
            <div v-for="item in cities" class="sel-item" @click="select_p(item.id,'c')">
              <div :class="{'name':true,'name-sel':item.selected}">{{item.name}}</div>
              <div :class="{'but2':true,'sel-but':item.selected}"></div>
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="a-list">
            <div v-for="item in areas" class="sel-item" @click="select_p(item.id,'a')">
              <div :class="{'name':true,'name-sel':item.selected}">{{item.name}}</div>
              <div :class="{'but3':true,'sel-but':item.selected}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 25px"></div>
  </div>
  </transition>
</template>

<script>
  import apiGetProvinces from 'src/api/index/apiGetProvinces';
  import apiGetCities from 'src/api/index/apiGetCities';
  import apiGetDistricts from 'src/api/index/apiGetDistricts';
  export default {
    name: "SelArea",
    components: {
    },

    props: {
      show:true,
      areaId:Number,
    },

    data: () => {
      return {
        selAreaId:0,
        provinces:[
          {id:110000,name:"北京市",selected:false},
          {id:120000,name:"天津市",selected:false},
          {id:130000,name:"河北省",selected:false},
          {id:140000,name:"山西省",selected:false},
          {id:150000,name:"内蒙古自治区",selected:false},
          {id:210000,name:"辽宁省",selected:false},
          {id:220000,name:"吉林省",selected:false},
          {id:230000,name:"黑龙江省",selected:false},
          {id:310000,name:"上海市",selected:false},
          {id:320000,name:"江苏省",selected:false},
          {id:330000,name:"浙江省",selected:false},
          {id:340000,name:"安徽省",selected:false},
          {id:350000,name:"福建省",selected:false},
          {id:360000,name:"江西省",selected:false},
          {id:370000,name:"山东省",selected:false},
          {id:410000,name:"河南省",selected:false},
          {id:420000,name:"湖北省",selected:false},
          {id:430000,name:"湖南省",selected:false},
          {id:440000,name:"广东省",selected:false},
          {id:450000,name:"广西壮族自治区",selected:false},
          {id:460000,name:"海南省",selected:false},
          {id:500000,name:"重庆市",selected:false},
          {id:510000,name:"四川省",selected:false},
          {id:520000,name:"贵州省",selected:false},
          {id:530000,name:"云南省",selected:false},
          {id:540000,name:"西藏自治区",selected:false},
          {id:610000,name:"陕西省",selected:false},
          {id:620000,name:"甘肃省",selected:false},
          {id:630000,name:"青海省",selected:false},
          {id:640000,name:"宁夏回族自治区",selected:false},
          {id:650000,name:"新疆",selected:false},
          {id:710000,name:"台湾",selected:false},
          {id:810000,name:"香港",selected:false},
          {id:820000,name:"澳门",selected:false},
        ],
        cities:[],
        areas:[],
        pid:0,
        pName:'',
        cid:0,
        cName:'',
        aid:0,
        aName:'',

      }
    },
    computed: {},
    methods: {
        close(){
          this.$emit('sel-area-close', '');
        },
    select_p(id,type){
      let ps=[];

      if(type=='p'){
          ps=  this.provinces;
      }
        if(type=='c'){
           ps=  this.cities;
        }
      if(type=='a'){
          ps=  this.areas;
      }
      name='';
      ps.map(item=>{
          if(item.id==id){
              item.selected=true;
              name=item.name;
          }else{
            item.selected=false;
          }
          return item;
      });
      if(type=='p'){
        this.provinces=JSON.parse(JSON.stringify(ps));
        this.pid=id;
        this.pName=name;
        this.cid=0;
        this.aid=0;
        this.cities=[];
        this.areas=[];
        if(id==630000||id==710000||id==810000||id==990000){
          this.$emit('select-area', {name:name,id:id});
            return;
        }
        this.getCityData(id);
      }
      if(type=='c'){
        this.cities=JSON.parse(JSON.stringify(ps));
        this.cid=id;
        this.cName=name;
        this.aid=0;
        this.areas=[];
        this.getAreaData(id);
      }
      if(type=='a'){
        this.areas=JSON.parse(JSON.stringify(ps));
        this.aid=id;
        this.aName=name;
        let ret_name=this.pName;
        if(this.pName!=this.cName){
          ret_name+=' '+ this.cName;
        }
        ret_name+=' '+ this.aName;
        this.$emit('select-area', {name:ret_name,id:id});
      }

  },
      getGetProvinces(){
        apiGetProvinces().then(res=>{
          let ret=[];
          res.map(item=>{
            ret.push({id:item.geoCode,name:item.geoName,selected:false})
          });
          this.provinces=JSON.parse(JSON.stringify(ret));
        });
      },
    getCityData(pid){
      apiGetCities({province:pid}).then(res=>{
          let ret=[];
        res.map(item=>{
          ret.push({id:item.geoCode,name:item.geoName,selected:false})
        });
          this.cities=JSON.parse(JSON.stringify(ret));
          console.log("this.cities",this.cities);
      })
    },
      getAreaData(cid){
        apiGetDistricts({city:cid}).then(res=>{
          let ret=[];
          res.map(item=>{
            ret.push({id:item.geoCode,name:item.geoName,selected:false})
          });
          this.areas=JSON.parse(JSON.stringify(ret));
          console.log("this.cities",this.cities);
        })
      }
    },
    created(){
       this.getGetProvinces();
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
  #sel-area-mask {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    .area-dialog {
      //margin-top: 0.4rem;
      margin-left: 0.4rem;

      .area-title{
        height: 0.48rem;
        display: flex;
        margin-bottom: 0.4rem;
        justify-content: flex-start;
        .close {
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background: url("https://assets.urwork.cn/image/v3/close.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 2.1rem;
        }

        .title {
          display: inline-block;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #1D1D1D;
          font-weight: bold;
        }
      }

      .list-content{
        width: 92%;
        display: flex;
        flex-direction: row;
        .list-item{
          flex:1;
          height: 10.00rem;
          overflow: scroll;

        }
      }

      .p-list{
        padding-top: 0.5rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 1px;
        min-height: 10.00rem;
      }
      .c-list{
        padding-top: 0.5rem;
        background: #FAFAFA;
        border-radius: 1px;
        min-height: 10.00rem
      }
      .a-list{
        padding-top: 0.5rem;
        background: #F3F3F3;
        border-radius: 1px;
        min-height: 10.00rem
      }

      .sel-item{
        display: inline-block;
        width: 100%;
        margin-bottom: 0.36rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .name{
          display: inline-block;
          height: 0.4rem;
          margin-bottom: 0.1rem;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #1D1D1D;
        }
        .name-sel{
          font-family: PingFangSC-Semibold;
          font-weight: bold;
        }

        .but{
          display: inline-block;
          height: 0.04rem;
          width: 0.38rem;
          background: #fff;
        }

        .but2{
          display: inline-block;
          height: 0.04rem;
          width: 0.38rem;
          background: #FAFAFA;
        }

        .but3{
          display: inline-block;
          height: 0.04rem;
          width: 0.38rem;
          background: #F3F3F3;
        }
        .sel-but{

          background: #1D1D1D;
        }


      }

    }
  }
</style>


