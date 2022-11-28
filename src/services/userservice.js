import axios from "axios";

export default class userservices {
    getUserList() {
        return  axios.get(axios.defaults.baseURL + 'Users/GetUsers', {});
    }
}