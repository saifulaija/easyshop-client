// import { TQueryParam, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";
// import { TUser } from "../auth/authSlice";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => {
        return {
          url: "/meta",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMetaDataQuery } = metaApi;
