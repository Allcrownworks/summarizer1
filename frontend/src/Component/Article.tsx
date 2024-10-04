
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;  // Access the API key from the .env file

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com',  // Base URL
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', rapidApiKey);  // Set the API key in headers
      headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&lang=en&engine=2`,  // Dynamic URL
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;

