import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/941fac68-0c2f-4b91-a460-f7bc7fda8125.jpg';
const BURAN_IMG = 'https://cdn.poehali.dev/projects/feb474de-97e1-46ec-9975-47ce21c15628/files/fd926f3d-bd48-4753-9746-3cedbebbe4c1.jpg';

const NAV = [
  { id: 'timeline', label: 'Хронология' },
  { id: 'bio', label: 'Биографии' },
  { id: 'archive', label: 'Архив' },
  { id: 'gallery', label: 'Галерея' },
];

const TIMELINE = [
  { year: '1957', date: '4 октября', title: 'Спутник-1', text: 'Первый искусственный спутник Земли открыл космическую эру человечества. Сигнал «бип-бип» облетел весь мир.', icon: 'Satellite', side: 'left' },
  { year: '1961', date: '12 апреля', title: 'Полёт Гагарина', text: '«Поехали!» — Юрий Гагарин стал первым человеком в космосе на корабле «Восток-1». 108 минут изменили историю.', icon: 'Rocket', side: 'right' },
  { year: '1963', date: '16 июня', title: 'Валентина Терешкова', text: 'Первая в мире женщина-космонавт совершила трёхсуточный полёт на «Востоке-6». Позывной — «Чайка».', icon: 'Star', side: 'left' },
  { year: '1965', date: '18 марта', title: 'Выход в открытый космос', text: 'Алексей Леонов провёл 12 минут за бортом корабля «Восход-2». Первый человек в открытом космосе.', icon: 'MoveUpRight', side: 'right' },
  { year: '1971', date: '19 апреля', title: 'Станция «Салют-1»', text: 'Запуск первой в мире орбитальной станции. Новая эра долгосрочного пребывания человека в космосе.', icon: 'Orbit', side: 'left' },
  { year: '1986', date: '20 февраля', title: 'Станция «Мир»', text: 'Легендарная орбитальная станция стала символом советской космонавтики. Проработала 15 лет.', icon: 'Globe', side: 'right' },
  { year: '1988', date: '15 ноября', title: 'Полёт «Бурана»', text: 'Многоразовый космический корабль совершил первый и единственный полёт в автоматическом режиме.', icon: 'Plane', side: 'left' },
];

const BIOS = [
  {
    name: 'Юрий Гагарин',
    role: 'Первый космонавт',
    years: '1934–1968',
    num: '01',
    text: 'Лётчик-космонавт СССР, Герой Советского Союза. 12 апреля 1961 года совершил первый в истории полёт человека в космос. Облетел Землю за 108 минут.',
    facts: ['Позывной: «Кедр»', 'Полёт: 108 минут', 'Орбит: 1'],
  },
  {
    name: 'Валентина Терешкова',
    role: 'Первая женщина в космосе',
    years: 'род. 1937',
    num: '02',
    text: 'Единственная в мире женщина, совершившая одиночный космический полёт. До полёта работала ткачихой и занималась парашютным спортом.',
    facts: ['Позывной: «Чайка»', 'Полёт: 2 суток 23 ч.', 'Орбит: 48'],
  },
  {
    name: 'Алексей Леонов',
    role: 'Первый выход в космос',
    years: '1934–2019',
    num: '03',
    text: 'Первый человек, вышедший в открытый космос. Художник, написавший десятки картин о космосе. Участник совместного полёта «Союз–Аполлон».',
    facts: ['Позывной: «Алмаз-2»', 'Выход: 12 минут', 'Расстояние: 5 м'],
  },
  {
    name: 'Сергей Королёв',
    role: 'Главный конструктор',
    years: '1907–1966',
    num: '04',
    text: 'Основоположник практической космонавтики. Создал первую межконтинентальную ракету, спутник, корабль «Восток». Личность была засекречена до 1966 года.',
    facts: ['ОКБ-1', 'Ракет: 20+', 'Лауреат: Ленинская премия'],
  },
];

