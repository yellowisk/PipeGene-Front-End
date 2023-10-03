export interface IPipeline {
    id?: string;
    description: string;
    steps: any[];
}

export interface IExportPipeline {
    projectId: string;
}