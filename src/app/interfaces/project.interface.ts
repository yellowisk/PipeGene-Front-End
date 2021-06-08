export interface ICreateProject {
    name: string;
    description: string;
    files: File[];
}

export interface IProject {
    id: string;
    name: string;
    description: string;
    datasets: any[];
}
