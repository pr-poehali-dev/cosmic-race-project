import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const STARS_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/93003cf8-7065-4fac-9ec6-a79aad1ca901.jpg';
const HERO_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/941fac68-0c2f-4b91-a460-f7bc7fda8125.jpg';
const BURAN_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/fd926f3d-bd48-4753-9746-3cedbebbe4c1.jpg';

const EVENTS = [
  { year: 1957, label: '\'57', title: 'Спутник-1', sub: '4 октября 1957', body: 'Первый искусственный спутник Земли выведен на орбиту. Сигнал «бип-бип» потряс весь мир и открыл космическую эру.', icon: 'Satellite' },
  { year: 1961, label: '\'61', title: 'Гагарин', sub: '12 апреля 1961', body: '«Поехали!» — 108 минут на орбите изменили историю человечества навсегда. Позывной «Кедр», корабль «Восток-1».', icon: 'Rocket' },
  { year: 1963, label: '\'63', title: 'Терешкова', sub: '16 июня 1963', body: 'Валентина Терешкова, позывной «Чайка», — первая женщина в космосе. 48 витков вокруг Земли за трое суток.', icon: 'Star' },
  { year: 1965, label: '\'65', title: 'Леонов', sub: '18 марта 1965', body: 'Первый выход человека в открытый космос. 12 минут за бортом «Восхода-2» на высоте 500 км над Землёй.', icon: 'Wind' },
  { year: 1971, label: '\'71', title: 'Салют-1', sub: '19 апреля 1971', body: 'Запуск первой орбитальной станции. Человек получил постоянный дом на орбите.', icon: 'Orbit' },
  { year: 1986, label: '\'86', title: 'Станция «Мир»', sub: '20 февраля 1986', body: 'Легендарная орбитальная станция проработала 15 лет и стала символом советской и российской космонавтики.', icon: 'Globe' },
  { year: 1988, label: '\'88', title: 'Буран', sub: '15 ноября 1988', body: 'Единственный полёт многоразового корабля «Буран» — полностью автоматический, без экипажа. Венец советской инженерной мысли.', icon: 'Plane' },
];

const HEROES = [
  { id: 'gagarin', name: 'Гагарин', full: 'Юрий Алексеевич Гагарин', role: 'Первый человек в космосе', years: '1934–1968', call: 'Кедр', duration: '108 мин', orbits: '1', text: 'Лётчик-истребитель из Гжатска, отобранный из 3000 кандидатов. После полёта стал символом эпохи и самым известным человеком на планете. Погиб в авиакатастрофе в 34 года.' },
  { id: 'tereshkova', name: 'Терешкова', full: 'Валентина Владимировна Терешкова', role: 'Первая женщина в космосе', years: 'р. 1937', call: 'Чайка', duration: '70 ч 50 мин', orbits: '48', text: 'До отбора в отряд космонавтов работала на текстильном комбинате и занималась прыжками с парашютом. Единственная в мире женщина, летавшая в космос в одиночку.' },
  { id: 'leonov', name: 'Леонов', full: 'Алексей Архипович Леонов', role: 'Первый выход в открытый космос', years: '1934–2019', call: 'Алмаз-2', duration: '12 мин', orbits: '—', text: 'Художник и космонавт. Скафандр раздулся так, что Леонов с трудом вернулся в корабль. Написал десятки картин о космосе. Участник миссии «Союз–Аполлон» 1975 года.' },
  { id: 'korolev', name: 'Королёв', full: 'Сергей Павлович Королёв', role: 'Главный конструктор', years: '1907–1966', call: 'засекречен', duration: '—', orbits: '—', text: 'Гений, чьё имя было засекречено до смерти. Прошёл ГУЛАГ, создал первую межконтинентальную ракету, спутник и корабль «Восток». Умер на операционном столе в 59 лет.' },
];

