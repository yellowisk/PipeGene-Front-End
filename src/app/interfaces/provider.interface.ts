export interface IParameter {
    name: string;
    type: string;
    example: string;
    key: string;
}
export interface IOperation {
    name: string;
    description: string;
    params: IParameter[];
}
export interface IProvider {
    id: string;
    name: string;
    description: string;
    url: string;
    inputSupportedTypes: string[];
    outputSupportedTypes: string[];
    operations: IOperation[];
}
