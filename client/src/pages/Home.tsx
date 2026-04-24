/* ==========================================================
   DESIGN: "Luminous River"
   Deep midnight navy + Olympic gold
   Cormorant Garamond (display) + DM Sans (body)
   Full-bleed imagery, theatrical act structure, scroll animations
   ========================================================== */

import { useEffect, useRef } from "react";

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up, .stagger-children").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// ─── Particle canvas ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; da: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.25 - 0.05,
        alpha: Math.random() * 0.7 + 0.2,
        da: (Math.random() - 0.5) * 0.005,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0.1 || p.alpha >= 0.9) p.da *= -1;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 192, 64, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} id="particle-canvas" className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
// --- Course Header Banner ---
function CourseHeader() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(10, 14, 26, 0.97)",
      borderBottom: "1px solid rgba(240, 192, 64, 0.25)",
      padding: "8px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--gold)",
          opacity: 0.9,
        }}>
          202601_MDFL_201R_01
        </span>
        <span style={{ width: "1px", height: "14px", background: "rgba(240,192,64,0.3)", display: "inline-block" }} />
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "0.04em",
        }}>
          Taste of France
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.68rem",
          fontWeight: 400,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Author:
        </span>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.88rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.04em",
          fontStyle: "italic",
        }}>
          Xinyue Fan
        </span>
      </div>
    </div>
  );
}

function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="fixed left-0 right-0 z-50 flex items-center justify-between px-8 py-4" style={{ top: "38px", background: "linear-gradient(to bottom, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0) 100%)" }}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border border-[#f0c040] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#f0c040]" />
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "#f0c040", letterSpacing: "0.05em" }}>
          PARIS 2024
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Opening", id: "opening" },
          { label: "The Acts", id: "acts" },
          { label: "Closing", id: "closing" },
          { label: "Mascot", id: "mascot" },
          { label: "Sources", id: "references" },
        ].map((item) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}
            className="gold-underline text-white/70 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "none" }}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663375659687/adZ8ed6MMkFAwXrUccjYXT/paris_hero-J2tyGhzJwtBZrowdSpAnap.webp"
          alt="Paris at night with Olympic rings on the Eiffel Tower"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0e1a 0%, rgba(10,14,26,0.3) 50%, rgba(10,14,26,0.1) 100%)" }} />
      </div>
      <ParticleCanvas />
      <div className="relative z-10 container pb-24 pt-48">
        <div className="max-w-3xl">
          <p className="section-label mb-6">July 26 – August 11, 2024</p>
          <h1 className="display-heading mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05 }}>
            Paris 2024 Olympics<br />
            <span className="text-gold italic">A Cultural &amp; Artistic</span><br />
            Analysis
          </h1>
          <div className="gold-rule mb-6" />
          <p className="text-white/70 max-w-xl" style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 300 }}>
            The 2024 Summer Olympics in Paris marked a historic departure from tradition — transforming the River Seine into the world's grandest stage, weaving French history, art, and culture into an unforgettable spectacle.
          </p>
          <div className="flex gap-6 mt-10">
            <button onClick={() => document.getElementById("opening")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 text-sm font-semibold tracking-widest uppercase transition-all"
              style={{ background: "var(--gold)", color: "#0a0e1a", fontFamily: "var(--font-body)", letterSpacing: "0.15em", borderRadius: "2px" }}>
              Explore
            </button>
            <button onClick={() => document.getElementById("acts")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 text-sm font-semibold tracking-widest uppercase transition-all text-white/80 hover:text-white"
              style={{ border: "1px solid rgba(240,192,64,0.4)", fontFamily: "var(--font-body)", letterSpacing: "0.15em", borderRadius: "2px", background: "transparent" }}>
              The 12 Acts
            </button>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="section-label" style={{ fontSize: "0.6rem" }}>SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#f0c040] to-transparent" />
      </div>
    </section>
  );
}

