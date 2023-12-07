import Axios from "axios";

const axios = Axios.create({
    baseURL: `https://self-raised-superst.000webhostapp.com:8000`,
    //baseURL: `http://127.0.0.1:8000`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios