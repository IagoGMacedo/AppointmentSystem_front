export type Appointment = {
    id: number
    userId: number,
    userName: string,
    appointmentDate: string;
    appointmentTime: string;
    status: number;
    dateOfCreation: string;
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

export const StatusMapping: { [key: number]: string } = {
    1: 'AGENDADO',
    2: 'CONCLUIDO',
    3: 'CANCELADO'
  };