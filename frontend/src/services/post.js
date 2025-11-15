import api from "./api";

export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const getMyPosts = () => api.get("/posts/my-posts");
export const getPost = (id) => api.get(`/posts/${id}`);
export const getAllPosts = () => api.get("/posts");
