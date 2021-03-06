/**
 * Created by xiezy on 2018/11/1.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return new Promise((resolve, reject) => {
    resolve({data:new Map([
      [1,{
        "id":1,
        "realname":"张龙跃",
        "mobile":"13910791326",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhanglongyue.png",
        "profession":"创业服务",
        "company":"优客工场（北京）创业投资有限公司",
        "introduce":"优客工场员工，喜爱唱歌，感谢优客工场能提供这样一个平台来展现自己的个人爱好。在优客工场这样一个大家庭里，除了好好工作，没准儿就在娱乐圈里出道了。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhanglongyue.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhanglongyue2.mp4'
      }],
      [2,{
        "id":2,
        "realname":"袁子淅",
        "mobile":"13810322597",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/yuanzixi.png",
        "profession":"投资孵化",
        "company":"扬州软件园北京分公司",
        "introduce":"我是一个把音乐融入血液里的人，如同空气、如同生命一样的热爱。",
        "phone":"http://img.urwork.cn/chinaVoice/img/yuanzixi.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/yuanzixi2.mp4'
      }],
      [3,{
        "id":3,
        "realname":"王儒实",
        "mobile":"15101666956",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wangrushi.png",
        "profession":"项目拓展",
        "company":"优客工场",
        "introduce":"93年男生，白羊座，优客工场项目拓展，喜欢运动、听歌、打游戏、睡觉。",
        "phone":"http://img.urwork.cn/chinaVoice/img/wangrushi.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wangrushi2.mp4'
      }],
      [4,{
        "id":4,
        "realname":"张凌韬",
        "mobile":"18611120323",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhanglingtao.png",
        "profession":"员工",
        "company":"优客工场",
        "introduce":"95年，白羊座，优客工场员工。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhanglingtao.JPG",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhanglingtao2.mp4'
      }],
      [5,{
        "id":5,
        "realname":"裴奕智",
        "mobile":"18684780920",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/peiyizhi.png",
        "profession":"ceo",
        "company":"峰谷资本",
        "introduce":"25岁的我参加好声音，告诉自己这还不算输。",
        "phone":"http://img.urwork.cn/chinaVoice/img/peiyizhi.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/peiyizhi2.mp4'
      }],
      [6,{
        "id":6,
        "realname":"曹磊",
        "mobile":"18612835970",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/caolei.png",
        "profession":"员工",
        "company":"优客工场",
        "introduce":"来自北京怀柔，从小喜欢唱歌，但总是被朋友打击的我，终于可以趁着这次机会“一展歌喉”！希望不要吓到你们哦！",
        "phone":"http://img.urwork.cn/chinaVoice/img/caolei.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/caolei2.mp4'
      }],
      [7,{
        "id":7,
        "realname":"王赫",
        "mobile":"13811181831",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wanghe.png",
        "profession":"共享办公",
        "company":"优客工场",
        "introduce":"爱音乐，爱打鼓，爱摄影，斜杠青年本青。",
        "phone":"http://img.urwork.cn/chinaVoice/img/wanghe.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wanghe2.mp4'
      }],
      [8,{
        "id":8,
        "realname":"曾少",
        "mobile":"15259202061",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zengshao.png",
        "profession":"行政",
        "company":"北京房达人",
        "introduce":"前面是绝路  希望在转角",
        "phone":"http://img.urwork.cn/chinaVoice/img/zengshao.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zengshao2.mp4'
      }],
      [9,{
        "id":9,
        "realname":"张展维",
        "mobile":"13520232687",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhangzhanwei.png",
        "profession":"项目顾问",
        "company":"北京普照天星科技有限公司",
        "introduce":"2010年参加河北省精彩在沃校园歌手大赛，荣获石家庄市第一名。宣言：通过歌声传递能量。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhangzhanwei.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhangzhanwei2.mp4'
      }],
      [10,{
        "id":10,
        "realname":"两张组合",
        "mobile":"15718815297",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/liangzhangzuhe.png",
        "profession":"开书店",
        "company":"书店",
        "introduce":"我们是“两张”组合，一个张曼曼，一个张太阳。我们是两个来自吉林喜欢唱歌的女生，如果我们的音乐能让大家感到放松和愉悦，我们就心满意足啦。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhangye.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/liangzhang2.mp4'
      }],
      [11,{
        "id":11,
        "realname":"赵生光",
        "mobile":"15733300582",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhaoshengguang.png",
        "profession":"行业咨询经理",
        "company":"北京铂金智慧科技",
        "introduce":"29岁，汉族，出生于河北省唐山市，工作于互联网数据分析行业，担任公司线上营销咨询总监。性格开朗、幽默。歌唱爱好者。2005-2007年年曾在学校组建乐队，并担任主唱和节奏吉他手。擅长演绎摇滚、流行曲风。梦想宣言“关于歌唱，哭过、笑过但未曾放弃过！”",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhaoshengguang.png",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhaoshengguang2.mp4'
      }],
      [12,{
        "id":12,
        "realname":"商尚",
        "mobile":"13911336576",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/shangshang.png",
        "profession":"创始人兼CEO",
        "company":"北京派润泽科技有限公司",
        "introduce":"本名商尚，北京人，微信公众号“你和宝宝说英语”创始人，音乐剧爱好者，毕业于北京大学、LSE。致力于帮助中国家长和自己的宝宝说英语，梦想是引进适合孩子的英文音乐剧，并打造世界水平的中文儿童音乐剧。",
        "phone":"http://img.urwork.cn/chinaVoice/img/shangshang.jpeg",
        "videoSrc":'123'
      }],
      [13,{
        "id":13,
        "realname":"宋爽",
        "mobile":"18500569693",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/songshuang.png",
        "profession":"视觉设计",
        "company":"北京优果儿视觉文化传媒有限公司",
        "introduce":"",
        "phone":"http://img.urwork.cn/chinaVoice/img/songshuang.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/songshuang2.mp4'
      }],
      [14,{
        "id":14,
        "realname":"郑屹",
        "mobile":"13811035610",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhengyi.png",
        "profession":"财务",
        "company":"泛优咨询顾问（北京）有限公司",
        "introduce":"出生于北京，我的宣言是我不是最棒的，但我相信我在用心歌唱。愿我带来的每一个音符都能打动你们的心。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhengyi.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhengyi2.mp4'
      }],
      [15,{
        "id":15,
        "realname":"曾族",
        "mobile":"15010798075",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zengzu.png",
        "profession":"平面设计师",
        "company":"北京天下美食餐饮管理有限公司",
        "introduce":"不是最会唱歌的，但绝对是热爱唱歌的，坚持我的音乐梦想，尽自己最大的努力！",
        "phone":"http://img.urwork.cn/chinaVoice/img/zengzu.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zengzu2.mp4'
      }],
      [16,{
        "id":16,
        "realname":"刘涛",
        "mobile":"17611738176",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/liutao.png",
        "profession":"老师",
        "company":"学校",
        "introduce":"站在聚光灯下歌唱是我不曾改变的理想，我的参赛宣言是:在不一样的舞台，秀出不一样的风格，表现出不一样的自己。",
        "phone":"http://img.urwork.cn/chinaVoice/img/liutao.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/liutao2.mp4'
      }],
      [17,{
        "id":17,
        "realname":"李爽",
        "mobile":"13720030730",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/lishuang.png",
        "profession":"运营",
        "company":"佳兆业",
        "introduce":"一个热爱唱歌但是又唱不好的三张油腻大叔，热衷于民谣与摇滚请大家多多支持我。",
        "phone":"http://img.urwork.cn/chinaVoice/img/lishuang.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/lishuang2.mp4'
      }],
      [18,{
        "id":18,
        "realname":"李京",
        "mobile":"13853453910",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/lijing.png",
        "profession":"学生",
        "company":"学生",
        "introduce":"",
        "phone":"http://img.urwork.cn/chinaVoice/img/lijing.jpeg",
        "videoSrc":'123'
      }],
      [19,{
        "id":19,
        "realname":"王晓天",
        "mobile":"18310987115",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wangxiaotian.png",
        "profession":"策划师",
        "company":"优客工场",
        "introduce":"套马的汉子，北漂婚礼主持人，魁梧的躯壳下有一颗细腻的心，“高富帅”我占了两个，足矣。我愿意把我的故事唱给你们听，你愿意为我鼓掌吗？",
        "phone":"http://img.urwork.cn/chinaVoice/img/wangxiaotian.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wangxiaotian2.mp4'
      }],
      [20,{
        "id":20,
        "realname":"武斌",
        "mobile":"17340796030",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wubin.png",
        "profession":"实习生",
        "company":"赛博龙科技（北京）有限公司",
        "introduce":"来自某大学和某公司的一枚大三实习生，张家口人，喜欢唱喜欢嚎就完事儿了！宣言：我不想火，我只是喜欢舞台，佛系参赛，飚就完了。",
        "phone":"http://img.urwork.cn/chinaVoice/img/wubin.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wubin2.mp4'
      }],
      [21,{
        "id":21,
        "realname":"陈羽豪",
        "mobile":"18600470537",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/chenyuhao.png",
        "profession":"运营专员",
        "company":"优客工场",
        "introduce":"来自北京朝阳。有一颗热爱音乐的心，感谢这次机会可以展现自我。",
        "phone":"http://img.urwork.cn/chinaVoice/img/chengyuhao.png",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/chenyuhao2.mp4'
      }],
      [22,{
        "id":22,
        "realname":"马艺",
        "mobile":"18611448122",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/mayi.png",
        "profession":"销售",
        "company":"优客（北京）广告传媒有限公司",
        "introduce":"东北女孩，爱吃爱玩爱睡爱笑，平时喜欢打游戏看电影，音乐是我生命中不可缺少的一部分，希望你们会喜欢我的表演。",
        "phone":"http://img.urwork.cn/chinaVoice/img/mayi.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/mayi2.mp4'
      }],
      [23,{
        "id":23,
        "realname":"灏灏同学",
        "mobile":"17602189695",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/haohaotongxue.png",
        "profession":"新媒体运营",
        "company":"北京云销互动科技有限公司",
        "introduce":"93年的老年人，做新媒体工作。宣言是，好好工作，开心唱歌。",
        "phone":"http://img.urwork.cn/chinaVoice/img/haohaotongxue.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/haohaotongxue2.mp4'
      }],
      [24,{
        "id":24,
        "realname":"雷宇鑫",
        "mobile":"15811085078",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/leixuxin.png",
        "profession":"社区运营专员",
        "company":"洪泰创新空间(北京)创业投资有限公司",
        "introduce":"",
        "phone":"http://img.urwork.cn/chinaVoice/img/leiyuxin.jpeg",
        "videoSrc":'123'
      }],
      [25,{
        "id":25,
        "realname":"丁思怡",
        "mobile":"17744561684",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/dingsiyi.png",
        "profession":"运营",
        "company":"Keep",
        "introduce":"别名:丁丁，身高165cm，体重53kg，1995年2月26日出生于湖北省孝感市，喜欢的音乐风格有流行、民族、摇滚，兴趣:唱歌、舞蹈、运动、设计，对音乐的看法是用心唱出来的就是好声音，座右铭:越努力越幸运。",
        "phone":"http://img.urwork.cn/chinaVoice/img/dingsiyi.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/dingsiyi2.mp4'
      }],
      [26,{
        "id":26,
        "realname":"袁承铂",
        "mobile":"15930287211",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/yuanchengbo.png",
        "profession":"运营助理",
        "company":"磨呗咖啡",
        "introduce":"来自磨呗咖啡，一个不唱歌会死星人，真诚又乐观～能够站上这个舞台，十分感激。与大家分享自己歌唱的快乐，荣幸之至。我喜欢用音乐交朋友，希望得到你们的支持与肯定，如果喜欢我的话请用力的为我打call吧！！！",
        "phone":"http://img.urwork.cn/chinaVoice/img/yuanchengbo.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/yuanchengbo2.mp4'
      }],
      [27,{
        "id":27,
        "realname":"鳗鱼",
        "mobile":"13240081208",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/manyu.png",
        "profession":"设计",
        "company":"然则设计",
        "introduce":"原名李丽娜，93年，祖籍湖南祁东，白羊座，平面设计，喜欢滑板、狼人杀、偶尔吃鸡，有时候是个厨子～也追星，本命是张根硕，所以自学了一点韩语，这个人还喜欢各种语言方言，参加这个活动主要想混个脸熟重在参与，当然，要能找个男朋友更好，谢谢大家～",
        "phone":"http://img.urwork.cn/chinaVoice/img/manyu.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/manyu2.mp4'
      }],
      [28,{
        "id":28,
        "realname":"杨可昕",
        "mobile":"18500656391",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/yangkexin.png",
        "profession":"学生",
        "company":"香港大学",
        "introduce":"一个爱唱歌的女孩。 宣言：开开心心唱歌。",
        "phone":"http://img.urwork.cn/chinaVoice/img/yangkexin.JPG",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/yangkexin2.mp4'
      }],
      [29,{
        "id":29,
        "realname":"张芾",
        "mobile":"13801040662",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhangfu.png",
        "profession":"员工",
        "company":"跑哪儿科技（北京）有限公司",
        "introduce":"在英国学习平面设计现在是体育行业的小市场推广，音乐是留学在外时的陪伴，曾经差点冲动在一家唱片公司签约，是金钱让我恢复了理智。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhangfu.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhangfu2.mp4'
      }],
      [30,{
        "id":30,
        "realname":"朱其民",
        "mobile":"13811520649",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhuqimin.png",
        "profession":"创始人",
        "company":"北京聪明文化传媒有限公司",
        "introduce":"创业者。十一年前，我写的歌曲《老人与海》大热，但我却遗憾离开了音乐，十一年后，已过而立之年的我，重新回到舞台，只希望找回初心，享受音乐。希望你们喜欢我的表演，谢谢。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhuqimin.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhuqimin2.mp4'
      }],
      [31,{
        "id":31,
        "realname":"杨岚",
        "mobile":"13810809437",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/yanglan.png",
        "profession":"猎头助理顾问",
        "company":"泛优咨询",
        "introduce":"来自吉林，是一个喜欢唱歌的东北姑娘，刚刚踏入职场，目前是泛优咨询的一名猎头助理顾问，虽然我很慢热，但我会用歌声让你们认识我~",
        "phone":"http://img.urwork.cn/chinaVoice/img/yanglan.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/yanglan2.mp4'
      }],
      [32,{
        "id":32,
        "realname":"胡皓月",
        "mobile":"18610889033",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/huhaoyue.png",
        "profession":"咨询顾问",
        "company":"泛优咨询",
        "introduce":"摩羯座，北京姑娘。因为从高中起就有留学意愿，想让自己有更多选择遂出国，2017年底毕业后选择从加拿大回国陪伴父母。从小在部队大院儿长大，受家庭环境的影响，性格爽朗、简单、直接。家长注重素质教育，从小学习歌舞乐器，但自己却独独热爱唱歌，属于“校园歌唱比赛“的积极分子。虽然没有大舞台经验，但对于大舞台有着满满的向往。",
        "phone":"http://img.urwork.cn/chinaVoice/img/huhaoyue.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/huhaoyue2.mp4'
      }],
      [33,{
        "id":33,
        "realname":"柳连江",
        "mobile":"13603555585",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/liulianjiang.png",
        "profession":"经理",
        "company":"小麦智联",
        "introduce":"山西右玉，1982年生，现北京从事销售工作。",
        "phone":"http://img.urwork.cn/chinaVoice/img/liulianjiang.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/liulianjiang2.mp4'
      }],
      [34,{
        "id":34,
        "realname":"王苾滢",
        "mobile":"15001383967",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wangbiying.png",
        "profession":"新媒体运营",
        "company":"优享创智（北京）科技服务有限公司",
        "introduce":"95后北京女孩，水瓶座，共享际新媒体运营，毕业于首经贸。第一眼文静淑女，熟了秒变女神经。爱好唱歌，歌路不定，也爱听歌，偶尔民谣清新，偶尔嘻哈说唱。哦对了还爱看电影，漫威粉！",
        "phone":"http://img.urwork.cn/chinaVoice/img/wangbiying.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wangbiying2.mp4'
      }],
      [35,{
        "id":35,
        "realname":"潘璟瑜",
        "mobile":"13503350897",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/panjingyu.png",
        "profession":"项目运营",
        "company":"心理咨询中心",
        "introduce":"出生于河北秦皇岛市，曾从事过汽车、房地产、高尔夫和心理行业，现于北京正在探索自己。",
        "phone":"http://img.urwork.cn/chinaVoice/img/panjingyu.jpg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/panjingyu2.mp4'
      }],
      [36,{
        "id":36,
        "realname":"王周继晏",
        "mobile":"18513504626",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/wangzhoujiyan.png",
        "profession":"专员",
        "company":"优客工场",
        "introduce":"一个爱唱歌的视力障碍女孩，人生大闹一场，永世笑傲江湖，我的人生，就要活出我的味道。",
        "phone":"http://img.urwork.cn/chinaVoice/img/wangzhoujiyan.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/wangzhoujiyan2.mp4'
      }],
      [37,{
        "id":37,
        "realname":"张荐尧",
        "mobile":"15120098964",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhangjianyao.png",
        "profession":"产品运营",
        "company":"优客工场",
        "introduce":"娱乐第一，比赛第二。主要为衬托其他选手而来，同时增加歌曲风格多样性，挑战自我，娱乐大众，何乐不为！",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhangjianyao.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhangjianyao2.mp4'
      }],
      [38,{
        "id":38,
        "realname":"李森",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/lisen.png",
        "profession":"品牌活动",
        "company":"优客工场",
        "introduce":"有空儿就玩儿唱吧的东北小伙儿，一直以文艺青年自居，常被美好的音乐感动。",
        "phone":"http://img.urwork.cn/chinaVoice/img/lisen.jpeg",
        "videoSrc":'123'
      }],
      [39,{
        "id":39,
        "realname":"张海琼",
        "mobile":"18610003702",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhanghaiqiong.jpeg",
        "profession":"产品经理",
        "company":"优客工场",
        "introduce":"喜欢唱歌的处女座产品喵一只",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhanghaiqiong.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhanghaiqiong2.mp4'
      }],
      [40,{
        "id":40,
        "realname":"李耕宇",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/ligengyu.jpeg",
        "profession":"产品经理",
        "company":"优客工场",
        "introduce":"爱生活 爱音乐 带上音乐 重新上路",
        "phone":"http://img.urwork.cn/chinaVoice/img/ligengyu.png",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/ligengyu2.mp4'
      }],
      [41,{
        "id":41,
        "realname":"赵圳楠",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhaozhennan.png",
        "profession":"",
        "company":"",
        "introduce":"我是来自天津的情歌小王子赵圳楠，成为歌手是我的梦想，我要站在大舞台上唱好听的歌-给可爱的你们",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhaozhennan.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhaozhennan2.mp4'
      }],
      [42,{
        "id":42,
        "realname":"小雅",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/lisen.png",
        "profession":"",
        "company":"",
        "introduce":"",
        "phone":"http://img.urwork.cn/chinaVoice/img/lisen.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/xiaoya2.mp4'
      }],
      [43,{
        "id":43,
        "realname":"易娟",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/yijuan.png",
        "profession":"",
        "company":"",
        "introduce":"我是一名软萌设计师，平时爱好唱歌，有幸参加好声音比赛非常开心！",
        "phone":"http://img.urwork.cn/chinaVoice/img/yijuan.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/yijuan2.mp4'
      }],
      [44,{
        "id":44,
        "realname":"张项链",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/zhangxianglian.png",
        "profession":"员工",
        "company":"得到",
        "introduce":"一个从来不知道自己唱歌时候调在哪里的设计师（麻烦看到调请告诉它我在找它）。",
        "phone":"http://img.urwork.cn/chinaVoice/img/zhangxianglian.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/zhangxianglian2.mp4'
      }],
      [45,{
        "id":45,
        "realname":"李好",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/lihao.png",
        "profession":"",
        "company":"",
        "introduce":"木子李，女子好，hallo 我是李好",
        "phone":"http://img.urwork.cn/chinaVoice/img/lihao.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/lihao2.mp4'
      }],
      [46,{
        "id":46,
        "realname":"韩宇",
        "mobile":"18624022052",
        "headImg":"http://img.urwork.cn/chinaVoice/headimg/hanyu.png",
        "profession":"员工",
        "company":"得到",
        "introduce":"我是一名程序猿，每天往返于各种会议和代码之间，不唱歌就可惜了我这完美的声线和干净的脸庞，嘻嘻。",
        "phone":"http://img.urwork.cn/chinaVoice/img/hanyu.jpeg",
        "videoSrc":'http://img.urwork.cn/chinaVoice/video/hanyu2.mp4'
      }]
    ])});
  })
}
