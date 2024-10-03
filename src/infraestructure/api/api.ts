import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginProps = {
  tokens: {
    accessToken: string,
    clientToken: string,
  },
  view: {
    type: string,
  },
  accesses?: {
    store_id: string,
  },
  user?:{
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    date_joined: string,
  },
  code: string,
}

const baseQueryHeaders = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("access_token");
    const clientToken = localStorage.getItem("client_token");

    if (accessToken) {
      headers.set("Access-Token", `Bearer ${accessToken}`);
    }

    if (clientToken) {
      headers.set("Client-Token", clientToken);
    }

    return headers;
  }
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryHeaders,
  endpoints: (builder) => ({
    login: builder.mutation<LoginProps, {email: string, password: string}>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getClientInfo: builder.query<{data: {name: string, email: string}}, void>({
      query: () => "/self/profile",
    }),
    getStore: builder.query({
      query: (id: string) => `/store/${id}`,
    })
  }),
});

export const { useLoginMutation, useGetClientInfoQuery, useGetStoreQuery } = api;