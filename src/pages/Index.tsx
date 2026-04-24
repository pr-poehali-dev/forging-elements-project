import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Ворота усадьбы «Классика»",
    category: "Ворота",
    material: "Чёрный металл",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/cd43d7f0-a9b0-448d-a788-5317fbc14d8c.jpg",
    year: "2024",
  },
  {
    id: 2,
    title: "Перила лестницы «Спираль»",
    category: "Перила",
    material: "Чёрный металл",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/ec2e4321-f6e8-4c4d-a505-f6f2ec3e3b27.jpg",
    year: "2024",
  },
  {
    id: 3,
    title: "Садовый комплект «Патио»",
    category: "Мебель",
    material: "Чёрный металл",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/70a0a9fe-83c5-4ddf-8e27-21ad7de4df11.jpg",
    year: "2023",
  },
  {
    id: 4,
    title: "Решётка оконная «Готика»",
    category: "Решётки",
    material: "Нержавеющая сталь",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/e8a4dc32-b804-44fe-87e1-3e4029e1aaeb.jpg",
    year: "2023",
  },
  {
    id: 5,
    title: "Кованые ворота «Барокко»",
    category: "Ворота",
    material: "Нержавеющая сталь",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/cd43d7f0-a9b0-448d-a788-5317fbc14d8c.jpg",
    year: "2023",
  },
  {
    id: 6,
    title: "Перила балкона «Лоза»",
    category: "Перила",
    material: "Медь",
    image: "https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/ec2e4321-f6e8-4c4d-a505-f6f2ec3e3b27.jpg",
    year: "2022",
  },
];

const CATEGORIES = ["Все", "Ворота", "Перила", "Решётки", "Мебель"];
const MATERIALS = ["Все материалы", "Чёрный металл", "Нержавеющая сталь", "Медь"];

const SERVICES = [
  { icon: "DoorOpen", title: "Ворота и калитки", desc: "Распашные, откатные, автоматические. Любой стиль — от классики до авангарда." },
  { icon: "Shield", title: "Ограды и заборы", desc: "Секционные и цельносварные конструкции для загородных домов и коммерческих объектов." },
  { icon: "MoveUp", title: "Перила и лестницы", desc: "Кованые перила для интерьера и экстерьера. Точный обмер, монтаж под ключ." },
  { icon: "Grid3x3", title: "Решётки и экраны", desc: "Декоративные и защитные решётки для окон, каминов и вентиляционных систем." },
  { icon: "Armchair", title: "Кованая мебель", desc: "Столы, стулья, диваны, подставки — уникальные изделия для сада и интерьера." },
  { icon: "Sparkles", title: "Декоративные элементы", desc: "Люстры, светильники, подсвечники, флюгеры и малые архитектурные формы." },
];

