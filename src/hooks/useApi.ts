import { useMemo } from "react";
import { ResponseHeaders, useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { ICategory } from "../models";

const API_URL: string = "https://backend-api-sioprycdaq-ew.a.run.app/api";

interface IApiConfig {
  loader?: boolean | string;
  debug?: boolean;
}

interface IApiAuthorizationSignUpConfig extends IApiConfig {
  username: string;
  password: string;
}

interface IApiAuthorizationSignInConfig extends IApiConfig {
  username: string;
  password: string;
}

interface IApiAuthorizationSignOutConfig extends IApiConfig {}

interface IApiAccountAvatarGetConfig extends IApiConfig {}

//TODO: UPDATE CONFIG
interface IApiAccountAvatarUpdateConfig extends IApiConfig {}

interface IApiAccountAvatarDeleteConfig extends IApiConfig {}

interface IApiMealCategoriesOneConfig extends IApiConfig {
  categoryId: string;
}

interface IApiMealCategoriesInfoConfig extends IApiConfig {
  categoryId: string;
}

interface IApiMealCategoriesInfoPaginatedListConfig extends IApiConfig {
  params?: {
    NameContains: string,
    NameEquals: string,
    Pagination: {
      CurrentPage: number,
      PageSize: number
      Offset: number
    }
  };
}

interface IApiMealCategoriesInfoListConfig extends IApiConfig {
  params?: {
    NameContains: string,
    NameEquals: string,
  };
}

export interface IUseApi {
  authorization: {
    signUp: (config: IApiAuthorizationSignUpConfig) => Promise<{ data: void; headers: ResponseHeaders; }>;
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, jsonWebToken: string }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<{ data: void; headers: ResponseHeaders; }>;
  };
  account: {
    avatar: {
      get: (config: IApiAccountAvatarGetConfig) => Promise<{ data: void; headers: ResponseHeaders; }>;
      update: (config: IApiAccountAvatarUpdateConfig) => Promise<{ data: void; headers: ResponseHeaders; }>;
      delete: (config: IApiAccountAvatarDeleteConfig) => Promise<{ data: void; headers: ResponseHeaders; }>;
    };
  };
  meal: {
    categories: {
      one: (config: IApiMealCategoriesOneConfig) => Promise<{ data: ICategory; headers: ResponseHeaders; }>;
      info: (config: IApiMealCategoriesInfoConfig) => Promise<{ data: { id: string, name: string, imageLink: string }; headers: ResponseHeaders; }>;
      paginatedList: (config: IApiMealCategoriesInfoPaginatedListConfig) => Promise<{ data: { totalCount: number, count: number, items: { id: string, name: string, imageLink: string }[] }; headers: ResponseHeaders; }>;
      list: (config: IApiMealCategoriesInfoListConfig) => Promise<{ data: { id: string, name: string, imageLink: string }[]; headers: ResponseHeaders; }>;
    }
  };
}

type TUseApi = () => IUseApi;

export const useApi: TUseApi = (): IUseApi => {
  const http = useHTTP();
  const { isAuthorized, accessToken, tokenType } = useAuthorization();

  const headers: AxiosRequestHeaders = useMemo<AxiosRequestHeaders>(() => {
    const _headers: any = {};

    if (isAuthorized) {
      _headers["Authorization"] = `${tokenType} ${accessToken}`;
    }

    _headers["Access-Control-Allow-Origin"] = "*";
    _headers["Content-Type"] = "application/json";

    return _headers;
  }, [ isAuthorized, accessToken, tokenType ]);

  return {
    authorization: {
      signUp: ({ password, username, loader }) => {
        return new Promise((resolve, reject) => {
          http.request<void>({
            method: "POST",
            url: `${API_URL}/account/register`,
            headers,
            data: { password, username },
            loader: !!loader ? loader : "Processing sign up...",
          })
            .then(resolve)
            .catch(reject);
        });
      },
      signIn: ({ loader, debug, password, username }) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();

          formData.append("username", username);
          formData.append("password", password);

          http.request<{ accessToken: string, jsonWebToken: string }>({
            method: "POST",
            url: `${API_URL}/users/authentication`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
            loader: !!loader ? loader : "Processing sign in...",
            debug,
          })
            .then(({ data }) => resolve(data))
            .catch(reject);
        });
      },
      signOut: ({ loader }) => {
        return new Promise((resolve, reject) => {
          http.request<void>({
            method: "POST",
            url: `${API_URL}/users/logout`,
            headers,
            loader: !!loader ? loader : "Processing sign out...",
          })
            .then(resolve)
            .catch(reject);
        });
      },
    },
    account: {
      avatar: {
        get: ({ loader }) => {
          return new Promise((resolve, reject) => {
            http.request<void>({
              method: "GET",
              url: `${API_URL}/users/avatar/link`,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
        update: ({ loader }) => {
          return new Promise((resolve, reject) => {
            //TODO: UPDATE TYPE
            http.request<void>({
              method: "PUT",
              url: `${API_URL}/users/avatar`,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
        delete: ({ loader }) => {
          return new Promise((resolve, reject) => {
            http.request<void>({
              method: "DELETE",
              url: `${API_URL}/users/avatar`,
              headers,
              loader: !!loader ? loader : "Processing sign out...",
            })
              .then(resolve)
              .catch(reject);
          });
        },
      },
    },
    meal: {
      categories: {
        one: ({ categoryId, loader }) => {
          return new Promise((resolve, reject) => {
            http.request<ICategory>({
              method: "GET",
              url: `${API_URL}/meal-categories/${categoryId}`,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
        info: ({ categoryId, loader }) => {
          return new Promise((resolve, reject) => {
            http.request<{ id: string, name: string, imageLink: string }>({
              method: "GET",
              url: `${API_URL}/meal-categories/${categoryId}/info-list`,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
        paginatedList: ({ loader, params }) => {
          return new Promise((resolve, reject) => {
            http.request<{ totalCount: number, count: number, items: { id: string, name: string, imageLink: string }[] }>(
              {
                method: "GET",
                url: `${API_URL}/meal-categories/info-list`,
                params,
                headers,
                loader: !!loader ? loader : false,
              })
              .then(resolve)
              .catch(reject);
          });
        },
        list: ({ loader, params }) => {
          return new Promise((resolve, reject) => {
            http.request<{ id: string, name: string, imageLink: string }[]>({
              method: "GET",
              url: `${API_URL}/meal-categories/info-list/list`,
              params,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
      },
    },
  };
};
