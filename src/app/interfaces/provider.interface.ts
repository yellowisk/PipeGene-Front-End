import { IProject } from "./project.interface";

export interface IParameter {
    name: string;
    type: string;
    example: string;
    key: string;
}
export interface IOperation {
    type: string;
    description: string;
    params: IParameter[];
}
export interface IProvider {
    id?: string;
    name: string;
    description: string;
    url: string;
    urlSource: string;
    isPublic: boolean;
    inputSupportedTypes: string[];
    outputSupportedTypes: string[];
    operations: IOperation[];
    selectedProjectIds: string[];
}
