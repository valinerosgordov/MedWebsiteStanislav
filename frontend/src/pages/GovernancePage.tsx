import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchSpecialists } from '../api/registryApi';
import { API_BASE } from '../utils/constants';

const governanceMembers = [
  {
    role: 'Руководитель Федерации',
    name: 'Писарева Ирина Александровна',
    searchName: 'Писарева',
    desc: 'Стратегическое развитие, взаимодействие с государственными органами и профессиональным сообществом',
  },
];

export default function GovernancePage() {
  const [photos, setPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    governanceMembers.forEach(async (member) => {
      if (!member.searchName) return;
      try {
        const { data } = await searchSpecialists(member.searchName);
        const match = data.find(s =>
          `${s.lastName} ${s.firstName} ${s.middleName ?? ''}`.trim() === member.name
        );
        if (match?.photoUrl) {
          setPhotos(prev => ({ ...prev, [member.name]: match.photoUrl! }));
        }
      } catch { /* ignore */ }
    });
  }, []);

  return (
    <div className="page-governance">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge--light">О нас</span>
          <h1 className="page-header__title">Органы управления</h1>
          <p className="page-header__subtitle">
            Руководство Федерации специалистов превентивного здоровья и питания
          </p>
        </div>
      </section>

      {/* Governance */}
      <section className="section section--white">
        <div className="container">
          <div className="section-header">
            <span className="badge">Руководство</span>
            <h2 className="h2">Состав органов управления</h2>
          </div>
          <div className="governance-grid">
            {governanceMembers.map((member, i) => (
              <div className="governance-card" key={i}>
                <div className="governance-card__photo">
                  {photos[member.name] ? (
                    <img
                      src={`${API_BASE}${photos[member.name]}`}
                      alt={member.name}
                      className="governance-card__photo-img"
                    />
                  ) : (
                    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="governance-card__photo-svg">
                      <rect width="120" height="120" rx="60" fill="#edeae5" />
                      <circle cx="60" cy="45" r="20" fill="#a2bb94" />
                      <ellipse cx="60" cy="95" rx="35" ry="25" fill="#a2bb94" />
                    </svg>
                  )}
                </div>
                <span className="governance-card__role">{member.role}</span>
                <h3 className="governance-card__name">{member.name}</h3>
                <p className="governance-card__desc">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--gradient">
        <div className="container">
          <div className="cta-block">
            <h2 className="h2 h2--white">Хотите стать частью нашей экосистемы?</h2>
            <p className="text-lg text--white-muted">
              Присоединяйтесь к Федерации и внесите свой вклад в развитие отрасли превентивного здоровья
            </p>
            <div className="cta-block__buttons">
              <Link to="/register" className="btn btn--white">Вступить в Федерацию</Link>
              <Link to="/contacts" className="btn btn--white-outline">Связаться с нами</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
