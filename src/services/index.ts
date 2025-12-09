import { requestManager } from "./manager";
import { ApiConfig, ApiResponse, ResponseError } from "./type";

// const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "";

const BASE_URL = "http://localhost:5000/";

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const defaultResponse = <T>(): ApiResponse<T> => ({ data: {} as T, success: false });

export const ApiResponseError = (status: number, error: any) => {
  let responseError: ResponseError = { status: 0, message: "" };
  responseError = {
    status: status ? status : 0,
    message: error?.message ? error?.message : "Invalid",
  };
  return responseError;
};

const call = async <TBody, TData = any>(config: ApiConfig<TBody>): Promise<ApiResponse<TData>> => {
  const { apiPath, method, body, auth, token, abortKey, options = {} } = config;
  let apiResponse: ApiResponse<TData> = defaultResponse();
  let controller: AbortController | null = null;
  let finalBody = body as any;
  let res: Response;
  const url = `${BASE_URL}${apiPath}`;
  const headers: Record<string, string> = { ...(options.headers as any) };
  // Auto JSON encode
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    if (typeof body === "object") finalBody = JSON.stringify(body);
  }
  // Server token
  if (token) headers["Authorization"] = `Bearer ${token}`;
  // Client token
  if (!token && auth && typeof window !== "undefined") {
    // localStorage may throw (Safari private mode, disabled storage, sandboxed iframe)
    // → If reading token fails, ignore the error and continue without auth header.
    try {
      const t = localStorage.getItem("access_token");
      if (t) headers["Authorization"] = `Bearer ${t}`;
    } catch {}
  }
  const reqConfig: RequestInit = {
    method,
    headers,
    // ❗ Default: no-cache for mutations, cache for GET
    cache: method === Method.GET ? "force-cache" : "no-store",
    next: method === Method.GET ? { revalidate: 0 } : undefined, // ISR optional
    ...options,
    body: method !== Method.GET ? finalBody : undefined,
  };
  if (abortKey) {
    controller = requestManager.create(abortKey);
    reqConfig.signal = controller.signal;
  }
  // fetch only throws on network errors (CORS, offline, DNS fail...)
  // → HTTP errors (4xx/5xx) DO NOT trigger catch, so we must handle them separately.
  try {
    res = await fetch(url, reqConfig);
  } catch (error: any) {
    if (error.name === "AbortError") {
      if (abortKey) requestManager.abort(abortKey);
      throw { ...apiResponse, success: false, error: ApiResponseError(-1, error) };
    }
    // Network-level error → status is unknown (set 0)
    throw { ...apiResponse, success: false, error: ApiResponseError(0, error) };
  }
  // Server responded but with an HTTP error (4xx/5xx)
  // → fetch resolved successfully, but res.ok is false.
  if (!res.ok) {
    let errJson: any = null;
    try {
      errJson = await res.json();
    } catch {}
    throw { ...apiResponse, success: false, error: ApiResponseError(res.status, errJson) };
  }
  const data = await res.json();
  return { ...apiResponse, success: true, data };
};

const Get = <TData>(apiPath: string, abortKey?: string, options?: RequestInit) => {
  return call<any, TData>({ method: Method.GET, apiPath, abortKey, options });
};

const Post = <TBody, TData>(apiPath: string, body: TBody, abortKey?: string, options?: RequestInit) => {
  return call<TBody, TData>({ method: Method.POST, apiPath, body, abortKey, options });
};

const Put = <TBody, TData>(apiPath: string, body: TBody, abortKey?: string, options?: RequestInit) => {
  return call<TBody, TData>({ method: Method.PUT, apiPath, body, abortKey, options });
};

const Delete = <TBody, TData>(apiPath: string, body?: TBody, abortKey?: string, options?: RequestInit) => {
  return call<any, TData>({ method: Method.DELETE, apiPath, body, abortKey, options });
};

const Fetch = { Get, Post, Put, Delete };

export default Fetch;
