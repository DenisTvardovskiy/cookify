import { useMemo } from "react";
import { useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { ICategory, IIngredient, IRecipe } from "../models";
import qs from "qs";

const API_URL: string = "https://backend-api-sioprycdaq-ew.a.run.app/api";

interface IApiConfig {
  loader?: boolean | string;
  debug?: boolean;
}

interface IPaginatedList<T> {
  totalCount: number,
  count: number,
  page: number,
  offset: number,
  items: T[]
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
    UkrainianTitleContains: string,
    UkrainianTitleEquals: string
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
    UkrainianNameContains: string,
    UkrainianNameEquals: string
  };
}

interface IApiIngredientOneConfig extends IApiConfig {
  ingredientId: string;
}

interface IApiIngredientInfoConfig extends IApiConfig {
  ingredientId: string;
}

interface IApiIngredientPaginatedListConfig extends IApiConfig {
  params?: {
    NameContains: string,
    NameEquals: string,
    UkrainianNameContains: string,
    UkrainianNameEquals: string
    Pagination: {
      Page: number,
      PageSize: number
      Offset: number
    }
  };
}

interface IApiIngredientInfoListConfig extends IApiConfig {
  params?: {
    NameContains: string,
    NameEquals: string,
  };
}

interface IApiRecipePaginatedListConfig extends IApiConfig {
  params?: {
    TitleContains: string,
    TitleEquals: string,
    UkrainianTitleContains: string,
    UkrainianTitleEquals: string
    Pagination: {
      Page: number,
      PageSize: number
      Offset: number
    }
  };
}

interface IApiRecipeInfoConfig extends IApiConfig {
  recipeId: string;
}

export interface IUseApi {
  authorization: {
    signUp: (config: IApiAuthorizationSignUpConfig) => Promise<void>;
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ refreshToken: string, jsonWebToken: string }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
  };
  account: {
    avatar: {
      get: (config: IApiAccountAvatarGetConfig) => Promise<string>;
      update: (config: IApiAccountAvatarUpdateConfig) => Promise<string>;
      delete: (config: IApiAccountAvatarDeleteConfig) => Promise<void>;
    };
  };
  meal: {
    categories: {
      one: (config: IApiMealCategoriesOneConfig) => Promise<ICategory>;
      info: (config: IApiMealCategoriesInfoConfig) => Promise<{ id: string, name: string, ukrainianName: string, imageLink: string }>;
      paginatedList: (config: IApiMealCategoriesInfoPaginatedListConfig) => Promise<IPaginatedList<ICategory>>;
      list: (config: IApiMealCategoriesInfoListConfig) => Promise<{ id: string, name: string, ukrainianName: string, imageLink: string }[]>;
    };
  };
  ingredients: {
    one: (config: IApiIngredientOneConfig) => Promise<IIngredient>;
    info: (config: IApiIngredientInfoConfig) => Promise<{ id: string, name: string, ukrainianName: string, imageLink: string }>;
    paginatedList: (config: IApiIngredientPaginatedListConfig) => Promise<IPaginatedList<IIngredient>>;
    list: (config: IApiIngredientInfoListConfig) => Promise<{ id: string, name: string, ukrainianName: string, imageLink: string }[]>;
  };
  recipes: {
    one: (config: IApiRecipeInfoConfig) => Promise<IRecipe>;
    paginatedList: (config: IApiRecipePaginatedListConfig) => Promise<IPaginatedList<IRecipe>>;
  };
}

type TUseApi = () => IUseApi;

