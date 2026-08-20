import { useState, useEffect, useRef, type JSX } from "react";
import personalPhoto from "./imports/image.png";
import personalPhoto2 from "./imports/image-1.png";
import schoolLogo from "./imports/school__logo.jpg";
import schoolPicture from "./imports/school_picture.jpg";
import portfolioImg from "./imports/image-5.png";

// ── Translations ──────────────────────────────────────────────────────────────
const LANGS = {
  en: { code: "EN", label: "English", dir: "ltr" },
  et: { code: "ET", label: "Eesti", dir: "ltr" },
  de: { code: "DE", label: "Deutsch", dir: "ltr" },
  ar: { code: "AR", label: "العربية", dir: "rtl" },
  zh: { code: "ZH", label: "中文", dir: "ltr" },
} as const;
type Lang = keyof typeof LANGS;

const T: Record<Lang, Record<string, string>> = {
  en: {
    nav_home: "Home", nav_about: "About", nav_education: "Education",
    nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
    nav_hire: "Hire Me",
    hero_badge: "Engineering Student · TalTech",
    hero_title1: "Huseyn", hero_title2: "Huseynli",
    hero_sub: "Engineering student passionate about technology, programming, automation, and building practical solutions.",
    hero_btn1: "View My Projects", hero_btn2: "Contact Me",
    stat_univ: "University", stat_based: "Based in",
    about_label: "About Me",
    about_heading1: "Turning ideas into", about_heading2: "real solutions",
    about_p1: "I'm Huseyn Huseynli, an engineering student at Tallinn University of Technology (TalTech) in Estonia. My academic journey is driven by a genuine curiosity about how technology shapes the world around us.",
    about_p2: "I'm deeply interested in programming, automation, and developing practical projects that solve real problems. Whether it's writing clean code, designing systems, or learning new engineering concepts, I approach every challenge with focus and determination.",
    about_tags: "Technology,Programming,Engineering,Automation,Problem Solving,Innovation",
    edu_label: "Education", edu_heading1: "Academic", edu_heading2: "Background",
    edu_current: "Current", edu_degree: "Degree:", edu_deg_val: "Bachelor of Engineering",
    edu_field: "Field:", edu_field_val: "Engineering",
    edu_location: "Location:", edu_loc_val: "Tallinn, Estonia",
    edu_status: "Status:", edu_stat_val: "Active Student",
    skills_label: "Skills", skills_heading1: "Technical", skills_heading2: "Expertise",
    skills_sub: "Technologies and disciplines I work with regularly.",
    proj_label: "Projects", proj_heading1: "My", proj_heading2: "Work",
    proj_sub: "Projects I've built or contributed to. Replace placeholders with your real work.",
    proj_placeholder: "— Placeholder",
    proj_desc: "This is a placeholder card — replace this description with your real project details, goals, and outcomes.",
    proj_btn: "View Project",
    contact_label: "Contact", contact_heading1: "Get In", contact_heading2: "Touch",
    contact_sub: "Have a project, opportunity, or just want to connect? I'd love to hear from you.",
    form_name: "Name", form_name_ph: "Your name",
    form_email: "Email", form_email_ph: "your@email.com",
    form_msg: "Message", form_msg_ph: "What's on your mind?",
    form_btn: "Send Message", form_sent: "✓ Message Sent!",
    footer_nav: "Navigation", footer_contact: "Contact",
    footer_copy: "All rights reserved.",
    footer_sub: "Engineering Student · TalTech · Tallinn, Estonia",
    whatsapp: "WhatsApp", linkedin: "LinkedIn",
  },
  et: {
    nav_home: "Avaleht", nav_about: "Minust", nav_education: "Haridus",
    nav_skills: "Oskused", nav_projects: "Projektid", nav_contact: "Kontakt",
    nav_hire: "Palka Mind",
    hero_badge: "Inseneritüüpiline õpilane · TalTech",
    hero_title1: "Huseyn", hero_title2: "Huseynli",
    hero_sub: "Inseneritüüpiline õpilane, kellel on kirg tehnoloogia, programmeerimise, automatiseerimise ja praktiliste lahenduste loomise vastu.",
    hero_btn1: "Vaata projekte", hero_btn2: "Võta ühendust",
    stat_univ: "Ülikool", stat_based: "Asukoht",
    about_label: "Minust",
    about_heading1: "Ideed muudan", about_heading2: "tegelikkuseks",
    about_p1: "Olen Huseyn Huseynli, inseneritüüpiline õpilane Tallinna Tehnikaülikoolis (TalTech) Eestis. Minu akadeemiline teekond on ajendatud siirast uudishimust selle vastu, kuidas tehnoloogia meie maailma kujundab.",
    about_p2: "Olen sügavalt huvitatud programmeerimisest, automatiseerimisest ja praktiliste projektide arendamisest. Iga väljakutse poole lähenen ma fookuse ja sihikindlusega.",
    about_tags: "Tehnoloogia,Programmeerimine,Inseneeria,Automatiseerimine,Probleemilahendus,Innovatsioon",
    edu_label: "Haridus", edu_heading1: "Akadeemiline", edu_heading2: "Taust",
    edu_current: "Praegune", edu_degree: "Kraad:", edu_deg_val: "Inseneriteaduse bakalaureus",
    edu_field: "Valdkond:", edu_field_val: "Inseneeria",
    edu_location: "Asukoht:", edu_loc_val: "Tallinn, Eesti",
    edu_status: "Staatus:", edu_stat_val: "Aktiivne Õpilane",
    skills_label: "Oskused", skills_heading1: "Tehnilised", skills_heading2: "Oskused",
    skills_sub: "Tehnoloogiad ja valdkonnad, millega regulaarselt tegelen.",
    proj_label: "Projektid", proj_heading1: "Minu", proj_heading2: "Tööd",
    proj_sub: "Projektid, mida olen loonud. Asenda kohatäited oma tegelike töödega.",
    proj_placeholder: "— Kohatäide",
    proj_desc: "See on kohatäite kaart — asenda see oma tegeliku projekti kirjeldusega.",
    proj_btn: "Vaata Projekti",
    contact_label: "Kontakt", contact_heading1: "Võta", contact_heading2: "Ühendust",
    contact_sub: "Kas sul on projekt, võimalus või soovid lihtsalt ühendust võtta?",
    form_name: "Nimi", form_name_ph: "Sinu nimi",
    form_email: "E-post", form_email_ph: "sinu@email.com",
    form_msg: "Sõnum", form_msg_ph: "Mida soovid öelda?",
    form_btn: "Saada Sõnum", form_sent: "✓ Sõnum Saadetud!",
    footer_nav: "Navigatsioon", footer_contact: "Kontakt",
    footer_copy: "Kõik õigused kaitstud.",
    footer_sub: "Inseneritüüpiline Õpilane · TalTech · Tallinn, Eesti",
    whatsapp: "WhatsApp", linkedin: "LinkedIn",
  },
  de: {
    nav_home: "Start", nav_about: "Über mich", nav_education: "Bildung",
    nav_skills: "Fähigkeiten", nav_projects: "Projekte", nav_contact: "Kontakt",
    nav_hire: "Einstellen",
    hero_badge: "Ingenieurstudent · TalTech",
    hero_title1: "Huseyn", hero_title2: "Huseynli",
    hero_sub: "Ingenieurstudent mit Leidenschaft für Technologie, Programmierung, Automatisierung und die Entwicklung praktischer Lösungen.",
    hero_btn1: "Meine Projekte", hero_btn2: "Kontaktieren",
    stat_univ: "Universität", stat_based: "Standort",
    about_label: "Über Mich",
    about_heading1: "Ideen in", about_heading2: "Lösungen verwandeln",
    about_p1: "Ich bin Huseyn Huseynli, Ingenieurstudent an der Tallinn University of Technology (TalTech) in Estland. Mein akademischer Weg wird von echter Neugier angetrieben, wie Technologie unsere Welt gestaltet.",
    about_p2: "Ich interessiere mich sehr für Programmierung, Automatisierung und die Entwicklung praktischer Projekte. Jede Herausforderung gehe ich mit Fokus und Entschlossenheit an.",
    about_tags: "Technologie,Programmierung,Ingenieurwesen,Automatisierung,Problemlösung,Innovation",
    edu_label: "Bildung", edu_heading1: "Akademischer", edu_heading2: "Hintergrund",
    edu_current: "Aktuell", edu_degree: "Abschluss:", edu_deg_val: "Bachelor of Engineering",
    edu_field: "Fachbereich:", edu_field_val: "Ingenieurwesen",
    edu_location: "Standort:", edu_loc_val: "Tallinn, Estland",
    edu_status: "Status:", edu_stat_val: "Aktiver Student",
    skills_label: "Fähigkeiten", skills_heading1: "Technische", skills_heading2: "Expertise",
    skills_sub: "Technologien und Disziplinen, mit denen ich regelmäßig arbeite.",
    proj_label: "Projekte", proj_heading1: "Meine", proj_heading2: "Arbeit",
    proj_sub: "Projekte, die ich erstellt habe. Ersetze Platzhalter durch echte Projekte.",
    proj_placeholder: "— Platzhalter",
    proj_desc: "Dies ist eine Platzhalterkarte — ersetze diese Beschreibung durch dein echtes Projekt.",
    proj_btn: "Projekt Ansehen",
    contact_label: "Kontakt", contact_heading1: "In", contact_heading2: "Kontakt Treten",
    contact_sub: "Hast du ein Projekt oder möchtest dich einfach vernetzen?",
    form_name: "Name", form_name_ph: "Dein Name",
    form_email: "E-Mail", form_email_ph: "deine@email.com",
    form_msg: "Nachricht", form_msg_ph: "Was möchtest du mitteilen?",
    form_btn: "Nachricht Senden", form_sent: "✓ Nachricht Gesendet!",
    footer_nav: "Navigation", footer_contact: "Kontakt",
    footer_copy: "Alle Rechte vorbehalten.",
    footer_sub: "Ingenieurstudent · TalTech · Tallinn, Estland",
    whatsapp: "WhatsApp", linkedin: "LinkedIn",
  },
  ar: {
    nav_home: "الرئيسية", nav_about: "عني", nav_education: "التعليم",
    nav_skills: "المهارات", nav_projects: "المشاريع", nav_contact: "التواصل",
    nav_hire: "توظيفي",
    hero_badge: "طالب هندسة · تال تك",
    hero_title1: "حسين", hero_title2: "حسيين لي",
    hero_sub: "طالب هندسة شغوف بالتكنولوجيا والبرمجة والأتمتة وبناء حلول عملية.",
    hero_btn1: "مشاريعي", hero_btn2: "تواصل معي",
    stat_univ: "الجامعة", stat_based: "الموقع",
    about_label: "عني",
    about_heading1: "تحويل الأفكار إلى", about_heading2: "حلول حقيقية",
    about_p1: "أنا حسين حسيين لي، طالب هندسة في جامعة تالين للتكنولوجيا (تال تك) في إستونيا. رحلتي الأكاديمية مدفوعة بفضول حقيقي حول كيفية تشكيل التكنولوجيا للعالم من حولنا.",
    about_p2: "أنا مهتم بعمق بالبرمجة والأتمتة وتطوير مشاريع عملية تحل مشكلات حقيقية. أتعامل مع كل تحدٍّ بتركيز وتصميم.",
    about_tags: "التكنولوجيا,البرمجة,الهندسة,الأتمتة,حل المشكلات,الابتكار",
    edu_label: "التعليم", edu_heading1: "الخلفية", edu_heading2: "الأكاديمية",
    edu_current: "حالي", edu_degree: "الدرجة:", edu_deg_val: "بكالوريوس هندسة",
    edu_field: "التخصص:", edu_field_val: "الهندسة",
    edu_location: "الموقع:", edu_loc_val: "تالين، إستونيا",
    edu_status: "الحالة:", edu_stat_val: "طالب نشط",
    skills_label: "المهارات", skills_heading1: "الخبرة", skills_heading2: "التقنية",
    skills_sub: "التقنيات والتخصصات التي أعمل بها بانتظام.",
    proj_label: "المشاريع", proj_heading1: "أعمالي", proj_heading2: "",
    proj_sub: "مشاريع قمت ببنائها. استبدل العناصر النائبة بأعمالك الحقيقية.",
    proj_placeholder: "— نائب",
    proj_desc: "هذه بطاقة نائبة — استبدل هذا الوصف بتفاصيل مشروعك الحقيقي.",
    proj_btn: "عرض المشروع",
    contact_label: "التواصل", contact_heading1: "تواصل", contact_heading2: "معي",
    contact_sub: "هل لديك مشروع أو فرصة أو تريد فقط التواصل؟ يسعدني سماعك.",
    form_name: "الاسم", form_name_ph: "اسمك",
    form_email: "البريد الإلكتروني", form_email_ph: "بريدك@email.com",
    form_msg: "الرسالة", form_msg_ph: "ما الذي تريد قوله؟",
    form_btn: "إرسال الرسالة", form_sent: "✓ تم الإرسال!",
    footer_nav: "التنقل", footer_contact: "التواصل",
    footer_copy: "جميع الحقوق محفوظة.",
    footer_sub: "طالب هندسة · تال تك · تالين، إستونيا",
    whatsapp: "واتساب", linkedin: "لينكد إن",
  },
  zh: {
    nav_home: "首页", nav_about: "关于", nav_education: "教育",
    nav_skills: "技能", nav_projects: "项目", nav_contact: "联系",
    nav_hire: "雇用我",
    hero_badge: "工程系学生 · TalTech",
    hero_title1: "胡塞因", hero_title2: "侯赛因利",
    hero_sub: "热爱技术、编程、自动化并致力于构建实用解决方案的工程系学生。",
    hero_btn1: "查看项目", hero_btn2: "联系我",
    stat_univ: "大学", stat_based: "所在地",
    about_label: "关于我",
    about_heading1: "将想法转化为", about_heading2: "真实解决方案",
    about_p1: "我是胡塞因·侯赛因利，就读于爱沙尼亚塔林理工大学（TalTech）工程专业。我的学术旅程由对科技如何塑造世界的真正好奇心驱动。",
    about_p2: "我对编程、自动化和开发解决实际问题的项目有浓厚兴趣。无论是编写整洁的代码、设计系统还是学习新的工程概念，我都以专注和决心面对每一个挑战。",
    about_tags: "技术,编程,工程,自动化,解决问题,创新",
    edu_label: "教育", edu_heading1: "学术", edu_heading2: "背景",
    edu_current: "在读", edu_degree: "学位：", edu_deg_val: "工程学士",
    edu_field: "专业：", edu_field_val: "工程学",
    edu_location: "地点：", edu_loc_val: "爱沙尼亚塔林",
    edu_status: "状态：", edu_stat_val: "在读学生",
    skills_label: "技能", skills_heading1: "技术", skills_heading2: "专长",
    skills_sub: "我定期使用的技术和学科领域。",
    proj_label: "项目", proj_heading1: "我的", proj_heading2: "作品",
    proj_sub: "我构建或参与的项目。请用真实项目替换占位符。",
    proj_placeholder: "— 占位符",
    proj_desc: "这是一个占位符卡片 — 请用您真实项目的详细信息替换此描述。",
    proj_btn: "查看项目",
    contact_label: "联系", contact_heading1: "取得", contact_heading2: "联系",
    contact_sub: "有项目、机会，或只是想联系？我很乐意听您说。",
    form_name: "姓名", form_name_ph: "您的姓名",
    form_email: "邮箱", form_email_ph: "您的邮箱",
    form_msg: "留言", form_msg_ph: "您想说什么？",
    form_btn: "发送消息", form_sent: "✓ 消息已发送！",
    footer_nav: "导航", footer_contact: "联系方式",
    footer_copy: "保留所有权利。",
    footer_sub: "工程系学生 · TalTech · 爱沙尼亚塔林",
    whatsapp: "WhatsApp", linkedin: "领英",
  },
};

