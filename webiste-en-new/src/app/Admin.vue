<template>
  <div id="main">
    <top-bar ref="topBar"></top-bar>
    <div class="kong"></div>
    <!--<div class="amap-page-container">-->
      <!--<el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" lang="en" :center="center" :zoom="zoom" :events="events" class="amap-demo">-->
        <!--<el-amap-marker v-for="(item,index) in markers" :position="item.position" :events="item.events" :icon="item.icon" :key="index"></el-amap-marker>-->
        <!--<el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>-->
      <!--</el-amap>-->
    <!--</div>-->
    <div class="banner">
      <!--img src="https://image.urwork.cn/2b33c710-07d6-4d39-8ca0-3a701b43447b.jpg"-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/images/admin/swiper1.png" alt="a">
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/admin/swiper2.png" alt="b">
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/admin/swiper3.png" alt="c">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
       <div class="slide_txt">
         <div class="slide_title">
           Together, Achieve More
         </div>
         <div class="slide_name">
           Coworking Space in UCOMMUNE
         </div>
         <div class="slide_desc">
           Offices | Business Solutions & Services | Event Spaces
         </div>
       </div>
    </div>
    <div class="content">
      <p>
        Goals, targets, and milestones. We find ways to make it happen.<br>
        Growing is a business is an exciting challenge, and Ucommune is here to provide<br> you with the necessary platforms to help you reach your vision. Offering a wide<br> variety of services – coworking spaces, business solutions, and event spaces–we<br> make sure you focus on your wins, and we’ll take care of the rest.
      </p>
      <p>
        It’s time. <span style="font-style:italic;">Together, achieve more.</span>
      </p>
    </div>
    <div class="content2">
      <ul>
        <li>
          <h3>40</h3>
          <p>Cities</p>
        </li>
        <li>
          <h3>30</h3>
          <p>Locations</p>
        </li>
        <li>
          <h3>10,000+</h3>
          <p>Enterprises</p>
        </li>
        <li>
          <h3>160,000+</h3>
          <p>Members</p>
        </li>
      </ul>
    </div>
    <!--<div class="content3">-->

    <!--</div>-->
    <div class="banner2">
      <!--<img src="https://image.urwork.cn/2b33c710-07d6-4d39-8ca0-3a701b43447b.jpg">-->
    </div>
    <div class="location">
      <div class="left">
        <h2>
          Locations
        </h2>
        <p style="color:#000000">
          <span>Gain access to Ucommune’s network.</span> With over
          8,000+ enterprises across 180 locations, open new
          dialogues and gain opportunities in new cities and
          business landmarks. Kickstart in Hong Kong, expand to
          China, and grow globally. Make your brand a
          household name today.<br>
          <br>
          Bring those in parallel world together.
        </p>
        <a href="javascript:void(0)" @click="gotoUrl('commu')">
          <div class="location-btn">
            <span>See All 100+ Locations</span> <span style="display:inline-block;font-size: 18px"><img src="../assets/images/arrow.png"/></span>
          </div>
        </a>
      </div>
      <div class="right">
        <div class="beijing" style=" cursor:pointer;" @click="$router.push({name: 'commu', query:{code:110000, name:'Beijing'}})">
          <img src="../assets/images/admin/beijing.png"><p>Beijing</p>
        </div>
        <div class="shanghai" style=" cursor:pointer;" @click="$router.push({name: 'commu', query:{code:310000, name:'Shanghai'}})">
          <img src="../assets/images/admin/shanghai.png"><p>Shanghai</p>
        </div>
        <div class="Singapore" style=" cursor:pointer;" @click="$router.push({name: 'commu', query:{code:990100, name:'Singapore City'}})">
          <img src="../assets/images/admin/singapore.png"><p>Singapore</p>
        </div>
      </div>
    </div>
    <section class="severs-box">
      <div class="severs">
        <h2>
          We Provide…
        </h2>
        <div class="severs-content">
          <ul>
            <li class="img">
              <img src="../assets/images/admin/WeProvide-01.png">
            </li>
            <li class="txt">
              <div class="title">
                Re-imaging<br>
                the Experience of Work
              </div>
              <div class="bor-y"></div>
              <div class="con">
                UCommune provide you office and work place with innovative design, active community service and attractive member benefits for all sizes companies.
              </div>
            </li>
            <li class="txt">
              <div class="title">
                Fully-equipped <br>
                Meeting Room and Place
              </div>
              <div class="bor-y"></div>
              <div class="con">
                Our conference room can accommodate 6-20 pax, including Teleconferencing equipment, Smart TV, Projector, etc. According to your needed, we provide different specifications of Venue for you. There are small function rooms for training and seminars, large conferences, conventions and exhibitions. We provide all you need.
              </div>
            </li>
            <li class="txt">
              <div class="title">
                Comprehensive <br>
                Corporate Services
              </div>
              <div class="bor-y"></div>
              <div class="con">
                UCommune has 500+ quality service providers, provide enterprise service for our member. Starting with a table but not just a table. Starting with a table but not just a table. Whether you are a start-up company or sizeable enterprise, whether you need Trademark Registration, Book-keeping Agency or  Manpower, Finance Tax, Cloud Service, UCommune’ resident members can enjoy the best service at a preferential price.
              </div>
            </li>
            <li class="img">
              <img src="../assets/images/admin/WeProvide-02.png">
            </li>
            <li class="img">
              <img src="../assets/images/admin/WeProvide-03.png">
            </li>
            <li class="img">
              <img src="../assets/images/admin/WeProvide-04.png">
            </li>
            <li class="txt">
              <div class="title">
                A Vibrant Online <br>
                and Offline Community
              </div>
              <div class="bor-y"></div>
              <div class="con">
                We are not just an office, it’s a huge, vital community. We have a wide range of online and offline activities. We encourage community-based or geographically-based social interactions, and appreciate online social network through our App. As long as you are our member, you can meet people in parallel world in here.
              </div>
            </li>
            <li class="txt">
              <div class="title">
                Rich Benefit<br>
                for Our Member
              </div>
              <div class="bor-y"></div>
              <div class="con">
                - A permanent desk to call your own<br>
                - Free meeting room usage time per month<br>
                - Super fast internet & wifi at no extra cost<br>
                - Unlimited use of shared cloud printers<br>
                - Free and unlimited drinking water<br>
                - Shower rooms and bike storage<br>
                - Event space, ideal for meetips, presentations and workshops
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div class="classify-box">
      <div class="classify">
        <h2>
          Option of Office Space
        </h2>
        <div class="classify-content">
          <ul>
            <li>
              <img class="img" src="../assets/images/admin/option01.png">
              <div class="txt">
                <h5>Hourly Desk</h5>
                <p>
                  You can rent a desk by hour, grab your laptop, pick a desk and block the period then start your business.
                  <br><br>
                  You can enjoy:<br>
                  - Super fast internet & wifi at no extra cost<br>
                  - Free and unlimited drinking water<br>
                  - Shared cloud printers
                </p>
                <button @click="gotoUrl('commu')">Learn More</button>
              </div>
            </li>
            <li>
              <img class="img" src="../assets/images/admin/option02.png">
              <div class="txt">
                <h5>Hot Desk</h5>
                <p>
                  You can have a permanent desk. Decorating and put your belonging on your own desk. Able for Personal or Company.
                  <br><br>
                  You can enjoy<br>
                  -Fixed office desk, office chair, pedestal, rubbish bin<br>
                  -Monthly usage of Meeting room<br>
                  -Free Wi-Fi
                </p>
                <button @click="gotoUrl('commu')">Learn More</button>
              </div>
            </li>
            <li>
              <img class="img" src="../assets/images/admin/option03.png">
              <div class="txt">
                <h5>Private Office </h5>
                <p>
                  You can enjoy your private, undisturbed exclusive office. Able for personal or company.
                  <br><br>
                  You can enjoy<br>
                  -Private office with office furniture<br>
                  -Monthly usage Meeting room<br>
                  -Free quality Wi-Fi network
                </p>
                <button @click="gotoUrl('commu')">Learn More</button>
              </div>
            </li>
            <li>
              <img class="img" src="../assets/images/admin/option04.png">
              <div class="txt">
                <h5>Customize for You</h5>
                <p>
                  Whether you are a small team of 1-2 people or a large company of hundreds of <br>
                  people. We can customize a perfect office for you.<br>
                  Contact us now and tell us what you need.
                </p>
                <button  @click="openConsult()">Contact Us</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="consult-box">
      <div class="consult">
        <div class="left">
          <div class="tit" @click="modalshow= true">
            Enquiry Now
          </div>
          <p>Our community team will contact you soonest.</p>
          <div class="input-box">
            <div class="input-left">
              <label>Full Name</label><br>
              <Input name="full-name" ref="name" v-model="name" class="full-name"/>
            </div>
            <div class="input-right">
              <label>Company Name</label><br>
              <Input name="company-name" v-model="companyName" ref="companyName" class="company-name"/>

            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input-left">
              <label>Email Address</label><br>
              <Input name="email"  v-model="email" ref="email"  type="email" class="email-address"/>
            </div>
            <div class="input-right">
              <label>Phone Number</label><br>
              <div class="phone-box">
                <PhoneInput
                  name="mobile"
                  v-model="mobile"
                />
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input">
              <label>Preferred Location</label><br>
              <div class="city">
                <Select ref="selCity"  clearable v-model="cityCode" filterable placeholder="City">
                  <Option v-for="item in citys" :value="item.cityCode" :key="item.cityCode">{{ item.cityNameEn }}</Option>
                </Select>

              </div>
              <div class="all-communities">
                <Select ref="selWorkstage"  clearable v-model="workstageId" filterable placeholder="All Communities">
                  <Option v-for="item in workstages" :value="item.id" :key="item.id">{{ item.stageNameEn }}</Option>
                </Select>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="input-box">
            <div class="input">
              <label>How many seats do you need? </label><br>
              <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" name="optional" ref="seatNum" v-model="seatNum" type="number"  class="optional">
            </div>
            <div class="clear"></div>
          </div>
          <div class="btn" @click="booking()">
            Submit
          </div>
        </div>
        <div class="right">
          <div class="tit">
            Or Contact Us
          </div>
          <p>Questions about plans, pricing, or availability? Just have your people call our people.</p>
          <div class="way">
            <div class="phone-num">
              <span></span>
              <a href="javascript:void(0)">400-1188-891</a>
            </div>
            <div class="email">
              <span></span>
              <a href="javascript:void(0)">marketing@ucommune.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 128px">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import PhoneInput from '@/components/PhoneInput';
  import apiCityList from '@/api/apiCityList';
  import apiWorkstageByCity from '@/api/apiWorkstageByCity';
  import apibooking from '@/api/apibooking';
  import sleep from '@/utils/sleep';
  import Swiper from 'swiper';
  import { amapManager } from 'vue-amap';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    components: {
      TopBar,
      Footer,
      PhoneInput
    },
    data: function() {
      return {
        mobile:'',
        footer:true,
        amapManager,
        cityCode:0,
        citys:[],
        workstages:[],
        workstageId:0,
        name:'',
        companyName:'',
        email:'',
        phone:'',
        seatNum:null,
        modalshow:false,
        modal_loading:false,
        defImg: require('../assets/images/icon.png'),
        zoom: 12,
        center: [121.59996, 31.197646],
        events: {
          init: (o) => {
            o.getCity(result => {
            });
            o.lang="en";
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {

          }
        },
        markers: [],
        windows: [],
        window: '',
      };
    },
    computed: {},
    methods: {
      gotoUrl(path){
        this.$router.push({
          name: path
        })
      },
      openConsult(){
        this.$refs.topBar.openConsult()
      },
      close(){
        this.modalshow = true;
      },
      booking(){
        // name,
        if(this.name.trim()==''){
          this.$Message.info('Please input full name');
          this.$refs['name'].focus();
          return false;
        }
        //companyName
        if(this.companyName.trim()==''){
          this.$Message.info('Please input company name');
          this.$refs['companyName'].focus();
          return false;
        }

        let nationCode = "";
        let phone="";
        let mobile=this.mobile;
        let val = mobile.split(',');
        if (val.length == 1) {
          this.$Message.info('Please input mobile');
          this.$refs['mobile'].$refs['phone'].focus();
          return false;
        }else{
          nationCode=val[0];
          phone=val[1];
        }

        if(this.email.trim()==''){
          this.$Message.info('Please input email');
          this.$refs['email'].focus();
          return false;
        }

        //cityCode,
        if(this.cityCode==0){
          this.$Message.info('Please chose city');
          this.$refs['selCity'].$children[0].$refs.input.focus();
          return false;
        }

        //workstageId,
        if(this.workstageId==0){
          this.$Message.info('Please chose workstage');
          this.$refs['selWorkstage'].$children[0].$refs.input.focus();
          return false;
        }

        if(this.seatNum==0||!parseInt(this.seatNum)){
          this.$Message.info('Please input seats do you need');
          this.$refs['seatNum'].focus();
          return false;
        }

        apibooking({
          workstageId:this.workstageId+'',
          name:this.name+'', companyName:this.companyName+'',
          email:this.email+'',nationCode:nationCode, phone:phone+'',seatNum:this.seatNum,lang:'EN'
        }).then(res=>{
          if (res.retCode === 0) {
            this.$Message.info("Your application has been submitted");
            sleep(800).then(()=>{
              location.reload();
            })
          } else {
            this.$Message.info(res.retMsg);
          }
        });
      },
      getMap() {
      }
    },
    mounted(){
      this.$Message.config({
        top: 200,
        duration: 3
      });
       var  mySwiper = new Swiper('.swiper-container', {
           pagination : '.swiper-pagination',
         autoplay:2000,
         speed:1000,
        loop:true,

      });


      let markers = [];
      let windows = [];

      let num = 10;
      let self = this;

      for (let i = 0 ; i < num ; i ++) {
        markers.push({
          position: [121.59996 + i * 0.05, 31.197646 + i * 0.05],
          events: {
            mouseover() {
              self.windows.forEach(window => {
                window.visible = false;
              });

              self.window = self.windows[i];
              self.$nextTick(() => {
                self.window.visible = true;
              });
            },
            mouseout(){
              self.windows.forEach(window => {
                window.visible = false;
              });
            }
          },
          icon:this.defImg
        });

        windows.push({
          title :'test',
          position: [121.59996+ i * 0.05, 31.197646 + i * 0.05],
          content: `<div class="prompt">${ i }<img height="30px" width="30px" src="https://ucommune.com.hk/wp-content/uploads/2018/10/services-b1-1024x425.jpg"></div>`,
          visible: false
        });
      }

      this.markers = markers;
      this.windows = windows;

    },
    watch: {
      cityCode(value) {
        if(value!==''){
          apiWorkstageByCity({cityCode:value,pageSize:-1}).then(res=>{
            if(res.retCode===0){
              this.workstages=res.data.result;
            }
          });
        }
      }
    },
    created(){
      apiCityList().then(res=>{
        if(res.retCode===0){
          this.citys=res.data;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .slide_txt{
    position: absolute;
    top: 250px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width:531px;
    margin: auto;
    z-index: 1000;
  }
  .slide_title{
    font-family: Avenir-Black;
    font-size: 46px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align:center;
  }

  .slide_name{
    font-family: Avenir-Book;
    font-weight: 100;
    font-size: 23px;
    color: #FFFFFF;
    letter-spacing: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
  }

  .slide_desc{
    font-family: Avenir-Book;
    font-weight: 100;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
  /deep/ .swiper-pagination-bullet{
    background:#979797!important;
    opacity:1!important;
  }
  /deep/ .swiper-pagination-bullet-active{
    background: #D8D8D8!important;
  }

  /deep/ .ivu-select-selection
  {
    height: 42px!important;
  }

  /deep/ .ivu-input{
    height: 42px!important;
  }
  .kong{
    height: 80px;
  }
  .top-bar{
    .tab{
      ul{
        li{
          &:first-child{
            border-bottom: 2px solid #FFD53D;
          }
        }
      }
    }
  }
  .banner{
    height: 500px;
    width: 100%;
  }
  .banner img{
    height: 500px;
    width: 100%;
  }
  .banner2{
    height: 375px;
    width: 100%;
    background-color: rgba(10,10,10,0.6);
    background: url(../assets/images/admin/citybg.png) no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
  }
  .banner2 img{
    /*height: 375px;*/
    /*width: 100%;*/
  }
  .content {
    width: 620px;
    height: 200px;
    text-align: center;
    margin: 0 auto;
    padding-top: 25px;
  }
  .content p{
    padding-top: 15px;
    font-family: Avenir-Book;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    line-height: 23px;
  }
  .content p span{
    font-weight: 700;
  }
  .content2{
    width: 100%;
    height: 150px;
    background-color: #FFD53D;
    margin-top: 40px;
  }
  .content3{
    width: 100%;
    height: 80px;
    background: #FFFFFF;
  }
  .content2 ul{
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    overflow: hidden;
  }
  .content2 ul li{
    width: 250px;
    height: 100%;
    list-style: none;
    float: left;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content2 ul li h3{
    font-family: Avenir-Heavy;
    font-size: 30px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
  .content2 ul li p{
    font-weight: 300;
    font-family: Avenir-Light;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
  .location{
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 44px;
  }
  .location .left{
    width: 400px;
    height: 100%;
  }
  h2{
    display: inline-block;
    font-family: Avenir-Heavy;
    font-size: 30px;
    line-height: 20px;
    color: #000000;
    letter-spacing: 0;
    border-bottom: 8px solid #FFD53D;
    box-sizing: border-box;
    margin-top: 25px;
  }
  .location .left p{
    margin-top: 45px;
    line-height: 22px;
  }
  .location .left p span{
    font-weight: 700;
  }
  .location .left .location-btn{
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #FFD53D;
    border-radius: 2px;
    margin-top: 66px;
    font-size: 14px;
    color: #000000;
  }
  .location .right{
    margin-top: -103px;
    margin-left: 62px;
    font-size: 0;
  }
  .location .right>div{
    width: 225px;
    height: 440px;
    display: inline-block;
    margin-right: 25px;
  }
  .location .right>div p{
    font-size: 14px;
    margin-top: 7px;
    font-family: Avenir-Book;
    color: #333333;
    letter-spacing: 0;
  }
  .location .right img{
    width: 225px;
    height: 440px;
  }
  .location .right>div:last-child{
    margin-right: 0;
  }
  .severs-box{
    width: 100%;
    background: #FAF9F3;
  }
  .severs{
    padding: 44px 0;
    width: 1200px;
    margin: 0 auto;
  }
  .severs .severs-content{
    width: 1200px;
    margin-top: 45px;
  }
  .severs .severs-content ul{
    font-size: 0;
    overflow: hidden;
  }
  .severs .severs-content ul li{
    list-style: none;
    width: 400px;
    height: 350px;
    float: left;
  }
  .severs .severs-content ul .txt{
    width: 400px;
    height: 350px;
    padding: 35px;
  }
  .severs .severs-content ul .txt .title{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    font-weight: 700;
    color: #333333;
    letter-spacing: 0;
  }
  .severs .severs-content ul .txt .bor-y{
    width: 20px;
    height: 3px;
    background: #FFD53D;
    margin: 8px 0 16px 0;
  }
  .severs .severs-content ul .txt .con{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 13;
    -webkit-box-orient: vertical;
  }
  .severs .severs-content ul li img{
    width: 400px;
    height: 350px;
  }
  .classify-box,.consult-box{
    width: 100%;
  }
  .classify-box .classify{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 50px;
  }
  .classify-box .classify ul li{
    list-style: none;
    width: 580px;
    height: 530px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    float: left;
    margin-top: 36px;
    //font-size: 0;
  }
  .classify-box .classify ul li .img{
    width: 580px;
    height: 250px;
  }
  .classify-box .classify ul li .txt{
    width: 580px;
    height: 280px;
    padding: 20px;
    position: relative;
  }
  .classify-box .classify ul li .txt h5{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    margin-bottom: 10px;
  }
  .classify-box .classify ul li .txt p{
    font-family: Avenir-Book;
    font-size: 14px;
    color: #151515;
    letter-spacing: 0;
    line-height: 18px;

  }
  .classify-box .classify ul li .txt button{
    width: 122px;
    height: 40px;
    line-height: 40px;
    background: #FFFFFF;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    text-align: center;
    position: absolute;
    bottom: 35px;
  }
  .classify-box .classify ul li:nth-child(odd){
    margin-right: 36px;
  }
  .consult{
    width: 1198px;
    height: 548px;
    background: #FFFFFF;
    border: 1px solid #EBEBEB;
    margin: 40px auto;
    .left{
      box-sizing: border-box;
      width: 714px;
      height:100%;
      float: left;
      padding: 45px;
      .tit{
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #000000;
        letter-spacing: 0;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 2px;
      }
      .input-box{
        width: 100%;
        /*overflow: hidden;*/
        margin-top: 17px;
        .full-name{
          margin-top: 4px;
        }
        .company-name{
          margin-top: 4px;
        }
        .email-address{
          margin-top: 4px;
        }
        label{
          font-family: Avenir-Book;
          font-size: 14px;
          color: #484848;
          letter-spacing: 0;
          text-align: center;
        }
        input{
          width: 298px;
          height: 42px;
          background: #FFFFFF;
          border: 1px solid #EBEBEB;
          border-radius: 2px;
          margin-top: 4px;
          text-indent: 1em;
        }
        /deep/ .ivu-input-group-prepend{
          border-radius: 2px;
        }
        /deep/ .ivu-select-selection{
          height: 42px;
          border-radius: 2px;
        }
        /deep/ .ivu-input{
          height: 42px;
          border-radius: 2px;
          font-size: 14px!important;
        }
        /deep/ .ivu-select-input{
          height: 42px;
          border-radius: 2px;
        }
        .input-left{
          width: 300px;
          float: left;
        }
        .input-right{
          width: 300px;
          float: right;
        }
        .phone-box{
          width: 300px;
          position: relative;
          .phone-select{
            margin-top: 4px;
          }
          .zone{
            width: 65px;
            height: 42px;
            position: absolute;
            top: 5px;
            left: 1px;
            background: #F5F5F5;
            border-radius: 2px;
            p{
              margin: 0;
              height: 42px;
              line-height: 42px;
              text-align: center;
              position: relative;
              span{
                /*width: 8px;*/
                height: 3px;
                background-size: 100%;
                border-left: 3px solid transparent;
                border-right: 3px solid transparent;
                border-top: 4px solid #000000;
                display: inline-block;
                margin-left: 5px;
              }
            }
          }
          input{
            text-indent: 67px;
          }
        }
        .input{
          .city{
            width: 150px;
            float: left;
            margin-top: 4px;
          }
          .all-communities{
            width: 463px;
            float: right;
            margin-top: 4px;
          }
        }
      }
      .btn{
        cursor:pointer;
        width: 300px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #FFD53D;
        border-radius: 2px;
        font-family: Avenir-Book;
        font-size: 14px;
        color: #000000;
        margin-top: 20px;
        &:hover{
          background: #ffce1d;
          border-radius: 1px;
        }
      }
    }
    .right{
      box-sizing: border-box;
      width: 482px;
      height: 100%;
      background: #FAF9F3;
      float: right;
      padding: 44px 55px;
      .tit{
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #000000;
        letter-spacing: 0;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 2px;
      }
      .way{
        margin-top: 50px;
        .email{
          margin-top: 20px;
          span{
            background: url("../assets/images/email.png") no-repeat center;
            background-size: 100%;
          }
        }
        .phone-num{
          span{
            background: url("../assets/images/phone.png") no-repeat;
            background-size: 100%;
          }
        }
        a{
          font-family: Avenir-Medium;
          font-size: 20px;
          color: #333333;
          letter-spacing: 0;
        }
        >div{
          >span{
            width: 12px;
            height: 12px;
            display: inline-block;
            margin-right: 15px;
          }
        }
      }
    }
  }
  .amap-demo {
    height: 300px;
  }
  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .clear{
    clear: both;
  }
  /deep/ .ivu-modal-header{
    border-bottom-width: 0px!important;
  }

  /*地图弹框*/
  .map-hover{
    width: 250px;
    padding-bottom: 20px;
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    text-align: center;
    font-size: 0;
    &:nth-child(even){
      margin-left: 20px;
    }
    img{
      width: 100%;
      height: 112px;
    }
    .name{
      padding: 0 42px;
      font-family: Avenir-Heavy;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      text-align: center;
      line-height: 25px;
      white-space:nowrap;
      margin-top: 15px;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .addr{
      padding: 0 20px;
      font-family: Avenir-Roman;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      text-align: center;
      line-height: 15px;
      margin-top: 4px;
    }
    >ul{
      margin-top: 15px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      >li{
        padding: 0 20px;
        list-style: none;
        font-weight: 600;
        span{
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          &:nth-of-type(1){
            float: left;
          }
          &:nth-of-type(2){
            float: right;
          }
        }
      }
    }
  }
</style>
