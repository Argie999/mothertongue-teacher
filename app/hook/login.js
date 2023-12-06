import axios from "axios";

export const login = () => {
    const redirect = async (uid) => {
        try {
            await axios.post('/api/login', {id:uid})
        } catch (error) {
            console.log(error)
        }
    }
    return {redirect}
}