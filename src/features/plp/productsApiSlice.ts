// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductsApiResponse } from '../../utils/types.ts'

// Define a service using a base URL and expected endpoints
export const productsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  reducerPath: 'productsApi',
  // Tag types are used for caching and invalidation.
  tagTypes: ['Products'],
  endpoints: build => ({
    // Supply generics for the return type `ProductsApiResponse`
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getProducts: build.query<
      ProductsApiResponse,
      { limit: number; skip: number }
    >({
      query: ({ limit = 20, skip = 0 }) => `?limit=${limit}&skip=${skip}`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (_result, _error, arg) => [{ type: 'Products', arg }]
    })
  })
})

// Hooks are auto-generated by RTK-Query
// Same as `productsApiSlice.endpoints.getProducts.useQuery`
export const { useGetProductsQuery } = productsApiSlice