const ARCHIVE = [
  { icon: 'FileText', type: 'Постановление', title: 'О запуске космического корабля «Восток-1»', date: '1961', tag: 'Совет. секретно', color: 'bg-orange-500' },
  { icon: 'Pencil', type: 'Чертёж', title: 'Конструкция корабля «Восток» — схема отсеков', date: '1960', tag: 'ОКБ-1', color: 'bg-blue-600' },
  { icon: 'Radio', type: 'Радиограмма', title: 'Переговоры «Заря» — «Кедр» в реальном времени', date: '1961', tag: 'Аудиозапись', color: 'bg-blue-800' },
  { icon: 'BookOpen', type: 'Отчёт', title: 'Итоги лётных испытаний корабля «Буран»', date: '1988', tag: 'НПО «Энергия»', color: 'bg-orange-600' },
  { icon: 'Camera', type: 'Фотоотчёт', title: 'Снимки орбитальной станции «Мир» из открытого космоса', date: '1987', tag: 'Фотодокумент', color: 'bg-blue-700' },
  { icon: 'Medal', type: 'Указ', title: 'О присвоении звания Героя Советского Союза Ю.А. Гагарину', date: '1961', tag: 'Президиум ВС', color: 'bg-orange-400' },
];

export default function Index() {
  const [activeBio, setActiveBio] = useState(0);
  const bio = BIOS[activeBio];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen font-body overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050d1a] border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <Icon name="Rocket" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold uppercase tracking-[0.2em] text-white text-sm">Космическая гонка</span>
          </button>
          <nav className="hidden md:flex gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="font-display uppercase text-xs tracking-[0.2em] text-white/50 hover:text-orange-400 transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen bg-[#050d1a] flex flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px'}} />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 border border-orange-500/40 text-orange-400 font-display uppercase tracking-[0.3em] text-xs px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              1957 — 1988 · Архив открыт
            </div>
            <h1 className="font-display font-bold uppercase text-white leading-[0.88] text-6xl sm:text-7xl lg:text-8xl">
              От<br />
              <span className="text-orange-500">Гагарина</span><br />
              до «Бурана»
            </h1>
            <p className="mt-8 text-white/50 text-lg leading-relaxed max-w-md">
              Хронология событий, биографии героев и секретные документы советской космонавтики.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => scrollTo('timeline')} className="bg-orange-500 text-white font-display uppercase tracking-[0.15em] px-8 py-4 text-sm hover:bg-orange-400 transition-colors">
                Открыть хронологию
              </button>
              <button onClick={() => scrollTo('archive')} className="border border-white/20 text-white/70 font-display uppercase tracking-[0.15em] px-8 py-4 text-sm hover:border-white/50 hover:text-white transition-all">
                Архив документов
              </button>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -top-4 -right-4 w-full h-full border border-blue-600/40" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-orange-500/30" />
            <img src={HERO_IMG} alt="Гагарин" className="relative w-full object-cover aspect-[3/4] max-h-[520px]" style={{filter: 'saturate(0.6) contrast(1.1)'}} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050d1a] to-transparent h-32" />
            <div className="absolute bottom-6 left-6">
              <p className="text-orange-400 font-display uppercase tracking-widest text-xs">12 апреля 1961</p>
              <p className="text-white font-display font-bold uppercase text-xl">Юрий Гагарин</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10">
            {[
              { num: '31', label: 'Год космической гонки' },
              { num: '12', label: 'Пилотируемых миссий' },
              { num: '4', label: 'Орбитальных станции' },
              { num: '1', label: 'Многоразовый корабль' },
            ].map((s) => (
              <div key={s.label} className="border-r border-white/10 last:border-r-0 py-8 px-6">
                <p className="font-display font-bold text-orange-500 text-4xl">{s.num}</p>
                <p className="text-white/40 text-sm mt-1 font-display uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE — зигзаг */}
      <section id="timeline" className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[3px] bg-orange-500" />
            <p className="font-display uppercase tracking-[0.3em] text-orange-500 text-sm">Раздел 01</p>
          </div>
          <h2 className="font-display font-bold uppercase text-[#050d1a] text-5xl lg:text-6xl mb-20 leading-none">
            Хронология<br /><span className="text-blue-600">событий</span>
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#050d1a]/10 hidden lg:block" />
            <div className="flex flex-col gap-0">
              {TIMELINE.map((ev, i) => (
                <div key={ev.year} className="relative grid lg:grid-cols-2 gap-0">
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 z-10 hidden lg:flex w-10 h-10 rounded-full bg-[#050d1a] border-4 border-orange-500 items-center justify-center">
                    <Icon name={ev.icon} size={14} className="text-orange-400" />
                  </div>

                  {i % 2 === 0 ? (
                    <>
                      <div className="lg:pr-16 pb-12">
                        <div className="bg-[#050d1a] text-white p-8 hover:bg-blue-900 transition-colors">
                          <p className="font-display uppercase text-orange-400 text-xs tracking-[0.3em] mb-3">{ev.date}</p>
                          <h3 className="font-display font-bold uppercase text-2xl mb-3">{ev.title}</h3>
                          <p className="text-white/60 text-sm leading-relaxed">{ev.text}</p>
                        </div>
                      </div>
                      <div className="lg:pl-16 flex items-start pb-12">
                        <div className="font-display font-bold text-[#050d1a]/5 text-8xl lg:text-9xl leading-none select-none">{ev.year}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:pr-16 flex items-start justify-end order-2 lg:order-1 pb-12">
                        <div className="font-display font-bold text-[#050d1a]/5 text-8xl lg:text-9xl leading-none select-none">{ev.year}</div>
                      </div>
                      <div className="lg:pl-16 order-1 lg:order-2 pb-12">
                        <div className="bg-blue-600 text-white p-8 hover:bg-blue-700 transition-colors">
                          <p className="font-display uppercase text-orange-300 text-xs tracking-[0.3em] mb-3">{ev.date}</p>
                          <h3 className="font-display font-bold uppercase text-2xl mb-3">{ev.title}</h3>
                          <p className="text-white/70 text-sm leading-relaxed">{ev.text}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section id="bio" className="bg-[#050d1a] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[3px] bg-blue-500" />
            <p className="font-display uppercase tracking-[0.3em] text-blue-400 text-sm">Раздел 02</p>
          </div>
          <h2 className="font-display font-bold uppercase text-white text-5xl lg:text-6xl mb-16 leading-none">
            Герои<br /><span className="text-orange-500">эпохи</span>
          </h2>

          <div className="flex gap-0 border-b border-white/10 mb-12 overflow-x-auto">
            {BIOS.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setActiveBio(i)}
                className={`shrink-0 px-8 py-5 font-display uppercase tracking-widest text-sm transition-all border-b-2 -mb-px ${
                  i === activeBio
                    ? 'border-orange-500 text-white'
                    : 'border-transparent text-white/30 hover:text-white/60'
                }`}
              >
                <span className="text-orange-500/60 mr-2">{b.num}</span>{b.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <div key={activeBio} className="grid lg:grid-cols-[1fr_2fr] gap-12 animate-fade-in">
            <div className="space-y-6">
              <div>
                <p className="font-display uppercase tracking-[0.3em] text-orange-400 text-xs mb-2">{bio.role}</p>
                <h3 className="font-display font-bold uppercase text-white text-4xl leading-tight">{bio.name}</h3>
                <p className="text-white/30 font-display uppercase tracking-widest text-sm mt-2">{bio.years}</p>
              </div>
              <div className="flex flex-col gap-3">
                {bio.facts.map((f) => (
                  <div key={f} className="flex items-center gap-3 border border-white/10 px-4 py-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-white/70 font-display uppercase tracking-widest text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                {BIOS.map((_, i) => (
                  <button key={i} onClick={() => setActiveBio(i)} className={`h-2 rounded-full transition-all ${i === activeBio ? 'bg-orange-500 w-6' : 'bg-white/20 w-2 hover:bg-white/40'}`} />
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-10">
              <p className="text-white/70 text-xl leading-relaxed">{bio.text}</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <button className="font-display uppercase tracking-[0.2em] text-orange-400 text-sm hover:text-orange-300 transition-colors flex items-center gap-2">
                  Читать полную биографию <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[3px] bg-[#050d1a]" />
            <p className="font-display uppercase tracking-[0.3em] text-[#050d1a]/50 text-sm">Раздел 03</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <h2 className="font-display font-bold uppercase text-[#050d1a] text-5xl lg:text-6xl leading-none">
              Архив<br /><span className="text-blue-600">документов</span>
            </h2>
            <p className="text-[#050d1a]/40 max-w-xs font-display uppercase tracking-widest text-xs leading-relaxed">Рассекреченные материалы советской космической программы</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#050d1a]/10">
            {ARCHIVE.map((a) => (
              <div key={a.title} className="bg-white p-8 group cursor-pointer hover:bg-[#050d1a] transition-all duration-300">
                <div className={`w-12 h-12 ${a.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon name={a.icon} size={22} className="text-white" />
                </div>
                <p className="font-display uppercase text-[#050d1a]/40 group-hover:text-white/40 text-xs tracking-[0.25em] mb-2 transition-colors">{a.type} · {a.date}</p>
                <h3 className="font-display font-semibold text-[#050d1a] group-hover:text-white text-lg leading-snug mb-4 transition-colors">{a.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="border border-[#050d1a]/15 group-hover:border-white/20 text-[#050d1a]/50 group-hover:text-white/50 font-display uppercase text-xs tracking-widest px-3 py-1 transition-all">{a.tag}</span>
                  <Icon name="ArrowUpRight" size={18} className="text-[#050d1a]/20 group-hover:text-orange-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#050d1a] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[3px] bg-orange-500" />
            <p className="font-display uppercase tracking-[0.3em] text-orange-500 text-sm">Раздел 04</p>
          </div>
          <h2 className="font-display font-bold uppercase text-white text-5xl lg:text-6xl mb-16 leading-none">
            Галерея<br /><span className="text-blue-400">образов</span>
          </h2>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-7 relative group overflow-hidden">
              <img src={BURAN_IMG} alt="Буран" className="w-full object-cover h-[480px] group-hover:scale-105 transition-transform duration-700" style={{filter: 'saturate(0.5)'}} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="w-10 h-[2px] bg-orange-500 mb-4" />
                <p className="font-display uppercase text-orange-400 text-xs tracking-[0.3em] mb-2">1988 · Байконур</p>
                <h3 className="font-display font-bold uppercase text-white text-3xl leading-tight">Космический корабль<br />«Буран»</h3>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <div className="relative group overflow-hidden">
                <img src={HERO_IMG} alt="Гагарин" className="w-full object-cover h-[230px] group-hover:scale-105 transition-transform duration-700" style={{filter: 'saturate(0.4) contrast(1.1)'}} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-display uppercase text-orange-400 text-xs tracking-[0.3em] mb-1">1961</p>
                  <h3 className="font-display font-bold uppercase text-white text-xl">Гагарин. Старт</h3>
                </div>
              </div>

              <div className="bg-blue-600 p-8 flex flex-col justify-between min-h-[200px]">
                <Icon name="Orbit" size={32} className="text-blue-200" />
                <div>
                  <p className="font-display uppercase text-blue-200 text-xs tracking-[0.3em] mb-2">Фотоархив</p>
                  <h3 className="font-display font-bold uppercase text-white text-2xl leading-tight">500+ снимков космической эры</h3>
                  <button className="mt-4 font-display uppercase tracking-widest text-orange-300 text-xs flex items-center gap-2 hover:text-orange-200 transition-colors">
                    Открыть архив <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030a14] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <Icon name="Rocket" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold uppercase tracking-[0.2em] text-white text-sm">Космическая гонка</span>
          </div>
          <div className="flex gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="font-display uppercase text-xs tracking-widest text-white/30 hover:text-white/60 transition-colors">{n.label}</button>
            ))}
          </div>
          <p className="text-white/20 font-display uppercase tracking-widest text-xs">1957—1988</p>
        </div>
      </footer>
    </div>
  );
}
