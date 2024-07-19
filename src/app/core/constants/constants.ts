export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:5206/api';

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${apiUrl}/Authentication/login`,
        register: `${apiUrl}/User/CreateUser`,
        logout: `${apiUrl}/logout`
    },
    AppointmentEndpoint:{
        create: `${apiUrl}/Appointment/CreateAppointment`,
        getById: `${apiUrl}/Appointment/GetAppointmentById`,
        updateByPatient: `${apiUrl}/Appointment/UpdateAppointmentByPatient`,
        updateByProfessional: `${apiUrl}/Appointment/UpdateAppointmentByProfessional`,
        filterAppointments: `${apiUrl}/Appointment/FilterAppointments`,
    },
    UserEndpoint:{
        getUsersNamesAndIds: `${apiUrl}/User/GetUsersNamesAndIds`,
    }
};  