import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/941fac68-0c2f-4b91-a460-f7bc7fda8125.jpg';
const BURAN_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/fd926f3d-bd48-4753-9746-3cedbebbe4c1.jpg';

const MISSIONS = [
  {
    code: 'ВОСТОК-1', year: '1961', date: '12 апреля 1961', status: 'ВЫПОЛНЕНО',
    pilot: 'Ю.А. Гагарин', callsign: 'Кедр', duration: '108 мин', orbits: '1',
    title: 'Первый полёт человека в космос',
    classified: 'Майор Гагарин Юрий Алексеевич отобран из 3000 кандидатов. Личность пилота была засекречена до старта. Позывной «Кедр» известен только наземной службе «Заря».',
    details: 'Корабль «Восток-1» стартовал с Байконура в 09:07 по московскому времени. Через 108 минут Гагарин совершил один виток вокруг Земли и катапультировался на высоте 7 км, приземлившись отдельно от капсулы — этот факт скрывался 30 лет.',
  },
  {
    code: 'ВОСТОК-6', year: '1963', date: '16 июня 1963', status: 'ВЫПОЛНЕНО',
    pilot: 'В.В. Терешкова', callsign: 'Чайка', duration: '70 ч 50 мин', orbits: '48',
    title: 'Первая женщина в космосе',
    classified: 'До зачисления в отряд Терешкова работала ткачихой. Прошла отбор благодаря навыкам парашютистки — не лётной подготовке.',
    details: 'За 3 суток «Чайка» облетела Землю 48 раз — больше, чем все американские астронавты того времени вместе взятые. Программа «Женщина в космосе» была закрыта после одного полёта.',
  },
  {
    code: 'ВОСХОД-2', year: '1965', date: '18 марта 1965', status: 'ВЫПОЛНЕНО',
    pilot: 'А.А. Леонов', callsign: 'Алмаз-2', duration: '12 мин', orbits: '—',
    title: 'Первый выход в открытый космос',
    classified: 'Во время выхода скафандр раздулся настолько, что Леонов не мог вернуться в шлюз. Он стравил давление вопреки инструкции — это не вошло в официальный отчёт 20 лет.',
    details: 'Леонов провёл в открытом космосе 12 минут 9 секунд на высоте 500 км. При возвращении корабль сел в глухой уральской тайге — экипаж двое суток ждал эвакуации в лютый мороз.',
  },
  {
    code: 'БУРАН', year: '1988', date: '15 ноября 1988', status: 'ВЫПОЛНЕНО',
    pilot: 'БЕЗ ЭКИПАЖА', callsign: 'Птица', duration: '205 мин', orbits: '2',
    title: 'Первый полёт многоразового корабля',
    classified: 'Полностью автоматическая посадка с боковым ветром 20 м/с. Ни один американский шаттл никогда не садился без пилота. Программа закрыта в 1993 году без объяснений.',
    details: '«Буран» — технологическое чудо: система ИИ посадила 105-тонный корабль точнее человека. После единственного полёта корабль был уничтожен при обрушении крыши ангара в 2002 году.',
  },
];

const HEROES = [
  { id: 'gagarin', name: 'ГАГАРИН', rank: 'Майор ВВС СССР', file: 'ДС-001', img: HERO_IMG, born: '9 марта 1934', died: '27 марта 1968', missions: 1, bio: 'Юрий Алексеевич Гагарин — первый человек в космосе. Сын плотника из Смоленской области. После исторического полёта объехал 30 стран. Погиб в тренировочном полёте в 34 года. Обстоятельства катастрофы засекречены на 50 лет.' },
  { id: 'tereshkova', name: 'ТЕРЕШКОВА', rank: 'Гв. полковник', file: 'ДС-002', img: BURAN_IMG, born: '6 марта 1937', died: '—', missions: 1, bio: 'Валентина Владимировна Терешкова — единственная женщина, летавшая в одиночку. Ткачиха, ставшая космонавтом. Её позывной «Чайка» стал символом эпохи. Депутат Государственной думы по сей день.' },
  { id: 'leonov', name: 'ЛЕОНОВ', rank: 'Генерал-майор авиации', file: 'ДС-003', img: HERO_IMG, born: '30 мая 1934', died: '11 октября 2019', missions: 2, bio: 'Алексей Архипович Леонов — первый человек в открытом космосе и выдающийся художник. Написал более 200 картин о космосе. Командовал советским экипажем при стыковке с американским «Аполлоном» в 1975 году.' },
  { id: 'korolev', name: 'КОРОЛЁВ', rank: 'Академик АН СССР', file: 'ДС-004', img: BURAN_IMG, born: '12 января 1907', died: '14 января 1966', missions: 0, bio: 'Сергей Павлович Королёв — создатель советской космической программы. В 1938–1944 — узник ГУЛАГа. Его имя было засекречено: в документах он числился как «Главный конструктор». Мир узнал его только после смерти.' },
];

function Typewriter({ text, speed = 28, className = '' }: { text: string; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span className={className}>{displayed}{!done && <span className="animate-pulse">█</span>}</span>;
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        start = Math.min(start + step, target);
        setVal(start);
        if (start >= target) clearInterval(t);
      }, 20);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <div ref={ref} className="tabular-nums">{val}{suffix}</div>;
}

export default function Index() {
  const [activeMission, setActiveMission] = useState(0);
  const [activeHero, setActiveHero] = useState(0);
  const [declassified, setDeclassified] = useState<Record<number, boolean>>({});
  const [heroUnlocked, setHeroUnlocked] = useState<Record<number, boolean>>({});
  const [accessGranted, setAccessGranted] = useState(false);
  const [bootText, setBootText] = useState('');
  const mission = MISSIONS[activeMission];
  const hero = HEROES[activeHero];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // boot screen typewriter
  const bootLines = 'СИСТЕМА КГБ СССР v3.1\nИНИЦИАЛИЗАЦИЯ...\nПРОВЕРКА ДОПУСКА...\nДОСТУП РАЗРЕШЁН ██████\n';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setBootText(bootLines.slice(0, i));
      if (i >= bootLines.length) {
        clearInterval(t);
        setTimeout(() => setAccessGranted(true), 600);
      }
    }, 22);
    return () => clearInterval(t);
  }, []);

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="border border-orange-500/40 p-8 font-mono">
            <p className="text-orange-500 text-xs mb-6 tracking-widest">◈ ТЕРМИНАЛ ДОСТУПА КГБ СССР</p>
            <pre className="text-green-400 text-sm leading-relaxed whitespace-pre-wrap">{bootText}<span className="animate-pulse">_</span></pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d0f] text-white font-body overflow-x-hidden">

      {/* scan-line overlay */}
      <div className="fixed inset-0 pointer-events-none z-50" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
      }} />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-40 border-b border-orange-500/20 bg-[#0a0d0f]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-orange-400 text-xs tracking-[0.3em] uppercase">КГБ · Архив · Космос</span>
          </div>
          <div className="hidden md:flex gap-6">
            {[['missions','Миссии'],['heroes','Агенты'],['stats','Данные'],['gallery','Досье']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-mono uppercase text-[10px] tracking-[0.25em] text-white/30 hover:text-orange-400 transition-colors">
                {label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] text-white/20 tracking-widest">СОВ.СЕКРЕТНО</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0d0f]" />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,140,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/5 px-3 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="font-mono uppercase text-[10px] tracking-[0.3em] text-orange-400">Гриф: Совершенно секретно</span>
              </div>
              <h1 className="font-display font-bold uppercase leading-[0.85] text-6xl sm:text-7xl lg:text-[88px]">
                <span className="text-white">СОВЕТСКИЙ</span><br />
                <span className="text-orange-500">КОСМОС</span><br />
                <span className="text-blue-400">1957–1988</span>
              </h1>
              <p className="mt-8 text-white/40 max-w-md leading-relaxed font-mono text-sm">
                <Typewriter text="Рассекреченный архив советской космической программы. 31 год. 4 великих миссии. Правда, которую скрывали десятилетиями." speed={18} />
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button onClick={() => scrollTo('missions')}
                  className="bg-orange-500 hover:bg-orange-400 text-black font-mono uppercase tracking-[0.2em] text-xs px-8 py-4 transition-all hover:scale-105 font-bold">
                  ▶ Открыть архив
                </button>
                <button onClick={() => scrollTo('heroes')}
                  className="border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 font-mono uppercase tracking-[0.2em] text-xs px-8 py-4 transition-all">
                  Личные дела
                </button>
              </div>
            </div>

            {/* terminal card */}
            <div className="border border-orange-500/20 bg-black/40 p-6 font-mono text-sm hidden lg:block">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-white/20 text-xs">архив.сов-секретно</span>
              </div>
              {[
                ['ОБЪЕКТ', 'Советская космич. программа'],
                ['ПЕРИОД', '1957–1988 гг.'],
                ['СТАТУС', 'РАССЕКРЕЧЕНО ✓'],
                ['МИССИЙ', '4 пилотируемых'],
                ['ФАЙЛОВ', '2 847 документов'],
                ['ДОПУСК', 'ФОРМА №3 ██████'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 py-1.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-white/25 w-20 shrink-0 text-xs">{k}:</span>
                  <span className={`text-xs ${k === 'СТАТУС' ? 'text-green-400' : k === 'ДОПУСК' ? 'text-orange-400' : 'text-white/70'}`}>{v}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-green-400 text-xs animate-pulse">● Соединение установлено</p>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">Прокрутить</span>
          <Icon name="ChevronDown" size={16} className="text-orange-500/40" />
        </div>
      </section>

      {/* MISSIONS */}
      <section id="missions" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500">// ФАЙЛ 01</span>
          </div>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-12">
            СЕКРЕТНЫЕ <span className="text-orange-500">МИССИИ</span>
          </h2>

          {/* mission tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-0">
            {MISSIONS.map((m, i) => (
              <button key={m.code} onClick={() => setActiveMission(i)}
                className={`py-4 px-5 text-left transition-all ${i === activeMission ? 'bg-orange-500 text-black' : 'bg-[#0f1215] hover:bg-white/5'}`}>
                <p className={`font-mono text-[9px] uppercase tracking-[0.3em] mb-1 ${i === activeMission ? 'text-black/50' : 'text-white/25'}`}>{m.year}</p>
                <p className="font-display font-bold uppercase text-base leading-tight">{m.code}</p>
              </button>
            ))}
          </div>

          {/* mission detail */}
          <div className="border border-white/8 border-t-0 grid md:grid-cols-[280px_1fr]">
            {/* sidebar */}
            <div className="border-r border-white/8 p-6 bg-black/20 flex flex-col gap-4">
              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 mb-1">КОД МИССИИ</p>
                <p className="font-display font-bold uppercase text-2xl text-orange-400">{mission.code}</p>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  ['СТАТУС', mission.status],
                  ['ДАТА', mission.date],
                  ['ПИЛОТ', mission.pilot],
                  ['ПОЗЫВНОЙ', mission.callsign],
                  ['ДЛИТ.', mission.duration],
                  ['ВИТКОВ', mission.orbits],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="font-mono text-[9px] tracking-widest text-white/25">{k}</span>
                    <span className={`font-mono text-xs font-bold ${k === 'СТАТУС' ? 'text-green-400' : k === 'ПОЗЫВНОЙ' ? 'text-blue-400' : 'text-white/80'}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* content */}
            <div className="p-6 md:p-10">
              <h3 className="font-display font-bold uppercase text-2xl md:text-3xl mb-4 leading-tight">{mission.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{mission.details}</p>

              {/* classified block */}
              <div className="border border-orange-500/30 bg-orange-500/5">
                <button
                  onClick={() => setDeclassified(d => ({ ...d, [activeMission]: !d[activeMission] }))}
                  className="w-full flex items-center justify-between p-4 group hover:bg-orange-500/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={declassified[activeMission] ? 'LockOpen' : 'Lock'} size={16} className="text-orange-400" />
                    <span className="font-mono uppercase text-xs tracking-[0.25em] text-orange-400">
                      {declassified[activeMission] ? '▼ Засекреченные данные' : '▶ Снять гриф секретности'}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-orange-500/40 border border-orange-500/20 px-2 py-0.5">
                    {declassified[activeMission] ? 'ОТКРЫТО' : 'СОВ.СЕКРЕТНО'}
                  </span>
                </button>
                {declassified[activeMission] && (
                  <div className="px-4 pb-4 border-t border-orange-500/20">
                    <p className="font-mono text-sm text-orange-200/70 leading-relaxed mt-3">
                      <Typewriter text={mission.classified} speed={14} />
                    </p>
                  </div>
                )}
              </div>

              {/* mission nav */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                <button onClick={() => setActiveMission(i => Math.max(0, i - 1))} disabled={activeMission === 0}
                  className="font-mono text-xs uppercase tracking-widest text-white/30 hover:text-orange-400 disabled:opacity-20 transition-colors flex items-center gap-2">
                  <Icon name="ChevronLeft" size={14} /> Пред. миссия
                </button>
                <div className="flex gap-1.5">
                  {MISSIONS.map((_, i) => (
                    <button key={i} onClick={() => setActiveMission(i)}
                      className={`rounded-full transition-all ${i === activeMission ? 'bg-orange-500 w-5 h-2' : 'bg-white/15 w-2 h-2'}`} />
                  ))}
                </div>
                <button onClick={() => setActiveMission(i => Math.min(MISSIONS.length - 1, i + 1))} disabled={activeMission === MISSIONS.length - 1}
                  className="font-mono text-xs uppercase tracking-widest text-white/30 hover:text-orange-400 disabled:opacity-20 transition-colors flex items-center gap-2">
                  След. миссия <Icon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-20 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { label: 'Лет космической гонки', val: 31, suffix: '' },
              { label: 'Пилотируемых миссий', val: 12, suffix: '+' },
              { label: 'Км над Землёй', val: 500, suffix: '' },
              { label: 'Минут первого полёта', val: 108, suffix: '' },
            ].map(s => (
              <div key={s.label} className="bg-[#0a0d0f] p-8 text-center group hover:bg-orange-500/5 transition-colors">
                <p className="font-display font-bold text-5xl text-orange-500 group-hover:scale-110 transition-transform">
                  <Counter target={s.val} suffix={s.suffix} />
                </p>
                <p className="font-mono uppercase text-[9px] tracking-[0.3em] text-white/25 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEROES */}
      <section id="heroes" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-400">// ФАЙЛ 02</span>
          </div>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-12">
            ЛИЧНЫЕ <span className="text-blue-400">ДЕЛА</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {HEROES.map((h, i) => (
              <button key={h.id} onClick={() => { setActiveHero(i); setHeroUnlocked(u => ({ ...u, [i]: false })); }}
                className={`border p-4 text-left transition-all group ${i === activeHero ? 'border-blue-500/60 bg-blue-500/10' : 'border-white/8 hover:border-white/20 bg-black/20'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] tracking-widest text-white/25">{h.file}</span>
                  <Icon name={i === activeHero ? 'FolderOpen' : 'Folder'} size={14} className={i === activeHero ? 'text-blue-400' : 'text-white/20'} />
                </div>
                <p className="font-display font-bold uppercase text-base leading-tight">{h.name}</p>
                <p className="font-mono text-[9px] text-white/30 mt-1">{h.rank}</p>
              </button>
            ))}
          </div>

          <div className="border border-white/8 grid md:grid-cols-[240px_1fr] bg-black/20">
            {/* photo */}
            <div className="border-r border-white/8 p-6 flex flex-col gap-4">
              <div className="relative overflow-hidden">
                <img src={hero.img} alt={hero.name} className="w-full aspect-[3/4] object-cover object-top"
                  style={{ filter: heroUnlocked[activeHero] ? 'grayscale(80%) contrast(1.1)' : 'grayscale(100%) contrast(1.2) brightness(0.4) blur(2px)' }} />
                {!heroUnlocked[activeHero] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                    <Icon name="Lock" size={24} className="text-orange-400 mb-2" />
                    <p className="font-mono text-[9px] text-orange-400 text-center tracking-widest">ДОСТУП<br />ЗАКРЫТ</p>
                  </div>
                )}
              </div>
              <button onClick={() => setHeroUnlocked(u => ({ ...u, [activeHero]: !u[activeHero] }))}
                className={`w-full py-2.5 font-mono uppercase text-[10px] tracking-widest transition-all border ${
                  heroUnlocked[activeHero]
                    ? 'border-red-500/40 text-red-400 hover:bg-red-500/10'
                    : 'border-green-500/40 text-green-400 hover:bg-green-500/10'
                }`}>
                {heroUnlocked[activeHero] ? '🔓 Закрыть' : '🔑 Открыть досье'}
              </button>
            </div>

            {/* bio */}
            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.35em] text-blue-400 mb-1">ЛИЧНОЕ ДЕЛО № {hero.file}</p>
                  <h3 className="font-display font-bold uppercase text-3xl">{hero.name}</h3>
                  <p className="font-mono text-xs text-white/30 mt-1">{hero.rank}</p>
                </div>
                <div className="border border-white/10 p-2 text-center">
                  <p className="font-display font-bold text-2xl text-orange-500">{hero.missions}</p>
                  <p className="font-mono text-[8px] text-white/25 tracking-widest">ПОЛЁТОВ</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/5 mb-6">
                {[['Дата рождения', hero.born], ['Дата смерти', hero.died]].map(([k, v]) => (
                  <div key={k} className="bg-[#0a0d0f] p-3">
                    <p className="font-mono text-[9px] tracking-widest text-white/20">{k}</p>
                    <p className="font-mono text-sm text-white/70 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              <div className={`transition-all duration-500 ${heroUnlocked[activeHero] ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="font-mono text-[9px] tracking-[0.3em] text-blue-400 mb-3">/// БИОГРАФИЧЕСКАЯ СПРАВКА</p>
                <p className="text-white/65 leading-relaxed text-sm">{heroUnlocked[activeHero] ? hero.bio : ''}</p>
              </div>
              {!heroUnlocked[activeHero] && (
                <div className="flex items-center gap-3 text-white/20">
                  <Icon name="Lock" size={14} />
                  <p className="font-mono text-xs tracking-widest">Нажмите «Открыть досье» для просмотра</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500">// ФАЙЛ 03</span>
          </div>
          <h2 className="font-display font-bold uppercase text-4xl md:text-5xl mb-12">
            ФОТО<span className="text-orange-500">АРХИВ</span>
          </h2>

          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-8 relative group overflow-hidden border border-white/8">
              <img src={BURAN_IMG} alt="Буран"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-1000"
                style={{ filter: 'grayscale(60%) contrast(1.1)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 border border-orange-500/40 bg-black/60 px-3 py-1.5">
                <span className="font-mono uppercase text-[9px] tracking-widest text-orange-400">⬛ Рассекречено</span>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-mono text-[9px] tracking-widest text-white/40 mb-1">1988 · Байконур · Фото: ТАСС</p>
                <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">Корабль «Буран»<br />перед стартом</h3>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
              <div className="relative group overflow-hidden border border-white/8 flex-1">
                <img src={HERO_IMG} alt="Гагарин"
                  className="w-full h-[190px] object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                  style={{ filter: 'grayscale(70%) contrast(1.15)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-mono text-[9px] tracking-widest text-white/40 mb-0.5">1961</p>
                  <p className="font-display font-bold uppercase text-lg">Ю.А. Гагарин</p>
                </div>
              </div>

              <div className="border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col justify-between min-h-[190px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest text-blue-400 uppercase">Архив активен</span>
                </div>
                <div>
                  <p className="font-display font-bold text-4xl">500<span className="text-blue-400 text-xl">+</span></p>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-white/30 mt-1 uppercase">Архивных снимков</p>
                  <button className="mt-4 font-mono text-[10px] uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
                    Открыть архив <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">КГБ · Архив · Космос</span>
          </div>
          <p className="font-mono text-[9px] text-white/15 tracking-widest uppercase">Все файлы рассекречены · 1957–1988</p>
          <p className="font-mono text-[9px] text-white/15 tracking-widest">СОВ.СЕКРЕТНО → ОТКРЫТО</p>
        </div>
      </footer>
    </div>
  );
}
