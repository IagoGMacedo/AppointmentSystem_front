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
    AppointmentEndpoint:{
        create: `${apiUrl}/RegisterAppointment/CreateAppointment`,
        getById: `${apiUrl}/RegisterAppointment/GetAppointmentById`,
        updateByPatient: `${apiUrl}/RegisterAppointment/UpdateAppointmentByPatient`,
        filterAppointments: `${apiUrl}/RegisterAppointment/FilterAppointments`,
    },
    UserEndpoint:{
        getUsersNamesAndIds: `${apiUrl}/RegisterUser/GetUsersNamesAndIds`,
    }
};  