// ─── Opening Ceremony Section ─────────────────────────────────────────────────
function OpeningSection() {
  return (
    <section id="opening" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(240,192,64,0.04) 0%, transparent 70%)" }} />
      <div className="container">
        {/* Header */}
        <div className="fade-up mb-20">
          <p className="section-label mb-3">I — The Opening</p>
          <h2 className="display-heading mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            A Theatrical Journey<br />
            <span className="text-gold italic">Along the Seine</span>
          </h2>
          <div className="gold-rule mb-6" />
          <p className="text-white/65 max-w-2xl" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
            Directed by Thomas Jolly, the Opening Ceremony on July 26, 2024, was the first in modern Olympic history to be held outside a stadium. The event utilized the River Seine as its main stage, with athletes parading on boats along a 6-kilometer route that culminated at the Jardins du Trocadéro. The ceremony was divided into twelve thematic acts, each exploring different facets of French identity, history, and values.
          </p>
        </div>

        {/* Image + facts */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="fade-up">
            <div className="relative overflow-hidden rounded-sm" style={{ border: "1px solid rgba(240,192,64,0.2)" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663375659687/adZ8ed6MMkFAwXrUccjYXT/opening_ceremony-c4HvYdsx9WcwKXxrZgjFyK.webp"
                alt="Paris 2024 Opening Ceremony on the Seine"
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.5) 0%, transparent 60%)" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                  JULY 26, 2024 · RIVER SEINE, PARIS
                </p>
              </div>
            </div>
          </div>
          <div className="fade-up stagger-children" style={{ transitionDelay: "0.1s" }}>
            {[
              { num: "6 km", label: "Route along the Seine" },
              { num: "160+", label: "Boats carrying delegations" },
              { num: "6,800", label: "Athletes in the parade" },
              { num: "3,000", label: "Total performers" },
              { num: "12", label: "Thematic acts" },
              { num: "~1 billion", label: "Global TV viewers" },
            ].map((stat) => (
              <div key={stat.num} className="flex items-center gap-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold)", minWidth: "90px" }}>{stat.num}</span>
                <span className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 400 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key narrative elements */}
        <div className="fade-up mb-8">
          <p className="section-label mb-4">Key Narrative Elements</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              title: "The Mysterious Torchbearer",
              body: "A masked, hooded figure traversed the rooftops and landmarks of Paris throughout the ceremony. This character was an amalgamation of French cultural icons: the Phantom of the Opera, the Man in the Iron Mask, Arsène Lupin, and Arno Dorian from the video game Assassin's Creed Unity. The torchbearer's parkour movements also paid homage to the sport's French origins.",
              icon: "🎭",
            },
            {
              title: "The Olympic Cauldron",
              body: "French Olympic champions Teddy Riner and Marie-José Pérec lit a ring of LEDs and water aerosol spray attached to a 30-meter-tall helium balloon in the Tuileries Garden — a direct tribute to the Montgolfier brothers, the French inventors who conducted the first hot-air balloon flights in 1783. It was the first Olympic cauldron to light without fossil fuels.",
              icon: "🔥",
            },
            {
              title: "Céline Dion's Return",
              body: "Canadian singer Céline Dion closed the ceremony by singing Édith Piaf's 'Hymne à l'amour' from the first floor of the Eiffel Tower — her first public performance since December 2022, following her diagnosis with stiff-person syndrome. The moment was widely regarded as the emotional climax of the entire ceremony.",
              icon: "🎵",
            },
          ].map((card) => (
            <div key={card.title} className="glass-card act-card p-7">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="display-heading mb-3" style={{ fontSize: "1.3rem" }}>{card.title}</h3>
              <p className="text-white/55" style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.75, fontWeight: 300 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── The 12 Acts Section ──────────────────────────────────────────────────────
const ACTS = [
  {
    roman: "I",
    name: "Enchanté",
    translation: "Enchantment",
    perf: "Lady Gaga performing \"Mon truc en plumes\"; Moulin Rouge dancers performing the can-can.",
    sig: "A tribute to French cabaret, vedette Zizi Jeanmaire, and Jacques Offenbach's Orpheus in the Underworld.",
    color: "#f0c040",
  },
  {
    roman: "II",
    name: "Synchronicité",
    translation: "Synchronicity",
    perf: "Dance tribute on Île de la Cité featuring 420 performers.",
    sig: "Honored the artisans rebuilding Notre-Dame Cathedral after the 2019 fire, and the crafting of Olympic medals at the Monnaie de Paris.",
    color: "#7eb8f7",
  },
  {
    roman: "III",
    name: "Liberté",
    translation: "Liberty",
    perf: "Gojira and mezzo-soprano Marina Viotti performing \"Ah! ça ira\" at the Conciergerie; a beheaded Marie Antoinette.",
    sig: "Referenced the French Revolution, the Reign of Terror, and the imprisonment of Marie Antoinette at the Conciergerie. The first metal band to perform at an Olympic opening ceremony.",
    color: "#ED2939",
  },
  {
    roman: "IV",
    name: "Égalité",
    translation: "Equality",
    perf: "Aya Nakamura performing \"Pookie,\" \"Djadja,\" and Charles Aznavour's \"For me formidable\" with the Republican Guard.",
    sig: "A celebration of French-African cultural contribution and the universality of French song, in front of the Institut de France.",
    color: "#f0c040",
  },
  {
    roman: "V",
    name: "Fraternité",
    translation: "Brotherhood",
    perf: "The Minions stealing the Mona Lisa; tributes to the Lumière brothers and Georges Méliès; pianist Alexandre Kantorow performing Ravel's \"Jeux d'eau.\"",
    sig: "Acknowledged the 1911 theft of the Mona Lisa, French animation studios (Illumination), Jules Verne's Nautilus, and the 1902 sci-fi film Le Voyage Dans La Lune.",
    color: "#a78bfa",
  },
  {
    roman: "VI",
    name: "Sororité",
    translation: "Sisterhood",
    perf: "Ten golden statues of notable French women rising from the Seine.",
    sig: "Celebrated heroines including Olympe de Gouges, Simone de Beauvoir, Alice Guy Blaché, and Simone Veil — addressing the historical imbalance of only ~40 women's statues versus 260 men's in Paris.",
    color: "#f9a8d4",
  },
  {
    roman: "VII",
    name: "Sportivité",
    translation: "Sportsmanship",
    perf: "Polish countertenor Jakub Józef Orliński as Pierrot, performing Rameau's Les Indes galantes, then breakdancing.",
    sig: "A fusion of Baroque opera and breakdancing, celebrating the sport's inclusion in the Paris Games for the first time.",
    color: "#34d399",
  },
  {
    roman: "VIII",
    name: "Festivité",
    translation: "Festivity",
    perf: "Fashion runway on Passerelle Debilly; Philippe Katerine as a blue Dionysus; drag queens in a Bacchanalian feast.",
    sig: "A tribute to French fashion and the European Union. The tableau was inspired by Jan van Bijlert's 1635–40 painting The Feast of the Gods, though some misinterpreted it as a parody of The Last Supper.",
    color: "#fbbf24",
  },
  {
    roman: "IX",
    name: "Obscurité",
    translation: "Darkness",
    perf: "Juliette Armanet singing John Lennon's \"Imagine\" on a raft; Sofiane Pamart on a burning piano.",
    sig: "A somber meditation on climate disasters — droughts, floods, forest fires — and a call for global peace and solidarity.",
    color: "#6b7280",
  },
  {
    roman: "X",
    name: "Solidarité",
    translation: "Solidarity",
    perf: "A hooded figure riding a mechanical silver horse at 25 km/h down the Seine, spreading dove wings.",
    sig: "Represented both Joan of Arc and Sequana, the Gallo-Roman goddess of the Seine. The steampunk design nodded to Les Machines de l'île in Nantes. Referenced Pierre de Coubertin and Olympic history.",
    color: "#c0c0c0",
  },
  {
    roman: "XI",
    name: "Solennité",
    translation: "Solemnity",
    perf: "Olympic Laurels awarded to Filippo Grandi (UN High Commissioner for Refugees); President Macron declared the Games open.",
    sig: "The formal protocolar segment. The final torch relay featured Rafael Nadal, Carl Lewis, Serena Williams, and Nadia Comăneci on the Seine, culminating with Teddy Riner and Marie-José Pérec lighting the cauldron.",
    color: "#f0c040",
  },
  {
    roman: "XII",
    name: "Éternité",
    translation: "Eternity",
    perf: "Céline Dion singing Édith Piaf's \"Hymne à l'amour\" from the Eiffel Tower.",
    sig: "The emotional epilogue. Dion's return after her stiff-person syndrome diagnosis was universally praised as the most powerful moment of the ceremony.",
    color: "#f0c040",
  },
];

function ActsSection() {
  return (
    <section id="acts" className="py-32" style={{ background: "linear-gradient(to bottom, #0a0e1a 0%, #0d1228 50%, #0a0e1a 100%)" }}>
      <div className="container">
        <div className="fade-up mb-16 text-center">
          <p className="section-label mb-3">II — The Twelve Acts</p>
          <h2 className="display-heading mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Scenes from <span className="text-gold italic">French History</span>
          </h2>
          <div className="gold-rule mx-auto mb-6" />
          <p className="text-white/55 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>
            The ceremony's twelve acts — named after French Republican values and cultural concepts — wove together classical art, modern pop culture, and historical milestones along the Seine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {ACTS.map((act) => (
            <div key={act.roman} className="glass-card act-card p-6 relative overflow-hidden">
              {/* Roman numeral background */}
              <div className="absolute top-2 right-4 select-none pointer-events-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 700, color: act.color, opacity: 0.07, lineHeight: 1 }}>
                {act.roman}
              </div>
              <div className="relative z-10">
                <div className="flex items-baseline gap-3 mb-3">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: act.color, letterSpacing: "0.1em" }}>
                    ACT {act.roman}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `${act.color}30` }} />
                </div>
                <h3 className="display-heading mb-1" style={{ fontSize: "1.4rem", color: "#fff" }}>{act.name}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: act.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
                  {act.translation}
                </p>
                <p className="text-white/60 mb-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", lineHeight: 1.65, fontWeight: 400 }}>
                  <span className="text-white/40 text-xs uppercase tracking-wider">Performance: </span>{act.perf}
                </p>
                <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.65, fontWeight: 300 }}>
                  <span className="text-white/35 text-xs uppercase tracking-wider">Significance: </span>{act.sig}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Closing Ceremony Section ─────────────────────────────────────────────────
