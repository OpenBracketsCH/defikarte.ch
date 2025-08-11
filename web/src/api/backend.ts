import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_API ||
    "https://defikarte-backend-staging.azurewebsites.net/api/",
  headers: {
    "x-functions-clientid": "defikarte-app",
    "x-functions-key": import.meta.env.VITE_BACKEND_API_KEY || "",
    "ACCESS-Control-Allow-Origin": "*",
  },
});
