"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Home,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Emploi du temps", href: "/emploi-du-temps", icon: CalendarDays },
  { label: "Classe", href: "/classe", icon: GraduationCap, active: true },
];

const departments = [
  {
    name: "Math-info",
    levels: [
      {
        name: "L1",
        count: "00",
        label: "Retards",
        className: "bg-[#ef7d09]",
      },
      {
        name: "L2",
        count: "36",
        label: "\u00c9tudiants",
        className: "bg-[#358be6]",
      },
      {
        name: "L3",
        count: "26",
        label: "\u00c9tudiants",
        className: "bg-[#087310]",
      },
    ],
  },
  {
    name: "Biologie",
    levels: [
      {
        name: "L1",
        count: "18",
        label: "\u00c9tudiants",
        className: "bg-[#ef7d09]",
      },
      {
        name: "L2",
        count: "24",
        label: "\u00c9tudiants",
        className: "bg-[#358be6]",
      },
      {
        name: "L3",
        count: "19",
        label: "\u00c9tudiants",
        className: "bg-[#087310]",
      },
      {
        name: "M1",
        count: "12",
        label: "\u00c9tudiants",
        className: "bg-[#7b1126]",
      },
      {
        name: "M2",
        count: "09",
        label: "\u00c9tudiants",
        className: "bg-[#4b2fd6]",
      },
    ],
  },
  {
    name: "Physiques",
    levels: [
      {
        name: "L1",
        count: "21",
        label: "\u00c9tudiants",
        className: "bg-[#ef7d09]",
      },
      {
        name: "L2",
        count: "29",
        label: "\u00c9tudiants",
        className: "bg-[#358be6]",
      },
      {
        name: "L3",
        count: "17",
        label: "\u00c9tudiants",
        className: "bg-[#087310]",
      },
      {
        name: "M1",
        count: "11",
        label: "\u00c9tudiants",
        className: "bg-[#7b1126]",
      },
      {
        name: "M2",
        count: "08",
        label: "\u00c9tudiants",
        className: "bg-[#4b2fd6]",
      },
    ],
  },
  {
    name: "Chimie",
    levels: [
      {
        name: "L1",
        count: "15",
        label: "\u00c9tudiants",
        className: "bg-[#ef7d09]",
      },
      {
        name: "L2",
        count: "22",
        label: "\u00c9tudiants",
        className: "bg-[#358be6]",
      },
      {
        name: "L3",
        count: "14",
        label: "\u00c9tudiants",
        className: "bg-[#087310]",
      },
      {
        name: "M1",
        count: "10",
        label: "\u00c9tudiants",
        className: "bg-[#7b1126]",
      },
      {
        name: "M2",
        count: "07",
        label: "\u00c9tudiants",
        className: "bg-[#4b2fd6]",
      },
    ],
  },
];

