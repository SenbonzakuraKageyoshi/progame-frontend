export type CourseStatus = 'Начат' | 'Завершен' | 'Не начат';

export interface Course {
    id: number;
    name: string;
    status: CourseStatus;
    teacher: string;
    shedule: string | null;
    price: string;
    features: string;
    description: string;
    closedPlaces: number;
    places: number;
    createdAt: string;
    updatedAt: string;
}