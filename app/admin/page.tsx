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
import { Tabs, TabsList,TabsTrigger } from "@/components/ui/tabs";

type Course = {
  title: string;
  teacher: string;
  salle: string;
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

const coursesByPeriod: Record<FilterPeriod, Course[]> = {
  "Aujourd'hui": [
    {
      title: "Algorithme complexe",
      teacher: "M. Mabirou",
      salle: "E45",
      duration: "3h 25",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou",
      salle: "E40",
      duration: "2h 00",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo",
      salle: "E52",
      duration: "1h 30",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou",
      salle: "B12",
      duration: "2h 00",
      icon: Sigma,
    },
  ],
  "Cette semaine": [
    {
      title: "Programmation Web",
      teacher: "M. Okemba",
      salle: "E41",
      duration: "4h 00",
      icon: Network,
    },
    {
      title: "Syst\u00e8me d'exploitation",
      teacher: "Dr Mouanda",
      salle: "B20",
      duration: "2h 30",
      icon: Database,
    },
    {
      title: "Architecture ordinateur",
      teacher: "Dr Bitemo",
      salle: "E12",
      duration: "1h 45",
      icon: Atom,
    },
    {
      title: "Probabilit\u00e9s",
      teacher: "Dr Mavoungou",
      salle: "B12",
      duration: "2h 15",
      icon: Sigma,
    },
  ],
  "Ce mois": [
    {
      title: "G\u00e9nie logiciel",
      teacher: "M. Mabirou",
      salle: "E45",
      duration: "12h 00",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou",
      salle: "E40",
      duration: "8h 30",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo",
      salle: "E52",
      duration: "6h 45",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou",
      salle: "B12",
      duration: "7h 00",
      icon: Sigma,
    },
  ],
  "ce semestre": [
    {
      title: "Algorithme complexe",
      teacher: "M. Mabirou",
      salle: "E45",
      duration: "42h 00",
      icon: Network,
    },
    {
      title: "Base de donn\u00e9es",
      teacher: "Dr Ngoubou",
      salle: "E40",
      duration: "36h 00",
      icon: Database,
    },
    {
      title: "R\u00e9seauxinformatique",
      teacher: "Dr Eyogo",
      salle: "E52",
      duration: "28h 30",
      icon: Atom,
    },
    {
      title: "Analyse I",
      teacher: "Dr Mavoungou",
      salle: "B12",
      duration: "31h 00",
      icon: Sigma,
    },
  ],
};

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>("Aujourd'hui");
  const courses = coursesByPeriod[activeFilter];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#310048] text-white">
      <div className="flex min-h-screen w-full flex-col ">

        <header className="fixed z-9999 pb-10 pt-10 w-full bg-[#310048] flex h-22 items-center justify-between border-b border-black/30 px-4.5 pl-4 max-[700px]:h-19">
            <div className="min-w-0 items-center">
                <h1 className="m-0 text-[25px] font-extrabold leading-none tracking-normal text-white max-[700px]:text-[21px]">
                Gestion des retards
                </h1>
                <p className="mt-2 text-sm text-white/85">
                Consulter tous les retards des enseignants.
                </p>
            </div>

            <Image
                src="/images/udsn-logo.png"
                alt="Logo Université Denis Sassou-N'Guesso"
                width={48}
                height={56}
                className="h-14 w-12 shrink-0 object-contain hidden sm:block"
                priority
            />
        </header>

        <section className="flex mt-20 min-h-screen flex-1 flex-col bg-[#310048] px-4 pb-8 pt-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto grid w-full max-w-350 grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article
                key={item.title}
                className={`${item.className} flex min-h-31.5 flex-col rounded-[16px] px-5.25 pb-3.5 pt-4.25 shadow-[0_12px_22px_rgba(0,0,0,0.08)]`}
              >
                <p className="m-0 text-[12px] font-extrabold leading-none tracking-normal text-white">{item.title}</p>
                <strong className="mt-3.5 block text-[31px] font-extrabold leading-none tracking-normal text-white">
                  {item.value}
                </strong>
                <div className="mt-auto h-px bg-white/70" />
                <div className="mt-3.25 flex items-center justify-between text-[11px] font-extrabold uppercase leading-none text-white">
                  <span>{item.footer}</span>
                  {item.extra && <span>{item.extra}</span>}
                </div>
              </article>
            ))}
          </div>

          <section className="mx-auto mt-12 flex w-full max-w-305 flex-1 flex-col rounded-xl bg-[#931edb] px-5 pb-8 pt-6 sm:px-8 lg:mt-16 lg:px-10">
            <div className="sm:flex sm:justify-between">
                <h1 className="mb-1.5 text-[25px] font-extrabold leading-none tracking-normal text-white sm:text-[27px]">
                    Enseignements
                </h1>
                <Tabs defaultValue="today">
                    <TabsList className="bg-[#310048]">
                        <TabsTrigger value="today" className="text-white">Aujourd'hui</TabsTrigger>
                        <TabsTrigger value="week" className="text-white">Cette semaine</TabsTrigger>
                        <TabsTrigger value="month" className="text-white">Ce mois</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="mt-5 h-px bg-white/45" />

            <div className="mt-8.25 flex flex-col gap-8.5">
              {courses.map((course) => {
                const Icon = course.icon;

                return (
                    <div
                        key={`${activeFilter}-${course.title}`}
                        className="grid grid-cols-[44px_1fr_auto] items-center gap-3 text-white sm:grid-cols-[48px_1fr_72px]"
                    >
                        <div className="w-xl">
                            <h2 className="m-0 text-xl font-extrabold leading-none tracking-normal text-white sm:text-[17px]">
                                {course.title}
                            </h2>
                            <div className="mt-2.25 flex items-center gap-2">
                                <p className="text-xs font-medium leading-none text-white">{course.teacher}</p>
                                <div className="bg-green-300 h-2 aspect-square rounded-full"/>
                                <p className="text-xs font-medium leading-none text-white">Salle {course.salle}</p>
                            </div>

                        </div>
                        <span className="justify-self-end text-xs font-medium leading-none text-white sm:text-[13px]">
                        {course.duration}
                        </span>
                    </div>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
