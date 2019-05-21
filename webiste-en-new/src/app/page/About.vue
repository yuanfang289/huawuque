<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="layout-inner">
      <header class="floor-title floor-title-def">
        <h2>About UCOMMUNE</h2>
      </header>
      <div class="floor-body">
        <div class="pic-box">
          <div class="pic-item">
            <img src="./img/aboutus-banner.jpg">
          </div>
        </div>

      </div>
      <div class="floor-body" style="margin-top: -25px;">
        <div class="ab-text">
          <p style="padding-right: 40px;">UCOMMUNE (Beijing) Venture Investment Co., Ltd(referred to as “UCOMMUNE”) was founded in 2015
            <br>
            by Dr. Mao Daqing, and is recognized asChina’s leading shared working space provider, offering one-stop servicing solutions for start-ups of varied sizes. Headquartered in Beijing,
            the company has set its footprints in over 78 locations across 20 cities worldwide, including
            but not limited to Beijing, Shanghai, Shenzhen, Hangzhou, Nanjing, Xian, Chengdu, Singapore,
            New York, Los Angeles and London, fueling the growth for over 3000 enterprises and over 30,000 individual members.
            <em></em>
            With a market valuation of US$ 1.3 billion after B-round funding, UCOMMUNE includes some globally renowned institutional investors such as Sequoia Capital, Zhen Fund, Noah Wealth
            Management, Sinovation Ventures in its investor roster. UCOMMUNE is privately owned by its founder and CEO Dr. Mao Daqing together with its institutional and individual investors.
            <em></em>
            Fueled by China’s innovation-driven national development scheme, UCOMMUNE is an early adopter of the “share economy” model that mirrors today’s civil and economic development
            status in China (termed as “new normal”) and the trend of vertical integration in commerce and society at large.
            <em></em>
            While actively building economy of scale through soliciting investments, UCOMMUNE advocates consumption-upgrading in line with the central government’s national economic development scheme. Offering integrated multi- functional services and modern office facilities, UCOMMUNE platform is comprised of over 20 leading service and facility providers from a broad range of sectors.
            <em></em>
            Backed by investment in excess of US$14.5 million, UCOMMUNE provides one-stop services
            encompassing financial advisory, human resources, media publishing and consultancy,
            international shared medical service platform, online sport travel commerce, intellectual
            property protection, intelligent hardware, start-up accelerator and interior design.
          </p>
          <p style="padding-left: 40px;"><b>Expanding global community network</b><br>
            UCOMMUNE is actively building a global network of shared working spaces providing long-term leasing, on-demand and short-term leasing solutions to freelancers, start-up entrepreneurs, small medium enterprises and corporations, all under a coherent UCOMMUNE brand.
            <em></em>
            With an international expansion blueprint ready, UCOMMUNE has in the pipeline to develop over
            100,000 seats for entrepreneurs in160 new locations across 32 cities worldwide over the
            next three years. Its thoughtfully crafted spaces covering approximately 7.5 million sqf in total
            combines appealing aesthetics from funky industrial to sleek corporate ambience with
            pragmatic functionalities that caters to companies of varied sizes.
            <em></em>
            UCOMMUNE relies on its proprietary and rigorously-tested mobile-end software to ease the reporting system, location-booking and service-navigation.The UCOMMUNE-branded spaces incorporating IoT, big data and AI technologies are designed to
            enhance the premium member experience at an affordable pricing.
            <em></em>
            With inclusiveness, collaboration and innovation as the hallmark of the brand, UCOMMUNE is rapidly developing its global presence with quality integrated service at the core. Garnering the strengths of a synergistic platform and a vertically-integrated value chain, UCOMMUNE has the
            ambition to challenge the status quo of co-working space and to set the industrial benchmark thereof. Garnering creative talents and its prowess of business synergy, UCOMMUNE is growing to become a world-leading platform and a connected business community that truly nurtures, supports, and grows the many SMEs in China and beyond.
            <em></em>
            <b>Bring Those from the Parallel World Together</b></p>
        </div>
      </div>
      <header class="floor-title floor-title-def">
        <h2>UCOMMUNE’s Team</h2>
      </header>
      <div class="floot-body">
        <div class="inforbox">
          <div class="img-wrap">
            <img src="./img/maodaqing.jpg">
          </div>
          <div class="mdaq-infor">
            <h4>Mao Daqing</h4>
            <div class="margin-t10">
              <p>Mr. Mao Daqing is the founder and chairman of UCOMMUNE.<br><br>
                He ever served as the Senior Vice President of Vanke Group and General Manager of Circum-Bohai-sea region of Singapore CapitaLand Group, the largest real estate company in Asia. <br><br>
                Besides, Mr. Mao Daqing serves as a visiting professor of University of International Business and Economics, a visiting professor of School of Continuing Education, Tsinghua University, a distinguished professor of Department of Architecture, Southeast University, a visiting professor of MBA Center, Chinese Academy of Sciences, an external school counselor of Peking University Law School, a visiting professor of Graduate School, Tsinghua University, an executive director of China's Society for Non-State-Owned Economy and a researcher of China Index Academy. Moreover, he is also an instructor of Western Returned Scholars Association “Returnees Pioneer College” and the head of the instructor group of Beijing Maker Space Alliance.
              </p>
            </div>
          </div>
        </div>
        <ul class="infor-all">
          <li>
            <img src="./img/hzk.jpg">
            <h5>He Zhuangkun</h5>
            <span>CLO</span>
          </li>
          <li>
            <img src="./img/guanxin.jpg">
            <h5>Guan Xin</h5>
            <span>COO</span>
          </li>
          <li>
            <img src="./img/liuying.jpg">
            <h5>Liu Ying</h5>
            <span>VP</span>
          </li>
          <li>
            <img src="./img/wanghuiyuan.jpg">
            <h5>Wang Huiyuan</h5>
            <span>CHO</span>
          </li>
          <li>
            <img src="./img/xbc.jpg">
            <h5>Xu Binchao</h5>
            <span>CTO</span>
          </li>
          <li>
            <img src="./img/sn.jpg">
            <h5>Shi Nan</h5>
            <span>VP</span>
          </li>
          <li>
            <img src="./img/zhangpeng.jpg">
            <h5>Zhang Peng</h5>
            <span>CSO</span>
          </li>
          <li>
            <img src="./img/luyf.jpg">
            <h5>Lu Yongfeng</h5>
            <span>General Manager of Shanghai Branch</span>
          </li>
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
  .pic-box .pic-item:first-child .pic-text {
    padding: 40px 80px;
    text-align: left;
    font-size: 18px;
    text-indent: 2em;
    line-height: 25px;
  }
  .pic-box .pic-item:first-child .pic-text dt {
    margin-bottom: 18px;
    font-size: 26px;
    text-indent: 0;
  }
  .pic-box .pic-item:first-child .pic-text p {
    margin-bottom: 10px;
  }
  .inforbox .mdaq-infor {
    width:900px;
  }
  .inforbox .mdaq-infor div {
    font-size:16px;
    line-height:20px;
    text-align: justify;
  }
  .inforbox .mdaq-infor .margin-t10 {
    margin-top: 10px;
  }
  .infor-all li {
    height:308px;
  }
  .infor-all li span {
    height: auto;
    padding: 0 10px;
    font-size: 14px;
  }
  .pic-box .pic-item:first-child .pic-text {
    padding: 80px;
    text-align: left;
    font-size: 18px;
    text-indent: 2em;
  }
  .pic-box .pic-item:first-child .pic-text dt {
    font-size: 28px;
    text-indent: 0;
  }
  .pic-box .pic-item:first-child .pic-text p {
    margin-bottom: 10px;
  }
  .ab-text:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .ab-text {
    padding: 30px 56px;
    background: #f8f8f8;
  }
  .ab-text p{
    float: left;
    text-align:justify;
    width:544px;
    line-height:30px;
    font-size:14px;
    color:#333;
  }
  .ab-text em{
    display: block;
    margin-bottom:15px;
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
    font-weight: 500;
  }
  li{
    list-style: none;
  }
</style>

