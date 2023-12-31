import axios from "axios";

const local = {
    Axios() {
        local.api = axios.create({
            baseURL: process.env.VUE_APP_URL_BASE,
        })
    }
}

const authService = {

    login(data) {
        let url = 'login'

        return new Promise((resolve, reject) => {
            local.api.post(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

}

local.Axios()

export default authService