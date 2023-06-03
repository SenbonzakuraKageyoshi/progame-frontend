import { Role } from "./role";

export interface StudentFromValues {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    telephone: string;
    password: string;
    role: Role;
}