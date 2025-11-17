import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../../services/postService';
import { PostListItem, PageResponse } from '../../types/post';
import { Pagination } from './Pagination';

export const PostList: React.FC = () => {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<PageResponse<PostListItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await postService.getPosts(page, 10);
      setPageData(data);
    } catch (err: any) {
      // 네트워크 에러나 실제 오류만 에러로 표시
      if (err.response?.status !== 200) {
        setError('게시글을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!pageData) return null;

  return (
    <div className="post-list">
      {pageData.content.length === 0 ? (
        <div className="empty-board">
          <div className="empty-board-icon">✏️</div>
          <h3>아직 게시글이 없습니다</h3>
          <p>첫 게시글의 주인공이 되어보세요!</p>
          <button onClick={() => navigate('/write')} className="write-btn-large">
            첫 글 작성하기
          </button>
        </div>
      ) : (
        <>
          <table className="post-table">
            <thead>
              <tr>
                <th className="col-no">번호</th>
                <th className="col-title">제목</th>
                <th className="col-author">작성자</th>
                <th className="col-views">조회수</th>
                <th className="col-date">작성일</th>
              </tr>
            </thead>
            <tbody>
              {pageData.content.map((post, index) => (
                <tr key={post.id} onClick={() => navigate(`/posts/${post.id}`)} className="post-row">
                  <td>{pageData.totalElements - (pageData.currentPage * pageData.pageSize + index)}</td>
                  <td className="title">{post.title}</td>
                  <td>{post.authorNickname}</td>
                  <td>{post.viewCount}</td>
                  <td>{formatDate(post.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {pageData.totalPages > 0 && (
            <Pagination
              currentPage={pageData.currentPage}
              totalPages={pageData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* 우하단 고정 글쓰기 버튼 */}
      <button onClick={() => navigate('/write')} className="floating-write-btn" title="글쓰기">
        ✏️
      </button>
    </div>
  );
};
