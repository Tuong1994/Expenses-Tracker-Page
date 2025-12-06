export type ApiBodyInit = BodyInit | undefined;

export interface ApiConfig<T extends ApiBodyInit> {
  method: string;
  apiPath: string;
  abortKey?: string;
  body?: T;
  options?: RequestInit;
  token?: string; // cho server actions
  auth?: boolean; // auto attach token phía browser
}

export type ResponseError = {
  status: number;
  message: string;
};

export type ResponseResult = {
  error?: ResponseError;
  success?: boolean;
};

export interface ApiResponse<T> extends ResponseResult {
  data: T;
}
