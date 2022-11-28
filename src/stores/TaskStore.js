import { defineStore } from 'pinia'
import axios from "axios";
// import {IUser} from "../models/user"

export const TaskStore = defineStore({
    id: 'TaskStore',
    state: () => ({ 'data': [] }),
    getters: () => {
        return state;
    },
    actions: {
        loadStoreFromServer(state) {
            axios
                .get(axios.defaults.baseURL + "Todo/GetTodoDetail", {})
                .then((response) => {
                    state.data = response.data;
                })
                .catch((error) => {
                    console.log("Please try after sometimes!....");
                });
        },
        updateTaskStore(lcStore, storeDetails) {
            var result = "";
            if (lcStore.ValidateStore(lcStore.$state, storeDetails)) {
                axios
                    .post(axios.defaults.baseURL + "Todo/createTodoDetail",storeDetails)
                    .then((response) => {
                        debugger;
                        lcStore.loadStoreFromServer(lcStore.$state)
                       // alert('Task Created Successfully!....')
                    })
                    .catch((error) => {
                        console.log("Please try after sometimes!....");
                    });

                return result;
            }
            else {
                axios
                    .post(axios.defaults.baseURL + "Todo/updateTodoDetail", storeDetails)
                    .then((response) => {
                        lcStore.loadStoreFromServer(lcStore.$state)
                        alert('Task updated Successfully!....')
                    })
                    .catch((error) => {
                        console.log("Please try after sometimes!....");
                    });


            }
        },
        ValidateStore(state, storeDetails) {
            return state.data.findIndex(x => x.id == storeDetails.id) != -1 ? false : true;
        },
        removeRecordfromStore(lcStore,storeDetails) {
            axios
                .post(axios.defaults.baseURL + "Todo/deleteTodoDetail/" +storeDetails.id,{})
                .then((response) => {
                    debugger;
                    lcStore.loadStoreFromServer(lcStore.$state)                    
                })
                .catch((error) => {
                    console.log("Please try after sometimes!....");
                });
        }
    }
})