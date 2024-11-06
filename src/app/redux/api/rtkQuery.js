import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens, clearTokens } from "../features/auth/tokenSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const { accessToken } = getState().tokens;
        if (accessToken) headers.set("authorization", `Bearer ${accessToken}`)
        return headers
}
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (
        result?.error?.status === 401 ||
        result?.error?.status === 403 ||
        result?.error?.status === 409
    ) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery({
            url: `/api/client/token/refresh/`,
            method: 'POST',
            body: { refresh: api.getState().login?.userLogin?.refresh_token },
        }, api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            api.dispatch(setTokens({
                accessToken: refreshResult.data.access,
            }));
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearTokens());
            api.dispatch(logout());
        }
    }
    return result;
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['LabCart', 'Tests', 'PharmCart'],
    endpoints: (builder) => ({}),
    refetchOnMountOrArgChange: 1
});