export default function ClassePage() {
  const [openDepartment, setOpenDepartment] = useState("Math-info");

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#2a003d] text-white">
      <div className="flex min-h-screen w-full flex-col bg-[#2a003d] lg:flex-row">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-black/30 bg-[#2a003d] lg:flex">
          <div className="flex h-[132px] items-center border-b border-black/30 px-6">
            <p className="m-0 text-[14px] font-extrabold leading-none tracking-normal text-white">
              {"Gestion P\u00e9dagogique"}
            </p>
          </div>

          <nav className="mt-[92px] flex flex-col gap-[29px] px-[31px]" aria-label="Menu principal">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex h-[48px] items-center gap-[20px] rounded-[9px] px-[12px] text-[12px] font-extrabold leading-none text-white no-underline ${
                    item.active ? "bg-[rgba(174,153,190,0.68)]" : "bg-transparent"
                  }`}
                >
                  <Icon className="h-[24px] w-[24px] shrink-0 text-white" strokeWidth={1.65} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        <header className="flex items-center justify-between border-b border-black/25 bg-[#2a003d] px-4 py-3 lg:hidden">
          <div>
            <p className="m-0 text-[13px] font-extrabold leading-none text-white">{"Gestion P\u00e9dagogique"}</p>
            <h1 className="mt-2 text-[20px] font-extrabold leading-none tracking-normal text-white">Classe</h1>
          </div>

          <Image
            src="/images/udsn-logo.png"
            alt={"Logo Universit\u00e9 Denis Sassou-N'Guesso"}
            width={52}
            height={60}
            className="h-[58px] w-[52px] object-contain"
            priority
          />
        </header>

        <section className="flex min-h-screen flex-1 flex-col bg-[#2a003d] lg:min-h-0">
          <header className="hidden h-[132px] items-center justify-between border-b border-black/25 bg-[#2a003d] px-[18px] lg:flex">
            <h1 className="m-0 text-[20px] font-extrabold leading-none tracking-normal text-white">Classe</h1>

            <Image
              src="/images/udsn-logo.png"
              alt={"Logo Universit\u00e9 Denis Sassou-N'Guesso"}
              width={58}
              height={68}
              className="h-[68px] w-[58px] object-contain"
              priority
            />
          </header>

          <nav
            className="grid grid-cols-3 gap-2 border-b border-white/10 bg-[#2a003d] px-3 py-3 lg:hidden"
            aria-label="Menu principal mobile"
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center justify-center gap-2 rounded-[10px] px-2 text-center text-[11px] font-extrabold leading-tight text-white no-underline ${
                    item.active ? "bg-[rgba(174,153,190,0.68)]" : "bg-white/5"
                  }`}
                >
                  <Icon className="h-[19px] w-[19px] shrink-0" strokeWidth={1.65} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <section className="flex flex-1 bg-[#2a003d] lg:items-stretch">
            <div className="flex w-full flex-1 flex-col rounded-t-[28px] bg-[#931edb] px-4 pb-8 pt-4 sm:px-8 sm:pt-5 md:px-12 lg:rounded-bl-[34px] lg:rounded-br-[34px] lg:rounded-tl-none lg:rounded-tr-[34px] lg:px-[58px] lg:pb-10 lg:pt-[22px]">
              <div className="flex flex-wrap items-center gap-[9px]">
                <span className="text-[12px] font-medium leading-none text-white">
                  {"Facult\u00e9 des sciences appliqu\u00e9es"}
                </span>
                <span className="grid h-[24px] w-[24px] place-items-center overflow-hidden rounded-full bg-white">
                  <Image
                    src="/images/faculte-sciences-appliquees.jpg"
                    alt="Logo FacultÃ© des sciences appliquÃ©es"
                    width={24}
                    height={24}
                    className="h-[24px] w-[24px] object-cover"
                  />
                </span>
              </div>

              <div className="mt-[31px] flex w-full max-w-[760px] flex-col gap-[28px] self-center sm:mt-[38px] lg:self-start xl:max-w-[860px]">
                {departments.map((department) => {
                  const isOpen = openDepartment === department.name;

                  return (
                    <section key={department.name} className="w-full">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenDepartment(isOpen ? "" : department.name)}
                        className="flex w-full max-w-[230px] items-center justify-between gap-3 border-0 bg-transparent p-0 text-left text-[18px] font-medium leading-none text-white sm:text-[21px]"
                      >
                        <span>{department.name}</span>
                        <ChevronDown
                          className={`h-[20px] w-[20px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                          strokeWidth={1.65}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div className={`mt-[31px] grid w-full grid-cols-1 gap-5 min-[520px]:grid-cols-2 min-[520px]:gap-8 md:grid-cols-3 ${department.levels.length > 3 ? "xl:max-w-[980px] xl:grid-cols-5" : "lg:max-w-[650px] xl:max-w-[760px]"}`}>
                          {department.levels.map((level) => (
                            <article
                              key={level.name}
                              className={`${level.className} flex h-[108px] min-w-0 flex-col items-center justify-center rounded-[13px] px-4 text-center text-white shadow-[0_14px_24px_rgba(0,0,0,0.08)]`}
                            >
                              <h2 className="m-0 text-[19px] font-extrabold leading-none tracking-normal text-white">
                                {level.name}
                              </h2>
                              <div className="mt-[16px] flex items-center justify-center gap-[7px]">
                                <Users className="h-[15px] w-[15px] shrink-0 text-white" strokeWidth={1.55} aria-hidden="true" />
                                <div className="text-left text-[8px] font-extrabold uppercase leading-[0.95] text-white">
                                  <strong className="block text-[9px] leading-none">{level.count}</strong>
                                  <span>{level.label}</span>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}



