const tokenName = "progame-access-token";

const getToken = () => {
    return localStorage.getItem(tokenName)
};

const setToken = (token: string) => {
    return localStorage.setItem(tokenName, token)
};

const removeToken = () => {
    return localStorage.removeItem(tokenName)
};

export {
    getToken, setToken, removeToken
}