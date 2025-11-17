import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../../services/postService';
import { PostRequest } from '../../types/post';

interface PostFormProps {
  mode: 'create' | 'edit';
}

export const PostForm: React.FC<PostFormProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostRequest>({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchPost = async () => {
        try {
          const post = await postService.getPost(Number(id));
          setFormData({
            title: post.title,
            content: post.content,
          });
        } catch (err) {
          setError('게시글을 불러오는데 실패했습니다.');
        }
      };
      fetchPost();
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'create') {
        const post = await postService.createPost(formData);
        navigate(`/posts/${post.id}`);
      } else if (mode === 'edit' && id) {
        const post = await postService.updatePost(Number(id), formData);
        navigate(`/posts/${post.id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <h2>{mode === 'create' ? '게시글 작성' : '게시글 수정'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="제목"
            value={formData.title}
            onChange={handleChange}
            maxLength={200}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="내용"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            취소
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
};
