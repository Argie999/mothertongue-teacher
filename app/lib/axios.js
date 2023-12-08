import Axios from "axios";

const token = `1|Swy4433GpmC5DU2whJfVoU6Zt9lwjzIWzWeRcvMnea516968`;
const axios = Axios.create({
    baseURL: `https://self-raised-superst.000webhostapp.com:443`,
    //baseURL: `http://127.0.0.1:8000`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
})

export default axios