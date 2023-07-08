// 路由守卫实现
import store from "@/store";
import router from "@/router/index";

router.beforeEach((to, from, next)=>{
    let token=store.getters.GET_TOKEN
    let hasRoutes = store.state.hasRoutes
    let menuList=store.getters.GET_MENULIST;
    // console.log("token="+token);
    // console.log("to.path="+to.path);
    const whiteList=['/login'] // 白名单，没有token也放行
    //store中获取token，若token存在则放行
    if(token){
        console.log("hasRoutes="+hasRoutes)
        // false则需绑定route
        if(!hasRoutes){
            console.log("hasRoutes")
            // 参数为menulist，即根据menulist得到动态route进行bind绑定
            bindRoute(menuList);
            //提交true，即往后就不进行动态路由绑定了，一次性解决，防止多次加载耗能
            store.commit("SET_ROUTES_STATE",true)
        }
        next();

    }else{
        //白名单也放行
        if(whiteList.includes(to.path)){
            next(); // 放行
        }else{
            //跳转到登陆页面
            next("/login") // 跳转登录页面
        }
    }
})

//动态绑定路由
const bindRoute=(menuList)=>{
    console.log(menuList)
    // 获取路由中的routes
    let newRoutes=router.options.routes;
    //遍历menulist每次遍历一个menu,主要得到path,name,component这三个字段信息
    menuList.forEach(menu=>{
        // 有children才需要做路由，列表显示的都为parents
        if(menu.children){
            //遍历所有的children之后进行转，
            menu.children.forEach(m=>{
                // 菜单转成路由，父节点的name和当前遍历的m
                let route=menuToRoute(m,menu.name);
                if(route){//若存在则添加到newRoutes底层，push到路由中
                    newRoutes[0].children.push(route); // 添加到路由管理
                }
            })
        }
    })
    // 重新添加到路由，遍历得到的每个路由，这样才是添加到了路由管理中
    newRoutes.forEach(route=>{
        router.addRoute(route);
    })
}

// 菜单转成路由，组装路由，
const menuToRoute = (menu,parentName) => {
    //判断menu里是否有component，有才转
    if (!menu.component) {
        // 不存在就返回none不添加到路由管理中
        return null
    }else{
        let route = {
            name: menu.name,//路由名称
            path: menu.path,//路由路径
            meta:{
                parentName:parentName  //添加元数据
            }
        }
        // 懒加载，拼接路径
        route.component = () => import('@/views/' + menu.component +'.vue')

        return route
    }
}

const menuList=store.getters.GET_MENULIST;
const token=store.getters.GET_TOKEN;

console.log(typeof menuList);
if(token){
    console.log("动态绑定路由")
    bindRoute(menuList); // 动态绑定路由
}
