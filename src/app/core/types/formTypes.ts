export type Login = {
    login: string;
    password: string;
}

export type Register = {
    name: string;
    login: string;
    profile: number;
    password: string;
    dateOfBirth: string;
}

export type AppointmentFilter = {
    id: number | null;
    userId: number | null;
    appointmentDate: string | null;
    appointmentime: string | null;
    status: number | null;
}

export type AppointmentForm ={
    userId: Number
    appointmentDate: string;
    appointmentTime: string;
}