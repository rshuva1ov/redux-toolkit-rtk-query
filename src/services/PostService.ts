import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../store/models/IPost";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IPost[], number>({
            query: (limit = 5) => ({
                url: `/posts`,
                params: {
                    _limit: limit,
                }
            }),
            providesTags: result => ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        })
    })
})