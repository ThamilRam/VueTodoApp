<script setup>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { ref } from "vue";
import Button from "primevue/button";
import { TaskStore } from "../stores/TaskStore";
import DataTable from 'primevue/datatable'
import Column from 'primevue/Column'
import Card from 'primevue/card';
import axios from "axios";

const display = ref(false);
const columns = [
            {field: 'id', header: 'id'},
            {field: 'task', header: 'Task'},
            {field: 'status', header: 'Status'}            
        ];
const tkStore = TaskStore();
const taskData = computed(()=>{
  return tkStore.$state.data;
})
/* Initial Todo Data load */
onMounted((e)=>{
  GetTodoDetailbyuserId();
})

let userInfo = reactive([])

function GetTodoDetailbyuserId(){
   axios
      .get(axios.defaults.baseURL + "Todo/GetTodoDetailbyuserId?userId=1", {})
      .then((response) => {
          userInfo.push(response.data[0]);
      })
      .catch((error) => {
          console.log("Please try after sometimes!....");
      });
}


</script>

<template>
<div>
  <Card class="card" v-for="userRec in userInfo" :key="userRec.userId" >
    <template #header>
        <h2>Task CreatedBy : {{userRec.username}}</h2>
    </template>
    <template #title>
        Task Details
</template>
    <template #content>
      {{userRec}}
        <div v-for="(uDet,index) in userRec.todoDetails" :key="index" >
          <va-input label="Task" v-model="uDet.task" outline :key="index" />
          <p>Status : {{uDet.status}}</p>          
        </div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
</div>
  <Button label="Confirm" icon="pi pi-external-link" @click="display = !display"></Button>
  <Dialog header="Confirmation" :visible="display" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '350px'}" :modal="true">
      <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
          <span>Are you sure you want to delete?</span>
      </div>
      <template #footer>
          <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"></Button>
          <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus></Button>
      </template>
  </Dialog>
  <div>
    <DataTable :value="taskData" responsiveLayout="scroll"  :paginator="true" :rows="2"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[2,4,8]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
      <Column v-for="col in columns"  :field="col.field" :header="col.header" :key="col.id" :sortable="true"></Column>    
    </DataTable>
  </div>
</template>
<style scoped>
/*
.card::v-deep { 
  margin: 5px 0 5px;
} 
.card:deep(button) {
  background: rgb(129, 129, 129);
  border: 1px solid  rgb(129, 129, 129);
} 
*/
</style>