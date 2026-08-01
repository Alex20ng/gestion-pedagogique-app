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
import { cn } from "@/lib/utils";

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
        count: "20",
        label: "Etudiants",
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
    <main className="min-h-screen text-white bg-[#310048]">
        <section className="min-w-0 pt-6 sm:pt-0">
          <header className="flex h-22 items-center justify-between border-b border-black/30 px-4.5 pl-4 max-[700px]:h-19">
            <div className="min-w-0 items-center">
              <h1 className="m-0 text-[25px] font-extrabold leading-none tracking-normal text-white max-[700px]:text-[21px]">
                Gestion des classes
              </h1>
              <p className="mt-2 text-sm text-white/85">
                Selectionnez un parcours à fin de consulter ses classes ainsi que ses emplois du temps.
              </p>
            </div>

            <Image
              src="/images/logo_UDSN.png"
              alt="Logo UniversitÃ© Denis Sassou-N'Guesso"
              width={48}
              height={56}
              className="h-14 w-12 shrink-0 object-contain max-[460px]:hidden"
              priority
            />
          </header>

          <section className="mx-2 mb-6 mt-4 rounded-xl pb-7 border border-gray-600">
            <div className="px-7 pb-5.25 flex w-full flex-col gap-7 self-center sm:mt-9.5 ">
              {departments.map((department) => {
                const isOpen = openDepartment === department.name;

                return (
                  <section key={department.name} className="w-full">
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenDepartment(isOpen ? "" : department.name)}
                        className="flex w-full justify-between border-0 bg-transparent p-0 text-left text-[18px] font-medium leading-none text-white sm:text-[21px]"
                      >
                        {department.name}
                      <ChevronDown
                        className={cn("h-5 aspect-square transition-transform", isOpen ? "rotate-180" : "")}
                        strokeWidth={1.65}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className={cn("mt-7.75 grid w-full grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3", department.levels.length > 3 ? "xl:max-w-245 xl:grid-cols-5" : "lg:max-w-162.5 xl:max-w-190")}>
                        {department.levels.map((level) => (
                          <div
                            key={level.name}
                            className={`${level.className} flex h-27 min-w-0 flex-col items-center justify-center rounded-[13px] px-4 text-center text-white shadow-[0_14px_24px_rgba(0,0,0,0.08)]`}
                          >
                            <h2 className="m-0 text-[19px] font-extrabold leading-none tracking-normal text-white">
                              {level.name}
                            </h2>
                            <div className="mt-4 flex items-center justify-center gap-0.75">
                              <Users className="h-6 aspect-square shrink-0 text-white" strokeWidth={1.55} aria-hidden="true" />
                              <div className="text-left text-[10px] font-extrabold uppercase leading-[0.95] text-white">
                                <strong className="block text-[10px] leading-none">{level.count}</strong>
                                <span>{level.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </section>
        </section>
    </main>
  );
}



