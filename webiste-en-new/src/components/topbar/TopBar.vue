<template>
  <div class="top-bar-box">
    <div class="top-bar">
      <div class="logo">
        <a href="javascript:void(0)">
          <router-link to="index">
            <img :src="logoImg">
          </router-link>
        </a>
      </div>
      <div class="tab">
        <ul id="ul">
          <a v-for="item in tab" :href="'javascript:void(0)'">
            <template v-if="item.href!='consult'">
              <router-link :to="{name: item.href}">
                <li>{{item.content}}<span v-if="item.checked"></span> </li>
              </router-link>
            </template>
            <template v-if="item.href=='consult'">
              <li @click="$refs.ct.open()">{{item.content}}<span v-if="item.checked"></span> </li>
            </template>

          </a>

          <!--<a href="/commu">-->
          <!--<li>Communities<span></span> </li>-->
          <!--</a>-->
          <!--&lt;!&ndash;<li>Events</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>News</li>&ndash;&gt;-->
          <!--<a href="/appdown">-->
          <!--<li>App<span></span></li>-->
          <!--</a>-->
          <!--<a href="/consult">-->
          <!--<li>Contact Us<span></span></li>-->
          <!--</a>-->
        </ul>
      </div>
      <Consult ref="ct"></Consult>
    </div>
  </div>
</template>

<script>

  /**
   * 页面头部topBar
   */
  import Consult from '@/components/consult';
  import PhoneInput from '@/components/PhoneInput';
  export default {
    components: {
      PhoneInput,
      Consult
    },
    data() {
      return {
        tab:[
          {href:'commu',content:'Communities',checked:false},
          {href:'appdown',content:'App',checked:false},
          {href:'consult',content:'Contact Us',checked:false}
        ],
        logoImg:require('../../assets/images/logo.png'),
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      openConsult(){
          this.$refs.ct.open();
      },
      navigateTo(name){
        this.$router.push({
          name: name
        })
      }
    },
    mounted() {
      let checkedstr = window.location.pathname;
      this.tab.map(function (obj,idx) {
        if(checkedstr.indexOf(obj.href)>-1){
           obj.checked = true;
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .top-bar-box{
    width: 100%;
    position: fixed;
    background: #ffffff;
    top: 0;
    z-index: 1010;
    border-bottom: 1px solid #f0f0f0;
  }
  .top-bar {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
  }
  .top-bar .logo {
    height: 80px;
    display: inline-block;
    float: left;
  }

  #main .top-bar .logo a {
    height: 80px;
    display: inline-block;
  }

  .top-bar .logo img {
    height: 60px;
    display: inline-block;
    line-height: 80px;
    margin-top: 10px;
  }

  .top-bar .tab {
    height: 80px;
    display: inline-block;
    font-size: 12px;
    float: right;
  }
  .top-bar .tab ul{
    padding-right: 129px;
  }
  .top-bar .tab ul a {
    color: #333333;
  }
  .top-bar .tab ul li {
    list-style: none;
    float: left;
    line-height: 80px;
    font-size: 14px;
    font-weight:bold;
    padding: 0 22px;
    overflow: hidden;
    position: relative;
    span{
      width: 30px;
      height: 4px;
      background: #FFD53D;
      position: absolute;
      bottom: 20px;
      left: 50%;
      margin-left: -15px;
    }
  }
</style>
