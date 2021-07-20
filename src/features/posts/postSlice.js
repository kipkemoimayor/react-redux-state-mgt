import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

import { client } from '../../api/client';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
});

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
                    }
                };
            }
        },
        postUpdated(state, action) {
            const { id, name, content } = action.payload;
            const excistingPost = state.posts.find(post => post.id === id);
            if (excistingPost) {
                excistingPost.name = name;
                excistingPost.content = content;
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },

    }
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;

export const selectAllPosts = state => {
    return state.posts.posts;
};

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId);

