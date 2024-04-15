export const setAuthUser = (user) => {
    setAuthToken(user.token);
    localStorage.setItem('user', JSON.stringify(user));
    return true
};

export const removeAuthUser = () => {
    removeAuthToken();
    return localStorage.removeItem('user');
};

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const setAuthToken = (token) => {
    return localStorage.setItem('token', token)
};

export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token ? token : '';
};

export const removeAuthToken = () => {
    return localStorage.removeItem('token');
};

export const setHomeFilter = (obj) => {
    return localStorage.setItem('homeFilter', JSON.stringify(obj))
};

export const getHomeFilter = () => {
    const homeFilter = localStorage.getItem('homeFilter');
    return homeFilter ? homeFilter : false;
};
