import { ICourse } from "../../courses/models";

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    anoIngreso: number;

    courses?: ICourse[];
}

export interface CreateStudentPayload {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    anoIngreso: number | null;
    courses? : ICourse[];
}