const DOCS = [
  { icon: 'FileText', cat: 'Постановление', title: 'О запуске «Востока-1»', year: '1961', stamp: 'Сов. секретно' },
  { icon: 'Pencil', cat: 'Чертёж', title: 'Схема отсеков «Востока»', year: '1960', stamp: 'ОКБ-1' },
  { icon: 'Mic', cat: 'Запись', title: 'Переговоры Заря — Кедр', year: '1961', stamp: 'Аудио' },
  { icon: 'BookOpen', cat: 'Отчёт', title: 'Лётные испытания «Бурана»', year: '1988', stamp: 'НПО «Энергия»' },
  { icon: 'Camera', cat: 'Фото', title: 'Станция «Мир» из открытого космоса', year: '1987', stamp: 'Архив' },
  { icon: 'Award', cat: 'Указ', title: 'Герой СССР — Ю.А. Гагарин', year: '1961', stamp: 'Президиум ВС' },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeEvent, setActiveEvent] = useState(1);
  const [activeHero, setActiveHero] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const ev = EVENTS[activeEvent];
  const hero = HEROES[activeHero];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#06090f] text-white min-h-screen font-body overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-14"
        style={{ background: 'linear-gradient(to bottom, rgba(6,9,15,0.95), transparent)' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-display font-bold uppercase tracking-[0.18em] text-sm text-white">
          <span className="text-orange-500">✦</span> Космос СССР
        </button>
        <div className="hidden md:flex gap-8 font-display uppercase text-[11px] tracking-[0.25em] text-white/40">
          {['timeline','heroes','archive','gallery'].map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-orange-400 transition-colors">
              {id === 'timeline' ? 'Хронология' : id === 'heroes' ? 'Герои' : id === 'archive' ? 'Архив' : 'Галерея'}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#06090f] flex flex-col items-center justify-center gap-8">
          {['timeline','heroes','archive','gallery'].map(id => (
            <button key={id} onClick={() => scrollTo(id)}
              className="font-display uppercase text-2xl tracking-[0.2em] text-white/70 hover:text-orange-400 transition-colors">
              {id === 'timeline' ? 'Хронология' : id === 'heroes' ? 'Герои' : id === 'archive' ? 'Архив' : 'Галерея'}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
        {/* starfield bg */}
        <img src={STARS_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(30,80,200,0.18) 0%, transparent 70%), linear-gradient(to top, #06090f 30%, transparent 100%)' }} />

        {/* big year */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-[22vw] leading-none text-white/[0.03] select-none pointer-events-none pr-4">1961</span>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 w-full">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-8 h-px bg-orange-500" />
            <span className="font-display uppercase text-[11px] tracking-[0.35em] text-orange-400">Информационный портал</span>
          </div>
          <h1 className="font-display font-bold uppercase leading-[0.85] text-[13vw] sm:text-[10vw] md:text-[8vw] max-w-4xl">
            От<br />
            <span className="text-orange-500">Гагарина</span><br />
            до «Бурана»
          </h1>
          <p className="mt-8 text-white/50 max-w-sm text-base leading-relaxed">
            31 год советской космонавтики — хронология, биографии и архив рассекреченных документов.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => scrollTo('timeline')}
              className="bg-orange-500 hover:bg-orange-400 text-white font-display uppercase tracking-[0.2em] text-xs px-8 py-4 transition-colors">
              Смотреть хронологию
            </button>
            <button onClick={() => scrollTo('heroes')}
              className="border border-white/15 hover:border-white/40 text-white/60 hover:text-white font-display uppercase tracking-[0.2em] text-xs px-8 py-4 transition-all">
              Биографии героев
            </button>
          </div>
        </div>

        {/* bottom ticker */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/5 py-4 overflow-hidden">
          <div className="flex gap-16 whitespace-nowrap text-white/20 font-display uppercase text-[10px] tracking-[0.3em] animate-none px-6">
            {['1957 — Спутник', '1961 — Гагарин', '1963 — Терешкова', '1965 — Леонов', '1971 — Салют', '1986 — Мир', '1988 — Буран'].map(t => (
              <span key={t} className="mx-8">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────── */}
      <section id="timeline" className="py-32 max-w-6xl mx-auto px-6 md:px-12">
        <RevealBlock>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-orange-500">01 — Хронология</span>
          </div>
          <h2 className="font-display font-bold uppercase text-5xl md:text-6xl leading-none mb-16">
            Ключевые<br /><span className="text-blue-400">события</span>
          </h2>
        </RevealBlock>

        {/* year scrubber */}
        <RevealBlock delay={100}>
          <div className="flex gap-1 mb-12 overflow-x-auto pb-2">
            {EVENTS.map((e, i) => (
              <button key={e.year} onClick={() => setActiveEvent(i)}
                className={`shrink-0 px-5 py-3 font-display uppercase text-sm tracking-widest transition-all ${
                  i === activeEvent
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60'
                }`}>
                {e.label}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={150}>
          <div className="grid md:grid-cols-[1fr_1.8fr] gap-0 border border-white/8">
            {/* left — big year */}
            <div className="bg-white/[0.02] border-r border-white/8 p-10 flex flex-col justify-between">
              <div>
                <p className="font-display uppercase text-[10px] tracking-[0.35em] text-white/30 mb-2">{ev.sub}</p>
                <div className="font-display font-bold text-[80px] leading-none text-orange-500/20">{ev.year}</div>
              </div>
              <div className="mt-auto">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4">
                  <Icon name={ev.icon} size={18} className="text-orange-400" />
                </div>
                <p className="font-display uppercase text-[10px] tracking-[0.3em] text-white/30">Событие {activeEvent + 1} из {EVENTS.length}</p>
              </div>
            </div>
            {/* right — content */}
            <div className="p-10 md:p-14">
              <h3 className="font-display font-bold uppercase text-4xl md:text-5xl leading-tight mb-6">{ev.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">{ev.body}</p>
              <div className="mt-10 flex gap-2">
                {EVENTS.map((_, i) => (
                  <button key={i} onClick={() => setActiveEvent(i)}
                    className={`transition-all rounded-full ${i === activeEvent ? 'bg-orange-500 w-8 h-2' : 'bg-white/15 w-2 h-2 hover:bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* mini list */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-white/5">
          {EVENTS.map((e, i) => (
            <button key={e.year} onClick={() => setActiveEvent(i)}
              className={`py-4 px-3 text-center transition-all ${i === activeEvent ? 'bg-blue-600' : 'bg-[#06090f] hover:bg-white/5'}`}>
              <p className="font-display font-bold text-lg">{e.label}</p>
              <p className="font-display uppercase text-[9px] tracking-widest text-white/30 mt-0.5 truncate">{e.title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── HEROES ──────────────────────────────────────── */}
      <section id="heroes" className="py-32 border-t border-white/5"
        style={{ background: 'linear-gradient(160deg, #0a1628 0%, #06090f 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <RevealBlock>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-display text-[11px] uppercase tracking-[0.35em] text-blue-400">02 — Биографии</span>
            </div>
            <h2 className="font-display font-bold uppercase text-5xl md:text-6xl leading-none mb-16">
              Герои<br /><span className="text-orange-500">космоса</span>
            </h2>
          </RevealBlock>

          {/* hero tabs */}
          <RevealBlock delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-0">
              {HEROES.map((h, i) => (
                <button key={h.id} onClick={() => setActiveHero(i)}
                  className={`py-5 px-4 text-left transition-all ${i === activeHero ? 'bg-blue-600' : 'bg-[#08111f] hover:bg-white/5'}`}>
                  <p className="font-display text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">0{i + 1}</p>
                  <p className="font-display font-bold uppercase text-base">{h.name}</p>
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={200}>
            <div key={hero.id} className="border border-white/8 border-t-0 grid md:grid-cols-[2fr_3fr]">
              {/* stats */}
              <div className="border-r border-white/8 p-10 flex flex-col gap-6">
                <div>
                  <p className="font-display uppercase text-[10px] tracking-[0.35em] text-orange-400 mb-1">{hero.role}</p>
                  <h3 className="font-display font-bold uppercase text-3xl leading-tight">{hero.full}</h3>
                  <p className="text-white/30 font-display uppercase tracking-widest text-xs mt-2">{hero.years}</p>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { label: 'Позывной', val: hero.call },
                    { label: 'Продолж. полёта', val: hero.duration },
                    { label: 'Витков на орбите', val: hero.orbits },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="font-display uppercase text-[10px] tracking-widest text-white/30">{s.label}</span>
                      <span className="font-display font-bold text-sm text-orange-300">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* bio text */}
              <div className="p-10 md:p-14 flex flex-col justify-between">
                <p className="text-white/65 text-xl leading-relaxed">{hero.text}</p>
                <button className="mt-8 self-start font-display uppercase text-[11px] tracking-[0.3em] text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                  Подробнее <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── ARCHIVE ─────────────────────────────────────── */}
      <section id="archive" className="py-32 max-w-6xl mx-auto px-6 md:px-12">
        <RevealBlock>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-orange-500">03 — Архив</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="font-display font-bold uppercase text-5xl md:text-6xl leading-none">
              Документы<br /><span className="text-blue-400">эпохи</span>
            </h2>
            <p className="text-white/30 max-w-xs text-sm font-display uppercase tracking-widest leading-relaxed">
              Рассекреченные материалы советской космической программы
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {DOCS.map((d, i) => (
            <RevealBlock key={d.title} delay={i * 60}>
              <div className="bg-[#06090f] p-8 group cursor-pointer hover:bg-[#0d1a30] transition-all h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-11 h-11 bg-white/5 group-hover:bg-orange-500/15 border border-white/8 group-hover:border-orange-500/30 flex items-center justify-center transition-all">
                    <Icon name={d.icon} size={18} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <span className="font-display uppercase text-[9px] tracking-widest text-white/20 border border-white/8 px-2 py-1">{d.stamp}</span>
                </div>
                <p className="font-display uppercase text-[10px] tracking-[0.3em] text-white/25 mb-2">{d.cat} · {d.year}</p>
                <h3 className="font-display font-semibold text-lg leading-snug text-white/80 group-hover:text-white transition-colors">{d.title}</h3>
                <div className="mt-6 flex items-center gap-2 text-white/20 group-hover:text-blue-400 transition-colors">
                  <span className="font-display uppercase text-[10px] tracking-widest">Открыть</span>
                  <Icon name="ArrowUpRight" size={14} />
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────── */}
      <section id="gallery" className="py-32 border-t border-white/5 bg-[#04070d]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <RevealBlock>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-display text-[11px] uppercase tracking-[0.35em] text-blue-400">04 — Галерея</span>
            </div>
            <h2 className="font-display font-bold uppercase text-5xl md:text-6xl leading-none mb-16">
              Образы<br /><span className="text-orange-500">эпохи</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[520px]">
              {/* large */}
              <div className="col-span-12 md:col-span-8 row-span-2 relative overflow-hidden group">
                <img src={BURAN_IMG} alt="Буран" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" style={{ filter: 'brightness(0.7) saturate(0.5)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #04070d 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="font-display uppercase text-[10px] tracking-[0.35em] text-orange-400 mb-2">1988 · Байконур</p>
                  <h3 className="font-display font-bold uppercase text-3xl md:text-4xl leading-tight">Многоразовый<br />корабль «Буран»</h3>
                </div>
              </div>
              {/* top right */}
              <div className="col-span-12 md:col-span-4 row-span-1 relative overflow-hidden group">
                <img src={HERO_IMG} alt="Гагарин" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" style={{ filter: 'brightness(0.65) saturate(0.3)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #04070d 0%, transparent 50%)' }} />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-display uppercase text-[10px] tracking-[0.35em] text-orange-400 mb-1">1961</p>
                  <h3 className="font-display font-bold uppercase text-xl">Юрий Гагарин</h3>
                </div>
              </div>
              {/* bottom right — stat */}
              <div className="col-span-12 md:col-span-4 row-span-1 bg-blue-600 p-8 flex flex-col justify-between">
                <Icon name="Telescope" size={28} className="text-blue-200" />
                <div>
                  <p className="font-display font-bold text-5xl text-white">500<span className="text-blue-200 text-2xl">+</span></p>
                  <p className="font-display uppercase text-[10px] tracking-[0.3em] text-blue-200 mt-1">архивных снимков</p>
                  <button className="mt-4 font-display uppercase text-[10px] tracking-widest text-orange-300 hover:text-orange-200 flex items-center gap-2 transition-colors">
                    Открыть архив <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display font-bold uppercase tracking-[0.2em] text-sm">
            <span className="text-orange-500">✦</span> Космос СССР
          </div>
          <div className="flex gap-8 font-display uppercase text-[10px] tracking-[0.25em] text-white/25">
            {['timeline','heroes','archive','gallery'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-white/60 transition-colors">
                {id === 'timeline' ? 'Хронология' : id === 'heroes' ? 'Герои' : id === 'archive' ? 'Архив' : 'Галерея'}
              </button>
            ))}
          </div>
          <p className="text-white/15 font-display uppercase tracking-widest text-[10px]">1957 — 1988</p>
        </div>
      </footer>

    </div>
  );
}
