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
  { year: '1957', date: '4 октября', title: 'Спутник-1', text: 'Первый искусственный спутник Земли открыл космическую эру человечества.', icon: 'Satellite' },
  { year: '1961', date: '12 апреля', title: 'Полёт Гагарина', text: '«Поехали!» — Юрий Гагарин стал первым человеком в космосе на корабле «Восток-1».', icon: 'Rocket' },
  { year: '1963', date: '16 июня', title: 'Валентина Терешкова', text: 'Первая в мире женщина-космонавт совершила полёт на «Востоке-6».', icon: 'Star' },
  { year: '1965', date: '18 марта', title: 'Выход в открытый космос', text: 'Алексей Леонов первым в истории вышел в открытый космос.', icon: 'MoveUpRight' },
  { year: '1971', date: '19 апреля', title: 'Станция «Салют-1»', text: 'Запуск первой в мире орбитальной станции.', icon: 'Orbit' },
  { year: '1986', date: '20 февраля', title: 'Станция «Мир»', text: 'Начало строительства легендарной долговременной орбитальной станции.', icon: 'Globe' },
  { year: '1988', date: '15 ноября', title: 'Полёт «Бурана»', text: 'Космический корабль «Буран» совершил полёт и автоматическую посадку.', icon: 'Plane' },
];

const BIOS = [
  { name: 'Юрий Гагарин', role: 'Первый космонавт', years: '1934–1968', text: 'Лётчик-космонавт СССР, Герой Советского Союза. 12 апреля 1961 года совершил первый в истории полёт человека в космос.' },
  { name: 'Валентина Терешкова', role: 'Первая женщина в космосе', years: 'род. 1937', text: 'Единственная в мире женщина, совершившая космический полёт в одиночку. Позывной — «Чайка».' },
  { name: 'Алексей Леонов', role: 'Выход в космос', years: '1934–2019', text: 'Первый человек, вышедший в открытый космос. Художник, автор космических пейзажей.' },
  { name: 'Сергей Королёв', role: 'Главный конструктор', years: '1907–1966', text: 'Основоположник практической космонавтики, конструктор ракетно-космических систем.' },
];

const ARCHIVE = [
  { type: 'Документ', title: 'Постановление о запуске «Востока-1»', date: '1961', tag: 'Секретно' },
  { type: 'Чертёж', title: 'Конструкция корабля «Восток»', date: '1960', tag: 'ОКБ-1' },
  { type: 'Радиограмма', title: 'Переговоры «Заря» — «Кедр»', date: '1961', tag: 'Запись' },
  { type: 'Отчёт', title: 'Итоги программы «Буран»', date: '1988', tag: 'НПО «Энергия»' },
];