// ── Utility ───────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((r) => r.classList.add("visible"));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Theme context ─────────────────────────────────────────────────────────────
type Theme = "dark" | "light";

function SectionLabel({ text, dark }: { text: string; dark: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="mono text-xs tracking-widest uppercase" style={{ color: "#6366f1" }}>
        {text}
      </span>
      <div className="h-px flex-1 max-w-16" style={{ background: dark ? "#2a2a3a" : "#d1d5db" }} />
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_IDS = ["home", "about", "education", "skills", "projects", "contact"] as const;

function Nav({
  theme, setTheme, lang, setLang, t, dark,
}: {
  theme: Theme; setTheme: (t: Theme) => void;
  lang: Lang; setLang: (l: Lang) => void;
  t: Record<string, string>; dark: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "home";
      NAV_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels: Record<string, string> = {
    home: t.nav_home, about: t.nav_about, education: t.nav_education,
    skills: t.nav_skills, projects: t.nav_projects, contact: t.nav_contact,
  };

  const bg = dark
    ? scrolled ? "rgba(10,10,15,0.95)" : "transparent"
    : scrolled ? "rgba(255,255,255,0.95)" : "transparent";
  const border = scrolled ? (dark ? "1px solid #1e1e2a" : "1px solid #e5e7eb") : "none";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: bg, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: border }}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 focus:outline-none">
          <span className="font-display font-800 text-base tracking-tight" style={{ color: dark ? "#f0f0f8" : "#111827", letterSpacing: "-0.01em" }}>
            Huseyn<span style={{ color: "#6366f1" }}>.</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link text-sm font-medium transition-colors focus:outline-none"
              style={{ color: active === id ? (dark ? "#f0f0f8" : "#111827") : (dark ? "#8b8ba0" : "#6b7280") }}
            >
              {navLabels[id]}
            </button>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{ background: dark ? "#16161f" : "#f3f4f6", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}
            aria-label="Toggle theme"
          >
            {dark ? (
              <svg width="16" height="16" fill="none" stroke="#f0f0f8" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium mono transition-all"
              style={{ background: dark ? "#16161f" : "#f3f4f6", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`, color: dark ? "#f0f0f8" : "#374151" }}
            >
              {LANGS[lang].code}
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50 min-w-32"
                style={{ background: dark ? "#16161f" : "#fff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
              >
                {(Object.keys(LANGS) as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between"
                    style={{
                      color: l === lang ? "#6366f1" : (dark ? "#f0f0f8" : "#374151"),
                      background: l === lang ? (dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.06)") : "transparent",
                    }}
                    onMouseEnter={(e) => { if (l !== lang) e.currentTarget.style.background = dark ? "#1e1e2a" : "#f9fafb"; }}
                    onMouseLeave={(e) => { if (l !== lang) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span>{LANGS[l].label}</span>
                    <span className="mono text-xs opacity-50">{LANGS[l].code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
            style={{ background: "#6366f1", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4f46e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#6366f1")}
          >
            {t.nav_hire}
          </button>
        </div>

        {/* Mobile: theme + lang + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: dark ? "#16161f" : "#f3f4f6", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}
          >
            {dark ? (
              <svg width="14" height="14" fill="none" stroke="#f0f0f8" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded focus:outline-none"
            style={{ color: dark ? "#f0f0f8" : "#111827" }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (<><line x1="4" y1="4" x2="18" y2="18" /><line x1="18" y1="4" x2="4" y2="18" /></>) : (<><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="12" x2="19" y2="12" /><line x1="3" y1="18" x2="19" y2="18" /></>)}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden mobile-menu-open px-6 py-4 flex flex-col gap-2"
          style={{ background: dark ? "rgba(10,10,15,0.98)" : "rgba(255,255,255,0.98)", borderTop: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}
        >
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false); }}
              className="text-left text-sm font-medium py-2"
              style={{ color: active === id ? "#6366f1" : (dark ? "#8b8ba0" : "#6b7280") }}
            >
              {navLabels[id]}
            </button>
          ))}
          {/* Language options in mobile */}
          <div className="pt-2 mt-2" style={{ borderTop: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}>
            <div className="mono text-xs mb-2" style={{ color: dark ? "#55556a" : "#9ca3af" }}>Language</div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(LANGS) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setOpen(false); }}
                  className="px-3 py-1.5 rounded-lg text-xs mono"
                  style={{
                    background: l === lang ? "#6366f1" : (dark ? "#16161f" : "#f3f4f6"),
                    color: l === lang ? "#fff" : (dark ? "#8b8ba0" : "#6b7280"),
                    border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`,
                  }}
                >
                  {LANGS[l].code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const bg = dark
    ? "linear-gradient(160deg, #0a0a0f 0%, #111118 60%, #0d0d18 100%)"
    : "linear-gradient(160deg, #f8faff 0%, #eef2ff 60%, #f0f4ff 100%)";

  return (
    <section id="home" className="relative min-h-screen flex items-center" style={{ background: bg }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${dark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.06)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.06)"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.1)"} 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-up">
            <div className="mono text-xs tracking-widest uppercase mb-6 inline-flex items-center gap-2" style={{ color: "#6366f1" }}>
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#6366f1" }} />
              {t.hero_badge}
            </div>
            <h1 className="font-display font-800 leading-none mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: dark ? "#f0f0f8" : "#111827" }}>
              {t.hero_title1}<br />
              <span className="gradient-text">{t.hero_title2}</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>
              {t.hero_sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("projects")}
                className="px-7 py-3.5 rounded-xl font-medium text-sm transition-all"
                style={{ background: "#6366f1", color: "#fff" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#4f46e5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#6366f1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >{t.hero_btn1}</button>
              <button onClick={() => scrollTo("contact")}
                className="px-7 py-3.5 rounded-xl font-medium text-sm transition-all"
                style={{ border: `1px solid ${dark ? "#2a2a3a" : "#d1d5db"}`, color: dark ? "#f0f0f8" : "#374151", background: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = dark ? "#2a2a3a" : "#d1d5db"; e.currentTarget.style.transform = "translateY(0)"; }}
              >{t.hero_btn2}</button>
            </div>
            {/* Stats — only university + location */}
            <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}>
              {[
                { n: "TalTech", label: t.stat_univ },
                { n: "EST", label: t.stat_based },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-700 text-xl" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{s.n}</div>
                  <div className="text-xs mt-0.5" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="flex justify-center md:justify-end fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, transparent 60%)" }} />
              {/* Main photo */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{ width: "clamp(260px, 35vw, 400px)", aspectRatio: "3/4", border: `1px solid ${dark ? "#2a2a3a" : "#d1d5db"}` }}>
                <img src={personalPhoto} alt="Huseyn Huseynli" className="w-full h-full object-cover object-top" />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ background: dark ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}>
                  <img src={schoolLogo} alt="TalTech" className="h-7 w-7 rounded object-cover" />
                  <div>
                    <div className="text-xs font-medium" style={{ color: dark ? "#f0f0f8" : "#111827" }}>Tallinn University of Technology</div>
                    <div className="text-xs" style={{ color: "#6366f1" }}>Engineering Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: dark ? "#55556a" : "#9ca3af" }}>
        <span className="mono text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 animate-pulse" style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }} />
      </div>
    </section>
  );
}

