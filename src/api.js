import axios from 'axios'

const API = axios.create({
   baseURL: 'https://atithi.developmentalphawizz.com/backend/api/v1',
  //baseURL: 'https://swadeshipapers.com:5000/api'
  // baseURL: 'https://swadeshiprint.developmentalphawizz.com:5000/api',

})

export default API
