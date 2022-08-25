import axios from 'axios'

const api = axios.create({
    baseURL: 'https://proffy-api.herokuapp.com/'
})


export default api