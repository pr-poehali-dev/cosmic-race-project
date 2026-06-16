import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/941fac68-0c2f-4b91-a460-f7bc7fda8125.jpg';
const BURAN_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/fd926f3d-bd48-4753-9746-3cedbebbe4c1.jpg';
const PAPER_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/639811f4-7f70-4bef-9740-2cfb5686d672.jpg';

const EVENTS = [
  { year: '1957', date: '4 октября 1957', title: 'СССР ЗАПУСТИЛ ПЕРВЫЙ СПУТНИК ЗЕМЛИ', short: 'Спутник-1', text: 'Советский Союз открыл новую страницу в истории человечества. Искусственный спутник Земли, выведенный на орбиту ракетой-носителем, непрерывно излучает радиосигналы. Сигнал «бип-бип» услышал весь мир.', icon: 'Satellite' },
  { year: '1961', date: '12 апреля 1961', title: 'СОВЕТСКИЙ ЧЕЛОВЕК ВПЕРВЫЕ В КОСМОСЕ!', short: 'Гагарин', text: 'Лётчик-космонавт майор Юрий Алексеевич Гагарин совершил первый в истории полёт человека в космическое пространство. Облетев земной шар за 108 минут, корабль «Восток-1» благополучно приземлился.', icon: 'Rocket' },
  { year: '1963', date: '16 июня 1963', title: 'СОВЕТСКАЯ ЖЕНЩИНА ПОКОРИЛА КОСМОС', short: 'Терешкова', text: 'Валентина Владимировна Терешкова совершила орбитальный полёт на космическом корабле «Восток-6». За 70 часов 50 минут «Чайка» выполнила 48 витков вокруг Земли, доказав равенство советских женщин.', icon: 'Star' },
  { year: '1965', date: '18 марта 1965', title: 'СОВЕТСКИЙ КОСМОНАВТ ВЫШЕЛ В ОТКРЫТЫЙ КОСМОС', short: 'Леонов', text: 'Алексей Архипович Леонов впервые в истории вышел в открытый космос. Находясь вне корабля «Восход-2» 12 минут 9 секунд, он продемонстрировал возможность деятельности человека в открытом космосе.', icon: 'Wind' },
  { year: '1971', date: '19 апреля 1971', title: 'ЗАПУЩЕНА ПЕРВАЯ ОРБИТАЛЬНАЯ СТАНЦИЯ', short: 'Салют-1', text: 'В Советском Союзе выведена на орбиту первая в мире долговременная орбитальная станция «Салют-1». Это открывает новую эру в освоении космического пространства.', icon: 'Orbit' },
  { year: '1986', date: '20 февраля 1986', title: 'ОРБИТАЛЬНЫЙ КОМПЛЕКС «МИР» ВЫВЕДЕН НА ОРБИТУ', short: 'Станция «Мир»', text: 'Советский многомодульный орбитальный комплекс «Мир» начал работу. Уникальная конструкция рассчитана на длительную эксплуатацию и станет форпостом человечества в космосе.', icon: 'Globe' },
  { year: '1988', date: '15 ноября 1988', title: 'СОВЕТСКИЙ «БУРАН» СОВЕРШИЛ ПЕРВЫЙ ПОЛЁТ', short: 'Буран', text: 'Многоразовый орбитальный корабль «Буран» успешно выведен на орбиту и совершил автоматическую посадку. Уникальное достижение советской науки и техники не имеет аналогов в мировой практике.', icon: 'Plane' },
];

