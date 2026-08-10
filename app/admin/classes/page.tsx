"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  ChevronDown,
  Loader2,
  MapPin,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { get_parcours_classes } from "./action";
import { getEmploiTemps, EmploiTempsItem } from "./action";
import { toast } from "sonner";

// --- Types correspondant au jsonb renvoyé par get_parcours_classes() ---
type Classe = {
  id: string;
  libelle: string;
};

type Parcours = {
  id: string;
  libelle: string;
  classes: Classe[];
};

// La fonction SQL renvoie un objet { [libelle_parcours]: Parcours }
type ParcoursMap = Record<string, Parcours>;

// Couleurs assignées cycliquement aux classes puisque l'API ne renvoie pas de couleur/effectif
const LEVEL_COLORS = [
  "bg-[#ef7d09]",
  "bg-[#358be6]",
  "bg-[#087310]",
  "bg-[#7b1126]",
  "bg-[#4b2fd6]",
];

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

// Mappe l'enum jour_semaine ("LUNDI", "MARDI", ...) vers le libellé affiché ("Lundi", "Mardi", ...)
const JOUR_LABELS: Record<string, string> = {
  LUNDI: "Lundi",
  MARDI: "Mardi",
  MERCREDI: "Mercredi",
  JEUDI: "Jeudi",
  VENDREDI: "Vendredi",
  SAMEDI: "Samedi",
  DIMANCHE: "Dimanche",
};

// "09:00:00" -> "9h00"
function formatHeure(time: string) {
  const [h, m] = time.split(":");
  return `${parseInt(h, 10)}h${m}`;
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split("h").map(Number);
  return hours * 60 + (minutes || 0);
}

type DisplayCourse = {
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
};

type SelectedClasse = { parcoursLibelle: string; classe: Classe } | null;

