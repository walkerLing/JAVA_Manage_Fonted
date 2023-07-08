import { createStore } from 'vuex'
import router from '@/router'
import qs from 'qs'
// vuex存储状态及公共方法
export default createStore({
  state: {
   // token: '',若token放在这里就会导致刷新丢失
  //  menuList:[],
  //   刷新丢失无所谓的数据放在state中
    hasRoutes: false,
    editableTabsValue:'/index',//默认值为首页
    editableTabs:[
      {
        title: '首页',
        name: '/index'
      }
    ]
  },
  getters: {
    GET_TOKEN: state => {
      return sessionStorage.getItem("token")
    },
    GET_MENULIST:state => {
      return JSON.parse(sessionStorage.getItem("menuList"))
    },
    GET_PERMS:state=>{
      return JSON.parse(sessionStorage.getItem("perms"))
    },
    GET_USERINFO:state=>{
      console.log("GET_USERINFO="+sessionStorage.getItem("userInfo"))
      return JSON.parse(sessionStorage.getItem("userInfo"))
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      // state.token = token 若token放在state就会导致刷新丢失
      sessionStorage.setItem("token", token)// 刷新不会丢失
    },
    RESET_TOKEN:(state)=>{
      console.log("xxxx")
      //state.token=''
      sessionStorage.setItem("token", "")
    },
    SET_MENULIST:(state,menuList)=>{
      //state.menuList=menuList;
      // 对象转json串
      sessionStorage.setItem("menuList", JSON.stringify(menuList))
    },
    SET_PERMS:(state,perms)=>{
      sessionStorage.setItem("perms", JSON.stringify(perms))
    },
    SET_USERINFO:(state,userInfo)=>{
      console.log("xxx="+JSON.stringify(userInfo))
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    ADD_TABS:(state,tab)=>{
      //遍历查询没找到就是-1
      if(state.editableTabs.findIndex(e=>e.name===tab.path)===-1){
        state.editableTabs.push({
          title: tab.name,
          name:tab.path
        });
      }
      // 选中关联
      state.editableTabsValue=tab.path
    },
    //恢复默认值
    RESET_TABS:(state)=>{
      state.editableTabsValue='/index';
      state.editableTabs=[
        {
          title: '首页',
          name: '/index'
        }
      ]
    },
    SET_ROUTES_STATE:(state,hasRoutes)=>{
      state.hasRoutes=hasRoutes
    }
  },
  actions: {
    // 安全退出
    //清空sessionStorage并且跳转到login路由
    logout(){
      window.sessionStorage.clear();
      this.state.hasRoutes=false
      router.replace('/login')
    }
  },
  modules: {
  }
})
