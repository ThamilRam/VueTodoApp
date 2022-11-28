<script setup>
import { computed, onMounted, provide, watch } from "@vue/runtime-core";
import { TaskStore } from "../stores/TaskStore";
import { ref, reactive, toRefs, watchEffect } from "vue";
import TaskList from "./TaskList.vue";
import { vSuccess } from "../directives/vSuccess";
import { vAutofocus } from "../directives/vAutofocus";
import axios from "axios";

const API_URL = "http://localhost:33376/"; // inject('API_URL')

const tkStore = TaskStore();
const taskDetails = reactive({
  id: 0,
  Userid: Number(localStorage.getItem("UserLoginId")),
  Task: "",
  Status: 0,
  CreatedDate: new Date(),
  CreatedBy: "admin",
  ModifiedDate: new Date(),
  ModifiedBy: "admin",
});
onMounted((e) => {
  tkStore.loadStoreFromServer(tkStore.$state);
  //tkStore.commit('loadStoreFromServer', tkStore.$state, {})  
});

function loadStoreFromServer() {
  axios
    .get(API_URL + "Todo", {})
    .then((response) => {
      tkStore.$state.data.push(response.data);
    })
    .catch((error) => {
        console.log("Please try after sometimes!....");
    });
}
watch(
  taskDetails,
  (newValue, oldValue) => {
    console.log(
      "New Value: " + newValue.Task + " Old Value:: " + oldValue.Task
    );
  }
);
watchEffect(taskDetails.Task, (x) => {
  console.log(x);
});

provide("TaskData", {
  tasknames: tkStore.$state.data,
});

const getNotDoneStoreData = computed(() => {
  return tkStore.$state.data.filter((x) => x.status < 2);
});
const getDoneStoreData = computed(() => {
  return tkStore.$state.data.filter((x) => x.status == 2);
});
function addTaskinStore(task) {
  tkStore.updateTaskStore(tkStore, task);
  resetForm();
}
function editRecordfromStore(event) {
  taskDetails.id = event.id;
  taskDetails.Task = event.task;
  taskDetails.Status = event.status;
  taskDetails.CreatedDate = event.createdDate;
  taskDetails.CreatedBy = event.createdBy;
  taskDetails.ModifiedDate = event.modifiedDate;
  taskDetails.ModifiedBy = localStorage.getItem("UserLoginId");
}
function resetForm() {
  taskDetails.Task = "";
  taskDetails.Status = 0;
  taskDetails.id = 0;
}
</script>
<template>
  <va-form class="formClass" tag="form" @submit.prevent="addTaskinStore">
    <va-input label="Task" v-model="taskDetails.Task" v-autofocus outline />
    <va-button
      type="submit"
      @click.prevent="addTaskinStore(taskDetails)"
      class="mt-3"
    >
      Create</va-button
    >

    <div v-if="getNotDoneStoreData.length == 0">No Records Found</div>
    <div class="TaskForm">
      <div>
        <h2 v-if="getNotDoneStoreData.length==0">No New Task Created</h2>
        <div v-if="getNotDoneStoreData.length > 0">
          <h1>New Task</h1>
          <hr/>
          <div v-for="(item, index) in getNotDoneStoreData" :key="index">
            <TaskList
              :name="item.task"
              :record="item"
              @editRecordfromStore="editRecordfromStore"
              :id="index"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 v-if="getDoneStoreData.length==0">No Task Completed</h2>
        <div v-if="getDoneStoreData.length > 0">
          <h1>Completed Task</h1>
          <hr/>
          <div v-for="(item, index) in getDoneStoreData" :key="index">
            <TaskList :name="item.task" :record="item" :id="index" v-success />
          </div>
        </div>
      </div>
    </div>
  </va-form>
</template>
<style scoped>
.formClass {
  padding: 10px;
  margin: 2px;
  width: 50%;
}
.TaskForm {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.TaskForm div {
  margin-right: 5px;
}
.TaskForm > div {
  flex: 1;
  padding: 5px;  
  background: white;
}
</style>