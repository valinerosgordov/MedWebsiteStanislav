import { useState, type FormEvent } from 'react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, send to API
    setSubmitted(true);
  };

  return (
    <div className="page-contacts">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge--light">Контакты</span>
          <h1 className="page-header__title">Свяжитесь с нами</h1>
          <p className="page-header__subtitle">
            Мы готовы ответить на ваши вопросы и обсудить сотрудничество
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section section--white">
        <div className="container">
          <div className="contacts-grid">
            <a href="tel:+79854698000" className="contact-card">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h3>Телефон</h3>
              <span className="contact-card__value">+7 985 469 80 00</span>
            </a>

            <a href="mailto:federation-pmn@mail.ru" className="contact-card">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3>Email</h3>
              <span className="contact-card__value">federation-pmn@mail.ru</span>
            </a>

            <a
              href="https://t.me/federation2026"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--telegram"
            >
              <div className="contact-card__icon contact-card__icon--telegram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <h3>Telegram</h3>
              <span className="contact-card__value">Написать в Telegram</span>
            </a>

            <div className="contact-card">
              <div className="contact-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>Адрес</h3>
              <span className="contact-card__value">г. Москва, ул. Новый Арбат, д.21</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section section--light">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-info">
              <h2 className="h2">Напишите нам</h2>
              <p className="text-lg">
                Заполните форму, и мы свяжемся с вами в ближайшее время.
                Вы также можете связаться с нами напрямую по телефону или электронной почте.
              </p>
              <div className="contact-form-info__details">
                <div className="contact-form-info__item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>Пн-Пт: 09:00 — 18:00</span>
                </div>
                <div className="contact-form-info__item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>г. Москва, ул. Новый Арбат, д.21</span>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-form-success">
                  <div className="contact-form-success__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>Сообщение отправлено</h3>
                  <p>Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.</p>
                  <button className="btn btn--outline" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Ваше имя</label>
                    <input
                      id="contact-name"
                      className="form-input"
                      type="text"
                      placeholder="Введите ваше имя"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Сообщение</label>
                    <textarea
                      id="contact-message"
                      className="form-input form-input--textarea"
                      placeholder="Опишите ваш вопрос или предложение..."
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn--primary btn--full">Отправить сообщение</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
