import Axios from "axios";
const axios = Axios.create({
    baseURL: 'http://mtb.efuntrip.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
})

export default axios