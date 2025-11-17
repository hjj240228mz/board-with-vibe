import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/board');
  };

  const handleSignupSuccess = () => {
    setMode('login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Board with Vibe</h1>
          <p>회원 전용 게시판</p>
        </div>

        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button
            className={mode === 'signup' ? 'active' : ''}
            onClick={() => setMode('signup')}
          >
            회원가입
          </button>
        </div>

        <div className="auth-content">
          {mode === 'login' ? (
            <LoginForm onSuccess={handleLoginSuccess} />
          ) : (
            <SignupForm onSuccess={handleSignupSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};
