import Axios from "axios";

const axios = Axios.create({
   baseURL: 'https://self-raised-superst.000webhostapp.com',

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios