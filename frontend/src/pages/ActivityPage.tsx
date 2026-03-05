import { Link } from 'react-router-dom';

const goals = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Превентивное здоровье',
    desc: 'Развитие превентивного здоровья, нутрициологии и здорового образа жизни',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Стандарты и этика',
    desc: 'Содействие формированию профессиональных стандартов и этики специалистов в области превентивного здоровья и нутрициологии',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
    title: 'Грамотность населения',
    desc: 'Повышение уровня грамотности населения в области питания и здорового образа жизни',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Рынок wellness-услуг',
    desc: 'Развитие цивилизованного рынка wellness-услуг, БАД и функционального питания',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Проверенные специалисты',
    desc: 'Доступ к проверенным специалистам с подтверждённой квалификацией и опытом работы',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Качество и безопасность',
    desc: 'Повышение качества и безопасности услуг в области ЗОЖ, питания, wellness и фитнеса',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    title: 'Образовательные стандарты',
    desc: 'Формирование стандартов образовательных программ для специалистов в области превентивного здоровья и нутрициологии',
  },
];

export default function ActivityPage() {
  return (
    <div className="page-activity">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge--light">Деятельность</span>
          <h1 className="page-header__title">Ключевые направления деятельности</h1>
          <p className="page-header__subtitle">
            Федерация ведёт системную работу по развитию отрасли превентивного здоровья и здорового образа жизни в России
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section section--white">
        <div className="container">
          <div className="activity-intro">
            <h2 className="h2">Наши цели</h2>
            <p className="text-lg">
              Деятельность Федерации направлена на формирование цивилизованной экосистемы
              превентивного здоровья, где каждый специалист работает по единым профессиональным
              стандартам, а каждый потребитель получает качественные и безопасные услуги.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="section section--light">
        <div className="container">
          <div className="activity-goals-grid">
            {goals.map((goal, i) => (
              <div className="activity-goal-card" key={i}>
                <div className="activity-goal-card__number">{String(i + 1).padStart(2, '0')}</div>
                <div className="activity-goal-card__icon">{goal.icon}</div>
                <h3 className="activity-goal-card__title">{goal.title}</h3>
                <p className="activity-goal-card__text">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Basis */}
      <section className="section section--white">
        <div className="container">
          <div className="legal-basis">
            <div className="legal-basis__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div className="legal-basis__content">
              <span className="badge">Нормативная основа</span>
              <h2 className="h2">Стратегия развития здравоохранения</h2>
              <p className="text-lg">
                Деятельность Федерации основывается на Указе Президента Российской Федерации
                от 8 декабря 2025 г. №896 о Стратегии развития здравоохранения Российской
                Федерации на период до 2030 года, определяющем приоритеты в сфере превентивного
                здоровья, профилактики заболеваний и здорового образа жизни.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--gradient">
        <div className="container">
          <div className="cta-block">
            <h2 className="h2 h2--white">Хотите стать частью нашей деятельности?</h2>
            <p className="text-lg text--white-muted">
              Присоединяйтесь к Федерации и внесите свой вклад в развитие отрасли превентивного здоровья и здорового образа жизни в России.
            </p>
            <div className="cta-block__buttons">
              <Link to="/register" className="btn btn--white">Вступить в Федерацию</Link>
              <Link to="/partnerstvo" className="btn btn--white-outline">Партнерство</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
