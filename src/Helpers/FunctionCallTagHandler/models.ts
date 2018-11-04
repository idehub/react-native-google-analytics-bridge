export type Handler = (functionName: string, tagArguments: any) => any;
export type RegisterHandler = (
  functionName: string,
  handler: Handler
) => Promise<boolean>;