const HEROES = [
  { name: 'Ю.А. Гагарин', full: 'Юрий Алексеевич Гагарин', role: 'Лётчик-космонавт СССР, Герой Советского Союза', years: '1934–1968', text: 'Первый в истории человечества космонавт. Уроженец Смоленской области, военный лётчик-истребитель, он был отобран из 3000 кандидатов для исторического полёта. После триумфа стал символом советской эпохи. Трагически погиб в авиакатастрофе вблизи города Киржач в возрасте 34 лет.' },
  { name: 'В.В. Терешкова', full: 'Валентина Владимировна Терешкова', role: 'Лётчик-космонавт СССР, Герой Советского Союза', years: 'р. 1937', text: 'До отбора в отряд космонавтов работала на Ярославском шинном заводе и серьёзно занималась парашютным спортом. Единственная в истории женщина, самостоятельно управлявшая космическим кораблём. Депутат Верховного Совета СССР многих созывов.' },
  { name: 'А.А. Леонов', full: 'Алексей Архипович Леонов', role: 'Лётчик-космонавт СССР, дважды Герой Советского Союза', years: '1934–2019', text: 'Художник и космонавт. Написал более двухсот картин, посвящённых космосу. Во время выхода в открытый космос его скафандр раздулся настолько, что возвращение на борт потребовало исключительного мужества. Участник советско-американского полёта «Союз–Аполлон» в 1975 году.' },
  { name: 'С.П. Королёв', full: 'Сергей Павлович Королёв', role: 'Главный конструктор ракетно-космических систем', years: '1907–1966', text: 'Личность Королёва была строго засекречена и стала известна широкой публике лишь после его смерти. Прошёл сталинские лагеря, выжил и создал всё: первую межконтинентальную ракету, спутник, «Восток». Скончался на операционном столе в январе 1966 года, так и не узнав, что именно он навсегда изменил историю.' },
];

