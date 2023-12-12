import Axios from "axios";
const axios = Axios.create({
    baseURL: `https://self-raised-superst.000webhostapp.com`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export default axios