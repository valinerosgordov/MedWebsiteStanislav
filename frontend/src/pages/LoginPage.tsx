import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginApi({ email, password });
      login(data.token);
      navigate(data.role === 'Admin' ? '/admin' : '/cabinet');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-auth">
      <div className="auth-card">
        <h1 className="auth-card__title">Вход</h1>
        <p className="auth-card__subtitle">Войдите в свой личный кабинет</p>

        {error && <div className="alert alert--error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Пароль</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="auth-card__footer">
          <Link to="/forgot-password" className="auth-card__link">Забыли пароль?</Link>
        </p>
        <p className="auth-card__footer">
          Нет аккаунта? <Link to="/register" className="auth-card__link">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
