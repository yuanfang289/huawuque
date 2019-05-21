<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="layout-inner other-info">
      <header class="floor-title">
        <h2>Contact Us</h2>
      </header>
      <div class="floor-body">
        <ul style="font-size: 14px">
          <li>Complaint and suggestion: tousu@ucommune.com</li>
          <li>Recruitment Email: hr@ucommune.com</li>
          <li>Business Cooperation: marketing@ucommune.com</li>
          <li>Branding Cooperation: branding@ucommune.com</li>
          <li>Hotline: 400-1188-891</li>
          <li>Official WeChat: Search “优客工场” or WeChat number - ucommune</li>
          <li><br>Address: Sunshine Block 100D, No. 2, Guanghua Road, Chaoyang District, Beijing</li>
        </ul>
      </div>
    </div>
    <Footer style="margin-top: 0px"></Footer>
  </div>
</template>

<script>
  import TopBar from '@/components/topbar/TopBar';
  import Footer from '@/components/footer/Footer';
  import '@/app/page/img/aboutus.min.css';
  export default {
    components: {
      TopBar,
      Footer
    },
    data: function() {
      return {
      };
    },
    computed: {

    },
    methods: {
    },
    mounted(){

    },
    watch: {

    },
    created(){

    }
  }
</script>

<style lang="scss" scoped>
  #main {
    padding-top: 70px;
  }

  .other-info .floor-body {
    padding: 30px 100px 0;
    font-size: 12px;
    line-height: 1.8;
  }
  .floor-body {
    margin-bottom: 100px;
  }
  .floor-title {
    margin-bottom: 20px;
    height: 40px;
    border-bottom: 2px solid #e5e5e5;
    line-height: 38px;
    margin-top: 30px;
  }

  .floor-title a,.floor-title h2 {
    position: relative;
    float: left;
    border-bottom: 2px solid #f8ce00;
    font-size: 14px;
    line-height: 38px;
  }

  .floor-title a {
    margin-right: 15px;
    border-bottom: 2px solid #e5e5e5;
    text-align: center;
  }

  .floor-title a.selected {
    border-bottom: 2px solid #ea5514;
  }

  .floor-title>p {
    float: left;
    overflow: hidden;
    margin: 14px 10px 0;
    max-width: 65%;
    color: #999;
    font-size: 12px;
    line-height: 16px;
  }

  .floor-title .aside {
    float: right;
    font-size: 15px;
  }

  .floor-title .aside>a {
    color: #666;
  }

  .floor-title .items {
    float: right;
  }

  .floor-title .items li {
    float: left;
    margin-left: 10px;
    min-width: 60px;
    text-align: center;
  }

  .floor-title .items a {
    color: #999;
  }

  .floor-title .items a.active,.floor-title .items a:hover {
    color: #ea5514;
  }

  .floor-title.floor-title-def h2 {
    font-size: 20px;
  }

  .floor-title.floor-title-apps {
    border-bottom: 1px solid #999;
  }

  .floor-title.floor-title-apps h2 {
    border-bottom: 0;
    color: #666;
    font-size: 16px;
  }
  .layout-inner {
    width: 1200px;
    margin-right: auto;
    margin-left: auto;
  }
  .inforbox {
    display: -ms-flexbox;
    display: flex;
  }
  img {
    vertical-align: middle;
  }
  abbr, fieldset, img {
    border: 0;
  }
  .table, img {
    max-width: 100%;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 700;
  }
  li{
    list-style: none;
  }

  .other-info dl {
    margin-bottom: 30px;
  }
  .other-info dt {
    margin-bottom: 5px;
  }
  .other-info dt, .other-info h1, .other-info h2, .other-info h3, .other-info h4, .other-info h5, .other-info h6 {
    font-weight: 700;
  }
  dt, th {
    font-weight: 500;
  }
  .other-info dd {
    text-indent: 2em;
  }
</style>


