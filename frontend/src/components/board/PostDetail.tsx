import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../../services/postService';
import { Post } from '../../types/post';
import { useAuth } from '../../context/AuthContext';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 조회수 증가 여부 추적
  const viewCountIncremented = useRef(false);
  const currentPostId = useRef<string>('');

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      // 게시글 ID가 변경되었으면 조회수 플래그 초기화
      if (currentPostId.current !== id) {
        currentPostId.current = id;
        viewCountIncremented.current = false;
      }

      setLoading(true);
      setError('');

      try {
        const data = await postService.getPost(Number(id));
        setPost(data);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 조회수 증가 (별도 useEffect)
  useEffect(() => {
    if (!id || viewCountIncremented.current) return;

    // 즉시 플래그 설정 (중복 방지)
    viewCountIncremented.current = true;

    // 조회수 증가 API 호출 (fire-and-forget)
    postService.incrementViewCount(Number(id)).catch((err) => {
      console.error('Failed to increment view count:', err);
      // 실패해도 사용자 경험에는 영향 없음
    });
  }, [id]);

  const handleDelete = async () => {
    if (!post || !window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postService.deletePost(post.id);
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return null;

  const isAuthor = user?.username === post.authorUsername;

  return (
    <div className="post-detail">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-info">
          <span>작성자: {post.authorNickname}</span>
          <span>조회수: {post.viewCount}</span>
          <span>작성일: {formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content">
        <pre>{post.content}</pre>
      </div>

      <div className="post-actions">
        <button onClick={() => navigate('/board')} className="btn-secondary">
          목록
        </button>
        {isAuthor && (
          <>
            <button onClick={() => navigate(`/posts/${post.id}/edit`)} className="btn-primary">
              수정
            </button>
            <button onClick={handleDelete} className="btn-danger">
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};
