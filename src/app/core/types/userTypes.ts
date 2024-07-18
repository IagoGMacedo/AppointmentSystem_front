export type User = {
    id: number;
    name: string;
    login: string;
    email?: string;
    profile: Profile;
}

export type  Profile = "Patient" | "Professional";


export type AppointmentForm ={
    userId: Number
    appointmentDate: string;
    appointmentTime: string;
}

export type AppointmentUpdate = {
    appointmentDate: string;
    appointmentTime: string;
    status: number;
}

export type Appointment = {
    id: number
    userId: number
    appointmentDate: string;
    appointmentTime: string;
    status: number;
    dateOfCreation: string;
}

