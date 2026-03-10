import { Link } from 'react-router-dom';

export default function RegistryPage() {

  return (
    <div className="page-registry">
      {/* Hero Section */}
      <section className="registry-hero">
        <div className="registry-hero__bg" />
        <div className="registry-hero__content">
          <span className="badge badge--light">Реестр Федерации</span>
          <h1 className="registry-hero__title registry-hero__title--large">
            Единый реестр сертифицированных нутрициологов и специалистов
            в области превентивного здоровья<span className="registry-hero__asterisk">*</span>
          </h1>
          <p className="registry-hero__footnote">* специалисты без медицинского образования</p>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="section section--white">
        <div className="container">
          <div className="registry-cta-grid">
            <Link to="/register" className="registry-cta-card">
              <div className="registry-cta-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <h2 className="registry-cta-card__title">Регистрация в реестре</h2>
              <p className="registry-cta-card__text">
                Вступите в Федерацию и станьте частью профессионального сообщества.
                Получите уникальный номер участника и подтвердите свою квалификацию
                для включения в реестр сертифицированных специалистов.
              </p>
              <span className="registry-cta-card__link">
                Зарегистрироваться
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            {/* Search card temporarily hidden */}
          </div>
        </div>
      </section>

      {/* Search Section — temporarily hidden */}

      {/* CTA bottom */}
      <section className="section section--gradient">
        <div className="container">
          <div className="cta-block">
            <h2 className="h2 h2--white">Хотите попасть в реестр?</h2>
            <p className="text-lg text--white-muted">
              Зарегистрируйтесь в Федерации и подайте заявку на включение
              в реестр сертифицированных специалистов
            </p>
            <div className="cta-block__buttons">
              <Link to="/register" className="btn btn--white">Подать заявку</Link>
              <Link to="/contacts" className="btn btn--white-outline">Узнать подробнее</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
