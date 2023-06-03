import { authApi } from "../api/api";
import { User } from "../types/user";
import { StudentFromValues } from "../types/studentFormValues";
import { Role } from "../types/role";

const namespace = 'user'

const createUser = async (payload: StudentFromValues) => {
    await authApi.post<User>(`/${namespace}/create`, payload);
};

const getUsers = async (type: Role): Promise<Omit<User, 'accessToken'>[]> => {
    const { data } = await authApi.post<User[]>(`/${namespace}/get-users`, { type });

    return data
};

export {
    createUser,
    getUsers
}