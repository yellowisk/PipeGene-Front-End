import { IUser } from "./auth.interface";

export interface ICreateProject {
    users: any;
    name: string;
    description: string;
    files: File[];
}

export interface IProject {
    id: string;
    name: string;
    description: string;
    datasets: any[];
    users: IUser[];
    steps: any[];
}
