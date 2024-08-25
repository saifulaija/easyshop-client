import { baseApi } from "@/redux/api/baseApi";
// import { tagTypes } from "@/redux/tag-types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellsOverTime: build.query({
      query: (view) => ({
        url: `/orders?interval=${view}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getSellsGrowthRate: build.query({
      query: (arg) => ({
        url: "/order/sales-growth-rate",
        method: "GET",
        params:arg
      }),
      providesTags: ["order"],
    }),
    getCustomerGrowthOverTime: build.query({
      query: (view) => ({
        url: `/customers?interval=${view}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getRepeatingCustomers: build.query({
      query: (view) => ({
        url: `/customers/repeat?interval=${view}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useGetSellsOverTimeQuery,
  useGetSellsGrowthRateQuery,
  useGetCustomerGrowthOverTimeQuery,
  useGetRepeatingCustomersQuery,
} = dashboardApi;
