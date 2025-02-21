import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API || 'https://defikarte-backend-staging.azurewebsites.net/api/',
  headers: {
    'x-functions-clientid': 'defikarte-app',
    'x-functions-key': process.env.REACT_APP_BACKEND_API_KEY || '',
  }
})