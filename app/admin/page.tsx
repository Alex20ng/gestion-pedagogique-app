"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpen,
  Database,
  Loader2,
  Network,
  Sigma,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  getAllRetard,
  RetardItem,
  Periode,
  getDashboardStats,
  DashboardStats,
} from "./action";

// Rotation d'icônes puisque l'API ne renvoie pas d'icône par cours
const ICONS: LucideIcon[] = [Network, Database, Atom, Sigma, BookOpen];

type FilterPeriod = "today" | "week" | "month";

const TAB_LABELS: Record<FilterPeriod, string> = {
  today: "Aujourd'hui",
  week: "Cette semaine",
  month: "Ce mois",
};

const PERIOD_TO_PERIODE: Record<FilterPeriod, Periode> = {
  today: "jour",
  week: "semaine",
  month: "mois",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}` : `${m} min`;
}

// Clés de date utilisées pour retrouver, dans les tableaux retournés par
// get_statistiques_retards, l'entrée correspondant à "aujourd'hui" /
// "cette semaine" / "ce mois" (les jours/semaines sans retard n'apparaissent
// pas dans le tableau, donc une absence de correspondance = 0 retard).
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function currentWeekMondayISO() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 = dimanche
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diffToMonday)
  );
  return monday.toISOString().slice(0, 10);
}

function currentMonthLabel() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterPeriod>("today");
  const [retards, setRetards] = useState<RetardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function fetchRetards() {
      setIsLoading(true);

      try {
        const result = await getAllRetard(PERIOD_TO_PERIODE[activeFilter]);

        if (isCancelled) return;

        if (!result.success) {
          toast.error(result.message);
          setRetards([]);
          return;
        }

        setRetards(result.data);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchRetards();

    return () => {
      isCancelled = true;
    };
  }, [activeFilter]);

  useEffect(() => {
    async function fetchStats() {
      setIsLoadingStats(true);

      try {
        const result = await getDashboardStats();

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setDashboardStats(result.data);
      } finally {
        setIsLoadingStats(false);
      }
    }

    fetchStats();
  }, []);

  const totalRetardsCount = retards.length;

  const todayEntry = dashboardStats?.retards_par_jour.find((r) => r.jour === todayISO());
  const weekEntry = dashboardStats?.retards_par_semaine.find(
    (r) => r.semaine === currentWeekMondayISO()
  );
  const monthEntry = dashboardStats?.retards_par_mois.find(
    (r) => r.label === currentMonthLabel()
  );

  const stats = [
    {
      title: "Total Enseignants",
      value: isLoadingStats ? "…" : String(dashboardStats?.total_enseignants ?? 0),
      footer: "Fiches créées",
      className: "bg-[#08730e]",
    },
    {
      title: "Retards d'aujourd'hui",
      value: isLoadingStats ? "…" : formatDuration(todayEntry?.total_minutes ?? 0),
      footer: `${todayEntry?.nombre_retards ?? 0} retard(s)`,
      className: "bg-[#0b4b68]",
    },
    {
      title: "Retard de la semaine",
      value: isLoadingStats ? "…" : formatDuration(weekEntry?.total_minutes ?? 0),
      footer: `${weekEntry?.nombre_retards ?? 0} retard(s)`,
      className: "bg-[#f07d0b]",
    },
    {
      title: "Retard du mois",
      value: isLoadingStats ? "…" : formatDuration(monthEntry?.total_minutes ?? 0),
      footer: `${monthEntry?.nombre_retards ?? 0} retard(s)`,
      className: "bg-[#f07d0b]",
    },
  ];

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
                </div>
              </article>
            ))}
          </div>

          <section className="mx-auto mt-12 flex w-full max-w-305 flex-1 flex-col rounded-xl bg-[#931edb] px-5 pb-8 pt-6 sm:px-8 lg:mt-16 lg:px-10">
            <div className="sm:flex sm:justify-between">
                <h1 className="mb-1.5 text-[25px] font-extrabold leading-none tracking-normal text-white sm:text-[27px]">
                    Retards
                </h1>
                <Tabs
                  value={activeFilter}
                  onValueChange={(value) => setActiveFilter(value as FilterPeriod)}
                >
                    <TabsList className="bg-[#310048]">
                        <TabsTrigger value="today" className="text-white">{TAB_LABELS.today}</TabsTrigger>
                        <TabsTrigger value="week" className="text-white">{TAB_LABELS.week}</TabsTrigger>
                        <TabsTrigger value="month" className="text-white">{TAB_LABELS.month}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="mt-5 h-px bg-white/45" />

            {isLoading ? (
              <div className="mt-10 flex items-center justify-center gap-2 text-white/70">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span className="text-sm">Chargement des retards...</span>
              </div>
            ) : retards.length === 0 ? (
              <p className="mt-10 text-center text-sm text-white/60">
                Aucun retard enregistré pour cette période.
              </p>
            ) : (
              <div className="mt-8.25 flex flex-col gap-8.5">
                {retards.map((retard, index) => {
                  const Icon = ICONS[index % ICONS.length];

                  return (
                      <div
                          key={retard.id}
                          className="grid grid-cols-[44px_1fr_auto] items-center gap-3 text-white sm:grid-cols-[48px_1fr_72px]"
                      >
                          <div className="w-xl">
                            <div className="flex gap-2 items-center">
                              <h2 className="m-0 text-xl font-extrabold leading-none tracking-normal text-white sm:text-[17px]">
                                {retard.cours.libelle}
                              </h2>
                              <div className="bg-purple-900 h-2 aspect-square rounded-full"/>
                              {retard.classe.libelle}
                            </div>
                              <div className="mt-2.25 flex items-center gap-2">
                                  <p className="text-xs font-medium leading-none text-white">
                                    {retard.enseignant.nom} {retard.enseignant.prenom}
                                  </p>
                                  <div className="bg-green-300 h-2 aspect-square rounded-full"/>
                                  <p className="text-xs font-medium leading-none text-white">Salle {retard.salle.libelle}</p>
                              </div>

                          </div>
                          <span className="justify-self-end text-xs font-medium leading-none text-white sm:text-[13px]">
                          {formatDuration(retard.duree_minutes)}
                          </span>
                      </div>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}