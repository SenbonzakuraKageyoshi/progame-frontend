export interface Course {
    id: number;
    name: string;
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