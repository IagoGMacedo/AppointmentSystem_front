export type User = {
    id: number;
    name: string;
    login: string;
    email?: string;
    profile: Profile;
}

export type  Profile = "Patient" | "Professional";

export type UserNameAndId = {
    id: number;
    name: string;
}

