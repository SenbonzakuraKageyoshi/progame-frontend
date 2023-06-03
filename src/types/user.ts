import { Role } from "./role";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    mail: string;
    telephone: string;
    passwordHash: string;
    role: Role;
    accessToken: string;
    createdAt: string;
    updatedAt: string;
}