// ── Snake Xenzia Game ─────────────────────────────────────────────────────────
const SN_COLS = 18;
const SN_CELL = 18;
const SN_SIZE = SN_COLS * SN_CELL;

type Pt = { x: number; y: number };

function mkFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: Math.floor(Math.random() * SN_COLS), y: Math.floor(Math.random() * SN_COLS) }; }
  while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}

function SnakeGame({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeR = useRef<Pt[]>([{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }]);
  const dirR = useRef<Pt>({ x: 1, y: 0 });
  const nextDirR = useRef<Pt>({ x: 1, y: 0 });
  const foodR = useRef<Pt>({ x: 4, y: 4 });
  const scoreR = useRef(0);
  const bestR = useRef(0);
  const statusR = useRef<"idle" | "running" | "over">("idle");
  const speedR = useRef(145);
  const timerR = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeR = useRef<Pt | null>(null);
  const [ui, setUi] = useState({ score: 0, best: 0, status: "idle" as "idle" | "running" | "over" });

  const paint = () => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const S = SN_SIZE;
    const C = SN_CELL;
    const N = SN_COLS;

    ctx.fillStyle = dark ? "#0d0d16" : "#f5f3ff";
    ctx.fillRect(0, 0, S, S);

    ctx.strokeStyle = dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.12)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= N; i++) {
      ctx.beginPath(); ctx.moveTo(i * C, 0); ctx.lineTo(i * C, S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * C); ctx.lineTo(S, i * C); ctx.stroke();
    }

    // Food
    const fx = foodR.current.x * C + C / 2;
    const fy = foodR.current.y * C + C / 2;
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(fx, fy, C / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.beginPath();
    ctx.arc(fx - 2, fy - 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    snakeR.current.forEach((seg, i) => {
      const fade = Math.max(0.3, 1 - i / snakeR.current.length * 0.7);
      ctx.fillStyle = i === 0
        ? `rgba(99,102,241,1)`
        : `rgba(129,140,248,${fade})`;
      const pad = 2;
      ctx.fillRect(seg.x * C + pad, seg.y * C + pad, C - pad * 2, C - pad * 2);
      if (i === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fillRect(seg.x * C + pad + 2, seg.y * C + pad + 2, C - pad * 2 - 4, 3);
      }
    });

    // Overlay
    if (statusR.current !== "running") {
      ctx.fillStyle = dark ? "rgba(8,8,18,0.86)" : "rgba(240,238,255,0.9)";
      ctx.fillRect(0, 0, S, S);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const mid = S / 2;

      if (statusR.current === "over") {
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 17px 'JetBrains Mono', monospace";
        ctx.fillText("GAME OVER", mid, mid - 38);
        ctx.fillStyle = dark ? "#a5b4fc" : "#4f46e5";
        ctx.font = "12px 'JetBrains Mono', monospace";
        ctx.fillText("Score  " + scoreR.current + "   ·   Best  " + bestR.current, mid, mid - 12);
        ctx.fillStyle = dark ? "#6b7280" : "#9ca3af";
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText("Press Restart to play again", mid, mid + 14);
      } else {
        ctx.fillStyle = dark ? "#818cf8" : "#4f46e5";
        ctx.font = "bold 16px 'JetBrains Mono', monospace";
        ctx.fillText("GAME", mid, mid - 22);
        ctx.fillStyle = dark ? "#6b7280" : "#9ca3af";
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText("Press Start Game to play", mid, mid + 6);
        ctx.fillText("Arrow keys · WASD · D-pad", mid, mid + 24);
      }
    }
  };

  const start = () => {
    if (timerR.current) clearTimeout(timerR.current);
    snakeR.current = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }];
    dirR.current = { x: 1, y: 0 };
    nextDirR.current = { x: 1, y: 0 };
    foodR.current = mkFood(snakeR.current);
    scoreR.current = 0;
    speedR.current = 145;
    statusR.current = "running";
    setUi(u => ({ ...u, score: 0, status: "running" }));
    loop();
  };

  const loop = () => {
    if (statusR.current !== "running") return;
    dirR.current = nextDirR.current;
    const h = snakeR.current[0];
    const head = { x: h.x + dirR.current.x, y: h.y + dirR.current.y };

    if (head.x < 0 || head.x >= SN_COLS || head.y < 0 || head.y >= SN_COLS
      || snakeR.current.some(s => s.x === head.x && s.y === head.y)) {
      bestR.current = Math.max(bestR.current, scoreR.current);
      statusR.current = "over";
      setUi({ score: scoreR.current, best: bestR.current, status: "over" });
      paint();
      return;
    }

    const ate = head.x === foodR.current.x && head.y === foodR.current.y;
    snakeR.current = [head, ...snakeR.current.slice(0, ate ? undefined : snakeR.current.length - 1)];
    if (ate) {
      foodR.current = mkFood(snakeR.current);
      scoreR.current += 1;
      speedR.current = Math.max(60, speedR.current - 3);
      setUi(u => ({ ...u, score: scoreR.current }));
    }
    paint();
    timerR.current = setTimeout(loop, speedR.current);
  };

  const steer = (d: Pt) => {
    if (d.x === -dirR.current.x && d.y === -dirR.current.y) return;
    nextDirR.current = d;
  };

  useEffect(() => {
    paint();
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Pt> = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      };
      const d = map[e.key];
      if (d && statusR.current === "running") { e.preventDefault(); steer(d); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); if (timerR.current) clearTimeout(timerR.current); };
  }, [dark]);

  useEffect(() => { paint(); }, [dark]);

  return (
    <div className="flex flex-col items-center gap-0 w-full">
      {/* Label */}
      <div className="flex items-center gap-2 mb-4 self-start">
        <span className="mono text-xs tracking-widest uppercase" style={{ color: "#6366f1" }}>Play Snake</span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ui.status === "running" ? "#22c55e" : "#6366f1", boxShadow: ui.status === "running" ? "0 0 6px #22c55e" : "none" }} />
      </div>

      {/* Game card */}
      <div className="w-full rounded-2xl overflow-hidden" style={{
        background: dark ? "#111118" : "#ffffff",
        border: `1px solid ${dark ? "#23233a" : "#e0e7ff"}`,
        boxShadow: dark ? "0 4px 32px rgba(99,102,241,0.14)" : "0 4px 32px rgba(99,102,241,0.10)",
      }}>

        {/* Score strip */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${dark ? "#1e1e2a" : "#ede9fe"}` }}>
          <div>
            <p className="mono text-xs mb-0.5" style={{ color: dark ? "#55556a" : "#a78bfa" }}>SCORE</p>
            <p className="font-display font-700 text-xl leading-none" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{ui.score}</p>
          </div>
          <div className="mono text-xs font-medium" style={{ color: "#6366f1" }}>GAME</div>
          <div className="text-right">
            <p className="mono text-xs mb-0.5" style={{ color: dark ? "#55556a" : "#a78bfa" }}>BEST</p>
            <p className="font-display font-700 text-xl leading-none" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{ui.best}</p>
          </div>
        </div>

        {/* Canvas */}
        <div className="p-3 flex justify-center" style={{ background: dark ? "#0d0d16" : "#f5f3ff" }}>
          <canvas
            ref={canvasRef}
            width={SN_SIZE}
            height={SN_SIZE}
            style={{ maxWidth: "100%", display: "block", borderRadius: 8 }}
            onTouchStart={(e) => { swipeR.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
            onTouchEnd={(e) => {
              if (!swipeR.current || statusR.current !== "running") return;
              const dx = e.changedTouches[0].clientX - swipeR.current.x;
              const dy = e.changedTouches[0].clientY - swipeR.current.y;
              if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
              steer(Math.abs(dx) > Math.abs(dy)
                ? (dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
                : (dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }));
            }}
          />
        </div>

        {/* Footer controls */}
        <div className="flex items-center gap-4 px-4 py-3" style={{ borderTop: `1px solid ${dark ? "#1e1e2a" : "#ede9fe"}` }}>
          {/* Start / Restart */}
          <button
            onClick={start}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium mono transition-all"
            style={{
              background: "#6366f1",
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4f46e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#6366f1")}
          >
            {ui.status === "idle" ? "▶  Start Game" : "↺  Restart"}
          </button>

          {/* D-pad */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 34px)", gridTemplateRows: "repeat(3, 34px)", gap: 2, flexShrink: 0 }}>
            {([
              { d: { x: 0, y: -1 }, icon: "↑", col: 2, row: 1 },
              { d: { x: -1, y: 0 }, icon: "←", col: 1, row: 2 },
              { d: { x: 1, y: 0 }, icon: "→", col: 3, row: 2 },
              { d: { x: 0, y: 1 }, icon: "↓", col: 2, row: 3 },
            ] as { d: Pt; icon: string; col: number; row: number }[]).map(({ d, icon, col, row }) => (
              <button
                key={icon}
                onPointerDown={(e) => { e.preventDefault(); if (statusR.current === "running") steer(d); }}
                style={{
                  gridColumn: col, gridRow: row,
                  width: 34, height: 34,
                  background: dark ? "#1e1e2a" : "#ede9fe",
                  border: `1px solid ${dark ? "#2a2a3a" : "#c4b5fd"}`,
                  color: "#6366f1",
                  borderRadius: 8,
                  fontSize: 14, fontWeight: 700,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  touchAction: "none", userSelect: "none",
                }}
              >{icon}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="mono text-xs mt-3 self-center" style={{ color: dark ? "#55556a" : "#a78bfa" }}>
        Arrow keys · WASD · swipe · or D-pad
      </p>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const ref = useReveal();
  return (
    <section id="about" className="py-28" style={{ background: dark ? "#0a0a0f" : "#ffffff" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal reveal-delay-1 flex justify-center">
            <SnakeGame dark={dark} />
          </div>
          <div className="reveal reveal-delay-2">
            <SectionLabel text={t.about_label} dark={dark} />
            <h2 className="font-display font-700 mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: dark ? "#f0f0f8" : "#111827", lineHeight: 1.15 }}>
              {t.about_heading1} <span className="gradient-text">{t.about_heading2}</span>
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>
              {t.about_p1.replace("Tallinn University of Technology (TalTech)", "")}
              <strong style={{ color: "#a78bfa" }}>Tallinn University of Technology (TalTech)</strong>
              {t.about_p1.split("Tallinn University of Technology (TalTech)")[1] || ""}
            </p>
            <p className="leading-relaxed mb-8" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{t.about_p2}</p>
            <div className="flex flex-wrap gap-2">
              {t.about_tags.split(",").map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-medium mono"
                  style={{ background: dark ? "#16161f" : "#f3f4f6", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`, color: dark ? "#8b8ba0" : "#6b7280" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function Education({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const ref = useReveal();
  return (
    <section id="education" className="py-28" style={{ background: dark ? "#111118" : "#f8faff" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <SectionLabel text={t.edu_label} dark={dark} />
          <h2 className="font-display font-700" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: dark ? "#f0f0f8" : "#111827" }}>
            {t.edu_heading1} <span className="gradient-text">{t.edu_heading2}</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px" style={{ background: dark ? "#1e1e2a" : "#e5e7eb", transform: "translateX(-50%)" }} />
          <div className="relative md:grid md:grid-cols-2 gap-12 items-center reveal reveal-delay-1">
            <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full -translate-x-1/2 z-10"
              style={{ background: "#6366f1", boxShadow: "0 0 16px rgba(99,102,241,0.5)" }} />
            <div className="md:pr-10 ml-8 md:ml-0 card-hover">
              <div className="rounded-2xl p-8 h-full" style={{ background: dark ? "#16161f" : "#ffffff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}>
                <div className="flex items-center gap-4 mb-6">
                  <img src={schoolLogo} alt="TalTech logo" className="h-14 w-14 rounded-xl object-cover" style={{ border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }} />
                  <div>
                    <div className="mono text-xs uppercase tracking-widest mb-1" style={{ color: "#6366f1" }}>{t.edu_current}</div>
                    <h3 className="font-display font-700 text-lg leading-tight" style={{ color: dark ? "#f0f0f8" : "#111827" }}>Tallinn University of Technology</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    [t.edu_degree, t.edu_deg_val],
                    [t.edu_field, t.edu_field_val],
                    [t.edu_location, t.edu_loc_val],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{label}</span>
                      <span className="text-sm font-medium" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{val}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <span className="text-sm" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{t.edu_status}</span>
                    <span className="text-xs mono px-2 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>{t.edu_stat_val}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:pl-10 card-hover">
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}`, aspectRatio: "16/10" }}>
                <img src={schoolPicture} alt="TalTech campus" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
const SKILL_ICONS: Record<string, JSX.Element> = {
  C: (
    <svg viewBox="0 0 128 128" width="38" height="38">
      <path fill="#03599C" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
      <path fill="#0277BD" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
      <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-13-7.6z"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 128 128" width="38" height="38">
      <linearGradient id="pyGrad1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
        <stop offset="0" stopColor="#5A9FD4"/>
        <stop offset="1" stopColor="#306998"/>
      </linearGradient>
      <linearGradient id="pyGrad2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
        <stop offset="0" stopColor="#FFD43B"/>
        <stop offset="1" stopColor="#FFE873"/>
      </linearGradient>
      <path fill="url(#pyGrad1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
      <path fill="url(#pyGrad2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 128 128" width="38" height="38">
      <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
      <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
      <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 128 128" width="38" height="38">
      <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
      <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
      <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
      <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/>
      <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/>
      <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-6.982-.331-3.741h34.646zm-.047 27.994v13.831H49.023l-.277-3.108-.631-6.982-.33-3.741h16.216z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 32 32" width="38" height="38">
      <rect width="32" height="32" rx="3" fill="#F7DF1E"/>
      <path fill="#222" d="M9.1 25.2l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V14h2.8v9.5c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4.2-2.3zm8.5-.3l2.3-1.4c.6 1 1.3 1.7 2.7 1.7 1.1 0 1.8-.6 1.8-1.3 0-.9-.7-1.2-1.9-1.8l-.7-.3c-1.9-.8-3.2-1.8-3.2-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2.2 1.4c-.5-.8-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.1 1.7 1.7l.7.3c2.3 1 3.5 2 3.5 4.2 0 2.4-1.9 3.7-4.4 3.7-2.5 0-4-1.2-4.9-2.8z"/>
    </svg>
  ),
  Engineering: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
    </svg>
  ),
  "Problem Solving": (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7Z"/>
      <path d="M9 21h6M10 17v1M14 17v1"/>
    </svg>
  ),
  Automation: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1" fill="#34d399"/>
      <path d="M8 11V7a4 4 0 0 1 8 0"/>
    </svg>
  ),
};

const SKILLS = [
  { name: "Python", level: 70 },
  { name: "HTML", level: 80 },
  { name: "CSS", level: 75 },
  { name: "JavaScript", level: 65 },
  { name: "C", level: 60 },
  { name: "Engineering", level: 72 },
  { name: "Problem Solving", level: 85 },
  { name: "Automation", level: 65 },
];

function Skills({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const ref = useReveal();
  return (
    <section id="skills" className="py-28" style={{ background: dark ? "#0a0a0f" : "#ffffff" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <SectionLabel text={t.skills_label} dark={dark} />
          <h2 className="font-display font-700" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: dark ? "#f0f0f8" : "#111827" }}>
            {t.skills_heading1} <span className="gradient-text">{t.skills_heading2}</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{t.skills_sub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((skill, i) => (
            <div key={skill.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} card-hover rounded-2xl p-6`}
              style={{ background: dark ? "#16161f" : "#f8faff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}>
              <div className="mb-3">{SKILL_ICONS[skill.name]}</div>
              <div className="font-display font-600 mb-1" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{skill.name}</div>
              <div className="mono text-xs mb-3" style={{ color: "#6366f1" }}>{skill.level}%</div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: dark ? "#1e1e2a" : "#e5e7eb" }}>
                <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #6366f1, #a78bfa)", transition: "width 1.2s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
const PROJECTS_DATA = [
  {
    color: "#6366f1",
    label: "— Robotics",
    title: "Self-Driving Robot Car",
    desc: "An autonomous robot car built with Arduino and ultrasonic sensors. It detects obstacles in real time and navigates independently using IR sensors and a motor driver module.",
    tech: ["C", "Arduino", "Sensors", "Automation"],
    img: "https://images.unsplash.com/photo-1558137623-ce933996c730?w=600&h=320&fit=crop&auto=format",
    imgAlt: "Self-driving robot car",
  },
  {
    color: "#8b5cf6",
    label: "— Portfolio",
    title: "My Portfolio Site",
    img: portfolioImg,
    imgAlt: "My Portfolio Site",
    desc: "A fully responsive personal portfolio website built with React, Vite, and Tailwind CSS. Features dark/light mode, multilingual support, and smooth animations.",
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    color: "#a78bfa",
    label: "— Robotics",
    title: "Smart Parking Lot System",
    desc: "An IoT-based smart parking system using sensors to detect free and occupied spots in real time. Displays live availability data and guides drivers to open spaces automatically.",
    tech: ["C", "Arduino", "IoT", "Engineering"],
    img: "https://images.unsplash.com/photo-1697761221129-fdf528507890?w=600&h=320&fit=crop&auto=format",
    imgAlt: "Smart parking lot aerial view",
  },
];

function Projects({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const ref = useReveal();
  return (
    <section id="projects" className="py-28" style={{ background: dark ? "#111118" : "#f8faff" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <SectionLabel text={t.proj_label} dark={dark} />
          <h2 className="font-display font-700" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: dark ? "#f0f0f8" : "#111827" }}>
            {t.proj_heading1} <span className="gradient-text">{t.proj_heading2 || "Work"}</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{t.proj_sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((p, i) => (
            <div key={p.title}
              className={`reveal reveal-delay-${i + 1} card-hover rounded-2xl overflow-hidden`}
              style={{ background: dark ? "#16161f" : "#ffffff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}>
              <div className="h-1 w-full" style={{ background: p.color }} />
              <div className="w-full overflow-hidden" style={{ height: "180px", borderBottom: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}>
                {typeof p.img === "string" && p.img.startsWith("http") ? (
                  <img src={p.img} alt={p.imgAlt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                ) : (
                  <img src={p.img as string} alt={p.imgAlt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                )}
              </div>
              <div className="p-6">
                <div className="mono text-xs uppercase tracking-widest mb-2" style={{ color: p.color }}>{p.label}</div>
                <h3 className="font-display font-600 text-lg mb-3" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded-md text-xs mono" style={{ background: dark ? "#1e1e2a" : "#f3f4f6", color: dark ? "#8b8ba0" : "#6b7280" }}>{tech}</span>
                  ))}
                </div>
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`, color: dark ? "#8b8ba0" : "#6b7280" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = dark ? "#2a2a3a" : "#e5e7eb"; e.currentTarget.style.color = dark ? "#8b8ba0" : "#6b7280"; }}
                >{t.proj_btn} →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:huseyn.huseynli.personal@proton.me?subject=${subject}&body=${body}`);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const contactItems = [
    {
      icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>,
      label: "Email", value: "huseyn.huseynli.personal@proton.me", href: "mailto:huseyn.huseynli.personal@proton.me",
    },
    {
      icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
      label: t.linkedin, value: "huseyn-huseynli", href: "https://www.linkedin.com/in/huseyn-huseynli-22b23641b/",
    },
  ];

  const inputStyle = {
    background: dark ? "#111118" : "#f9fafb",
    border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`,
    color: dark ? "#f0f0f8" : "#111827",
  };

  return (
    <section id="contact" className="py-28" style={{ background: dark ? "#0a0a0f" : "#ffffff" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <SectionLabel text={t.contact_label} dark={dark} />
          <h2 className="font-display font-700" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: dark ? "#f0f0f8" : "#111827" }}>
            {t.contact_heading1} <span className="gradient-text">{t.contact_heading2}</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}>{t.contact_sub}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 reveal reveal-delay-1">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href} target={item.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl card-hover transition-all block"
                style={{ background: dark ? "#16161f" : "#f8faff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}`, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = dark ? "#2a2a3a" : "#e5e7eb")}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}>{item.icon}</div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{item.label}</div>
                  <div className="text-sm font-medium" style={{ color: dark ? "#f0f0f8" : "#111827" }}>{item.value}</div>
                </div>
                <div className="ml-auto" style={{ color: dark ? "#55556a" : "#9ca3af" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </a>
            ))}
          </div>
          <div className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl space-y-5"
              style={{ background: dark ? "#16161f" : "#f8faff", border: `1px solid ${dark ? "#2a2a3a" : "#e5e7eb"}` }}>
              {[
                { key: "name", label: t.form_name, ph: t.form_name_ph, type: "text" },
                { key: "email", label: t.form_email, ph: t.form_email_ph, type: "email" },
              ].map(({ key, label, ph, type }) => (
                <div key={key}>
                  <label className="text-xs mono block mb-2" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{label}</label>
                  <input type={type} required placeholder={ph}
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = dark ? "#2a2a3a" : "#e5e7eb")} />
                </div>
              ))}
              <div>
                <label className="text-xs mono block mb-2" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{t.form_msg}</label>
                <textarea required placeholder={t.form_msg_ph} rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = dark ? "#2a2a3a" : "#e5e7eb")} />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-xl font-medium text-sm transition-all"
                style={{ background: "#6366f1", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#4f46e5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#6366f1")}>
                {sent ? t.form_sent : t.form_btn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ t, dark }: { t: Record<string, string>; dark: boolean }) {
  const navLabels: Record<string, string> = {
    home: t.nav_home, about: t.nav_about, education: t.nav_education,
    skills: t.nav_skills, projects: t.nav_projects, contact: t.nav_contact,
  };
  return (
    <footer className="py-12" style={{ background: dark ? "#111118" : "#f8faff", borderTop: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={schoolLogo} alt="Logo" className="h-8 w-8 rounded object-cover" />
              <span className="font-display font-700 text-lg" style={{ color: dark ? "#f0f0f8" : "#111827" }}>
                Huseyn<span style={{ color: "#6366f1" }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: dark ? "#55556a" : "#9ca3af" }}>
              Engineering student at TalTech, passionate about technology and building practical solutions.
            </p>
          </div>
          <div>
            <div className="mono text-xs uppercase tracking-widest mb-4" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{t.footer_nav}</div>
            <div className="space-y-2">
              {NAV_IDS.map((id) => (
                <button key={id} onClick={() => scrollTo(id)} className="block text-sm transition-colors"
                  style={{ color: dark ? "#8b8ba0" : "#6b7280" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#8b8ba0" : "#6b7280")}>
                  {navLabels[id]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mono text-xs uppercase tracking-widest mb-4" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{t.footer_contact}</div>
            <div className="space-y-2">
              <a href="mailto:huseyn.huseynli.personal@proton.me" className="block text-sm transition-colors" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#8b8ba0" : "#6b7280")}>
                huseyn.huseynli.personal@proton.me
              </a>
              <a href="https://www.linkedin.com/in/huseyn-huseynli-22b23641b/" target="_blank" rel="noopener noreferrer"
                className="block text-sm transition-colors" style={{ color: dark ? "#8b8ba0" : "#6b7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.color = dark ? "#8b8ba0" : "#6b7280")}>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${dark ? "#1e1e2a" : "#e5e7eb"}` }}>
          <span className="mono text-xs" style={{ color: dark ? "#55556a" : "#9ca3af" }}>
            © {new Date().getFullYear()} Huseyn Huseynli. {t.footer_copy}
          </span>
          <span className="mono text-xs" style={{ color: dark ? "#55556a" : "#9ca3af" }}>{t.footer_sub}</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("en");
  const dark = theme === "dark";
  const t = T[lang];
  const dir = LANGS[lang].dir;

  // Close lang dropdown on outside click
  useEffect(() => {
    document.documentElement.style.setProperty("color-scheme", theme);
  }, [theme]);

  return (
    <div dir={dir} className="min-h-screen" style={{ background: dark ? "#0a0a0f" : "#ffffff" }}>
      <Nav theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} t={t} dark={dark} />
      <Hero t={t} dark={dark} />
      <About t={t} dark={dark} />
      <Education t={t} dark={dark} />
      <Skills t={t} dark={dark} />
      <Projects t={t} dark={dark} />
      <Contact t={t} dark={dark} />
      <Footer t={t} dark={dark} />
    </div>
  );
}
