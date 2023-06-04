import { Course } from "./course";
import { User } from "./user";

export interface StudentCourse {
    Course: Course;
    CourseId: number;
    User: User;
    UserId: number;
    createdAt:string;
    updatedAt: string;
}