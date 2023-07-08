<template>
<!--  头像菜单-->
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl" />
      &nbsp;&nbsp;{{ currentUser.username }}&nbsp;<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>

    <template #dropdown>
      <el-dropdown-menu>
         <el-dropdown-item>
          <router-link :to="{name:'个人中心'}">个人中心</router-link>
        </el-dropdown-item>
        <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from "@/router";
import requestUtil,{ getServerUrl } from '@/utils/request'
import { ArrowDown } from '@element-plus/icons-vue'


const store=useStore()

const currentUser=ref(store.getters.GET_USERINFO);
//数据库对应字段为avatar属性，即头像名称
const squareUrl=ref(getServerUrl()+'image/userAvatar/'+currentUser.value.avatar)


const logout=async ()=>{
  // 异步等待
  let result=await requestUtil.get("/logout");

  //请求正常后清空sessionStorage以及跳转到登陆页面
  if(result.data.code===200){
    store.commit("RESET_TABS"); //重置标签
    store.dispatch('logout')    //清空sessionStorage以及跳转到登陆页面（已封装）
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
