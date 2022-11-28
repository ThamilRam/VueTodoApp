
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import userservices from '../services/userservice'
const userObject = new userservices();

export const UserDataStore = defineStore('userdatastore', {
    state: () => ({
        'data': [],
        counter:1
    }),
    getters: () => {
        return state;
    },
    actions: {
        getUserDetail(state) {            
            userObject.getUserList().then(
                function (res){                    
                state.data = res.data;
            })
            .catch((error) => {
                console.log("Please try after sometimes!....");
            });
            /* Get User Details here itSelf  
            axios
                .get(axios.defaults.baseURL + "Users/GetUsers", {})
                .then((response) => {
                    state.data = response.data;
                })
                .catch((error) => {
                    console.log("Please try after sometimes!....");
                });
              */
        }
    }
})