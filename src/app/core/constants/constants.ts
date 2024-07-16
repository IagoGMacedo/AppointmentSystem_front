export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:5206/api';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiUrl}/Authentication/login`,
        register: `${apiUrl}/RegisterUser/CreateUser`,
        logout: `${apiUrl}/logout`
    },
};  