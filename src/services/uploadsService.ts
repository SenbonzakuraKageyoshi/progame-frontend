import { Shedule } from "../types/shedule";
import { authApi } from "../api/api";

const namespace = 'uploads'

const uploadShedule = async (payload: FormData): Promise<Shedule> => {
    const { data } = await authApi.post<Shedule>(`/${namespace}/shedule-upload`, payload);

    return data;
};

export {
    uploadShedule
}