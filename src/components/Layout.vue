<script setup>
import { computed } from "@vue/runtime-core";
import { UserDataStore } from "../stores/UserDataStore";
import {RouterView } from "vue-router";

const items = [
  { title: "Dashboard", icon: "dashboard", action: "/Dashboard" },
  { title: "about", icon: "home", action: "/about" },
  { title: "Todo", icon: "loop", action: "/addTask" },
  { title: "Login", icon: "loop", action: "/" },
];

const UserLoginName = localStorage.getItem('UserLoginName');
const UserLoginRole = localStorage.getItem('UserLoginRole');

</script>
<template>
  <header>
    <div>
      Welcome user : {{ UserLoginName }} | Role : {{ UserLoginRole }}
    </div>
  </header>
  <div class="contentView">
    <div style="height: 95vh; box-shadow: 6px 0px 4px 0px #ccc">
      <va-sidebar :minimized="minimized" minimizedWidth="64px">
        <template v-for="item in items" :key="item.title">
          <va-sidebar-item :active="item.active">
            <va-sidebar-item-content>
              <va-icon :name="item.icon" />
              <va-sidebar-item-title>                
                <router-link :to="item.action" active-class="active">{{
                  item.title
                }}</router-link>
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </template>
      </va-sidebar>
    </div>
    <div class="contentsubView">
      <div>
          <router-view></router-view>          
        </div>
    </div>
  </div>
</template>

<style scoped>
header {
  /* position: fixed; */
  background: #154ec1;
  width: 100%;
  height: 5vh;
  border: 1px solid #ccc;
}
header > div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  background: #1f53bb;
  color: #cccc;
  padding: 5px;
  margin: 5px 5px;
}
.contentView {
  display: flex;
  flex-direction: row;  
}
.contentView:last-child {
  flex: 1;
}
.contentsubView {
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  vertical-align: baseline;
  padding: 10px;
  height: 95vh;
  overflow-y: scroll;
}
.va-sidebar-item:deep(.va-sidebar__item__content){
  color: #6a6a6a;
}
.va-sidebar:deep(.va-sidebar__menu){
  background: rgb(193 193 193)
}
.va-sidebar__title:deep(a){
   color:#193581
   
}

</style>