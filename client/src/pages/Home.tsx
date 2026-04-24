import { useEffect, useRef, useState } from "react";

// ─── Image URLs (all uploaded to CDN) ───────────────────────────────────────
const IMG = {
  hero:          "/manus-storage/photo_opening_hero_ff7c075f.jpg",
  seinePanorama: "/manus-storage/photo_seine_aerial_20ead94c.jpg",
  seineBoats:    "/manus-storage/photo_seine_boats_2777e530.jpg",
  seineBoats2:   "/manus-storage/photo_seine_boats2_0bfd0c6b.jpg",
  performers:    "/manus-storage/photo_performers_bc77fb9a.jpg",
  gojira:        "/manus-storage/photo_gojira_b22665cb.jpg",
  marieAnt:      "/manus-storage/photo_marie_antoinette_fec79f4b.jpg",
  cauldron:      "/manus-storage/photo_cauldron_170fd456.jpg",
  cauldron2:     "/manus-storage/photo_cauldron2_21b8b3cd.jpg",
  celineEiffel:  "/manus-storage/photo_celine_eiffel_28f6ff18.jpg",
  celine2:       "/manus-storage/photo_celine2_efdef2df.jpg",
  tomCruise:     "/manus-storage/photo_tom_cruise_98bea5d0.jpg",
  billie:        "/manus-storage/photo_closing_billie_d81c7d84.jpg",
  snoop:         "/manus-storage/photo_closing_snoop_900f33b7.jpg",
  phryge:        "/manus-storage/photo_phryge_official_d426d1c0.jpg",
  phryge2:       "/manus-storage/photo_phryge2_d70c1d39.jpg",
  ceremony:      "/manus-storage/photo_ceremony_moments_cc0e3a67.jpg",
  ladyGaga:      "/manus-storage/photo_lady_gaga_celine_b4e0f847.jpg",
};

