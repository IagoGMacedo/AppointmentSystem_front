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

export type AppointmentUpdatePatient = {
    appointmentDate: string;
    appointmentTime: string;
    status: number;
}

export type AppointmentUpdateProfessional = {
    userId: Number
    appointmentDate: string;
    appointmentTime: string;
    status: number;
}

export type Appointment = {
    id: number
    userId: number,
    userName: string,
    appointmentDate: string;
    appointmentTime: string;
    status: number;
    dateOfCreation: string;
}

export const StatusMapping: { [key: number]: string } = {
    1: 'AGENDADO',
    2: 'CONCLUIDO',
    3: 'CANCELADO'
  };

export type UserNameAndId = {
    id: number;
    name: string;
}

