/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

let user = localStorage.getItem("token")

if (user && user.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${user}`;

axios.interceptors.response.use(null, (error) => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 499;
    if (!expectedErrors) {
        console.log(error);
        console.log("500 Internal Server Error");
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
