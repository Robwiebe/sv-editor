import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://sourceview-reader.firebaseio.com/'
})

export default instance;