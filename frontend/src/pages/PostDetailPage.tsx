import React from 'react';
import { Layout } from '../components/layout/Layout';
import { PostDetail } from '../components/board/PostDetail';

export const PostDetailPage: React.FC = () => {
  return (
    <Layout>
      <PostDetail />
    </Layout>
  );
};
