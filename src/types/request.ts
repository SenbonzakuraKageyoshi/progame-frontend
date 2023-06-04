export type RequestStatus = 'На рассмотрении' | 'Принята' | 'Отклонена'

export interface Request {
    id: number;
    text: string;
    authorName: string;
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
    UserId: number | null;
    CourseId: number | null;
    telephone: string;
    email: string;
}