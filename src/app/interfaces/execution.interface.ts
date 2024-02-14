export interface ICreateExecution {
  pipelineId: string;
  datasetId: string;
  description: string;
}

export interface IExecution {
  id: string;
  pipeline: {
    id: string;
    description: string;
    status: string;
    
    steps: [
      {
        id: string;
        provider: {
          name: string;
        };
        inputType: string;
        outputType: string;
        state: string;
        params: {
          key: string;
        };
      }
    ];
  };
  dataset: {
    id: string;
    filename: string;
  };
  description: string;
  status: string;
  executionResult?: string;
  errorMessage?: string;
}
