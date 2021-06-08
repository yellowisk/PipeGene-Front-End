export interface IProvider {
    id: string;
    name: string;
    description: string;
    url: string;
    inputSupportedTypes: string[];
    outputSupportedTypes: string[];
    operations: any[];
}
