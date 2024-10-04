// import { createApi, fetchBaseQuery, FetchBaseQuery } from "@reduxjs/toolkit/query";

// const options = {
// 	method: 'GET',
// 	hostname: 'article-extractor-and-summarizer.p.rapidapi.com',
// 	port: null,
// 	path: '/summarize?url=https%3A%2F%2Ftime.com%2F6266679%2Fmusk-ai-open-letter%2F&lang=en&engine=2',
// 	headers: {
// 		'x-rapidapi-key': 'ed50f61f3bmsh8aba25801f09ef7p13f907jsnf356d36a9e96',
// 		'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
// 	}
// };

// -------------------------new code by gpt -------------------------------
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const rapidApiKey = 'ed50f61f3bmsh8aba25801f09ef7p13f907jsnf356d36a9e96';  // Your API key
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