export default function Index() {
  const [active, setActive] = useState(0);
  const ev = TIMELINE[active];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-secondary text-secondary-foreground border-b-4 border-primary">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-display font-bold tracking-wider">
            <Icon name="Rocket" className="text-primary" size={22} />
            <span className="text-lg uppercase">Космическая гонка</span>
          </button>
          <nav className="hidden md:flex gap-6 font-display uppercase text-sm tracking-widest">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-primary transition-colors">{n.label}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 bg-secondary text-secondary-foreground grain overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-8 items-center py-20">
          <div className="animate-fade-in-left">
            <p className="font-display uppercase tracking-[0.3em] text-accent mb-4">1957 — 1988</p>
            <h1 className="font-display font-bold uppercase leading-[0.9] text-5xl sm:text-6xl lg:text-7xl">
              От <span className="text-primary">Гагарина</span><br />до «Бурана»
            </h1>
            <p className="mt-6 max-w-md text-secondary-foreground/70 text-lg">
              Информационный портал о советской космонавтике: хронология событий, биографии героев и архив документов эпохи.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => scrollTo('timeline')} className="bg-primary text-primary-foreground font-display uppercase tracking-widest px-7 py-3 hover:translate-x-1 transition-transform">
                Открыть хронологию
              </button>
              <button onClick={() => scrollTo('bio')} className="border-2 border-secondary-foreground/40 font-display uppercase tracking-widest px-7 py-3 hover:border-accent hover:text-accent transition-colors">
                Биографии
              </button>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-3 border-4 border-primary rotate-2" />
            <img src={HERO_IMG} alt="Гагарин" className="relative w-full object-cover aspect-square -rotate-1" />
          </div>
        </div>
        <div className="border-t-4 border-primary bg-primary text-primary-foreground font-display uppercase tracking-[0.2em] py-2 whitespace-nowrap overflow-hidden">
          <div className="flex gap-8 animate-pulse-none px-8">
            <span>★ Поехали! ★ Первый спутник ★ Первый человек в космосе ★ Выход в открытый космос ★ Станция «Мир» ★ Буран ★</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="container py-24">
        <SectionTitle num="01" title="Хронология" subtitle="Интерактивная лента событий" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mt-12">
          {/* Years */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2">
            {TIMELINE.map((t, i) => (
              <button
                key={t.year}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 shrink-0 px-5 py-4 border-2 text-left transition-all font-display ${
                  i === active ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-border bg-card hover:border-primary'
                }`}
              >
                <span className={`text-2xl font-bold ${i === active ? 'text-primary' : ''}`}>{t.year}</span>
                <span className="uppercase tracking-wide text-sm hidden lg:block">{t.title}</span>
              </button>
            ))}
          </div>
          {/* Detail */}
          <div key={active} className="bg-card border-2 border-secondary p-8 lg:p-12 animate-fade-in relative grain">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground w-16 h-16 flex items-center justify-center">
              <Icon name={ev.icon} size={28} />
            </div>
            <p className="font-display uppercase tracking-[0.3em] text-primary">{ev.date} · {ev.year}</p>
            <h3 className="font-display font-bold uppercase text-4xl lg:text-5xl mt-3 leading-tight">{ev.title}</h3>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{ev.text}</p>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0} className="border-2 border-secondary p-3 disabled:opacity-30 hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button onClick={() => setActive((a) => Math.min(TIMELINE.length - 1, a + 1))} disabled={active === TIMELINE.length - 1} className="border-2 border-secondary p-3 disabled:opacity-30 hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section id="bio" className="bg-secondary text-secondary-foreground py-24 grain">
        <div className="container">
          <SectionTitle num="02" title="Биографии" subtitle="Герои космической эры" light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {BIOS.map((b) => (
              <article key={b.name} className="border-2 border-secondary-foreground/20 p-6 hover:border-primary hover:-translate-y-1 transition-all bg-secondary-foreground/5">
                <div className="w-14 h-14 bg-primary flex items-center justify-center mb-4">
                  <Icon name="User" size={26} className="text-primary-foreground" />
                </div>
                <p className="font-display uppercase text-accent text-xs tracking-widest">{b.role}</p>
                <h3 className="font-display font-bold text-2xl uppercase mt-1 leading-tight">{b.name}</h3>
                <p className="text-secondary-foreground/50 text-sm mt-1">{b.years}</p>
                <p className="text-secondary-foreground/70 text-sm mt-4 leading-relaxed">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section id="archive" className="container py-24">
        <SectionTitle num="03" title="Архив" subtitle="Документы эпохи" />
        <div className="mt-12 border-t-2 border-secondary">
          {ARCHIVE.map((a) => (
            <div key={a.title} className="group flex items-center gap-4 sm:gap-8 py-6 border-b-2 border-border hover:bg-card transition-colors cursor-pointer">
              <Icon name="FileText" size={28} className="text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-display uppercase text-xs tracking-widest text-muted-foreground">{a.type} · {a.date}</p>
                <h3 className="font-display font-semibold text-xl uppercase">{a.title}</h3>
              </div>
              <span className="hidden sm:inline-block border-2 border-secondary px-3 py-1 font-display uppercase text-xs tracking-wider">{a.tag}</span>
              <Icon name="ArrowUpRight" size={24} className="shrink-0 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="container pb-24">
        <SectionTitle num="04" title="Галерея" subtitle="Образы космической гонки" />
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div className="md:col-span-2 relative grain overflow-hidden border-2 border-secondary group">
            <img src={BURAN_IMG} alt="Буран" className="w-full h-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 inset-x-0 bg-secondary/90 text-secondary-foreground p-4">
              <p className="font-display uppercase tracking-widest text-primary text-xs">1988</p>
              <h3 className="font-display font-bold uppercase text-xl">Космический корабль «Буран»</h3>
            </div>
          </div>
          <div className="relative grain overflow-hidden border-2 border-secondary group">
            <img src={HERO_IMG} alt="Гагарин" className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 inset-x-0 bg-secondary/90 text-secondary-foreground p-4">
              <p className="font-display uppercase tracking-widest text-primary text-xs">1961</p>
              <h3 className="font-display font-bold uppercase text-xl">Юрий Гагарин</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground border-t-4 border-primary">
        <div className="container py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold uppercase tracking-wider">
            <Icon name="Rocket" className="text-primary" size={22} />
            Космическая гонка
          </div>
          <p className="text-secondary-foreground/50 text-sm font-display uppercase tracking-widest">Архив советской космонавтики · 1957—1988</p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ num, title, subtitle, light }: { num: string; title: string; subtitle: string; light?: boolean }) {
  return (
    <div className="flex items-end gap-5">
      <span className={`font-display font-bold text-6xl lg:text-8xl leading-none ${light ? 'text-secondary-foreground/15' : 'text-secondary/10'}`}>{num}</span>
      <div className="pb-2">
        <p className="font-display uppercase tracking-[0.3em] text-primary text-sm">{subtitle}</p>
        <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl leading-none">{title}</h2>
      </div>
    </div>
  );
}
