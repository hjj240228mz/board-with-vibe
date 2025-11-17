import api from '../utils/api';
import { Post, PostListItem, PostRequest, PageResponse } from '../types/post';

export const postService = {
  getPosts: async (page: number = 0, size: number = 10): Promise<PageResponse<PostListItem>> => {
    const response = await api.get<PageResponse<PostListItem>>('/posts', {
      params: { page, size },
    });
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  incrementViewCount: async (id: number): Promise<void> => {
    await api.post(`/posts/${id}/view`);
  },

  createPost: async (data: PostRequest): Promise<Post> => {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  updatePost: async (id: number, data: PostRequest): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
