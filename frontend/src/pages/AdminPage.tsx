import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/adminApi';
import { formatMemberNumber } from '../utils/constants';
import type { UserListItem } from '../types/profile';

export default function AdminPage() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch {
      setError('Ошибка загрузки списка пользователей');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-admin">
      <section className="page-header">
        <div className="container">
          <div className="admin-header">
            <div>
              <h1 className="page-header__title">Админ-панель</h1>
              <p className="page-header__subtitle">Управление пользователями и реестром</p>
            </div>
            <div className="admin-header__stats">
              <div className="admin-stat">
                <span className="admin-stat__number">{users.length}</span>
                <span className="admin-stat__label">Пользователей</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <div className="alert alert--error">{error}</div>}

          {loading ? (
            <div className="cabinet-loading">
              <div className="cabinet-loading__spinner" />
              <p>Загрузка пользователей...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64" style={{ color: 'var(--color-primary-light)', marginBottom: 16 }}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p>Пользователи не найдены</p>
            </div>
          ) : (
            <div className="admin-table-card">
              <div className="admin-table-card__header">
                <h2 className="admin-table-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Список пользователей
                </h2>
              </div>
              <div className="users-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID участника</th>
                      <th>Email</th>
                      <th>Фамилия</th>
                      <th>Имя</th>
                      <th>Дата регистрации</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td>
                          <span className="member-badge member-badge--table">
                            {formatMemberNumber(user.memberNumber)}
                          </span>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.lastName || '---'}</td>
                        <td>{user.firstName || '---'}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</td>
                        <td>
                          <Link to={`/admin/users/${user.userId}`} className="btn btn--primary btn--xs">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ marginRight: 4 }}>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            Просмотреть
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
