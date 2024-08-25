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
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getCustomerGrowthOverTime: build.query({
      query: (arg) => ({
        url: "/customer/new-customers-over-time",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getRepeatingCustomers: build.query({
      query: (arg) => ({
        url: "/customer/repeat-customers-over-time",
        method: "GET",
        params: arg,
      }),
      providesTags: ["order"],
    }),
    getGeographicalCustomers: build.query({
      query: () => ({
        url: "/customer/geographical-distribution",
        method: "GET",
      }),
      providesTags: ["customer"],
    }),
  }),
});

export const {
  useGetSellsOverTimeQuery,
  useGetSellsGrowthRateQuery,
  useGetCustomerGrowthOverTimeQuery,
  useGetRepeatingCustomersQuery,
  useGetGeographicalCustomersQuery
} = dashboardApi;
