export default function NewsPage() {
  const news = [
    {
      date: '12.02.2026',
      source: 'ТАСС',
      sourceUrl: 'https://tass.ru/obschestvo/23315285',
      image: '/news/tass-federation.jpg',
      title: 'В РФ появилась федерация, которая позволит узаконить отрасль нутрициологии',
      text: 'Приоритетом в работе организации назвали защиту потребителя и продвижение доказательного подхода в вопросах питания и профилактики заболеваний. Федерация специалистов превентивного здоровья и питания была зарегистрирована как автономная некоммерческая организация, целью которой является формирование профессиональных стандартов и создание единого реестра сертифицированных нутрициологов.',
      tags: ['Нутрициология', 'Законодательство', 'Стандарты'],
    },
    {
      date: '12.02.2026',
      source: 'МедВестник',
      sourceUrl: 'https://medvestnik.ru/content/news/V-Rossii-zaregistrirovana-Federaciya-specialistov-preventivnogo-zdorovya-i-pitaniya.html',
      image: '/news/medvestnik-federation.jpg',
      title: 'В России зарегистрирована Федерация специалистов превентивного здоровья и питания',
      text: 'Организация планирует участвовать в разработке профстандарта нутрициолога, аккредитации обучения профильных врачей и защите потребителей. Среди ключевых направлений деятельности — развитие цивилизованного рынка wellness-услуг, БАД и функционального питания, а также повышение уровня грамотности населения в области здорового образа жизни.',
      tags: ['Медицина', 'Профстандарт', 'Образование'],
    },
  ];

  return (
    <div className="page-news">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="badge badge--light">Новости</span>
          <h1 className="page-header__title">Лента новостей</h1>
          <p className="page-header__subtitle">
            Актуальные новости о деятельности Федерации и событиях в отрасли превентивного здоровья
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="section section--light">
        <div className="container">
          <div className="news-list">
            {news.map((item, i) => (
              <article className="news-article" key={i}>
                {item.image && (
                  <div className="news-article__image">
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                <div className="news-article__meta">
                  <span className="news-article__date">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {item.date}
                  </span>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="news-article__source news-article__source--link">
                    {item.source}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
                <h2 className="news-article__title">{item.title}</h2>
                <p className="news-article__text">{item.text}</p>
                <div className="news-article__tags">
                  {item.tags.map((tag, j) => (
                    <span className="news-article__tag" key={j}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
