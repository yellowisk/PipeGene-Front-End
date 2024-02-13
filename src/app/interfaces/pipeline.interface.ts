export interface ICreatePipeline {
    id?: string;
    description: string;
    steps: any[];
}

export interface IPipeline {
    id?: string;
    description: string;
    status: string;
    steps: any[];
}

export interface IExportPipeline {
    projectId: string;
}