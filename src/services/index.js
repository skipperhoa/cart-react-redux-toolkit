// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().login.token
    //console.log("token",getState().login)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})
// Define a service using a base URL and expected endpoints
export const serviceApi = createApi({
  reducerPath: 'projectApi',
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  baseQuery,
  endpoints: (builder) => ({
    getProducts:builder.query({
        query:()=>`products`
    }),
    getProduct:builder.query({
      query:(id)=>`products/${id}`
    }),
    login:builder.mutation({
      query:(credentials)=>({
        url:'users/login/auth',
        method:'POST',
        body:credentials
      }),
      transformResponse:(response,meta,arg)=>response.data,
      extraOptions:{
        backoff:()=>{
          retry.fail({fake:'error'})
        }
      }
    }),
    getInfo:builder.mutation({
      query:(id,token)=>({
        url:`users/${id}`,
        method:'POST',
        body:JSON.stringify({"id":id})
      }),
      transformResponse:(response,meta,arg)=>response.data
    })
  }),
});
export const { useGetProductsQuery, useGetProductQuery, useLoginMutation,useGetInfoMutation} = serviceApi
