import { IStudent } from "../../alumnos/models";

export interface ICourse {

    code: number;
    name: string;
    startDate: Date;
    durationMonths: number;
    instructor: string;

    students?: IStudent[];

}