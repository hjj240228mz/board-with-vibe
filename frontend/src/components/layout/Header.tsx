import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/board')}>
          Board with Vibe
        </h1>
        {user && (
          <div className="user-info">
            <span className="welcome">{user.nickname}님 환영합니다</span>
            <button onClick={handleLogout} className="logout-btn">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
