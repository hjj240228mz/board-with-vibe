import React from 'react';
import { Layout } from '../components/layout/Layout';
import { PostForm } from '../components/board/PostForm';

interface PostWritePageProps {
  mode: 'create' | 'edit';
}

export const PostWritePage: React.FC<PostWritePageProps> = ({ mode }) => {
  return (
    <Layout>
      <PostForm mode={mode} />
    </Layout>
  );
};