export default function Index() {
  const [activeEvent, setActiveEvent] = useState(1);
  const [activeHero, setActiveHero] = useState(0);
  const ev = EVENTS[activeEvent];
  const hero = HEROES[activeHero];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className="min-h-screen font-body text-[#1a1008]"
      style={{
        backgroundColor: '#f2e8d0',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
      }}
    >

      {/* ══ ШАПКА ГАЗЕТЫ ══════════════════════════════════════ */}
      <header className="border-b-4 border-[#1a1008]">
        {/* верхняя строка */}
        <div className="flex items-center justify-between px-6 md:px-10 py-2 border-b border-[#1a1008]/30 text-[10px] font-display uppercase tracking-[0.25em] text-[#1a1008]/50">
          <span>Орган Советского народа</span>
          <span>Среда, 12 апреля 1961 года</span>
          <span>Цена 2 коп.</span>
        </div>

        {/* название */}
        <div className="px-6 md:px-10 py-5 border-b-2 border-[#1a1008] text-center relative">
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 text-left">
            <span className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40">Основана</span>
            <span className="font-display font-bold text-sm">1957 год</span>
          </div>
          <h1 className="font-display font-bold uppercase tracking-[0.05em] text-5xl md:text-7xl leading-none">
            ЗВЁЗДНЫЙ ПУТЬ
          </h1>
          <p className="font-display uppercase tracking-[0.6em] text-xs mt-1 text-[#1a1008]/60">
            ежедневная газета советской космонавтики
          </p>
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-1 text-right">
            <span className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40">Выпуск</span>
            <span className="font-display font-bold text-sm">№ 108</span>
          </div>
        </div>

        {/* рубрики-навигация */}
        <div className="flex overflow-x-auto">
          {[
            { id: 'front', label: 'Первая полоса' },
            { id: 'timeline', label: 'Хроника' },
            { id: 'heroes', label: 'Герои' },
            { id: 'archive', label: 'Документы' },
            { id: 'gallery', label: 'Фотолетопись' },
          ].map((n, i) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="shrink-0 px-5 py-2.5 font-display uppercase text-[10px] tracking-[0.25em] border-r border-[#1a1008]/20 hover:bg-[#1a1008] hover:text-[#f2e8d0] transition-colors last:border-r-0"
            >
              {i > 0 && <span className="text-[#1a1008]/30 mr-1.5">{i}.</span>}{n.label}
            </button>
          ))}
        </div>
      </header>

      {/* ══ ПЕРВАЯ ПОЛОСА ══════════════════════════════════════ */}
      <section id="front" className="max-w-7xl mx-auto px-4 md:px-10 py-8">

        {/* главный заголовок */}
        <div className="border-b-2 border-[#1a1008] pb-6 mb-6 text-center">
          <p className="font-display uppercase text-[9px] tracking-[0.4em] text-[#1a1008]/40 mb-2">Сенсационное сообщение ТАСС</p>
          <h2 className="font-display font-bold uppercase leading-[0.88] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            СОВЕТСКИЙ ЧЕЛОВЕК<br />ПЕРВЫМ ПОКОРИЛ<br /><span className="italic">ВСЕЛЕННУЮ!</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 bg-[#1a1008]/20" />
            <p className="font-display uppercase text-[10px] tracking-[0.3em] text-[#1a1008]/50">12 апреля 1961 года · Москва</p>
            <div className="h-px flex-1 bg-[#1a1008]/20" />
          </div>
        </div>

        {/* трёхколонная вёрстка */}
        <div className="grid md:grid-cols-3 gap-0 divide-x divide-[#1a1008]/20">

          {/* колонка 1 — текст */}
          <div className="pr-0 md:pr-6 pb-6 md:pb-0">
            <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 border-b border-[#1a1008]/20 pb-1 mb-3">От нашего корреспондента</p>
            <p className="text-sm leading-relaxed text-[#1a1008]/80 text-justify hyphens-auto">
              <span className="font-bold text-2xl float-left mr-1 leading-none mt-1">С</span>
              егодня, 12 апреля 1961 года, в Советском Союзе выведен на орбиту вокруг Земли первый в мире космический корабль-спутник «Восток» с человеком на борту.
            </p>
            <p className="text-sm leading-relaxed text-[#1a1008]/80 mt-3 text-justify hyphens-auto">
              Пилотом-космонавтом космического корабля-спутника «Восток» является гражданин Союза Советских Социалистических Республик лётчик майор <strong>Гагарин Юрий Алексеевич</strong>.
            </p>
            <p className="text-sm leading-relaxed text-[#1a1008]/80 mt-3 text-justify">
              Старт космической многоступенчатой ракеты прошёл успешно, и после набора первой космической скорости и отделения от последней ступени ракеты-носителя корабль-спутник начал свободный полёт по орбите вокруг Земли.
            </p>
            <div className="mt-4 border-t border-[#1a1008]/20 pt-3">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40">Самочувствие космонавта</p>
              <p className="font-bold text-base mt-1">«Отличное. Настроение бодрое»</p>
              <p className="text-[10px] text-[#1a1008]/40 mt-0.5">— доклад с борта «Востока-1»</p>
            </div>
          </div>

          {/* колонка 2 — фото */}
          <div className="px-0 md:px-6 py-6 md:py-0 flex flex-col items-center gap-4">
            <div className="relative w-full">
              <img
                src={HERO_IMG}
                alt="Гагарин"
                className="w-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.9)', maxHeight: 340, objectPosition: 'top' }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#1a1008] text-[#f2e8d0] text-center py-2 px-3">
                <p className="font-display uppercase text-[9px] tracking-[0.3em]">Лётчик-космонавт майор</p>
                <p className="font-display font-bold uppercase text-sm">Ю.А. Гагарин</p>
              </div>
            </div>
            {/* цитата */}
            <div className="border-l-4 border-[#1a1008] pl-4 w-full">
              <p className="font-display italic text-xl leading-tight font-bold">"Поехали!"</p>
              <p className="text-[10px] text-[#1a1008]/50 mt-1 font-display uppercase tracking-widest">— Ю.А. Гагарин, 09:07 МСК</p>
            </div>
            <div className="w-full border border-[#1a1008]/20 p-3 bg-[#1a1008]/5">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 mb-2">Параметры полёта</p>
              {[['Продолжительность', '108 минут'], ['Максимальная высота', '327 км'], ['Орбит вокруг Земли', '1'], ['Скорость', '27 400 км/ч']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs border-b border-[#1a1008]/10 py-1 last:border-0">
                  <span className="text-[#1a1008]/60">{k}</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* колонка 3 — текст */}
          <div className="pl-0 md:pl-6 pt-6 md:pt-0">
            <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 border-b border-[#1a1008]/20 pb-1 mb-3">Специальный репортаж</p>
            <p className="text-sm leading-relaxed text-[#1a1008]/80 text-justify">
              По облёте земного шара в соответствии с намеченной программой была включена тормозная двигательная установка и космический корабль-спутник начал снижаться с орбиты.
            </p>
            <p className="text-sm leading-relaxed text-[#1a1008]/80 mt-3 text-justify">
              После успешного проведения намеченных исследований и выполнения программы полёта в 10 часов 55 минут московского времени советский космический корабль «Восток» совершил благополучную посадку в заданном районе Советского Союза.
            </p>
            <div className="mt-4 bg-[#1a1008] text-[#f2e8d0] p-4">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#f2e8d0]/50 mb-2">Сообщение ТАСС</p>
              <p className="text-xs leading-relaxed italic">
                «Первый полёт человека в космос — это торжество ленинских идей, могущества советского народа, его науки и техники…»
              </p>
            </div>
            <div className="mt-4 border border-[#1a1008]/30 p-3">
              <p className="font-display font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Также в номере:</p>
              {['Поздравления со всего мира — стр. 2', 'Биография Ю.А. Гагарина — стр. 3', 'Ракета-носитель «Восток» — стр. 4'].map(s => (
                <p key={s} className="text-[10px] text-[#1a1008]/60 py-1 border-b border-[#1a1008]/10 last:border-0">• {s}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ХРОНИКА ════════════════════════════════════════════ */}
      <section id="timeline" className="border-t-4 border-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold uppercase text-2xl tracking-wide">ХРОНИКА КОСМИЧЕСКОЙ ГОНКИ</h2>
            <div className="flex-1 border-t-2 border-[#1a1008]" />
            <span className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40">1957–1988</span>
          </div>

          {/* годы */}
          <div className="flex gap-0 overflow-x-auto mb-6 border border-[#1a1008]/30">
            {EVENTS.map((e, i) => (
              <button
                key={e.year}
                onClick={() => setActiveEvent(i)}
                className={`shrink-0 px-5 py-3 font-display font-bold text-sm border-r border-[#1a1008]/20 last:border-r-0 transition-colors ${
                  i === activeEvent ? 'bg-[#1a1008] text-[#f2e8d0]' : 'hover:bg-[#1a1008]/10'
                }`}
              >
                {e.year}
              </button>
            ))}
          </div>

          {/* активное событие */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-0 border border-[#1a1008]/30">
            <div className="border-r border-[#1a1008]/30 p-6 bg-[#1a1008]/5">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 mb-1">{ev.date}</p>
              <div className="font-display font-bold text-[80px] leading-none text-[#1a1008]/10 select-none">{ev.year}</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-9 h-9 border-2 border-[#1a1008] flex items-center justify-center">
                  <Icon name={ev.icon} size={16} />
                </div>
                <span className="font-display uppercase text-xs tracking-widest text-[#1a1008]/50">{ev.short}</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 mb-3">Экстренный выпуск · ТАСС</p>
              <h3 className="font-display font-bold uppercase text-xl md:text-2xl leading-tight mb-4">{ev.title}</h3>
              <p className="text-sm leading-relaxed text-[#1a1008]/75 text-justify">{ev.text}</p>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setActiveEvent(i => Math.max(0, i - 1))} disabled={activeEvent === 0}
                  className="border border-[#1a1008]/30 px-3 py-1.5 font-display uppercase text-[10px] tracking-widest disabled:opacity-30 hover:bg-[#1a1008] hover:text-[#f2e8d0] transition-colors">
                  ← Предыд.
                </button>
                <button onClick={() => setActiveEvent(i => Math.min(EVENTS.length - 1, i + 1))} disabled={activeEvent === EVENTS.length - 1}
                  className="border border-[#1a1008]/30 px-3 py-1.5 font-display uppercase text-[10px] tracking-widest disabled:opacity-30 hover:bg-[#1a1008] hover:text-[#f2e8d0] transition-colors">
                  Следующ. →
                </button>
              </div>
            </div>
          </div>

          {/* лента снизу */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-[#1a1008]/15">
            {EVENTS.map((e, i) => (
              <button key={e.year} onClick={() => setActiveEvent(i)}
                className={`py-3 px-3 text-left transition-colors ${i === activeEvent ? 'bg-[#1a1008] text-[#f2e8d0]' : 'bg-[#f2e8d0] hover:bg-[#1a1008]/10'}`}>
                <p className="font-display font-bold text-base">{e.year}</p>
                <p className="font-display uppercase text-[8px] tracking-widest opacity-50 mt-0.5 truncate">{e.short}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ГЕРОИ ══════════════════════════════════════════════ */}
      <section id="heroes" className="border-t-4 border-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold uppercase text-2xl tracking-wide">ГЕРОИ СОВЕТСКОЙ КОСМОНАВТИКИ</h2>
            <div className="flex-1 border-t-2 border-[#1a1008]" />
          </div>

          {/* выбор */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1008]/20 mb-0">
            {HEROES.map((h, i) => (
              <button key={h.name} onClick={() => setActiveHero(i)}
                className={`py-4 px-4 text-left transition-colors ${i === activeHero ? 'bg-[#1a1008] text-[#f2e8d0]' : 'bg-[#f2e8d0] hover:bg-[#1a1008]/8'}`}>
                <p className={`font-display uppercase text-[8px] tracking-[0.3em] mb-1 ${i === activeHero ? 'text-[#f2e8d0]/40' : 'text-[#1a1008]/40'}`}>0{i + 1}</p>
                <p className="font-display font-bold uppercase text-sm leading-tight">{h.name}</p>
              </button>
            ))}
          </div>

          <div className="border border-[#1a1008]/30 border-t-0 grid md:grid-cols-[1fr_2fr]">
            <div className="border-r border-[#1a1008]/30 p-6 bg-[#1a1008]/5">
              <p className="font-display uppercase text-[8px] tracking-[0.35em] text-[#1a1008]/40 mb-1">{hero.role}</p>
              <h3 className="font-display font-bold uppercase text-xl leading-tight">{hero.full}</h3>
              <p className="text-[#1a1008]/40 font-display uppercase tracking-widest text-[10px] mt-1">{hero.years}</p>
              <div className="mt-4 border-t border-[#1a1008]/15 pt-4">
                <p className="font-display uppercase text-[8px] tracking-[0.3em] text-[#1a1008]/40 mb-2">Ссылки по теме</p>
                {['Полная биография', 'Архив документов', 'Фотоматериалы'].map(l => (
                  <p key={l} className="text-[10px] text-[#1a1008]/50 py-1 border-b border-[#1a1008]/10 last:border-0 flex items-center justify-between">
                    <span>→ {l}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 mb-3 border-b border-[#1a1008]/15 pb-2">Биографическая справка</p>
              <p className="text-sm leading-relaxed text-[#1a1008]/80 text-justify">{hero.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ АРХИВ ДОКУМЕНТОВ ═══════════════════════════════════ */}
      <section id="archive" className="border-t-4 border-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold uppercase text-2xl tracking-wide">АРХИВ РАССЕКРЕЧЕННЫХ ДОКУМЕНТОВ</h2>
            <div className="flex-1 border-t-2 border-[#1a1008]" />
            <span className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40">Гриф снят</span>
          </div>

          <div className="divide-y divide-[#1a1008]/15 border border-[#1a1008]/20">
            {[
              { cat: 'Постановление', title: 'О подготовке и запуске космического корабля «Восток-1»', year: '1961', stamp: 'Совершенно секретно', icon: 'FileText' },
              { cat: 'Технический чертёж', title: 'Схема отсеков и систем жизнеобеспечения корабля «Восток»', year: '1960', stamp: 'ОКБ-1', icon: 'Pencil' },
              { cat: 'Аудиозапись', title: 'Переговоры наземной службы «Заря» с космонавтом «Кедром»', year: '1961', stamp: 'Фонозапись', icon: 'Mic' },
              { cat: 'Технический отчёт', title: 'Итоги лётных испытаний орбитального корабля «Буран»', year: '1988', stamp: 'НПО «Энергия»', icon: 'BookOpen' },
              { cat: 'Фотодокумент', title: 'Съёмка орбитальной станции «Мир» из открытого космоса', year: '1987', stamp: 'Фотоархив', icon: 'Camera' },
              { cat: 'Указ Президиума', title: 'О присвоении звания Героя Советского Союза майору Ю.А. Гагарину', year: '1961', stamp: 'Президиум ВС СССР', icon: 'Award' },
            ].map((d, i) => (
              <div key={d.title} className="flex items-start gap-4 px-5 py-4 hover:bg-[#1a1008]/5 transition-colors cursor-pointer group">
                <div className="w-8 h-8 border border-[#1a1008]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name={d.icon} size={14} className="text-[#1a1008]/50 group-hover:text-[#1a1008]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display uppercase text-[8px] tracking-[0.3em] text-[#1a1008]/40">{d.cat} · {d.year}</p>
                  <p className="font-display font-semibold text-sm mt-0.5 leading-snug">{d.title}</p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className="hidden sm:inline font-display uppercase text-[8px] tracking-widest text-[#1a1008]/30 border border-[#1a1008]/15 px-2 py-0.5">{d.stamp}</span>
                  <Icon name="ArrowUpRight" size={14} className="text-[#1a1008]/20 group-hover:text-[#1a1008]/60 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ФОТОЛЕТОПИСЬ ═══════════════════════════════════════ */}
      <section id="gallery" className="border-t-4 border-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-bold uppercase text-2xl tracking-wide">ФОТОЛЕТОПИСЬ ЭПОХИ</h2>
            <div className="flex-1 border-t-2 border-[#1a1008]" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* большое фото */}
            <div className="md:col-span-2">
              <div className="relative">
                <img src={BURAN_IMG} alt="Буран" className="w-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.15) brightness(0.9)', maxHeight: 420 }} />
                <div className="border border-[#1a1008]/20 border-t-0 p-3 bg-[#1a1008]/5">
                  <p className="font-display uppercase text-[8px] tracking-[0.3em] text-[#1a1008]/40">Фото ТАСС · 15 ноября 1988</p>
                  <p className="font-display font-bold uppercase text-sm mt-0.5">Орбитальный корабль «Буран» на стартовой позиции космодрома Байконур</p>
                </div>
              </div>
            </div>

            {/* правая колонка */}
            <div className="flex flex-col gap-4">
              <div>
                <img src={HERO_IMG} alt="Гагарин" className="w-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.85)', maxHeight: 240, objectPosition: 'top' }} />
                <div className="border border-[#1a1008]/20 border-t-0 p-3 bg-[#1a1008]/5">
                  <p className="font-display uppercase text-[8px] tracking-[0.3em] text-[#1a1008]/40">Фото ТАСС · 1961</p>
                  <p className="font-display font-bold uppercase text-xs mt-0.5">Ю.А. Гагарин перед стартом</p>
                </div>
              </div>

              {/* врезка */}
              <div className="border-2 border-[#1a1008] p-5 flex-1 bg-[#1a1008] text-[#f2e8d0]">
                <p className="font-display uppercase text-[8px] tracking-[0.35em] text-[#f2e8d0]/40 mb-3">Из фотоархива</p>
                <p className="font-display font-bold text-4xl leading-none">500+</p>
                <p className="font-display uppercase text-[9px] tracking-[0.2em] text-[#f2e8d0]/50 mt-1">архивных снимков</p>
                <p className="text-xs text-[#f2e8d0]/60 mt-4 leading-relaxed">
                  Уникальная фотоколлекция советской космической программы с 1957 по 1991 год.
                </p>
                <button className="mt-4 font-display uppercase text-[10px] tracking-widest border border-[#f2e8d0]/30 px-4 py-2 hover:bg-[#f2e8d0] hover:text-[#1a1008] transition-colors">
                  Открыть архив →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ПОДВАЛ ═════════════════════════════════════════════ */}
      <footer className="border-t-4 border-[#1a1008] mt-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-display font-bold uppercase tracking-[0.1em] text-lg">ЗВЁЗДНЫЙ ПУТЬ</p>
          <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/40 text-center">
            Ежедневная газета советской космонавтики · Основана в 1957 году · Тираж 3 500 000 экз.
          </p>
          <p className="font-display uppercase text-[9px] tracking-[0.3em] text-[#1a1008]/30">© 1957–1988</p>
        </div>
      </footer>

    </div>
  );
}
