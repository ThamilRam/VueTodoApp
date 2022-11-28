<script>
import { defineProps } from "vue";
import { useConfirm } from "primevue/useconfirm";


defineProps({
    message:String,
    acceptCallback:String    
})
const confirm = useConfirm();
confirm.require({
  message: "Are you sure you want to proceed?",
  header: "Confirmation",
  icon: "pi pi-exclamation-triangle",
  accept: () => {
    $emit(acceptCallback);
  },
  reject: () => {
    confirm.close();
  },
  onHide: () => {
    confirm.close();
  },
});

</script>

<template></template>