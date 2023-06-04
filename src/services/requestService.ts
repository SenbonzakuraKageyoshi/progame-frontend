import { Request, RequestStatus } from "../types/request";
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

const editRequestStatus = async (status: RequestStatus, id: number) => {
    await authApi.post<{message: string}>(`/${namespace}/edit-request`, {id, status});
};

const removeRequest = async (id: number) => {
    await authApi.post<{message: string}>(`/${namespace}/remove-request`, {id});
};

export {
    createRequest,
    getRequests,
    editRequestStatus,
    removeRequest
}