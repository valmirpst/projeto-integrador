import { BookType } from "@/@types/book";
import { LoginType } from "@/@types/login";
import { LoginResponseType } from "@/@types/loginResponse";
import { ApiResponse } from "@/@types/requests/api-response";
import { ReturnType } from "@/@types/requests/return-type";
import { ReserveType } from "@/@types/reserve";
import { UserType } from "@/@types/user";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type OptionsType = RequestInit;

type GetDataFnParams<T, P> = {
  endpoint: string;
  method: Method;
  payload?: T;
  options?: OptionsType;
  params?: P;
  url?: string;
};

type GetAsyncPayload<P = unknown> = { options?: OptionsType; params?: P };

type PostAsyncPayload<T = unknown, P = unknown> = {
  payload: T;
  options?: OptionsType;
  params?: P;
};

type PutAsyncPayload<T = unknown, P = unknown> = {
  payload: T;
  options?: OptionsType;
  params?: P;
};

type DeleteAsyncPayload<P = unknown> = { options?: OptionsType; params?: P };

const COMMON_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const apiFnBase = async <T, P>({
  endpoint,
  method,
  payload,
  options,
  params,
  url,
}: GetDataFnParams<T, P>): Promise<ReturnType<T | null>> => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  const baseURL = "http://localhost:3333/api";

  const fetchUrl =
    stringifiedParams.length > 0
      ? `${baseURL?.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}?${stringifiedParams}`
      : `${baseURL?.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  try {
    const res = await fetch(fetchUrl, {
      ...options,
      method,
      headers: { ...COMMON_HEADERS, ...options?.headers },
      body: ["POST", "PUT"].includes(method) ? JSON.stringify(payload) : undefined,
    });

    const data: ApiResponse<T> = [204, 205, 304].includes(res.status) ? null : { ...(await res.json()), ok: true };

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        message: data.errors?.[0] || res.statusText || "Ocorreu um erro inesperado no servidor.",
      };
    }

    if (!data.success) {
      return {
        ok: data.success,
        status: res.status,
        message: data.errors?.[0] || "Ocorreu um erro inesperado.",
      };
    }

    return {
      ok: data.success,
      status: res.status,
      message: res.statusText || "Requisição bem-sucedida",
      data: "token" in data ? (data.token as T) : data.data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 400,
      message: err instanceof Error ? err.message : "Erro de rede desconhecido",
    };
  }
};

function createApi<TModel, TParams>(endpoint: string) {
  return {
    getAsync: async (data?: GetAsyncPayload<TParams>) =>
      apiFnBase<TModel[], TParams>({
        endpoint: endpoint,
        method: "GET",
        options: data?.options,
        params: data?.params,
      }),
    getByIdAsync: async (id: string, data?: GetAsyncPayload<TParams>) =>
      apiFnBase<TModel, TParams>({
        endpoint: `${endpoint}/${id}`,
        method: "GET",
        options: data?.options,
        params: data?.params,
      }),
    postAsync: async <T = TModel>(data: PostAsyncPayload<T, TParams>) => {
      return apiFnBase<T, TParams>({
        endpoint: endpoint,
        method: "POST",
        options: data?.options,
        params: data.params,
        payload: data.payload,
      });
    },
    putAsync: async <T = TModel>(id: string, data: PutAsyncPayload<T, TParams>) =>
      apiFnBase<T, TParams>({
        endpoint: `${endpoint}/${id}`,
        method: "PUT",
        options: data?.options,
        payload: data.payload,
        params: data.params,
      }),
    deleteAsync: async <T = null>(id: string, data?: DeleteAsyncPayload<TParams>) =>
      apiFnBase<T, TParams>({
        endpoint: `${endpoint}/${id}`,
        method: "DELETE",
        options: data?.options,
        params: data?.params,
      }),
  };
}

export const api = {
  livros: createApi<BookType, unknown>("/livros"),
  usuarios: createApi<UserType, unknown>("/usuarios"),
  reservas: createApi<ReserveType, unknown>("/historico"),
  login: createApi<LoginResponseType, LoginType>("/auth/login"),
};
