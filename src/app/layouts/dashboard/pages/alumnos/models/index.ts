import { ICourse } from "../../cursos/models";

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    anoIngreso: number;

    courses?: ICourse[];
}