export const useApi: TUseApi = (): IUseApi => {
  const http = useHTTP();
  const { isAuthorized, jsonWebToken } = useAuthorization();

  const headers: AxiosRequestHeaders = useMemo<AxiosRequestHeaders>(() => {
    const _headers: any = {};

    if (isAuthorized) {
      _headers["Authorization"] = `Bearer ${jsonWebToken}`;
    }

    _headers["Access-Control-Allow-Origin"] = "*";
    _headers["Content-Type"] = "application/json";

    return _headers;
  }, [ isAuthorized, jsonWebToken ]);

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
      signIn: ({ loader, debug, username, password }) => {
        return new Promise((resolve, reject) => {
          http.request<{ refreshToken: string, jsonWebToken: string }>({
            method: "POST",
            url: `${API_URL}/users/authentication`,
            headers,
            data: { username, password },
            loader: !!loader ? loader : "Processing sign in...",
            debug,
          })
            .then(resolve)
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
            http.request<string>({
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
            http.request<string>({
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
            http.request<{ id: string, name: string, ukrainianName: string, imageLink: string }>({
              method: "GET",
              url: `${API_URL}/meal-categories/${categoryId}/short-info`,
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
        paginatedList: ({ loader, params }) => {
          return new Promise((resolve, reject) => {
            http.request<IPaginatedList<ICategory>>(
              {
                method: "GET",
                url: `${API_URL}/meal-categories/short-info`,
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
            http.request<{ id: string, name: string, ukrainianName: string, imageLink: string }[]>({
              method: "GET",
              url: `${API_URL}/meal-categories/short-info/list`,
              params,
              paramsSerializer: {
                serialize: p => qs.stringify(
                  Object.fromEntries(Object.entries(p).filter(([ k, v ]) => v)),
                  { allowDots: true },
                ),
              },
              headers,
              loader: !!loader ? loader : false,
            })
              .then(resolve)
              .catch(reject);
          });
        },
      },
    },
    ingredients: {
      one: ({ ingredientId, loader }) => {
        return new Promise((resolve, reject) => {
          http.request<IIngredient>({
            method: "GET",
            url: `${API_URL}/ingredients/${ingredientId}`,
            headers,
            loader: !!loader ? loader : false,
          })
            .then(resolve)
            .catch(reject);
        });
      },
      info: ({ ingredientId, loader }) => {
        return new Promise((resolve, reject) => {
          http.request<{ id: string, name: string, ukrainianName: string, imageLink: string }>({
            method: "GET",
            url: `${API_URL}/ingredients/${ingredientId}/short-info`,
            headers,
            loader: !!loader ? loader : false,
          })
            .then(resolve)
            .catch(reject);
        });
      },
      paginatedList: ({ loader, params }) => {
        return new Promise((resolve, reject) => {
          http.request<IPaginatedList<IIngredient>>(
            {
              method: "GET",
              url: `${API_URL}/ingredients/short-info`,
              params,
              paramsSerializer: {
                serialize: p => qs.stringify(
                  Object.fromEntries(Object.entries(p).filter(([ k, v ]) => v)),
                  { allowDots: true },
                ),
              },
              headers,
              loader: !!loader ? loader : false,
            })
            .then(resolve)
            .catch(reject);
        });
      },
      list: ({ loader, params }) => {
        return new Promise((resolve, reject) => {
          http.request<{ id: string, name: string, ukrainianName: string, imageLink: string }[]>({
            method: "GET",
            url: `${API_URL}/ingredients/short-info/list`,
            params,
            headers,
            loader: !!loader ? loader : false,
          })
            .then(resolve)
            .catch(reject);
        });
      },
    },
    recipes: {
      one: ({ recipeId, loader }) => {
        return new Promise((resolve, reject) => {
          http.request<IRecipe>({
            method: "GET",
            url: `${API_URL}/recipes/${recipeId}`,
            headers,
            loader: !!loader ? loader : false,
          })
            .then(resolve)
            .catch(reject);
        });
      },
      paginatedList: ({ loader, params }) => {
        return new Promise((resolve, reject) => {
          http.request<IPaginatedList<IRecipe>>(
            {
              method: "GET",
              url: `${API_URL}/recipes/short-info`,
              params,
              paramsSerializer: {
                serialize: p => qs.stringify(
                  Object.fromEntries(Object.entries(p).filter(([ k, v ]) => v)),
                  { allowDots: true },
                ),
              },
              headers,
              loader: !!loader ? loader : false,
            })
            .then(resolve)
            .catch(reject);
        });
      },
    },
  };
};
