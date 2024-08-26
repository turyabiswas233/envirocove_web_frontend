 
import { config } from "./config"

const token = localStorage.getItem('TOKEN'); // ami token pass na kore ekhan theke get kortesi

export const account = {
    setType: async function (type, tk) {
        console.log(tk);
        return fetch(`${config.api_url}/${ROUTES.CORE.SET_TYPE}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Token ${tk}` // emne dite hoy? emon to kotha nei. try korte paro
            },
            body: JSON.stringify({ type: type })
        })
    },
    register: async function (data) {

        // console.log(JSON.stringify(data));

        return fetch(`${config.api_url}/${ROUTES.REGISTER}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
    },

    login: async function (data) {

        return fetch(`${config.api_url}/${ROUTES.LOGIN}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)


        })
    },
    logout: async function name() {

        return fetch(`${config.api_url}/${ROUTES.LOGOUT}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },

        })
    },
    profile: async function (enumType = 'get', data) {

        switch (enumType.toUpperCase()) {
            case 'GET':
                return fetch(`${config.api_url}/${ROUTES.PROFILE}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: token
                    }
                });
            case 'PUT':
                return fetch(`${config.api_url}/${ROUTES.PROFILE}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: token
                    },
                    body: JSON.stringify(data)
                });

            default:
                throw new Error("INVALID FETCHING TYPE");
        }

    },
    core: {
        isVendor: () => {
            return fetch(`${config.api_url}/${ROUTES.CORE.PROFILE}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
        }
    }
}

export const product = {
    list: async function () {
        return fetch(`${config.api_url}/${ROUTES.PRODUCT}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Authorization: token
            },
        })
    },
    item: async function (id) {
        return fetch(`${config.api_url}/${ROUTES.PRODUCT}${id}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Authorization: token
            },
        })
    }
}

const ROUTES = {

    //acounts
    CORE: {
        PROFILE: `core/profile`,
        SET_TYPE: `core/set_type`, // dekho
    },
    LOGIN: `api/accounts/login/`,
    LOGOUT: `api/accounts/logout/`,
    REGISTER: `api/accounts/register/`,
    VERIFY: `api/accounts/verify/`,
    PROFILE: `api/accounts/profile/`, // to check validation of logged in user
    SETPASS: `api/accounts/set-password/`,
    RESETPASS: `api/accounts/reset-password/`,

    //product
    PRODUCT: `product/list/`,




}
