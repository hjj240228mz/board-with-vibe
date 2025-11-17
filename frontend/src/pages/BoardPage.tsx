import React from 'react';
import { Layout } from '../components/layout/Layout';
import { PostList } from '../components/board/PostList';

export const BoardPage: React.FC = () => {
  return (
    <Layout>
      <div className="board-page">
        <h2>게시판</h2>
        <PostList />
      </div>
    </Layout>
  );
};