function ClosingSection() {
  return (
    <section id="closing" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(240,192,64,0.04) 0%, transparent 70%)" }} />
      <div className="container">
        <div className="fade-up mb-20">
          <p className="section-label mb-3">III — The Closing</p>
          <h2 className="display-heading mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            "Records" — The Games<br />
            <span className="text-gold italic">Disappear &amp; Return</span>
          </h2>
          <div className="gold-rule mb-6" />
          <p className="text-white/65 max-w-2xl" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
            The Closing Ceremony, titled "Records," took place on August 11, 2024, at the Stade de France. Also directed by Thomas Jolly, the event imagined a dystopian future where the Olympic Games had disappeared and were rediscovered — paying homage to French baron Pierre de Coubertin, who revived the modern Olympics.
          </p>
        </div>

        {/* Image + description */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="fade-up order-2 md:order-1">
            <div className="mb-8">
              <h3 className="display-heading mb-3" style={{ fontSize: "1.6rem" }}>The Golden Voyager</h3>
              <p className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 300 }}>
                The central artistic segment featured the "Golden Voyager," a golden-winged humanoid alien portrayed by dancer Arthur Cadre. Inspired by the Voyager Golden Record (a French-made artifact sent into space) and the "spirit of the Bastille," the character descended onto a stage shaped like a planisphere. Together with the masked torchbearer and the horsewoman from the Opening Ceremony, the Golden Voyager mimed an archaeological excavation — unearthing a replica of the <em>Winged Victory of Samothrace</em> and the five Olympic rings, symbolizing the revival of the Olympic spirit.
              </p>
            </div>
            <div>
              <h3 className="display-heading mb-3" style={{ fontSize: "1.6rem" }}>The Finale: "My Way"</h3>
              <p className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 300 }}>
                French singer Yseult performed Frank Sinatra's "My Way" — itself adapted to English by Paul Anka from the French song "Comme d'habitude" by Claude François — bringing the Games to a poetic, full-circle close. A spectacular fireworks display from the Stade de France roof followed.
              </p>
            </div>
          </div>
          <div className="fade-up order-1 md:order-2">
            <div className="relative overflow-hidden rounded-sm" style={{ border: "1px solid rgba(240,192,64,0.2)" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663375659687/adZ8ed6MMkFAwXrUccjYXT/closing_ceremony-ZU5wQ7JET5zMid2rpF2p5a.webp"
                alt="Paris 2024 Closing Ceremony at Stade de France"
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.5) 0%, transparent 60%)" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                  AUGUST 11, 2024 · STADE DE FRANCE, SAINT-DENIS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LA28 Handover */}
        <div className="fade-up mb-8">
          <p className="section-label mb-4">The LA28 Handover</p>
        </div>
        <div className="glass-card p-8 mb-8 fade-up" style={{ borderColor: "rgba(240,192,64,0.25)" }}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="display-heading mb-4" style={{ fontSize: "1.5rem" }}>Tom Cruise &amp; the Olympic Flag</h3>
              <p className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.8, fontWeight: 300 }}>
                Paris Mayor Anne Hidalgo passed the Olympic flag to IOC President Thomas Bach, who handed it to Los Angeles Mayor Karen Bass — the first Black female mayor to receive the Olympic flag — and American gymnast Simone Biles. Actor Tom Cruise then abseiled from the Stade de France roof to the <em>Mission: Impossible</em> theme, took the flag, and rode out on a motorcycle. A pre-recorded segment showed Cruise skydiving into the Hollywood Hills, transforming the Hollywood Sign to include the Olympic rings.
              </p>
            </div>
            <div>
              <h3 className="display-heading mb-4" style={{ fontSize: "1.5rem" }}>Long Beach Performances</h3>
              <p className="text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.8, fontWeight: 300 }}>
                The ceremony concluded with a broadcast from Long Beach, California, featuring the Red Hot Chili Peppers ("Can't Stop"), Billie Eilish with her brother Finneas O'Connell ("Birds of a Feather"), and Snoop Dogg and Dr. Dre ("The Next Episode"). The segment was widely praised for showcasing the cultural and entertainment power of Los Angeles, the 2028 host city.
              </p>
            </div>
          </div>
        </div>

        {/* Concert performers grid */}
        <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Phoenix & Air", role: "French bands — concert segment" },
            { name: "Red Hot Chili Peppers", role: "LA28 handover — Long Beach" },
            { name: "Billie Eilish", role: "LA28 handover — Long Beach" },
            { name: "Snoop Dogg & Dr. Dre", role: "LA28 handover — Long Beach" },
          ].map((p) => (
            <div key={p.name} className="glass-card p-5 text-center act-card">
              <p className="display-heading mb-1" style={{ fontSize: "1rem", color: "#fff" }}>{p.name}</p>
              <p className="text-white/40" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", lineHeight: 1.5 }}>{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mascot Section ───────────────────────────────────────────────────────────
function MascotSection() {
  return (
    <section id="mascot" className="py-32 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #0a0e1a 0%, #0e1530 50%, #0a0e1a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(237,41,57,0.06) 0%, transparent 60%)" }} />
      <div className="container">
        <div className="fade-up mb-16 text-center">
          <p className="section-label mb-3">IV — The Mascot</p>
          <h2 className="display-heading mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            The Phryges &amp; the<br />
            <span className="text-gold italic">Symbolism of Liberty</span>
          </h2>
          <div className="gold-rule mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="fade-up flex justify-center">
            <div className="relative" style={{ maxWidth: "380px" }}>
              <div className="absolute -inset-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(237,41,57,0.15) 0%, transparent 70%)" }} />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663375659687/adZ8ed6MMkFAwXrUccjYXT/phryge_mascot-mshuPsoPXib9A3wdJmcaM5.webp"
                alt="Paris 2024 Phryge mascot"
                className="relative z-10 w-full object-contain"
                style={{ filter: "drop-shadow(0 20px 60px rgba(237,41,57,0.3))" }}
              />
            </div>
          </div>
          <div className="fade-up">
            <h3 className="display-heading mb-4" style={{ fontSize: "1.8rem" }}>What is the Phryge?</h3>
            <p className="text-white/65 mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>
              Unlike traditional Olympic mascots — typically animals native to the host country — the Paris 2024 mascots were the "Phryges" (pronounced FREE-juh). They are anthropomorphic representations of the Phrygian cap, a soft, conical red hat that serves as a potent symbol of liberty and the French Republic.
            </p>
            <p className="text-white/65 mb-5" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>
              The Phrygian cap has ancient origins, worn by freed slaves in the Roman Empire and by the Phrygians of central Anatolia. It gained its most profound political significance during the French Revolution (1789–1799), where it was adopted by the working-class <em>sans-culottes</em> as a symbol of freedom from tyranny and monarchy.
            </p>
            <p className="text-white/65" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>
              Today, the cap is worn by Marianne — the national personification of the French Republic — whose profile is integrated into the Paris 2024 Olympic logo. It appears on French coins, stamps, and in iconic artworks such as Eugène Delacroix's <em>Liberty Leading the People</em>.
            </p>
          </div>
        </div>

        {/* Design & Reception cards */}
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          <div className="glass-card act-card p-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(237,41,57,0.15)", border: "1px solid rgba(237,41,57,0.3)" }}>
              <span style={{ color: "#ED2939", fontSize: "1.2rem" }}>🎨</span>
            </div>
            <h3 className="display-heading mb-3" style={{ fontSize: "1.25rem" }}>Design</h3>
            <p className="text-white/55" style={{ fontFamily: "var(--font-body)", fontSize: "0.87rem", lineHeight: 1.75, fontWeight: 300 }}>
              The Olympic and Paralympic Phryges were designed as two red, triangular caps with large expressive eyes adorned with tricolor ribbons (cockades) representing the French flag. The Paralympic Phryge was notably designed with a visible running prosthesis, sending a powerful message of inclusion.
            </p>
          </div>
          <div className="glass-card act-card p-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(240,192,64,0.1)", border: "1px solid rgba(240,192,64,0.25)" }}>
              <span style={{ color: "#f0c040", fontSize: "1.2rem" }}>🏛️</span>
            </div>
            <h3 className="display-heading mb-3" style={{ fontSize: "1.25rem" }}>Historical Roots</h3>
            <p className="text-white/55" style={{ fontFamily: "var(--font-body)", fontSize: "0.87rem", lineHeight: 1.75, fontWeight: 300 }}>
              The Phrygian cap appears in Delacroix's <em>Liberty Leading the People</em> (1830), on the French Marianne, on the national seal, and on French euro coins. By choosing the cap as mascot, Paris 2024 embedded the ideals of Liberté, Égalité, Fraternité directly into the Games' identity.
            </p>
          </div>
          <div className="glass-card act-card p-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(126,184,247,0.1)", border: "1px solid rgba(126,184,247,0.25)" }}>
              <span style={{ color: "#7eb8f7", fontSize: "1.2rem" }}>💬</span>
            </div>
            <h3 className="display-heading mb-3" style={{ fontSize: "1.25rem" }}>Reception</h3>
            <p className="text-white/55" style={{ fontFamily: "var(--font-body)", fontSize: "0.87rem", lineHeight: 1.75, fontWeight: 300 }}>
              The mascot's reception was mixed internationally — some likened its shape to a tongue or the poop emoji, while in France it was affectionately nicknamed <em>les clitos nationales</em>. Despite the jokes, over 1.3 million plush toys were sold, and the mascot successfully highlighted France's revolutionary history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Conclusion Section ───────────────────────────────────────────────────────
function ConclusionSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663375659687/adZ8ed6MMkFAwXrUccjYXT/paris_hero-J2tyGhzJwtBZrowdSpAnap.webp"
          alt="Paris at night"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(0.6)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a0e1a 0%, rgba(10,14,26,0.7) 40%, rgba(10,14,26,0.7) 60%, #0a0e1a 100%)" }} />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-up">
          <p className="section-label mb-4">Conclusion</p>
          <h2 className="display-heading mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            A Masterclass in<br />
            <span className="text-gold italic">Cultural Storytelling</span>
          </h2>
          <div className="gold-rule mx-auto mb-8" />
          <p className="text-white/65 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.9, fontWeight: 300 }}>
            The 2024 Paris Olympics ceremonies and branding were a masterclass in cultural storytelling. By eschewing the safety of a stadium for the Opening Ceremony, Paris transformed its very streets, river, and monuments into a living theater. The events boldly celebrated French history — from the bloody legacy of the Revolution to the pioneering achievements in cinema, aviation, and fashion — while unapologetically embracing modern values of diversity and inclusion.
          </p>
          <p className="text-white/55" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.9, fontWeight: 300 }}>
            Through the Phryge mascot, the mysterious torchbearer, and the intricate artistic tableaux, Paris 2024 delivered a complex, deeply layered narrative that honored its past while looking toward the future — and toward Los Angeles 2028.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── References Section ───────────────────────────────────────────────────────
