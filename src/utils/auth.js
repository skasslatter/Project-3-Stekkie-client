import Axios from "axios";
import qs from "qs";

const axios = Axios.create ({
    baseURL: "http://localhost:3000", 
    // withCredentials: true,
    //headers: {"content-type": "application/x-www-form-urlencoded"}
});

export const login = (user) => {
    return axios({
        method: "POST",
        url: "login",
        
        data: qs.stringify(user)
    })
    .then(response => {
        setUser(response.data)
    })
}

export const signup = (user) => {
    return axios ({
        method: "POST",
        url: "signup",
        headers: {"content-type": "application/json"},
        data: user
    })
    .then(response => {
        setUser(response.data);
    })
}

export const setUser = (user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
    return JSON.parse(window.localStorage.getItem("user"));
}