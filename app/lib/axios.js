import Axios from "axios";
const axios = Axios.create({
    baseURL: 'http://mtb.efuntrip.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

export default axios