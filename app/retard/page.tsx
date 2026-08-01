"use client";

import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BarChart3,
  CalendarClock,
  Database,
  HelpCircle,
  Home,
  LogOut,
  Network,
  Sigma,
} from "lucide-react";

type Course = {
  title: string;
  teacher: string;
  duration: string;
  icon: LucideIcon;
};

const stats = [
  {
    title: "Total  Enseignants",
    value: "221",
    footer: "Fiches cr\u00e9\u00e9es",
    className: "bg-[#08730e]",
  },
  {
    title: "Retard observ\u00e9s",
    value: "35",
    footer: "4H SUR 820",
    className: "bg-[#4286e8]",
  },
  {
    title: "S\u00e9ances Pr\u00e9vues",
    value: "820h",
    footer: "CE MOIS",
    className: "bg-[#0b4b68]",
  },
  {
    title: "Heures Valid\u00e9es",
    value: "745h",
    footer: "SUR 820H",
    extra: "75%",
    className: "bg-[#f07d0b]",
  },
];

const filters = ["Aujourd'hui", "Cette semaine", "Ce mois", "ce semestre"] as const;
type FilterPeriod = (typeof filters)[number];

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Retard", href: "/retard", icon: CalendarClock, active: true },
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

const coursesByPeriod: Record<FilterPeriod, Course[]> = {
  "Aujourd'hui": [
    {
      title: "Algorithme complexe",
      teacher: "M. Mabirou Salle E45",
      duration: "3h 25",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou  salle E40",
      duration: "2h 00",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo  salle E52",
      duration: "1h 30",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou  salle B12",
      duration: "2h 00",
      icon: Sigma,
    },
  ],
  "Cette semaine": [
    {
      title: "Programmation Web",
      teacher: "M. Okemba salle E41",
      duration: "4h 00",
      icon: Network,
    },
    {
      title: "Syst\u00e8me d'exploitation",
      teacher: "Dr Mouanda salle B20",
      duration: "2h 30",
      icon: Database,
    },
    {
      title: "Architecture ordinateur",
      teacher: "Dr Bitemo salle E12",
      duration: "1h 45",
      icon: Atom,
    },
    {
      title: "Probabilit\u00e9s",
      teacher: "Dr Mavoungou salle B12",
      duration: "2h 15",
      icon: Sigma,
    },
  ],
  "Ce mois": [
    {
      title: "G\u00e9nie logiciel",
      teacher: "M. Mabirou Salle E45",
      duration: "12h 00",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou  salle E40",
      duration: "8h 30",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo  salle E52",
      duration: "6h 45",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou  salle B12",
      duration: "7h 00",
      icon: Sigma,
    },
  ],
  "ce semestre": [
    {
      title: "Algorithme complexe",
      teacher: "M. Mabirou Salle E45",
      duration: "42h 00",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou  salle E40",
      duration: "36h 00",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo  salle E52",
      duration: "28h 30",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou  salle B12",
      duration: "31h 00",
      icon: Sigma,
    },
  ],
};