const STEPS = [
  { num: "01", title: "Консультация", desc: "Обсуждаем задачу, стиль, размеры. Выезжаем на объект для замеров." },
  { num: "02", title: "Эскиз и смета", desc: "Разрабатываем 3D-эскиз, согласовываем детали. Фиксируем стоимость договором." },
  { num: "03", title: "Производство", desc: "Ковка, сварка, обработка. Контроль качества на каждом этапе." },
  { num: "04", title: "Монтаж", desc: "Доставка и установка нашей бригадой. Гарантия 5 лет на все изделия." },
];

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E5C97A";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeMaterial, setActiveMaterial] = useState("Все материалы");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const filtered = GALLERY_ITEMS.filter((item) => {
    const catOk = activeCategory === "Все" || item.category === activeCategory;
    const matOk = activeMaterial === "Все материалы" || item.material === activeMaterial;
    return catOk && matOk;
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = ["hero", "portfolio", "services", "process", "master", "contacts"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.35 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-heading">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button className="flex items-center gap-3" onClick={() => scrollTo("hero")}>
            <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: GOLD }}>
              <div className="w-2.5 h-2.5" style={{ background: GOLD, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
            </div>
            <span className="font-display text-xl font-semibold tracking-wider" style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif" }}>Студия ковки Белогорск</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "portfolio", label: "Портфолио" },
              { id: "services", label: "Услуги" },
              { id: "process", label: "Процесс" },
              { id: "master", label: "О мастере" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs tracking-widest uppercase transition-colors duration-300"
                style={{ color: activeSection === item.id ? GOLD : "rgba(255,255,255,0.5)" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-300"
            style={{ borderColor: GOLD, color: GOLD }}
            onMouseEnter={(e) => { const t = e.currentTarget; t.style.background = GOLD; t.style.color = "#0D0D0D"; }}
            onMouseLeave={(e) => { const t = e.currentTarget; t.style.background = "transparent"; t.style.color = GOLD; }}
          >
            Заказать
          </button>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-white/5 py-4 px-6 flex flex-col gap-4">
            {[
              { id: "portfolio", label: "Портфолио" },
              { id: "services", label: "Услуги" },
              { id: "process", label: "Процесс" },
              { id: "master", label: "О мастере" },
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/87ac45b8-d088-4226-a480-1f63e314fe66.jpg)` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.35) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, #0D0D0D 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full">
          <div className="max-w-2xl animate-fade-up" style={{ animationFillMode: "both" }}>
            <p className="text-xs tracking-[0.35em] uppercase mb-8 font-heading" style={{ color: GOLD }}>
              Художественная ковка · Белогорск, Крым · С 2004 года
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.9] mb-8 text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Металл в<br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>умелых руках</em>
            </h1>
            <p className="text-white/55 text-lg font-light leading-relaxed mb-12 max-w-lg" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Изготавливаем кованые изделия любой сложности — от декоративных элементов до масштабных архитектурных конструкций.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("portfolio")}
                className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300"
                style={{ background: GOLD, color: "#0D0D0D" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
              >
                Смотреть работы
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 text-sm tracking-widest uppercase border transition-all duration-300 text-white"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "white"; }}
              >
                Обсудить проект
              </button>
            </div>
          </div>

          <div className="absolute bottom-20 right-6 hidden md:flex flex-col">
            <div className="flex gap-10 bg-black/50 backdrop-blur-sm border border-white/8 px-8 py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {[
                { num: "20+", label: "Лет опыта" },
                { num: "850+", label: "Объектов" },
                { num: "5 лет", label: "Гарантия" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-semibold" style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif" }}>{s.num}</div>
                  <div className="text-xs tracking-widest uppercase text-white/35 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-white/25">Прокрутите</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Наши работы</p>
                <h2 className="font-display text-5xl md:text-6xl font-light text-white gold-line" style={{ fontFamily: "Cormorant Garamond, serif" }}>Портфолио</h2>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 border"
                      style={{
                        borderColor: activeCategory === cat ? GOLD : "rgba(255,255,255,0.12)",
                        color: activeCategory === cat ? GOLD : "rgba(255,255,255,0.45)",
                        background: activeCategory === cat ? "rgba(201,168,76,0.08)" : "transparent",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setActiveMaterial(mat)}
                      className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 border"
                      style={{
                        borderColor: activeMaterial === mat ? GOLD : "rgba(255,255,255,0.08)",
                        color: activeMaterial === mat ? GOLD : "rgba(255,255,255,0.3)",
                        background: activeMaterial === mat ? "rgba(201,168,76,0.08)" : "transparent",
                      }}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <RevealSection key={item.id} delay={i * 90}>
                <div className="group cursor-pointer card-hover border border-white/5 overflow-hidden bg-card">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="text-xs tracking-widest uppercase px-2 py-1 bg-black/60 backdrop-blur-sm" style={{ color: GOLD }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 border-t border-white/5">
                    <h3 className="font-display text-lg text-white mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/35 tracking-wider">{item.material}</span>
                      <span className="text-xs text-white/25">{item.year}</span>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <RevealSection>
              <div className="text-center py-20 text-white/25 font-display text-2xl" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                По данным фильтрам работ не найдено
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 border-t border-white/5" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Что мы делаем</p>
              <h2 className="font-display text-5xl md:text-6xl font-light text-white gold-line-center" style={{ fontFamily: "Cormorant Garamond, serif" }}>Услуги</h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title} delay={i * 80}>
                <div
                  className="group p-8 transition-colors duration-400 cursor-default h-full"
                  style={{ background: "#111111" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#161616"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#111111"; }}
                >
                  <div
                    className="w-11 h-11 border flex items-center justify-center mb-6 transition-colors duration-400"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; }}
                  >
                    <Icon name={s.icon} size={18} fallback="Wrench" style={{ color: "rgba(255,255,255,0.4)" }} />
                  </div>
                  <h3 className="font-heading text-sm tracking-widest uppercase text-white mb-3">{s.title}</h3>
                  <p className="text-white/45 leading-relaxed text-sm" style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Как мы работаем</p>
              <h2 className="font-display text-5xl md:text-6xl font-light text-white gold-line" style={{ fontFamily: "Cormorant Garamond, serif" }}>Процесс работы</h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <RevealSection key={step.num} delay={i * 150}>
                <div className="relative pt-6">
                  <div
                    className="absolute top-0 left-0 w-10 h-0.5"
                    style={{ background: GOLD }}
                  />
                  <div
                    className="font-display text-7xl font-semibold leading-none mb-4 select-none"
                    style={{ color: "rgba(201,168,76,0.1)", fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-heading text-sm tracking-widest uppercase text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm" style={{ fontFamily: "Cormorant Garamond, serif" }}>{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER */}
      <section id="master" className="py-24 md:py-32 border-t border-white/5" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 border border-white/5 pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-white/5 pointer-events-none" />
                <div className="absolute inset-0 border pointer-events-none" style={{ borderColor: `${GOLD}20` }} />
                <img
                  src="https://cdn.poehali.dev/projects/221daaae-2d8b-49c5-8454-37b0c2de8967/files/87ac45b8-d088-4226-a480-1f63e314fe66.jpg"
                  alt="Мастер кузнец за работой"
                  className="w-full aspect-[3/4] object-cover"
                  style={{ filter: "grayscale(0.4) contrast(1.1)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, #111111, transparent)" }} />
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>О мастере</p>
                <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 gold-line" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  Александр<br />Ковалёв
                </h2>
                <div className="space-y-5 text-white/55 leading-relaxed text-base" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  <p>
                    Более 20 лет занимаюсь художественной ковкой. Начинал подмастерьем в старинной петербургской кузнице, прошёл путь от простых изделий до сложнейших архитектурных элементов.
                  </p>
                  <p>
                    Каждое изделие — это диалог между металлом и замыслом. Я не просто выполняю заказ, я создаю вещь, которая переживёт несколько поколений.
                  </p>
                  <p>
                    Среди моих работ — объекты для частных резиденций, административных зданий и исторических реставраций в Москве, Санкт-Петербурге и за рубежом.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
                  {[
                    { num: "20+", label: "Лет в ремесле" },
                    { num: "850+", label: "Проектов" },
                    { num: "12", label: "Наград" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-semibold" style={{ color: GOLD, fontFamily: "Cormorant Garamond, serif" }}>{s.num}</div>
                      <div className="text-xs tracking-wider uppercase text-white/30 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Свяжитесь с нами</p>
              <h2 className="font-display text-5xl md:text-6xl font-light text-white gold-line-center mb-8" style={{ fontFamily: "Cormorant Garamond, serif" }}>Контакты</h2>
              <p className="text-white/45 text-lg max-w-xl mx-auto" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Расскажите о вашем проекте — рассчитаем стоимость и сроки в течение одного рабочего дня
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            <RevealSection className="lg:col-span-3">
              <form className="space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/35 mb-2">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Как к вам обращаться"
                    className="w-full bg-transparent border border-white/12 px-4 py-3.5 text-white placeholder:text-white/18 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: "Cormorant Garamond, serif", borderColor: "rgba(255,255,255,0.12)" }}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/35 mb-2">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border px-4 py-3.5 text-white placeholder:text-white/18 focus:outline-none transition-colors duration-300"
                    style={{ fontFamily: "Cormorant Garamond, serif", borderColor: "rgba(255,255,255,0.12)" }}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/35 mb-2">Опишите проект</label>
                  <textarea
                    rows={5}
                    placeholder="Что хотите заказать, примерные размеры, стиль..."
                    className="w-full bg-transparent border px-4 py-3.5 text-white placeholder:text-white/18 focus:outline-none transition-colors duration-300 resize-none"
                    style={{ fontFamily: "Cormorant Garamond, serif", borderColor: "rgba(255,255,255,0.12)" }}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300"
                  style={{ background: GOLD, color: "#0D0D0D" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = GOLD_LIGHT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; }}
                >
                  Отправить заявку
                </button>
              </form>
            </RevealSection>

            <RevealSection delay={200} className="lg:col-span-2">
              <div className="space-y-8 lg:pt-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (978) 820-00-00" },
                  { icon: "Mail", label: "Email", value: "info@kovka-belogorsk.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Крым, г. Белогорск\nПн–Пт: 9:00–18:00" },
                  { icon: "MessageCircle", label: "Мессенджеры", value: "WhatsApp · Telegram" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={15} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-white/25 mb-1">{c.label}</div>
                      <div className="text-white/60 whitespace-pre-line text-sm" style={{ fontFamily: "Cormorant Garamond, serif" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8" style={{ background: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-white/15 flex items-center justify-center">
              <div className="w-2 h-2" style={{ background: GOLD, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
            </div>
            <span className="text-white/35 text-sm" style={{ fontFamily: "Cormorant Garamond, serif" }}>Студия ковки Белогорск</span>
          </div>
          <p className="text-xs text-white/18 tracking-wider">© 2024 Студия ковки Белогорск. Все права защищены.</p>
          <div className="flex gap-6">
            {[
              { label: "Портфолио", id: "portfolio" },
              { label: "Услуги", id: "services" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="text-xs tracking-widest uppercase text-white/22 hover:text-white/50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}