export default function ClassePage() {
  const [parcoursMap, setParcoursMap] = useState<ParcoursMap>({});
  const [isLoadingParcours, setIsLoadingParcours] = useState(true);
  const [openParcours, setOpenParcours] = useState<string>("");
  const [selectedClasse, setSelectedClasse] = useState<SelectedClasse>(null);

  const [emploiTemps, setEmploiTemps] = useState<EmploiTempsItem[]>([]);
  const [isLoadingEmploi, setIsLoadingEmploi] = useState(false);

  useEffect(() => {
    async function fetchParcours() {
      setIsLoadingParcours(true);

      try {
        const result = await get_parcours_classes();

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        const data = (result.data ?? {}) as ParcoursMap;
        setParcoursMap(data);

        const firstKey = Object.keys(data)[0];
        if (firstKey) setOpenParcours(firstKey);
      } finally {
        setIsLoadingParcours(false);
      }
    }

    fetchParcours();
  }, []);

  // Le RPC attend id_classe : on ne charge l'emploi du temps qu'une fois
  // une classe sélectionnée, pas tout le référentiel d'un coup.
  useEffect(() => {
    if (!selectedClasse) {
      setEmploiTemps([]);
      return;
    }

    let isCancelled = false;

    async function fetchEmploiTemps(classeId: string) {
      setIsLoadingEmploi(true);

      try {
        const result = await getEmploiTemps(classeId);

        if (isCancelled) return;

        if (!result.success) {
          toast.error(result.message);
          setEmploiTemps([]);
          return;
        }

        setEmploiTemps(result.data);
      } finally {
        if (!isCancelled) setIsLoadingEmploi(false);
      }
    }

    fetchEmploiTemps(selectedClasse.classe.id);

    return () => {
      isCancelled = true;
    };
  }, [selectedClasse]);

  function toggleClasse(parcoursLibelle: string, classe: Classe) {
    setSelectedClasse((prev) =>
      prev?.parcoursLibelle === parcoursLibelle && prev?.classe.id === classe.id
        ? null
        : { parcoursLibelle, classe }
    );
  }

  // emploiTemps est déjà filtré côté serveur (RPC appelé avec id_classe) :
  // on ne fait ici que reformater pour l'affichage du tableau.
  const coursesForSelectedClasse: DisplayCourse[] = useMemo(() => {
    return emploiTemps.map((item) => ({
      subject: item.cours.libelle,
      teacher: `${item.enseignant.nom} ${item.enseignant.prenom}`,
      room: item.salle.libelle,
      day: JOUR_LABELS[item.jour] ?? item.jour,
      startTime: formatHeure(item.heure_debut),
      endTime: formatHeure(item.heure_fin),
    }));
  }, [emploiTemps]);

  const timeSlots = useMemo(() => {
    return Array.from(
      new Map(
        coursesForSelectedClasse.map((course) => [
          `${course.startTime}-${course.endTime}`,
          { startTime: course.startTime, endTime: course.endTime },
        ])
      ).values()
    ).sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));
  }, [coursesForSelectedClasse]);

  const parcoursEntries = Object.entries(parcoursMap);

  return (
    <main className="min-h-screen bg-[#310048] pb-4 text-white">
      <section className="min-w-0 pt-6 sm:pt-0">
        <header className="flex min-h-18 flex-wrap items-center justify-between gap-3 border-b border-black/30 px-4 py-3 sm:h-22 sm:flex-nowrap sm:px-4.5 sm:pl-4 sm:py-0">
          <div className="min-w-0 items-center">
            <h1 className="m-0 truncate text-[19px] font-extrabold leading-tight tracking-tight text-white sm:text-[21px] lg:text-[25px]">
              Gestion des classes
            </h1>
            <p className="mt-1 text-xs text-white/70 sm:mt-2 sm:text-sm">
              Sélectionnez un parcours pour consulter ses classes et ses emplois du temps.
            </p>
          </div>

          <Image
            src="/images/logo_UDSN.png"
            alt="Logo Université Denis Sassou-N'Guesso"
            width={48}
            height={56}
            className="h-11 w-10 shrink-0 object-contain sm:h-14 sm:w-12 max-[460px]:hidden"
            priority
          />
        </header>

        <section className="mx-2 mb-6 mt-4 rounded-2xl border border-white/10 bg-white/3 px-4 sm:px-7">
          {isLoadingParcours ? (
            <div className="flex items-center justify-center gap-2 py-10 text-white/70">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span className="text-sm">Chargement des parcours...</span>
            </div>
          ) : parcoursEntries.length === 0 ? (
            <p className="py-10 text-center text-sm text-white/60">
              Aucun parcours trouvé.
            </p>
          ) : (
            <div className="flex w-full flex-col divide-y divide-white/10">
              {parcoursEntries.map(([parcoursLibelle, parcours]) => {
                const isOpen = openParcours === parcoursLibelle;

                return (
                  <section key={parcours.id} className="w-full py-5 sm:py-6">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenParcours(isOpen ? "" : parcoursLibelle)}
                      className="flex w-full items-center justify-between border-0 bg-transparent p-0 text-left text-[18px] font-semibold leading-none tracking-tight text-white transition-colors hover:text-white/85 sm:text-[21px]"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            isOpen ? "bg-[#c77ee5]" : "bg-white/25"
                          )}
                          aria-hidden="true"
                        />
                        {parcours.libelle}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-white/60 transition-transform duration-300",
                          isOpen && "rotate-180 text-white"
                        )}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={cn(
                        "grid overflow-hidden transition-all duration-300 ease-out",
                        isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="min-h-0">
                        {parcours.classes.length === 0 ? (
                          <p className="text-sm text-white/50">
                            Aucune classe pour ce parcours.
                          </p>
                        ) : (
                          <div
                            className={cn(
                              "grid w-full grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3",
                              parcours.classes.length > 3
                                ? "xl:max-w-245 xl:grid-cols-5"
                                : "lg:max-w-162.5 xl:max-w-190"
                            )}
                          >
                            {parcours.classes.map((classe, index) => {
                              const isSelected =
                                selectedClasse?.parcoursLibelle === parcoursLibelle &&
                                selectedClasse?.classe.id === classe.id;
                              const colorClass = LEVEL_COLORS[index % LEVEL_COLORS.length];

                              return (
                                <button
                                  key={classe.id}
                                  type="button"
                                  onClick={() => toggleClasse(parcoursLibelle, classe)}
                                  aria-pressed={isSelected}
                                  className={cn(
                                    colorClass,
                                    "group relative flex h-24 min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-0 px-4 text-center text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none",
                                    isSelected && "-translate-y-0.5 ring-2 ring-white ring-offset-2 ring-offset-[#310048]"
                                  )}
                                >
                                  <span
                                    className="pointer-events-none absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/5"
                                    aria-hidden="true"
                                  />
                                  <h2 className="relative m-0 text-[15px] font-extrabold leading-tight tracking-tight text-white">
                                    {classe.libelle}
                                  </h2>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </section>

        {selectedClasse && (
          <section className="mx-2 mb-6 animate-in fade-in slide-in-from-top-2 rounded-2xl border border-white/10 bg-white/3 px-4 py-5 duration-300 sm:px-7 sm:py-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                  Prévisualisation
                </p>
                <h2 className="m-0 truncate text-[18px] font-extrabold tracking-tight text-white sm:text-[20px]">
                  {selectedClasse.parcoursLibelle} — {selectedClasse.classe.libelle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClasse(null)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                Fermer
              </button>
            </div>

            {isLoadingEmploi ? (
              <div className="flex items-center justify-center gap-2 py-10 text-white/70">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span className="text-sm">Chargement de l'emploi du temps...</span>
              </div>
            ) : coursesForSelectedClasse.length === 0 ? (
              <p className="py-10 text-center text-sm text-white/60">
                Aucun cours programmé pour cette classe.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-180 border-separate border-spacing-2">
                  <thead>
                    <tr>
                      <th className="w-24 text-left text-[11px] font-semibold uppercase tracking-wide text-white/50" />
                      {weekDays.map((day) => (
                        <th
                          key={day}
                          className="px-1 pb-1 text-left text-[11px] font-semibold uppercase tracking-wide text-white/50"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={`${slot.startTime}-${slot.endTime}`}>
                        <td className="whitespace-nowrap pr-2 pt-3 align-top text-[11px] font-semibold text-white/60">
                          {slot.startTime} - {slot.endTime}
                        </td>
                        {weekDays.map((day) => {
                          const course = coursesForSelectedClasse.find(
                            (c) => c.day === day && c.startTime === slot.startTime && c.endTime === slot.endTime
                          );

                          return (
                            <td key={day} className="p-0 align-top">
                              {course ? (
                                <div className="min-h-20 rounded-xl border border-[rgba(199,126,229,0.35)] bg-[rgba(199,126,229,0.16)] px-3 py-2.5">
                                  <p className="m-0 flex items-center gap-1 text-[12px] font-bold leading-tight text-white">
                                    <BookOpen className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
                                    {course.subject}
                                  </p>
                                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-white/70">
                                    <User className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
                                    {course.teacher}
                                  </div>
                                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-white/70">
                                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
                                    {course.room}
                                  </div>
                                </div>
                              ) : (
                                <div className="min-h-20 rounded-xl border border-dashed border-white/10" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}