export default function RetardPage() {
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>("Aujourd'hui");
  const courses = coursesByPeriod[activeFilter];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#2a003d] text-white">
      <div className="flex min-h-screen w-full flex-col bg-[#2a003d] md:flex-row">
        <aside className="hidden w-[184px] shrink-0 flex-col bg-[#2a003d] md:flex">
          <div className="pl-[47px] pt-[18px]">
            <Image
              src="/images/logo_UDSN.png"
              alt={"Logo Universit\u00e9 Denis Sassou-N'Guesso"}
              width={56}
              height={64}
              className="h-[62px] w-[56px] object-contain"
              priority
            />
          </div>

          <nav className="mt-[34px] flex flex-col gap-[28px] pl-[24px]" aria-label="Menu principal">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className="flex w-fit items-center gap-[10px] text-[16px] font-medium leading-none text-white no-underline"
                >
                  <Icon className="h-[25px] w-[25px] text-white" strokeWidth={1.75} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-[21px] pb-[31px] pl-[24px] text-[14px] font-medium text-[#8d4abb]">
            <a href="/support" className="flex items-center gap-[18px] text-[#8d4abb] no-underline">
              <HelpCircle className="h-[17px] w-[17px]" strokeWidth={1.55} aria-hidden="true" />
              <span>Support</span>
            </a>
            <a href="/connexion" className="flex items-center gap-[12px] text-[#8d4abb] no-underline">
              <LogOut className="h-[29px] w-[29px]" strokeWidth={1.6} aria-hidden="true" />
              <span>{"D\u00e9connexion"}</span>
            </a>
          </div>
        </aside>

        <header className="flex items-center justify-between border-b border-white/10 bg-[#2a003d] px-4 py-3 md:hidden">
          <Image
            src="/images/logo_UDSN.png"
            alt={"Logo Universit\u00e9 Denis Sassou-N'Guesso"}
            width={44}
            height={50}
            className="h-[50px] w-[44px] object-contain"
            priority
          />
          <nav className="flex items-center gap-2" aria-label="Menu principal mobile">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={item.active ? "page" : undefined}
                  className={`grid h-11 w-11 place-items-center rounded-full text-white no-underline ${
                    item.active ? "bg-white/14" : "bg-transparent"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </header>

        <section className="flex min-h-screen flex-1 flex-col bg-[#2a003d] px-4 pb-8 pt-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto grid w-full max-w-[1220px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article
                key={item.title}
                className={`${item.className} flex min-h-[126px] flex-col rounded-[16px] px-[21px] pb-[14px] pt-[17px] shadow-[0_12px_22px_rgba(0,0,0,0.08)]`}
              >
                <p className="m-0 text-[12px] font-extrabold leading-none tracking-normal text-white">{item.title}</p>
                <strong className="mt-[14px] block text-[31px] font-extrabold leading-none tracking-normal text-white">
                  {item.value}
                </strong>
                <div className="mt-auto h-px bg-white/70" />
                <div className="mt-[13px] flex items-center justify-between text-[11px] font-extrabold uppercase leading-none text-white">
                  <span>{item.footer}</span>
                  {item.extra && <span>{item.extra}</span>}
                </div>
              </article>
            ))}
          </div>

          <section className="mx-auto mt-12 flex w-full max-w-[1220px] flex-1 flex-col rounded-[44px] bg-[#931edb] px-5 pb-8 pt-6 sm:px-8 lg:mt-16 lg:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="m-0 text-[25px] font-extrabold leading-none tracking-normal text-white sm:text-[27px]">
                Enseignemets
              </h1>
              <div className="flex flex-wrap items-center gap-[9px] sm:pt-[21px]">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(filter)}
                      className={`h-[27px] rounded-full px-[13px] text-[10px] font-semibold leading-none text-white transition-colors ${
                        isActive ? "bg-[#18dda0]" : "bg-[#7b28b0] hover:bg-[#8531bc]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-[32px] h-px bg-white/45" />

            <div className="mt-[33px] flex flex-col gap-[34px]">
              {courses.map((course) => {
                const Icon = course.icon;

                return (
                  <article
                    key={`${activeFilter}-${course.title}`}
                    className="grid grid-cols-[44px_1fr_auto] items-center gap-3 text-white sm:grid-cols-[48px_1fr_72px]"
                  >
                    <Icon className="h-[32px] w-[32px] text-white" strokeWidth={1.65} aria-hidden="true" />
                    <div className="min-w-0">
                      <h2 className="m-0 truncate text-[16px] font-extrabold leading-none tracking-normal text-white sm:text-[17px]">
                        {course.title}
                      </h2>
                      <p className="mt-[9px] truncate text-[12px] font-medium leading-none text-white">{course.teacher}</p>
                    </div>
                    <span className="justify-self-end text-[12px] font-medium leading-none text-white sm:text-[13px]">
                      {course.duration}
                    </span>
                  </article>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