// ─── Scroll animation hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            // for stagger children
            e.target.querySelectorAll(":scope > *").forEach((child) => {
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up, .fade-in, .stagger-children").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// ─── The 12 Acts data ────────────────────────────────────────────────────────
const ACTS = [
  {
    num: "I",
    title: "Enchanté",
    location: "Pont d'Iéna",
    color: "#c8973a",
    summary: "Lady Gaga opens the Games with a tribute to French cabaret and the vedette tradition.",
    detail: "Dressed in a black feathered costume, Lady Gaga performed Zizi Jeanmaire's 1961 hit 'Mon truc en plumes' — a tribute to the French vedette tradition and the golden age of Parisian cabaret. Moulin Rouge dancers then performed the iconic can-can from Offenbach's Orpheus in the Underworld, setting the tone for a ceremony rooted in French cultural heritage.",
    figures: ["Lady Gaga", "Zizi Jeanmaire", "Jacques Offenbach"],
  },
  {
    num: "II",
    title: "Synchronicité",
    location: "Pont de Bir-Hakeim",
    color: "#1a2d5a",
    summary: "A dance tribute to the artisans rebuilding Notre-Dame Cathedral.",
    detail: "Dancers performed to a soundscape built from the hammering and sawing of Notre-Dame's reconstruction. The 2019 fire that nearly destroyed the cathedral had become a symbol of French resilience; this act honored the thousands of craftspeople — carpenters, stonemasons, glassworkers — who labored to restore the 850-year-old Gothic masterpiece.",
    figures: ["Notre-Dame Cathedral", "French artisans"],
  },
  {
    num: "III",
    title: "Liberté",
    location: "Conciergerie",
    color: "#ED2939",
    summary: "Gojira performs the French Revolution anthem at the prison where Marie Antoinette was held.",
    detail: "French metal band Gojira, joined by opera singer Marina Viotti, performed a thunderous rendition of 'Ah! Ca Ira' — the revolutionary anthem — from the Conciergerie, the very prison where Marie Antoinette awaited execution. A performer portraying the queen's severed, singing head emerged from a window, surrounded by explosions of blood-red streamers. The act referenced the French concept of laicite — the separation of church and state — and sparked worldwide controversy.",
    figures: ["Gojira", "Marina Viotti", "Marie Antoinette", "Joe Duplantier"],
  },
  {
    num: "IV",
    title: "Égalité",
    location: "Pont au Change",
    color: "#0d1a3a",
    summary: "Aya Nakamura performs with the Republican Guard on the Pont des Arts.",
    detail: "Aya Nakamura — the most-streamed French-language artist in the world — performed her hits 'Djadja' and 'Pookie' alongside the Republican Guard's brass orchestra on the Pont des Arts. The choice was deliberately provocative: Nakamura, a French-Malian singer, had faced racist attacks from far-right groups who objected to her inclusion. Her performance became one of the most celebrated moments of the entire ceremony.",
    figures: ["Aya Nakamura", "Republican Guard"],
  },
  {
    num: "V",
    title: "Fraternité",
    location: "Pont du Carrousel",
    color: "#c8973a",
    summary: "The Mona Lisa is 'stolen' by the Minions; giant Louvre masterpieces line the Seine.",
    detail: "In a playful sequence, the Minions (from French animation studio Illumination) appeared to steal the Mona Lisa — a reference to the real 1911 theft by Vincenzo Peruggia. Giant reproductions of Louvre masterpieces lined the riverbanks, including Delacroix's Liberty Leading the People, Gericault's Raft of the Medusa, and Marie-Guillemine Benoist's Portrait of Madeleine. Tributes were paid to the Lumiere brothers and Georges Melies, whose 1902 film Le Voyage dans la Lune pioneered cinema.",
    figures: ["Leonardo da Vinci", "Eugene Delacroix", "Theodore Gericault", "Marie-Guillemine Benoist", "Georges Melies", "Lumiere brothers"],
  },
  {
    num: "VI",
    title: "Sororité",
    location: "Pont des Arts",
    color: "#1a2d5a",
    summary: "Ten golden female figures emerge from the Louvre in a tribute to French womanhood.",
    detail: "Ten enormous golden female figures, inspired by paintings in the Louvre's collection, emerged from the museum's facade and processed along the Seine. The sequence celebrated French women across history — from mythological goddesses to revolutionary heroines — and referenced the 2024 Games' commitment to full gender parity among athletes.",
    figures: ["Marie-Guillemine Benoist", "Georges de La Tour"],
  },
  {
    num: "VII",
    title: "Festivité",
    location: "Pont Neuf",
    color: "#ED2939",
    summary: "A tableau vivant referencing a 17th-century Dutch painting sparks the 'Last Supper' controversy.",
    detail: "A long banquet table was set on a stage, populated by drag performers and a figure representing Dionysus. The scene was inspired by Jan van Bijlert's 1640 painting 'The Feast of the Gods' — though many viewers interpreted it as a parody of Leonardo da Vinci's 'The Last Supper.' Artistic director Thomas Jolly denied any Christian reference, stating the tableau celebrated 'the gods of Olympus.' The controversy drew condemnation from religious groups and praise from LGBTQ+ advocates worldwide.",
    figures: ["Jan van Bijlert", "Thomas Jolly", "Dionysus"],
  },
  {
    num: "VIII",
    title: "Solidarité",
    location: "Pont de la Concorde",
    color: "#0d1a3a",
    summary: "A tribute to Paralympic athletes and the spirit of inclusion.",
    detail: "Dancers with and without disabilities performed together in a sequence celebrating the Paralympic movement. The Phryge Paralympic mascot — wearing a running prosthesis — appeared prominently, reinforcing the Games' message of radical inclusion. The sequence was choreographed by disabled artists and drew a standing ovation from the crowd.",
    figures: ["Phryge Paralympic mascot"],
  },
  {
    num: "IX",
    title: "Naturalité",
    location: "Pont de l'Alma",
    color: "#c8973a",
    summary: "A tribute to the natural world and France's ecological heritage.",
    detail: "Performers in elaborate costumes representing France's diverse ecosystems — forests, mountains, coastlines — danced across the bridges. The sequence was a nod to the Olympic movement's growing commitment to environmental sustainability, and to France's tradition of landscape painting from Corot to Monet.",
    figures: ["Jean-Baptiste-Camille Corot", "Claude Monet"],
  },
  {
    num: "X",
    title: "Universalité",
    location: "Pont des Invalides",
    color: "#1a2d5a",
    summary: "Soprano Axelle Saint-Cirel sings La Marseillaise from the Grand Palais roof.",
    detail: "Soprano Axelle Saint-Cirel, draped in the Tricolore and embodying the Black personification of Marianne — the allegorical figure of the French Republic — sang a soaring rendition of La Marseillaise from the roof of the Grand Palais. The choice of a young Black woman to embody France's national symbol was widely praised as a statement about modern French identity.",
    figures: ["Axelle Saint-Cirel", "Marianne"],
  },
  {
    num: "XI",
    title: "Élévation",
    location: "Pont Alexandre III",
    color: "#ED2939",
    summary: "The Olympic flame ascends in a hot-air balloon honoring the Montgolfier brothers.",
    detail: "The Olympic cauldron — designed as a hot-air balloon — was lit by French Olympic legends Marie-Jose Perec (triple gold medalist, Atlanta 1996) and Teddy Riner (three-time Olympic judo champion). The balloon then ascended over Paris, referencing the Montgolfier brothers' first manned flight in 1783. Paris 2024 organizing committee president Tony Estanguet described the choice of a man and a woman as 'an obvious choice for the first parity Games.'",
    figures: ["Marie-Jose Perec", "Teddy Riner", "Montgolfier brothers", "Tony Estanguet"],
  },
  {
    num: "XII",
    title: "Festivité",
    location: "Trocadero / Eiffel Tower",
    color: "#0d1a3a",
    summary: "Celine Dion closes the ceremony with Piaf's 'L'Hymne a l'amour' from the Eiffel Tower.",
    detail: "In the most emotionally charged moment of the evening, Celine Dion — making her first public performance since her 2022 diagnosis with stiff-person syndrome — sang Edith Piaf's 'L'Hymne a l'amour' from the first level of the Eiffel Tower, as the cauldron balloon glowed in the distance. Dion later said: 'I'm honored to have performed tonight, for the Paris 2024 Opening Ceremony, and so full of joy to be back in one of my very favorite cities.'",
    figures: ["Celine Dion", "Edith Piaf"],
  },
];

// ─── Medal data ──────────────────────────────────────────────────────────────
const MEDALS = [
  { country: "USA", flag: "🇺🇸", gold: 40, silver: 44, bronze: 42, total: 126 },
  { country: "China", flag: "🇨🇳", gold: 40, silver: 27, bronze: 24, total: 91 },
  { country: "Great Britain", flag: "🇬🇧", gold: 20, silver: 12, bronze: 13, total: 45 },
  { country: "Australia", flag: "🇦🇺", gold: 18, silver: 19, bronze: 16, total: 53 },
  { country: "France", flag: "🇫🇷", gold: 16, silver: 26, bronze: 22, total: 64 },
  { country: "Netherlands", flag: "🇳🇱", gold: 15, silver: 7, bronze: 12, total: 34 },
  { country: "South Korea", flag: "🇰🇷", gold: 13, silver: 9, bronze: 10, total: 32 },
  { country: "Japan", flag: "🇯🇵", gold: 20, silver: 12, bronze: 13, total: 45 },
];

// ─── Journalist interviews / quotes ─────────────────────────────────────────
const INTERVIEWS = [
  {
    speaker: "Joe Duplantier",
    role: "Frontman, Gojira",
    source: "Rolling Stone, July 29, 2024",
    quote: "It's none of that. It's French history. It's French charm, you know — beheaded people, red wine, and blood all over the place. It's romantic, it's normal. There's nothing satanic. France is a country that made a separation between the state and religion during the revolution. We call it laicite. It's all about history and facts.",
    context: "Responding to accusations that Gojira's Marie Antoinette performance was 'satanic'",
    color: "#ED2939",
  },
  {
    speaker: "Thomas Jolly",
    role: "Artistic Director, Paris 2024 Ceremonies",
    source: "Vogue, May 30, 2024",
    quote: "The river's namesake Gallo-Roman goddess was my muse. The Seine is not just a river — it is the spine of Paris, the artery through which French history flows. I wanted the world to experience Paris not as a postcard, but as a living, breathing civilization.",
    context: "On the decision to stage the ceremony on the Seine",
    color: "#0d1a3a",
  },
  {
    speaker: "Thomas Jolly",
    role: "Artistic Director, Paris 2024 Ceremonies",
    source: "Press Conference, July 28, 2024",
    quote: "There is Dionysus who arrives on this table. He is there to celebrate the joy of being together. I wanted to celebrate community, tolerance, diversity. There was never any intention to mock or disrespect any religion.",
    context: "Responding to the 'Last Supper' controversy",
    color: "#0d1a3a",
  },
  {
    speaker: "Celine Dion",
    role: "Singer",
    source: "Official Statement, July 26, 2024",
    quote: "I'm honored to have performed tonight, for the Paris 2024 Opening Ceremony, and so full of joy to be back in one of my very favorite cities! When love is in your heart, anything is possible.",
    context: "After her first public performance since her stiff-person syndrome diagnosis",
    color: "#c8973a",
  },
  {
    speaker: "Patrick Boucheron",
    role: "Historian, Creative Consultant",
    source: "Press Conference, July 27, 2024",
    quote: "There is one message: yes, despite everything, we can still live together. The ceremony was not a museum piece — it was a living argument for coexistence, made in the most beautiful city in the world.",
    context: "On the ceremony's overarching meaning",
    color: "#1a2d5a",
  },
  {
    speaker: "Tony Estanguet",
    role: "President, Paris 2024 Organizing Committee",
    source: "Reuters, July 26, 2024",
    quote: "A man and a woman for the first parity Games was an obvious choice. I waited this morning to tell them. It was a secret kept until the very last moment.",
    context: "On the choice of Marie-Jose Perec and Teddy Riner to light the cauldron",
    color: "#c8973a",
  },
  {
    speaker: "Matthew Gin",
    role: "Assistant Professor of Architectural History, UNC Charlotte",
    source: "Journal18, September 3, 2024",
    quote: "The artifice was revealed — a reminder that pageants do not magically appear but rather are willed into existence by people who work largely unseen and unacknowledged. The monarchy is long gone, but its ceremonial trappings continue to be repurposed and reimaged to new ends.",
    context: "Observing workers dismantling the ceremony set the morning after",
    color: "#1a2d5a",
  },
  {
    speaker: "Emily Carter",
    role: "Music Journalist, Kerrang!",
    source: "Kerrang!, July 30, 2024",
    quote: "Gojira became the first heavy metal band to perform at an Olympic Games opening ceremony — and they did so with a performance that was simultaneously historically grounded, visually spectacular, and genuinely dangerous-feeling. It was a watershed moment for metal's cultural legitimacy.",
    context: "Reviewing Gojira's historic Olympic performance",
    color: "#ED2939",
  },
];

// ─── References ──────────────────────────────────────────────────────────────
const REFERENCES = [
  {
    num: 1,
    authors: "Wikipedia contributors",
    title: "2024 Summer Olympics opening ceremony",
    outlet: "Wikipedia",
    date: "2024",
    url: "https://en.wikipedia.org/wiki/2024_Summer_Olympics_opening_ceremony",
  },
  {
    num: 2,
    authors: "Wikipedia contributors",
    title: "2024 Summer Olympics closing ceremony",
    outlet: "Wikipedia",
    date: "2024",
    url: "https://en.wikipedia.org/wiki/2024_Summer_Olympics_closing_ceremony",
  },
  {
    num: 3,
    authors: "Wikipedia contributors",
    title: "Phryges (mascots)",
    outlet: "Wikipedia",
    date: "2024",
    url: "https://en.wikipedia.org/wiki/Phryges",
  },
  {
    num: 4,
    authors: "Carter, Emily",
    title: "Gojira respond to the 'satanic' comments made about their Olympics opening ceremony performance",
    outlet: "Kerrang!",
    date: "July 30, 2024",
    url: "https://www.kerrang.com/gojira-respond-to-the-satanic-comments-made-about-their-olympics-opening-ceremony-performance",
  },
  {
    num: 5,
    authors: "Gin, Matthew",
    title: "Liberte, Egalite, Festivite: The Opening Ceremony of the 2024 Paris Olympics",
    outlet: "Journal18: A Journal of Eighteenth-Century Art and Culture",
    date: "September 3, 2024",
    url: "https://www.journal18.org/nq/liberte-egalite-festivite-the-opening-ceremony-of-the-2024-paris-olympics-by-matthew-gin/",
  },
  {
    num: 6,
    authors: "Wood, Gaby",
    title: "Thomas Jolly is Masterminding the Most Complex Olympics Opening Ceremony of All Time",
    outlet: "Vogue",
    date: "May 30, 2024",
    url: "https://www.vogue.com/article/thomas-jolly-profile-paris-olympics-opening-ceremony",
  },
  {
    num: 7,
    authors: "Adamson, Thomas",
    title: "Drag queens shine at Olympics opening, but 'Last Supper' tableau draws criticism",
    outlet: "Associated Press",
    date: "July 27, 2024",
    url: "https://apnews.com/article/olympics-2024-drag-queens-opening-ceremony-c635aa276be1147e4643231bdbe5478e",
  },
  {
    num: 8,
    authors: "Zhuang, Yan",
    title: "An Olympics Scene Draws Scorn. Did It Really Parody 'The Last Supper'?",
    outlet: "The New York Times",
    date: "July 28, 2024",
    url: "https://www.nytimes.com/2024/07/28/sports/olympics-opening-ceremony-last-supper-paris.html",
  },
  {
    num: 9,
    authors: "Porter, Catherine",
    title: "Olympic Ceremony Put a Changing France on Full Display",
    outlet: "The New York Times",
    date: "July 29, 2024",
    url: "https://www.nytimes.com/2024/07/29/world/olympics/olympic-ceremony-france-singer-aya-nakamura.html",
  },
  {
    num: 10,
    authors: "Chemin, Ariane and Nouchi, Franck",
    title: "Paris Olympics opening ceremony's writers: 'If it's only there to produce ephemeral glitz, what's the point?'",
    outlet: "Le Monde",
    date: "July 16, 2024",
    url: "https://www.lemonde.fr/en/sports/article/2024/07/16/paris-olympics-opening-ceremony-s-writers-if-it-s-only-there-to-produce-ephemeral-glitz-what-s-the-point_6686013_9.html",
  },
  {
    num: 11,
    authors: "The Conversation",
    title: "Phryge, the friendly Paris Olympics 2024 mascot and the real meaning of red liberty caps",
    outlet: "The Conversation",
    date: "2024",
    url: "https://theconversation.com/phryge-the-friendly-paris-olympics-2024-mascot-and-the-real-meaning-of-red-liberty-caps-236212",
  },
  {
    num: 12,
    authors: "Sortiraparis",
    title: "Closing Ceremony Paris 2024: Billie Eilish, Snoop Dogg and the Red Hot Chili Peppers",
    outlet: "Sortiraparis",
    date: "August 11, 2024",
    url: "https://www.sortiraparis.com/en/news/olympic-games-paris-2024/articles/318447-closing-ceremony-jo-paris-2024-billie-eilish-snoop-dogg-and-the-red-hot-chili-peppers",
  },
  {
    num: 13,
    authors: "Reuters",
    title: "French gold medallists Perec and Riner light Olympic cauldron",
    outlet: "Reuters",
    date: "July 26, 2024",
    url: "https://www.reuters.com/sports/olympics/french-gold-medallists-perec-riner-light-olympic-cauldron-2024-07-26/",
  },
  {
    num: 14,
    authors: "Hollywood Reporter",
    title: "Billie Eilish, H.E.R., Snoop Dogg Play 2024 Olympics Closing Ceremony",
    outlet: "The Hollywood Reporter",
    date: "August 11, 2024",
    url: "https://www.hollywoodreporter.com/music/music-news/billie-eilish-her-snoop-dogg-2024-olympics-closing-ceremony-1235971950/",
  },
];

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Opening", href: "#opening" },
    { label: "The 12 Acts", href: "#acts" },
    { label: "Closing", href: "#closing" },
    { label: "Mascot", href: "#mascot" },
    { label: "Interviews", href: "#interviews" },
    { label: "Medals", href: "#medals" },
    { label: "References", href: "#references" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: "38px",
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #e8e4dc" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 2rem",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", letterSpacing: "0.02em" }}>
          Paris 2024
        </span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: scrolled ? "var(--text-dark)" : "#fff",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Course Header Banner ────────────────────────────────────────────────────
function CourseHeader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "var(--navy)",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
        202601_MDFL_201R_01
      </span>
      <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: "var(--gold-light)", fontStyle: "italic", letterSpacing: "0.05em" }}>
        Taste of France
      </span>
      <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>
        Xinyue Fan
      </span>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "6rem",
      }}
    >
      <img
        src={IMG.hero}
        alt="Paris 2024 Olympics Opening Ceremony on the Seine"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,26,58,0.92) 0%, rgba(13,26,58,0.4) 50%, transparent 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 3rem", width: "100%" }}>
        <div className="tricolor-bar" style={{ width: 80, marginBottom: "1.5rem" }} />
        <p className="section-label" style={{ color: "rgba(200,151,58,0.9)", marginBottom: "1rem" }}>Paris 2024 · A Cultural &amp; Artistic Analysis</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: "1.5rem", maxWidth: 800 }}>
          The Games That<br />Turned a City<br />Into a Stage
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", maxWidth: 560, lineHeight: 1.7, fontWeight: 300 }}>
          From the banks of the Seine to the Stade de France, the Paris 2024 Olympic Games staged a sweeping meditation on French history, art, liberty, and the enduring power of human togetherness.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>July 26 — August 11, 2024</span>
          <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>206 Nations · 10,714 Athletes</span>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "206", label: "Nations Competing" },
    { value: "10,714", label: "Athletes" },
    { value: "329", label: "Events" },
    { value: "32", label: "Sports" },
    { value: "12", label: "Ceremony Acts" },
    { value: "6km", label: "Seine Parade Route" },
    { value: "300K", label: "Spectators on the Banks" },
    { value: "1.5B", label: "Global TV Viewers" },
  ];
  return (
    <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
      <div className="container">
        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ padding: "2rem 2.5rem", borderRight: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.5rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Opening Ceremony ────────────────────────────────────────────────────────
function OpeningSection() {
  return (
    <section id="opening" style={{ padding: "8rem 0", background: "#fff" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "5rem" }}>
          <p className="section-label">I. The Opening Ceremony</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--navy)", maxWidth: 700, lineHeight: 1.1 }}>
            July 26, 2024 — The Seine as Stage
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div className="fade-up">
            <p className="body-text" style={{ marginBottom: "1.5rem" }}>
              On the evening of July 26, 2024, Paris staged the most unconventional opening ceremony in Olympic history. For the first time, the parade of nations took place not inside a stadium but on a river — the Seine — as 6,800 athletes aboard 94 boats processed 6 kilometres from the Pont d'Austerlitz to the Trocadero, passing beneath 37 bridges and past the city's most iconic monuments.
            </p>
            <p className="body-text" style={{ marginBottom: "1.5rem" }}>
              Conceived by artistic director <strong>Thomas Jolly</strong> — a 38-year-old theatre director from Normandy — the ceremony was structured into twelve thematic acts, each staged at a different point along the river. Jolly drew on the Gallo-Roman goddess of the Seine as his muse, and enlisted historian <strong>Patrick Boucheron</strong> as a creative consultant to ensure historical depth.
            </p>
            <p className="body-text">
              The ceremony was watched by an estimated <strong>1.5 billion people</strong> worldwide, and by approximately 300,000 spectators on the riverbanks — a figure that itself echoed the great royal festivals staged on the Seine in 1730 and 1739, when the Bourbon monarchy used the river as a theatre of political spectacle.
            </p>
            <div className="quote-block" style={{ marginTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontStyle: "italic", color: "var(--navy)", lineHeight: 1.5 }}>
                "The river's namesake Gallo-Roman goddess was my muse. The Seine is not just a river — it is the spine of Paris, the artery through which French history flows."
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-light)", marginTop: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                — Thomas Jolly, Artistic Director · Vogue, May 2024
              </p>
            </div>
          </div>
          <div className="fade-in">
            <div className="photo-card" style={{ height: 420, marginBottom: "1rem" }}>
              <img src={IMG.seinePanorama} alt="Aerial view of the Seine ceremony" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="photo-card" style={{ height: 200 }}>
                <img src={IMG.seineBoats} alt="Athletes on boats along the Seine" />
              </div>
              <div className="photo-card" style={{ height: 200 }}>
                <img src={IMG.seineBoats2} alt="Ceremony boats on the Seine" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Figures */}
        <div style={{ marginTop: "6rem" }}>
          <div className="fade-up" style={{ marginBottom: "2.5rem" }}>
            <p className="section-label">Key Figures</p>
            <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--navy)" }}>
              The People Who Made History
            </h3>
          </div>
          <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {[
              { name: "Thomas Jolly", role: "Artistic Director", desc: "Theatre director who conceived the entire ceremony as a love letter to French culture, liberty, and diversity." },
              { name: "Lady Gaga", role: "Opening Performer", desc: "Opened the ceremony with a tribute to French cabaret, performing Zizi Jeanmaire's 'Mon truc en plumes'." },
              { name: "Aya Nakamura", role: "Cultural Icon", desc: "The most-streamed French-language artist in the world, she performed with the Republican Guard on the Pont des Arts." },
              { name: "Gojira", role: "Metal Pioneers", desc: "The first heavy metal band to perform at an Olympic opening ceremony, staging a revolutionary act at the Conciergerie." },
              { name: "Axelle Saint-Cirel", role: "Soprano", desc: "Sang La Marseillaise from the Grand Palais roof, embodying Marianne — the Black personification of the French Republic." },
              { name: "Celine Dion", role: "Closing Performer", desc: "Made her triumphant comeback after stiff-person syndrome diagnosis, singing Piaf's 'L'Hymne a l'amour' from the Eiffel Tower." },
              { name: "Marie-Jose Perec", role: "Final Torchbearer", desc: "Triple Olympic gold medalist (Atlanta 1996) who co-lit the cauldron as a symbol of France's greatest athletic legacy." },
              { name: "Teddy Riner", role: "Final Torchbearer", desc: "Three-time Olympic judo champion who co-lit the cauldron alongside Perec, representing gender parity." },
            ].map((f) => (
              <div key={f.name} className="editorial-card" style={{ padding: "1.5rem" }}>
                <div style={{ width: 36, height: 2, background: "var(--gold)", marginBottom: "1rem" }} />
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.25rem" }}>{f.name}</h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{f.role}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-mid)", lineHeight: 1.6, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── The 12 Acts — Interactive Timeline ──────────────────────────────────────
function ActsTimeline() {
  const [activeAct, setActiveAct] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleActClick = (i: number) => {
    setActiveAct(activeAct === i ? null : i);
  };

  return (
    <section id="acts" style={{ padding: "8rem 0", background: "var(--cream)" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <p className="section-label">II. The Artistic Programme</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1 }}>
            The Twelve Acts
          </h2>
          <p className="body-text" style={{ maxWidth: 600, marginTop: "1rem" }}>
            Each act was staged at a different bridge or landmark along the Seine, weaving together French history, art, music, and political philosophy. Click any act to expand its full story.
          </p>
        </div>

        {/* Horizontal scroll timeline */}
        <div
          ref={trackRef}
          className="timeline-track"
          style={{ paddingBottom: "1.5rem" }}
        >
          {ACTS.map((act, i) => (
            <div
              key={act.num}
              className={`timeline-item ${activeAct === i ? "active" : ""}`}
              onClick={() => handleActClick(i)}
              style={{
                flex: activeAct === i ? "0 0 420px" : "0 0 260px",
                marginRight: "1px",
                cursor: "pointer",
                transition: "flex 0.4s ease",
              }}
            >
              <div
                style={{
                  height: activeAct === i ? "auto" : 320,
                  minHeight: 320,
                  background: activeAct === i ? act.color : "#fff",
                  border: `1px solid ${activeAct === i ? act.color : "var(--border-light)"}`,
                  borderRadius: 4,
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.4s ease",
                  boxShadow: activeAct === i ? `0 12px 40px ${act.color}33` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: activeAct === i ? "rgba(255,255,255,0.3)" : "var(--border-light)",
                    lineHeight: 1,
                  }}>
                    {act.num}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: activeAct === i ? "rgba(255,255,255,0.6)" : "var(--text-light)",
                    textAlign: "right",
                    maxWidth: 120,
                  }}>
                    {act.location}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: activeAct === i ? "#fff" : "var(--navy)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}>
                  {act.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.83rem",
                  color: activeAct === i ? "rgba(255,255,255,0.85)" : "var(--text-mid)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  flex: 1,
                }}>
                  {act.summary}
                </p>

                {/* Expanded content */}
                {activeAct === i && (
                  <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1.5rem" }}>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.75,
                      fontWeight: 300,
                      marginBottom: "1.25rem",
                    }}>
                      {act.detail}
                    </p>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                        Key Figures
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {act.figures.map((f) => (
                          <span key={f} style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.72rem",
                            background: "rgba(255,255,255,0.15)",
                            color: "#fff",
                            padding: "3px 10px",
                            borderRadius: 2,
                            fontWeight: 400,
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand indicator */}
                {activeAct !== i && (
                  <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: act.color, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Read more
                    </span>
                    <span style={{ color: act.color, fontSize: "0.8rem" }}>→</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--text-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1rem", textAlign: "center" }}>
          ← Scroll horizontally to explore all twelve acts →
        </p>
      </div>
    </section>
  );
}

// ─── Photo Gallery ────────────────────────────────────────────────────────────
function PhotoGallery() {
  return (
    <section style={{ padding: "8rem 0", background: "#fff" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <p className="section-label">III. In the Frame</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1 }}>
            Ceremony Highlights
          </h2>
        </div>

        {/* Row 1: Gojira + Marie Antoinette */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div className="photo-card" style={{ height: 440 }}>
            <img src={IMG.gojira} alt="Gojira performing at the Paris 2024 Olympics opening ceremony" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "2rem 1.5rem 1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, color: "var(--gold-light)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Act III · Liberté</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#fff", fontWeight: 600 }}>Gojira at the Conciergerie</p>
            </div>
          </div>
          <div className="photo-card" style={{ height: 440 }}>
            <img src={IMG.marieAnt} alt="Marie Antoinette scene at the Paris 2024 Olympics" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "2rem 1.5rem 1.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, color: "var(--gold-light)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Act III · Liberté</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#fff", fontWeight: 600 }}>Marie Antoinette's Severed Head</p>
            </div>
          </div>
        </div>

        {/* Row 2: Performers + Cauldron + Celine */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div className="photo-card" style={{ height: 300 }}>
            <img src={IMG.performers} alt="Ceremony performers on the Seine" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Parade of Nations</p>
            </div>
          </div>
          <div className="photo-card" style={{ height: 300 }}>
            <img src={IMG.cauldron} alt="Olympic cauldron hot air balloon" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>The Olympic Cauldron Ascends</p>
            </div>
          </div>
          <div className="photo-card" style={{ height: 300 }}>
            <img src={IMG.celineEiffel} alt="Celine Dion at the Eiffel Tower" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Celine Dion at the Eiffel Tower</p>
            </div>
          </div>
        </div>

        {/* Row 3: Lady Gaga + Ceremony moments */}
        <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}>
          <div className="photo-card" style={{ height: 320 }}>
            <img src={IMG.ladyGaga} alt="Lady Gaga opening the ceremony" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, color: "var(--gold-light)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Act I · Enchanté</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Lady Gaga Opens the Games</p>
            </div>
          </div>
          <div className="photo-card" style={{ height: 320 }}>
            <img src={IMG.ceremony} alt="Opening ceremony highlights" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>The Seine at Night</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Closing Ceremony ─────────────────────────────────────────────────────────
function ClosingSection() {
  return (
    <section id="closing" style={{ padding: "8rem 0", background: "var(--navy)" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label" style={{ color: "var(--gold)" }}>IV. The Closing Ceremony</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            August 11, 2024 — "Records"
          </h2>
          <p className="body-text" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 600, marginTop: "1rem" }}>
            Titled "Records," the closing ceremony at the Stade de France was a celebration of athletic achievement, French culture, and a handover to Los Angeles 2028 — punctuated by one of the most spectacular stunts in Olympic history.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div className="fade-up">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--gold-light)", marginBottom: "1.5rem" }}>
              The Golden Voyager
            </h3>
            <p className="body-text" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
              The ceremony opened with the "Golden Voyager" — a figure inspired by the Voyager Golden Record and the spirit of the Bastille — who "excavated" the Olympic rings and a replica of the <strong style={{ color: "#fff" }}>Winged Victory of Samothrace</strong> from beneath the stadium turf. French bands <strong style={{ color: "#fff" }}>Phoenix</strong> and <strong style={{ color: "#fff" }}>Air</strong> performed, alongside Angele and Kavinsky, in a celebration of France's contribution to electronic and indie music.
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--gold-light)", marginBottom: "1.5rem", marginTop: "2rem" }}>
              The LA28 Handover
            </h3>
            <p className="body-text" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
              <strong style={{ color: "#fff" }}>Tom Cruise</strong> abseiled from the stadium roof, took the Olympic flag on a motorcycle, and skydived into the Hollywood Hills — where live performances from <strong style={{ color: "#fff" }}>Red Hot Chili Peppers, Billie Eilish, Snoop Dogg, and Dr. Dre</strong> in Long Beach, California, signaled the baton passing to Los Angeles.
            </p>
            <p className="body-text" style={{ color: "rgba(255,255,255,0.7)" }}>
              The finale saw French singer <strong style={{ color: "#fff" }}>Yseult</strong> perform Frank Sinatra's "My Way" — itself adapted from the French song "Comme d'habitude" — bringing the Games full circle with a reminder that American culture, too, is often French at its roots.
            </p>
            <div className="quote-block" style={{ borderLeftColor: "var(--gold)", marginTop: "2rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
                "Tom Cruise was the headline act on an evening proudly declaring a message about protecting the spirit of the Games."
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                — The Guardian, August 12, 2024
              </p>
            </div>
          </div>

          <div className="fade-in">
            <div className="photo-card" style={{ height: 340, marginBottom: "1rem" }}>
              <img src={IMG.tomCruise} alt="Tom Cruise at the Paris 2024 closing ceremony" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Tom Cruise — The LA28 Handover</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="photo-card" style={{ height: 220 }}>
                <img src={IMG.billie} alt="Billie Eilish at the closing ceremony" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>Billie Eilish</p>
                </div>
              </div>
              <div className="photo-card" style={{ height: 220 }}>
                <img src={IMG.snoop} alt="Snoop Dogg at the closing ceremony" />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>Snoop Dogg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mascot ───────────────────────────────────────────────────────────────────
function MascotSection() {
  return (
    <section id="mascot" style={{ padding: "8rem 0", background: "#fff" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div className="fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="photo-card" style={{ height: 360 }}>
                <img src={IMG.phryge} alt="The Phryge Olympic mascot" />
              </div>
              <div className="photo-card" style={{ height: 360 }}>
                <img src={IMG.phryge2} alt="The Phryge Paralympic mascot" />
              </div>
            </div>
          </div>
          <div className="fade-up">
            <p className="section-label">V. The Mascot</p>
            <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              The Phryge:<br />A Cap Full of History
            </h2>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              The Paris 2024 mascots — known as the <strong>Phryges</strong> — are anthropomorphic <strong>Phrygian caps</strong>: the soft, conical red hat that has been a symbol of liberty for over two millennia. Originally worn by freed slaves in ancient Rome to mark their emancipation, the cap was adopted by the French Revolution's <em>sans-culottes</em> as the bonnet rouge — the red cap of freedom.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Today, the Phrygian cap is worn by <strong>Marianne</strong> — the allegorical female figure who personifies the French Republic — and appears on the official seal of France. By making the cap itself the mascot, Paris 2024 embedded the Games' identity within the deepest roots of French republican values: liberty, equality, and fraternity.
            </p>
            <p className="body-text" style={{ marginBottom: "1.5rem" }}>
              The <strong>Paralympic Phryge</strong> wears a running prosthesis on its right leg — a powerful symbol of inclusion and the Paralympic movement's ethos that disability is not a barrier to athletic excellence. Despite early mockery over its unconventional shape, the Phryge became a commercial phenomenon: over <strong>1.3 million plush toys</strong> were sold during the Games.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ padding: "1rem 1.5rem", background: "var(--cream)", borderRadius: 4, borderLeft: "3px solid var(--gold)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Symbol</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--navy)", fontWeight: 600 }}>Liberty &amp; Emancipation</p>
              </div>
              <div style={{ padding: "1rem 1.5rem", background: "var(--cream)", borderRadius: 4, borderLeft: "3px solid var(--navy)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, color: "var(--navy)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Origin</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--navy)", fontWeight: 600 }}>Ancient Rome → French Revolution</p>
              </div>
              <div style={{ padding: "1rem 1.5rem", background: "var(--cream)", borderRadius: 4, borderLeft: "3px solid var(--red-fr)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, color: "var(--red-fr)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Sales</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--navy)", fontWeight: 600 }}>1.3 Million Plush Toys Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Journalist Interviews ────────────────────────────────────────────────────
function InterviewsSection() {
  return (
    <section id="interviews" style={{ padding: "8rem 0", background: "var(--cream)" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label">VI. Voices</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1 }}>
            Interviews &amp; Reactions
          </h2>
          <p className="body-text" style={{ maxWidth: 600, marginTop: "1rem" }}>
            From the performers themselves to journalists and historians, the Paris 2024 ceremonies generated a global conversation about art, identity, and the meaning of France.
          </p>
        </div>

        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {INTERVIEWS.map((iv) => (
            <div key={iv.speaker + iv.source} className="editorial-card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 4, alignSelf: "stretch", background: iv.color, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.2rem" }}>{iv.speaker}</h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, color: iv.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{iv.role}</p>
                </div>
              </div>
              <blockquote style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: "var(--text-dark)",
                lineHeight: 1.65,
                marginBottom: "1rem",
                margin: "0 0 1rem 0",
              }}>
                "{iv.quote}"
              </blockquote>
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--text-light)", marginBottom: "0.2rem" }}>
                  <strong>Context:</strong> {iv.context}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--text-light)", fontStyle: "italic" }}>
                  {iv.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Medal Table ──────────────────────────────────────────────────────────────
function MedalTable() {
  const maxGold = Math.max(...MEDALS.map((m) => m.gold));
  return (
    <section id="medals" style={{ padding: "8rem 0", background: "#fff" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label">VII. The Scoreboard</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1 }}>
            Medal Table — Top Nations
          </h2>
        </div>
        <div className="fade-up">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--navy)" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-light)" }}>Rank</th>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-light)" }}>Nation</th>
                  <th style={{ textAlign: "center", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8973a" }}>Gold</th>
                  <th style={{ textAlign: "center", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>Silver</th>
                  <th style={{ textAlign: "center", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a0522d" }}>Bronze</th>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-light)" }}>Gold Distribution</th>
                  <th style={{ textAlign: "center", padding: "0.75rem 1rem", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--navy)" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {MEDALS.map((m, i) => (
                  <tr key={m.country} style={{ borderBottom: "1px solid var(--border-light)", background: m.country === "France" ? "rgba(200,151,58,0.05)" : "transparent" }}>
                    <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-light)", fontWeight: 500 }}>{i + 1}</td>
                    <td style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.4rem" }}>{m.flag}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: m.country === "France" ? 600 : 400, color: m.country === "France" ? "var(--navy)" : "var(--text-dark)" }}>
                        {m.country}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#c8973a" }}>{m.gold}</td>
                    <td style={{ padding: "1rem", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#888" }}>{m.silver}</td>
                    <td style={{ padding: "1rem", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#a0522d" }}>{m.bronze}</td>
                    <td style={{ padding: "1rem", minWidth: 200 }}>
                      <div style={{ height: 8, background: "#f0ede6", borderRadius: 2, overflow: "hidden" }}>
                        <div className="medal-bar" style={{ width: `${(m.gold / maxGold) * 100}%`, background: "linear-gradient(90deg, #c8973a, #e8b84b)" }} />
                      </div>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)" }}>{m.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Controversy Section ──────────────────────────────────────────────────────
function ControversySection() {
  const controversies = [
    {
      title: "The 'Last Supper' Debate",
      color: "var(--red-fr)",
      summary: "A tableau vivant featuring drag performers at a long banquet table was interpreted by many as a parody of Leonardo da Vinci's Last Supper. Religious groups worldwide condemned the scene; Thomas Jolly denied any Christian reference, stating it depicted the Greek gods of Olympus at a feast, inspired by Jan van Bijlert's 1640 painting 'The Feast of the Gods.' The AP reported that the scene's choreographer filed legal complaints after receiving death threats online.",
      source: "AP, July 27, 2024; NYT, July 28, 2024",
    },
    {
      title: "Gojira's 'Satanic' Performance",
      color: "var(--navy)",
      summary: "Social media personality Andrew Tate and others labeled Gojira's Marie Antoinette performance 'satanic.' Joe Duplantier responded: 'It's French history. It's French charm — beheaded people, red wine, and blood all over the place. It's romantic, it's normal.' He cited France's concept of laicite — the constitutional separation of church and state — as the framework for the performance's imagery.",
      source: "Rolling Stone, July 29, 2024; Kerrang!, July 30, 2024",
    },
    {
      title: "Aya Nakamura and the Far Right",
      color: "var(--gold)",
      summary: "Before the ceremony, far-right French politicians and commentators launched a campaign against Aya Nakamura's inclusion, questioning whether a French-Malian singer was 'French enough' to represent the nation. Her performance — universally praised by critics — was widely interpreted as a definitive answer. The NYT wrote: 'Aya Nakamura did more than open the Games. She redefined what it means to be French.'",
      source: "NYT, July 29, 2024",
    },
    {
      title: "The Displacement of Unhoused People",
      color: "var(--text-mid)",
      summary: "Academic historian Matthew Gin noted that the French government's aggressive removal of unhoused people from Paris in preparation for the Olympics echoed an 18th-century engraving of the 1739 Seine festival, in which a guard drives away a child in rags from the royal spectacle. The parallel raised questions about who the Games' message of 'fraternity' was truly intended for.",
      source: "Journal18, September 3, 2024",
    },
  ];

  return (
    <section style={{ padding: "8rem 0", background: "var(--navy)" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "4rem" }}>
          <p className="section-label" style={{ color: "var(--gold)" }}>VIII. Controversy &amp; Debate</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            When Art Provokes
          </h2>
          <p className="body-text" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 600, marginTop: "1rem" }}>
            No ceremony of this ambition could pass without controversy. The Paris 2024 opening ceremony generated global debate on religion, race, identity, and the social costs of hosting the Games.
          </p>
        </div>
        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {controversies.map((c) => (
            <div key={c.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2rem", borderTop: `3px solid ${c.color}` }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>{c.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1rem" }}>{c.summary}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic", letterSpacing: "0.05em" }}>Source: {c.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── References ───────────────────────────────────────────────────────────────
function ReferencesSection() {
  return (
    <section id="references" style={{ padding: "8rem 0", background: "var(--cream)" }}>
      <div className="container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <p className="section-label">IX. Sources</p>
          <div className="gold-rule" style={{ margin: "1rem 0 1.5rem" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.1 }}>
            References &amp; Further Reading
          </h2>
        </div>
        <div className="fade-up">
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {REFERENCES.map((r, i) => (
              <li
                key={r.num}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  padding: "1.25rem 0",
                  borderBottom: i < REFERENCES.length - 1 ? "1px solid var(--border-light)" : "none",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)", minWidth: 28, paddingTop: "0.1rem" }}>
                  [{r.num}]
                </span>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-dark)", lineHeight: 1.6, marginBottom: "0.25rem" }}>
                    <strong>{r.authors}.</strong> "{r.title}." <em>{r.outlet}</em>, {r.date}.
                  </p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gold)", textDecoration: "none", wordBreak: "break-all" }}
                  >
                    {r.url}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--navy)", padding: "3rem 0" }}>
      <div className="container">
        <div className="tricolor-bar" style={{ marginBottom: "2rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>
              Paris 2024 — A Cultural &amp; Artistic Analysis
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
              202601_MDFL_201R_01 · Taste of France · Xinyue Fan
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
            © 2024 Paris Olympic Games · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "#fff" }}>
      <CourseHeader />
      <Nav />
      <Hero />
      <Stats />
      <OpeningSection />
      <ActsTimeline />
      <PhotoGallery />
      <ClosingSection />
      <MascotSection />
      <InterviewsSection />
      <MedalTable />
      <ControversySection />
      <ReferencesSection />
      <Footer />
    </div>
  );
}