function ReferencesSection() {
  const refs = [
    { num: 1, title: "2024 Summer Olympics opening ceremony", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/2024_Summer_Olympics_opening_ceremony" },
    { num: 2, title: "The Paris Olympics Opening Ceremony Was an Art-Filled Extravaganza", source: "Artnet News, July 26, 2024", url: "https://news.artnet.com/art-world/paris-olympics-opening-ceremony-mona-lisa-2517224" },
    { num: 3, title: "Historical References You May Have Missed During the Paris 2024 Opening Ceremony", source: "The Paris Palette, July 28, 2024", url: "https://parispalette.substack.com/p/historical-references-you-may-have" },
    { num: 4, title: "Paris Olympics opening ceremony inspired by Dutch painting, not 'The Last Supper'", source: "Artsy, July 30, 2024", url: "https://www.artsy.net/article/artsy-editorial-paris-olympics-opening-ceremony-inspired-dutch-painting-the-supper" },
    { num: 5, title: "2024 Summer Olympics closing ceremony", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/2024_Summer_Olympics_closing_ceremony" },
    { num: 6, title: "Phryges", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Phryges" },
    { num: 7, title: "Phryge, the friendly Paris Olympics 2024 mascot, and the real meaning of red liberty caps", source: "The Conversation, August 8, 2024", url: "https://theconversation.com/phryge-the-friendly-paris-olympics-2024-mascot-and-the-real-meaning-of-red-liberty-caps-236212" },
  ];
  return (
    <section id="references" className="py-24" style={{ background: "#080c18", borderTop: "1px solid rgba(240,192,64,0.1)" }}>
      <div className="container">
        <div className="fade-up mb-12">
          <p className="section-label mb-3">Sources</p>
          <h2 className="display-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>References</h2>
        </div>
        <div className="stagger-children space-y-4">
          {refs.map((r) => (
            <div key={r.num} className="flex gap-5 items-start py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", minWidth: "28px", paddingTop: "2px" }}>[{r.num}]</span>
              <div>
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#f0c040] transition-colors gold-underline"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500 }}>
                  {r.title}
                </a>
                <p className="text-white/35 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem" }}>{r.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Pull Quote ---
function PullQuote() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1228 0%, #111830 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(240,192,64,0.05) 0%, transparent 70%)" }} />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-up">
          <div className="text-6xl mb-6" style={{ color: "var(--gold)", fontFamily: "var(--font-display)", lineHeight: 1, opacity: 0.4 }}>"</div>
          <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 600, color: "#fff", lineHeight: 1.5, fontStyle: "italic" }}>
            Paris has thrown away the rule book. For the first time in modern Olympic history, the city itself became the stage.
          </blockquote>
          <div className="gold-rule mx-auto mt-8 mb-4" />
          <p className="text-white/40" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Thomas Jolly, Artistic Director &mdash; Paris 2024
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Key Figures Section ---
function KeyFiguresSection() {
  const figures = [
    { name: "Thomas Jolly", role: "Artistic Director", desc: "Theatre director who conceived the entire artistic programme of both ceremonies, structuring the opening around 12 acts of French history and culture." },
    { name: "Lady Gaga", role: "Opening — Act I", desc: "Performed a tribute to French cabaret icon Zizi Jeanmaire with Mon truc en plumes on a golden staircase beside the Seine." },
    { name: "Gojira", role: "Opening — Act III", desc: "The first metal band to perform at an Olympic opening ceremony, playing the French Revolution anthem Ah! ca ira at the historic Conciergerie." },
    { name: "Aya Nakamura", role: "Opening — Act IV", desc: "The most-streamed French-language artist in the world, performing in front of the Institut de France with the Republican Guard." },
    { name: "Celine Dion", role: "Opening — Epilogue", desc: "Sang Edith Piaf's Hymne a l'amour from the Eiffel Tower in her first performance since her stiff-person syndrome diagnosis." },
    { name: "Tom Cruise", role: "Closing — LA28 Handover", desc: "Abseiled from the Stade de France roof, took the Olympic flag on a motorcycle, then skydived into the Hollywood Hills in a pre-recorded segment." },
    { name: "Teddy Riner & Marie-Jose Perec", role: "Olympic Cauldron", desc: "French Olympic champions who together lit the revolutionary hot-air balloon cauldron in the Tuileries Garden." },
    { name: "Simone Biles", role: "Closing — Flag Bearer", desc: "American gymnastics legend who carried the Olympic flag during the LA28 handover ceremony alongside LA Mayor Karen Bass." },
  ];
  return (
    <section className="py-24" style={{ background: "#0a0e1a" }}>
      <div className="container">
        <div className="fade-up mb-12">
          <p className="section-label mb-3">Key Figures</p>
          <h2 className="display-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            People Who Shaped<br /><span className="text-gold italic">the Games</span>
          </h2>
          <div className="gold-rule mt-5" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {figures.map((fig) => (
            <div key={fig.name} className="glass-card act-card p-6">
              <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center" style={{ background: "rgba(240,192,64,0.1)", border: "1px solid rgba(240,192,64,0.2)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--gold)", fontSize: "1rem" }}>
                  {fig.name.charAt(0)}
                </span>
              </div>
              <h3 className="display-heading mb-1" style={{ fontSize: "1.05rem", color: "#fff" }}>{fig.name}</h3>
              <p className="section-label mb-3" style={{ fontSize: "0.65rem" }}>{fig.role}</p>
              <p className="text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.65, fontWeight: 300 }}>{fig.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 text-center" style={{ background: "#060810", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--gold)", marginBottom: "6px" }}>
        Paris 2024 Olympics — A Cultural &amp; Artistic Analysis
      </p>
      <p className="text-white/25" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
        Research compiled from 7 sources · July–August 2024
      </p>
    </footer>
  );
}

// ─── Main Home ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <CourseHeader />
      <Nav />
      <Hero />
      <OpeningSection />
      <PullQuote />
      <KeyFiguresSection />
      <ActsSection />
      <ClosingSection />
      <MascotSection />
      <ConclusionSection />
      <ReferencesSection />
      <Footer />
    </div>
  );
}
