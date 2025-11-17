export interface Post {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  authorNickname: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostListItem {
  id: number;
  title: string;
  authorNickname: string;
  viewCount: number;
  createdAt: string;
}

export interface PostRequest {
  title: string;
  content: string;
}

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}
