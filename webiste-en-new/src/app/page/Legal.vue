<template>
  <div id="main">
    <top-bar></top-bar>
    <div class="kong"></div>
    <div class="layout-inner other-info">
      <header class="floor-title">
        <h2>Legal Statement</h2>
      </header>
      <div class="floor-body">
        <dl>
          <dt>Copyright</dt>
          <dd>
            All contents contained on this website, including texts, images, LOGO, creative and software belong to UCOMMUNE and the providers of contents/information on this website, and are under the protection of the Chinese and international copyright laws. As for copy of all contents on this website (which means collection, combination and re-combination), this website enjoys the exclusive right and is under the protection of the Chinese and international copyright laws. All the software used on this website belongs to UCOMMUNE and the providers of tits software. The specific information of this website can be reprinted with its source indicated only after the permission of the website is obtained.
          </dd>
        </dl>
        <dl>
          <dt>Information Release Clause</dt>
          <dd>
            UCOMMUNE can only be used for legitimate purposes, namely, viewing information, online consultation and users’ communication, etc.
            <ol>
              <li>(1) It is forbidden that there is deficient or false material in the information released. In case that a user is found to violate the relevant usage regulations, we will reserve the right to suspend or terminate the services for this user.</li>
              <li>(2) No information released on this website shall violate the laws, regulations, rules, administration measures and other relevant laws and regulations of the State and the local governments about internet information security.</li>
              <li>(3) The users who release the information should be responsible for explaining the content of the information released, and independently assume all the consequences and legal responsibility arising therefrom.
              </li>
              <li>(4) This website has the right to use all the information the users release through this website, and reserves the right to manage, revise and delete the information released by the users.
              </li>
              <li>(5) Without the authorization of this website, the users are banned from using the information on this website for other purposes.
              </li>
            </ol>
          </dd>
        </dl>
        <dl>
          <dt>Service Termination Clause</dt>
          <dd>
            <ol>
              <li>(1) UCOMMUNE has the right to judge whether the users’ behavior meets the requirements of this service clause. If UCOMMUNE believes that a user violate the regulations of this service clause, it will have the right to terminate the services for this user and delete the information of this user immediately.
              </li>
              <li>(2) UCOMMUNE may modify, suspend or termination part or all of the free services for the users according to the actual situation, and reserve the right not to inform any user or third parties.
              </li>
            </ol>
          </dd>
        </dl>
        <dl>
          <dt>Exceptions Clause</dt>
          <dd>
            <ol>
              <li>(1) This website neither promises that the free services it provides will not be modified, suspended, terminated or delayed, nor guarantees that the user information is absolutely complete and safe. This website will not assume any responsibility for modification, suspension, termination or delay of the free services for the users and the loss of the user information. </li>
              <li>(2) This website just guarantees the authenticity, legality and accuracy of information released by it and other officially recognized information sources, but does not guarantee the authenticity, legality and accuracy of the information released by other uses; the visitors should confirm and assume the risk of using the information by themselves. Besides, this website doesn’t bear the loss and responsibilities arising from untruthful information released by other users rather than it.</li>
            </ol>
          </dd>
        </dl>
        <dl>
          <dt>Change of Service Clauses and Modification f Services</dt>
          <dd>
            UCOMMUNE has the right to change the service clauses when necessary. Once the user service clauses of UCOMMUNE are changed, the change content will be shown on the important pages. If not agreeing on the change, the user can stop obtaining the network service on their own. If the users continue using the network resources, it will be deemed that they have accepted the change of service clauses.
          </dd>
        </dl>
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
  .other-info dl {
    margin-bottom: 30px;
  }
  .other-info dt {
    margin-bottom: 5px;
  }
  .other-info dt, .other-info h1, .other-info h2, .other-info h3, .other-info h4, .other-info h5, .other-info h6 {
    font-weight: 700;
    color: #333333;
  }
  .other-info dd {
    text-indent: 2em;
    font-size: 14px;
  }
  li{
    list-style: none;
  }
  /deep/ .other-info .floor-body {
    font-size: 14px;
  }

  /deep/ .other-info .floor-body {
    padding: 30px 100px 0;   line-height: 30px;
  }
  /deep/ .other-info dd {
    text-indent: 2em;
  }
  .other-info h3, .other-info li {
    margin-bottom: 10px;
  }
</style>


