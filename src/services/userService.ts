import { authApi } from "../api/api";
import { User } from "../types/user";
import { StudentFromValues } from "../types/studentFormValues";
import { Role } from "../types/role";

const namespace = 'user'

const createUser = async (payload: StudentFromValues) => {
    await authApi.post<User>(`/${namespace}/create`, payload);
};

const getUsers = async (type: Role): Promise<Omit<User, 'accessToken'>[]> => {
    const { data } = await authApi.get<User[]>(`/${namespace}/get-users?type=${type}`);

    return data
};

const getUser = async (id: number): Promise<Omit<User, 'accessToken'>> => {
    const { data } = await authApi.get<User>(`/${namespace}/get-user?id=${id}`);

    return data
};

const editUser = async (payload: Omit<User, 'accessToken' | 'passwordHash' | 'createdAt' | 'updatedAt'>) => {
    await authApi.post<{message: string}>(`/${namespace}/edit-user`, payload);
};

const removeUser = async (id: number) => {
    await authApi.post<{message: string}>(`/${namespace}/remove-user`, { id });
};

export {
    createUser,
    getUsers,
    getUser,
    editUser,
    removeUser
}