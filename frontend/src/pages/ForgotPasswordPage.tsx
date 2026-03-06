import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../api/authApi';

export default function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const urlEmail = searchParams.get('email') ?? '';
  const urlToken = searchParams.get('token') ?? '';

  const [step, setStep] = useState<'request' | 'reset' | 'done'>(urlToken ? 'reset' : 'request');
  const [email, setEmail] = useState(urlEmail);
  const [token, setToken] = useState(urlToken);

  useEffect(() => {
    if (urlEmail) setEmail(urlEmail);
    if (urlToken) {
      setToken(urlToken);
      setStep('reset');
    }
  }, [urlEmail, urlToken]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      await forgotPassword(email);
      setMessage('Если указанный email зарегистрирован, на него отправлены инструкции по восстановлению пароля.');
      setStep('reset');
    } catch {
      setError('Ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (newPassword.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPassword(email, token, newPassword);
      setStep('done');
    } catch {
      setError('Ошибка при сбросе пароля. Проверьте токен и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-login">
      <section className="page-header">
        <div className="container">
          <h1 className="page-header__title">Восстановление пароля</h1>
          <p className="page-header__subtitle">
            {step === 'request' && 'Введите email для восстановления доступа'}
            {step === 'reset' && 'Введите токен из письма и новый пароль'}
            {step === 'done' && 'Пароль успешно изменён'}
          </p>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <div className="auth-card">
            {step === 'request' && (
              <form className="auth-form" onSubmit={handleRequestReset}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert--error">{error}</div>}
                <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                  {loading ? 'Отправка...' : 'Отправить запрос'}
                </button>
                <p className="auth-form__footer">
                  <Link to="/login">Вернуться к входу</Link>
                </p>
              </form>
            )}

            {step === 'reset' && (
              <form className="auth-form" onSubmit={handleResetPassword}>
                {message && <div className="alert alert--success">{message}</div>}
                <div className="form-group">
                  <label className="form-label">Токен из письма</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Вставьте токен"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Новый пароль</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Минимум 6 символов"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Подтверждение пароля</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert--error">{error}</div>}
                <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                  {loading ? 'Сброс...' : 'Сбросить пароль'}
                </button>
              </form>
            )}

            {step === 'done' && (
              <div className="auth-form" style={{ textAlign: 'center' }}>
                <div className="alert alert--success">Пароль успешно изменён!</div>
                <Link to="/login" className="btn btn--primary" style={{ marginTop: 16 }}>
                  Войти с новым паролем
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
