import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SignupRequest } from '../../types/user';

interface SignupFormProps {
  onSuccess: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState<SignupRequest>({
    username: '',
    password: '',
    nickname: '',
    email: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await signup(formData);
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>회원가입</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="아이디 (4자 이상)"
          value={formData.username}
          onChange={handleChange}
          minLength={4}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="비밀번호 (6자 이상)"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="nickname"
          placeholder="닉네임 (2자 이상)"
          value={formData.nickname}
          onChange={handleChange}
          minLength={2}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
};
