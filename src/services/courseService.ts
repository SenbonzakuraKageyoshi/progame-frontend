import { Course } from "../types/course";
import { Role } from "../types/role";
import { authApi } from "../api/api";
import { CourseFormValues } from "../types/courseFormValues";

const namespace = 'course'

const createCourse = async (payload: CourseFormValues & { shedule: null | string }) => {
    await authApi.post<Course>(`/${namespace}/create`, payload);
};

const getCourses = async (role: Role): Promise<Course[]> => {
    const { data } = await authApi.post<Course[]>(`/${namespace}/get-courses`, { role });

    return data
};

export {
    createCourse,
    getCourses
}