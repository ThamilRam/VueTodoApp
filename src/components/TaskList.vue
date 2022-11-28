<script setup>
import { defineProps,inject,ref,reactive } from "vue";
import { TaskStore } from "../stores/TaskStore";
import Button from "primevue/button";
import 'primeicons/primeicons.css';

const stores = TaskStore();
const selRecord=reactive([]);

defineProps({
  name: String,
  record: JSON,
  Status: 0  
});

const TaskData = inject('TaskData')
let showDialogs = ref(false);

const removeRecordfromStore = (curRecord) => {
  showDialogs=!showDialogs
  stores.removeRecordfromStore(stores,curRecord);  
};
function addTaskinStore(task) { 
  task.status = 2
  stores.updateTaskStore(stores,task)
   resetForm();
}
</script>

<template>
<!-- <p>Injected Data :: {{TaskData}}</p> -->
  <div class="taskBar">
    <li :title="name">
      <span>{{ name }}</span>
      <div>
        <span v-if="record.status <2" @click="$emit('editRecordfromStore',record)" gradient>
          <va-icon class="mr-2" name="edit" color="edit" />           
        </span>
        <span v-if="record.status <2" @click="showDialogs = !showDialogs;selRecord=record">
          <va-icon class="mr-2" name="clear" color="danger" />         
        </span>
        <span v-if="record.status <2"  @click="addTaskinStore(record)">
          <va-icon class="mr-2" name="check" color="success" />          
        </span>
      </div>
    </li>
  </div>
  <Dialog header="Confirmation" :visible="showDialogs" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '350px'}" :modal="true">
      <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
          <span>Are you sure you want to delete the Task ? {{selRecord.task}} </span>
      </div>
      <template #footer>
          <Button label="No" icon="pi pi-times" @click="showDialogs=!showDialogs" class="p-button-text"></Button>
          <Button label="Yes" icon="pi pi-check" @click="removeRecordfromStore(selRecord)" class="p-button-text" autofocus></Button>
      </template>
  </Dialog>
</template>
<style scoped>
.taskBar {
  display: flex;
  margin: 5px;
  box-shadow: 0 0.25rem 0.5rem 0 var(--va-shadow);
  flex-direction: row;
  padding: 5px;
  background: #c3c3c3;  
}
.taskBar > li {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.taskBar > li > span {
 margin-right: 10px;
 flex: 1;
}
.taskBar > li > div > span {
  padding: 2px;
  cursor: pointer;
  color: black;  
  border-radius: 5px;
  margin-right: 5px;
}
.taskBar > li > div {
  box-shadow: 0 0.25rem 0.5rem 0 var(--va-shadow);
  background: #cfcfcf;
    border-radius: 5px;
}
.taskBar > li > div > span:hover {
  border-radius: 5px;
  background: rgb(212 217 219);
}
</style>