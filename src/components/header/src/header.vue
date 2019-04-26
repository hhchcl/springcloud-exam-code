<template>
  <header class="header">
    <!--logo-->
    <div class="header-content container-border-b">
      <div class="main-container">
        <div class="header-logo fl mt25"><img src="../../../images/common/logo2.png" /></div>
        <h3 class="fl mt35 ml30 fs20">Guangxi University Of Foreign Languages</h3>
        <div class="fr mt25" v-if="!headerMenu">
          <!--<img src="../../../images/common/loginHeaderRight.jpg" />-->
        </div>
        <div class="header-icon fr mt25" v-if="headerMenu">
          <span>欢迎 </span>
          <span class="cOrange">{{ $tools.storage.get("user","save") ? $tools.storage.get("user","save").alias:""}}</span>
          <a class="hearderQuit" @click="logout">退出</a>
        </div>
      </div>
    </div>
    <div class="header-icon fr mt-20 mr10 fs16">

    <span v-if="headerMenu" v-for="item in items"> <a class="cBlue"  @click="toMenu(item)"> {{item.bsnName}} </a><span>&nbsp&nbsp&nbsp&nbsp&nbsp</span></span>
    </div>
    
    <!--logo--end-->
    <!--一级菜单-->
    <div class="header-subnav one-menu position-r" v-if="headerMenu">
      <div class="main-container position-r">
        <el-menu class="menu-flex" :default-active="$route.path" mode="horizontal" router>
          <template v-for="(item,index) in menu">
            <li v-if="item.isOpen=='0'" class="el-menu-item" @click="isOpen(item.warnMsg)">{{item.bsnName}}</li>
            <el-menu-item v-else :index="item.url" >{{item.bsnName}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
    <!--一级菜单--end-->
    <!--二、三级菜单-->
    <div class="two-menu BoxShadow mb20" v-if="false">
      <div class="main-container">
        <div class="plr10">
          <el-menu :default-active="$route.path" mode="horizontal" router>
            <template v-for="(item,index) in twoMenu">
              <template v-if="item.childrens.length">
                <li class="twoChild el-submenu" @mouseenter="showThreeMenu" @mouseleave="hideThreeMenu">
                  <div class="el-submenu__title">{{item.bsnName}}
                    <i class="el-submenu__icon-arrow el-icon-caret-bottom"></i>
                  </div>
                  <el-menu :default-active="$route.path" router v-show="false" class="three-menu" @select="jumpCloseMenu">
                    <el-menu-item v-for="child in item.childrens" :key="index" :index="child.url">{{child.bsnName}}</el-menu-item>
                  </el-menu>
                </li>
              </template>
              <template v-else>
                <li v-if="item.isOpen=='0'" class="el-menu-item twoChild" @click="isOpen(item.warnMsg)">{{item.bsnName}}</li>
                <el-menu-item v-else class="twoChild" :index="item.url">{{item.bsnName}}</el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
      </div>
    </div>
    <!--三级菜单--end-->
    <div class="leftMenu position-a two-menu" v-if="headerMenu">
      <el-menu :default-active="$route.path" router>
        <template v-for="(item,index) in twoMenu">
          <el-submenu v-if="item.childrens.length" class="twoChild" :index="index+''">
            <template slot="title">{{item.bsnName}}</template>
            <div v-for="(itemChild,index) in item.childrens" class="three-menu">
              <el-menu-item :index="itemChild.url">{{itemChild.bsnName}}</el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-else class="twoChild" :index="item.url">{{item.bsnName}}</el-menu-item>
        </template>
      </el-menu>
    </div>
  </header>
</template>

<script>
import menuList from '@/components/menu.js' //测试用菜单
import axios from 'axios'
export default {
  name: 'header',
  componentName: 'header',
  components: {
    menuList: menuList
  },
  data() {
    return {
      menu: [],
      twoMenu: [],
      threeMenu: [],
      isShowTwo: false,
      isShowThree: false,
      menuSearchData: "",
      cbLogin: "",
      cbHome: "",
      userName: "",
      items:[],
      isCloseMenu:true,
      isOpenMenu:false,
      projectMessage: "",
      user:{},
    };
  },// data
  props: {
    headerInformation: { type: Boolean, default: false },
    headerMenu: { type: Boolean, default: false }
  },
  methods: {
    toMenu(val){
        let _this = this
        console.log("跳转地址:"+val.url)
        _this.$router.push({ path: val.menuFlag+'' })
    },
    up(){  //收起快捷菜单方法
        let _this = this
        $(".shortCut").slideUp("show")
        _this.isCloseMenu = false
        _this.isOpenMenu = true
    },
    down(){  //展开快捷菜单方法
        let _this = this
        $(".shortCut").slideDown("slow")
        _this.isCloseMenu = true
        _this.isOpenMenu = false 
    },
    getShortMenu(){     //请求快捷菜单
        let _this = this
        // _this.requestMenu()
        let body = {}
        body.userNo = this.$tools.storage.get("user","save").userNo,
        body.count = '5'//快捷菜单显示条数
        _this.$tools.request(_this,"IM0701QueryAction.do",body).then(data =>{
            console.log("data:"+JSON.stringify(data))
            _this.items = data.body.imBsnList
            _this.items.push({bsnName: 'setting',menuFlag:'/personalSet' })
            //console.log("快捷菜单:"+_this.items)
        })
        
    },
    toMenu(val){
            let _this = this
            //console.log("跳转地址:"+val.url)
            _this.$router.push({ path: val.menuFlag+'' })
    },
    showThreeMenu(e) {
      $(e.target).addClass("is-opened")
      $(e.target).find(".el-menu").stop().fadeIn()
    },
    hideThreeMenu(e) {
      $(e.target).removeClass("is-opened")
      $(e.target).find(".el-menu").stop().fadeOut()
    },
    jumpCloseMenu() {
      $(".twoChild.is-opened").removeClass("is-opened")
      $(".three-menu").hide()
    },
    handleIconClick(e) {
      //console.log(this.menuSearchData)
    },
    isOpen(warnMsg) {
      this.$alert(warnMsg, '提醒')
    },
    logout() {   // 退出登录
      var _this = this
      this.$confirm('确定注销登录?', '提示', {
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type: 'warning'
      }).then(() => {
        //sessionStorage.clear()
       // _this.$tools.request(_this,"IM000104Action.do").then(data =>{
        _this.$tools.storage.get("user")
        _this.$tools.storage.get("menu")
        _this.$tools.storage.get("menuGround")
        _this.$router.push({ path: '/login/loginMain' })
        //sessionStorage.clear()
        //})
      }).catch(() => {

      });
    },
    onehandleselect(Path, indexPath, e) {  // 一级菜单点击事件
      //let _this=this
      //let menuIndex=$(e.$el).index()
      //_this.twoMenu=_this.menu[menuIndex].iTaskInfo.menu     
    },
    requestMenu() {  // 初次请求菜单
      let _this = this
      let user = _this.$tools.storage.get("user", "save")
      //console.log("user:"+JSON.stringify(user))
      //let body = {}
      //body.userNo = user.userNo
	   let body = {}
				body.userName = user.userName
      //_this.$tools.request(this, "getInitMenu.do",body).then(
	axios.post('/api' + "/getInitMenu.do", body).then(
        data => {
          //测试用菜单
           let dataValue = menuList
           data=dataValue
          //console.log("返回菜单集合" +JSON.stringify(data.body.operRoleMenuList) )
		 
          let menu = []
          menu =data.body.operRoleMenuList;
		  //console.log("返回菜单集合：",JSON.stringify(menu))
          if(user.roleType==0){//sysadmin
            for (let i = 0; i < menu.length; i++) {
				//console.log("返回菜单长度：",menu[i].childrens.length)
              if (menu[i].childrens.length) {
                let children = menu[i].childrens
                if (children[0].childrens.length) {
                  children[0].url = children[0].childrens[0].url
                  menu[i].url = children[0].url
                } else {
                  menu[i].url = children[0].url
                }
                for (let j = 1; j < children.length; j++) {
                  if (children[j].childrens.length) {
                    children[j].url = children[j].childrens[0].url
                  }
                }
              }
            }
          }else if(user.roleType==1){//roleadmin
              for (let i = 0; i < menu.length; i++) {
              if (menu[i].childrens.length) {
                let children = menu[i].childrens
                if (children[0].childrens.length) {
                  children[0].url = children[0].childrens[0].url
                  menu[i].url = children[0].url
                } else {
                  menu[i].url = children[0].url
                }
                for (let j = 1; j < children.length; j++) {
                  if (children[j].childrens.length) {
                    children[j].url = children[j].childrens[0].url
                  }
                }
              }
            }
          }else {//其他操作员
              for (let i = 0; i < menu.length; i++) {
              if (menu[i].childrens.length) {
                let children = menu[i].childrens
                if (children[0].childrens.length) {
                  children[0].url = children[0].childrens[0].url
                  menu[i].url = children[0].url
                } else {
                  menu[i].url = children[0].url
                }
                for (let j = 1; j < children.length; j++) {
                  if (children[j].childrens.length) {
                    children[j].url = children[j].childrens[0].url
                  }
                }
              }
            }
          }
          if (menu[0].bsnCode != "IM00") {
            //console.log("menu.bsncod!=im00")
            let myMain = {
              "bsnCode": "IM00",
              "bsnName": "首页",
              "url": "/my/myMain",
              "order": "0",
              "level": "1",
              "state": "1",
              "parentBsnCode": "",
              "update": "",
              "childrens": []
            }
            menu.splice(0, 0, myMain)
            for (let i = 0; i < menu.length; i++) {
              if (menu[i].childrens.length) {
                let children = menu[i].childrens
                if (children[0].childrens.length) {
                  children[0].url = children[0].childrens[0].url
                  menu[i].url = children[0].url
                } else {
                  menu[i].url = children[0].url
                }
                for (let j = 1; j < children.length; j++) {
                  if (children[j].childrens.length) {
                    children[j].url = children[j].childrens[0].url
                  }
                }
              }
            }
            
          }
          //console.log(JSON.stringify(menu))
          //data.body.operRoleMenuList= _this.$tools.filterMenu(data.body.operRoleMenuList)
          _this.$tools.storage.set("menu", menu)
          _this.$tools.setMenuGround(menu)
          //_this.getShortMenu()
          _this.refreshMenu()
        }
      )
      
    },
    refreshMenu() {   // 刷新页面重新加载本地菜单
      let _this = this
      // _this.resizeBody()
      let menu = _this.$tools.storage.get("menu", "save")
      if (!menu) return
      let currentGround = _this.cbCurrentMenuGround()
      if (!currentGround) return
      _this.menu = menu
      if (_this.menu[currentGround["ground"]].childrens.length) {
        _this.twoMenu = _this.menu[currentGround["ground"]].childrens
        _this.isShowTwo = true
      } else {
        _this.twoMenu = []
        _this.isShowTwo = false
      }
      setTimeout(()=>{
        //  等菜单加载完之后再重置高度
        _this.resizeBody()
      },0)
      // if(0==_this.menu[currentGround["ground"]].order){ //首页刷新快捷菜单
      //   _this.getShortMenu()
      // }
    },
    cbCurrentMenuGround() {  // 返回当前路由的分组
      let _this = this
      return _this.$tools.menuGround(_this)
    },
    menuState() {  // 选中当前菜单状态
      let _this = this
      let currentGround = _this.cbCurrentMenuGround()
      if (!currentGround) return
      $(".one-menu").find("li").eq(currentGround.ground).addClass("is-active").siblings("li").removeClass("is-active")
      if (_this.isShowTwo) {
        $(".two-menu").find("li.twoChild").eq(currentGround.current[0]).addClass("is-active").siblings("li").removeClass("is-active")
        $(".twoChild.is-active .three-menu").find("li").eq(currentGround.current[1]).addClass("is-active").siblings("li").removeClass("is-active")
      }
    },
    showHeadType() {
      let _this = this
      if (_this.headerMenu && _this.$tools.validator.isShowMenu(_this)) {
        let menu = _this.$tools.storage.get("menu", "save")
        if (!menu) {
          //显示用户名和预留信息
          _this.requestMenu()
        }
        else {
          _this.refreshMenu()
        }
      } else {
        _this.menu = []
        _this.twoMenu = []
        $(".contentMain").removeClass("haveMenu")
      }
    },
    resizeBody() {
      $(".contentMain").addClass("haveMenu")
      let winHeight = $(window).height()
      let headerHeihgt = $(".header").height()
      let footerHeihgt = $(".footer").height()
      let contentHeight = winHeight - headerHeihgt - footerHeihgt - 40;
      $(".haveMenu,.leftMenu").height(contentHeight)
    }
  },// methods
  watch: { // 挂载结束状态
    "headerMenu": "showHeadType",
    "$route": "showHeadType"
  },
  mounted() {
    let _this = this
   // _this.getShortMenu()
    //_this.user=_this.$tools.storage.get("user","save")
    //console.log("user:"+JSON.stringify(_this.user))
    $(window).resize(function() {
      if (_this.headerMenu && _this.$tools.validator.isShowMenu(_this)) {
        _this.resizeBody()
      }
    })
  },
  updated() {  // 更新完成状态
    if (this.headerMenu) this.menuState()
  },
}
</script>

<style>
.header .header-content {
  width: 100%;
  height: 84px;
  background-color: #ffffff;
  min-width: 1000px;
}

.header .leftMenu {
  background: #eee;
  width: 250px;  //width: 220px;
  margin-top: 20px;
  margin-left: 20px;
  //overflow: auto;
}
.shortCutMenu{position:fixed;top:204px;left:50%;margin-left:500px;z-index:3;}
.shortCut{height:40px;line-height:40px;color:#353535;background:#fff;text-align:center;position:relative;}
.shortCut .line{position:absolute;top:46%;right:32%;color:#ee6b00;display:none;}
.shortCut a{display: block;}
.shortCut a:hover{color:#ee6b00;}
.shortCut a:hover .line{display:block;}

html,body {
  min-width: 1367px \9\0;
}
.header .one-menu .el-submenu .el-submenu__title, .header .one-menu .el-menu-item{min-width: auto !important;}
@media screen and (max-width: 1300px) {
  html,body {
    min-width: 1367px;
  }
}
.el-message-box {
    border-radius: 10px !important;
}
</style>
