import { IStudent } from "../../students/models";

export interface ICourse {

    id: number;
    name: string;
    startDate: Date;
    durationMonths: number;
    instructor: string;

    students?: IStudent[];

}

export interface CreateCoursePayload {
    id: number | null;
    name: string | null;
    startDate: Date | null;
    durationMonths: number | null;
    instructor: string | null;

    students?: IStudent[] | null;
}