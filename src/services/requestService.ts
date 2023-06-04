import { Request } from "../types/request";
import { authApi } from "../api/api";
import { Role } from "../types/role";

const namespace = 'request'

const createRequest = async (payload: Omit<Request, 'createdAt' | 'updatedAt' | 'id' | 'status'>) => {
    await authApi.post<Request>(`/${namespace}/create`, payload);
};

const getRequests = async (role: Role, id: number): Promise<Request[]> => {
   const { data } = await authApi.post<Request[]>(`/${namespace}/get-requests`, { role, id });

   return data
};

export {
    createRequest,
    getRequests
}