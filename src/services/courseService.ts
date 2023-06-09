import { Course } from "../types/course";
import { Role } from "../types/role";
import { authApi } from "../api/api";
import { CourseFormValues } from "../types/courseFormValues";
import { StudentCourse } from "../types/studentCourse";

const namespace = 'course'

const createCourse = async (payload: CourseFormValues & { shedule: null | string }) => {
    await authApi.post<Course>(`/${namespace}/create`, payload);
};

const getCourses = async (role: Role, id: number | undefined | null): Promise<Course[]> => {
    const { data } = await authApi.post<Course[]>(`/${namespace}/get-courses`, { role, id });

    return data
};

const getMyCourses = async (id: number): Promise<StudentCourse[]> => {
    const { data } = await authApi.post<StudentCourse[]>(`/${namespace}/get-my-courses`, { id });

    return data
};


const getCourse = async (id: number): Promise<Course> => {
    const { data } = await authApi.post<Course>(`/${namespace}/get-course`, { id });

    return data
};

const editCourse = async (payload: CourseFormValues & { id: number, shedule: null | string }) => {
    await authApi.post<{message: string}>(`/${namespace}/edit-course`, payload);
};

const getStudentCourse = async (UserId: number | null, CourseId: number | null): Promise<StudentCourse[] | 'undefined'> => {
    const { data } = await authApi.post<StudentCourse[] | 'undefined'>(`/${namespace}/get-student-course`, { UserId, CourseId });

    return data
};

const addStudentToCourse = async (UserId: number, CourseId: number) => {
    await authApi.post<{message: string}>(`/${namespace}/add-student`, { UserId, CourseId });
};

const removeStudentToCourse = async (UserId: number, CourseId: number) => {
    await authApi.post<{message: string}>(`/${namespace}/remove-student`, { UserId, CourseId });
};

const removeCourse = async (id: number) => {
    await authApi.post<{message: string}>(`/${namespace}/remove-course`, { id });
};

export {
    createCourse,
    getCourses,
    getCourse,
    editCourse,
    getStudentCourse,
    addStudentToCourse,
    removeStudentToCourse,
    removeCourse,
    getMyCourses
}