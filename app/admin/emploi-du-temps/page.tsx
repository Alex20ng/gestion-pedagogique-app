"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Clock3,
  GraduationCap,
  Home,
  Save,
} from "lucide-react";
import {  
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import Image from "next/image";

const teachers = ["Sélectionner un enseignant", "M. Mabirou", "Dr Ngoubou", "Dr Eyogo", "Dr Mavoungou"];
const classes = ["Sélectionner une classe", "Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"];
const courses = ["Sélectionner un cours", "Algorithme complexe", "Base de données", "Réseaux informatique", "Analyse I"];
const subjects = ["Sélectionner une matière", "Algorithme complexe", "Base de données", "Réseaux", "Analyse"];
const rooms = ["Sélectionner une salle", "E45", "E40", "E52", "B12"];
const days = ["Sélectionner un jour", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const semesters = ["Sélectionner un semestre", "Semestre 1", "Semestre 2", "semestre 3", "semestre 4", "semestre 5", "semestre 6"];

const navItems = [
  { label: "Accueil", icon: Home, active: false },
  { label: "Emploi du temps", icon: CalendarDays, active: true },
  { label: "Classe", icon: GraduationCap, active: false },
];

type SelectFieldProps = {
  label: string;
  options: string[];
  required?: boolean;
  className?: string;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));
 
type TimePickerProps = {
  label: string;
  required?: boolean;
  value?: string; // format "HH:MM"
  onChange?: (value: string) => void;
};


function TimePicker({ label, required = false, value, onChange }: TimePickerProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [open, setOpen] = useState(false);
 
  const current = value ?? internalValue;
  const [hour, minute] = current ? current.split(":") : ["", ""];
 
  function setTime(nextHour: string, nextMinute: string) {
    const next = `${nextHour}:${nextMinute}`;
    setInternalValue(next);
    onChange?.(next);
  }
 
  return (
    <label className="grid min-w-0 gap-2 text-white">
      <span className="text-xs font-extrabold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>
 
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger 
          className="flex w-full py-3.5 min-w-0 items-center gap-2.5 rounded-[13px] bg-[rgba(199,126,229,0.78)] px-3 text-left outline-none focus:ring-2 focus:ring-white/60"
        >
          <Clock3 className="h-5 w-5 shrink-0 text-white/85" aria-hidden="true" />
          <span className="text-[13px] font-medium tracking-normal text-white">
            {current || "--:--"}
          </span>
        </PopoverTrigger>
 
        <PopoverContent
          align="start"
          className="w-auto border-white/10 bg-[#3a0055] p-2 text-white font-2xs"
        >
          <div className="flex gap-2">
            <div className="max-h-52 w-16 overflow-y-auto rounded-md">
              {HOURS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setTime(h, minute || "00")}
                  className={`block w-full rounded px-3 py-1.5 text-center text-[13px] hover:bg-[rgba(199,126,229,0.35)] ${
                    h === hour ? "bg-[rgba(199,126,229,0.6)] font-bold" : ""
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
            <div className="max-h-52 w-16 overflow-y-auto rounded-md">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setTime(hour || "00", m);
                    setOpen(false);
                  }}
                  className={`block w-full rounded px-3 py-1.5 text-center text-[13px] hover:bg-[rgba(199,126,229,0.35)] ${
                    m === minute ? "bg-[rgba(199,126,229,0.6)] font-bold" : ""
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </label>
  );
}


function SelectField({ label, options, required = false }: SelectFieldProps) {
  return (
    <label className="grid min-w-0 gap-2 text-white">
      <span className="text-3xs font-semibold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>
      <Select>
        <SelectTrigger
          className="py-6 w-full min-w-0 rounded-xl border-0 bg-[rgba(199,126,229,0.78)] px-3 text-[13px] font-medium tracking-normal text-white outline-none focus:ring-2 focus:ring-white/60 data-placeholder:text-white/85 [&>svg]:text-white [&>svg]:opacity-90"
          aria-label={label}
        >
          <SelectValue  placeholder={options[0]} />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-[#3a0055] text-white">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="text-[13px] focus:bg-[rgba(199,126,229,0.35)] focus:text-white"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export default function EmploiDuTempsPage() {
  const [debut, setDebut] = useState<string>("");
  const [fin, setFin] = useState<string>("");

  return (
    <main className="min-h-screen  text-white">
      <section
        className="grid  grid-cols-[204px_minmax(0,1fr)] overflow-hidden border border-white/10 bg-[#2b003d] shadow-[0_24px_70px_rgba(0,0,0,0.35)] max-[920px]:min-h-screen max-[920px]:w-full max-[920px]:grid-cols-[170px_minmax(0,1fr)] max-[700px]:grid-cols-1"
        aria-label="Interface emploi du temps"
      >
        <aside className="hidden min-h-screen sm:flex flex-col border-r border-black/35 bg-[#2a003d] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:border-black/35" aria-label="Navigation principale">
          <div className="flex min-h-20 items-center gap-2.75 border-b border-black/30 px-4 py-3 max-[700px]:min-h-0">
            <div className="grid h-15.5 w-13.5 shrink-0 place-items-center overflow-hidden">
              <Image
                src="/images/retard-clock.png"
                alt=" gestion des retards"
                width={54}
                height={54}
                className="h-11.5 w-11.5 object-contain"
                priority
              />
            </div>
            <div className="grid gap-px font-bold leading-[1.08] text-white">
              <h1 className="text-3xs font-semibold">Espace administrateur</h1>
            </div>
          </div>

          <span className="px-2 pb-2 pt-3 text-[12px] leading-none text-white/70">Menu principal</span>

          <nav className="grid gap-3 px-2.5 py-3 max-[700px]:grid-cols-3 max-[460px]:grid-cols-1" aria-label="Menu principal">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  className={`flex min-h-10.5 items-center gap-3.5 rounded px-2.5 text-[13px] font-bold text-white no-underline transition-colors hover:bg-white/10 max-[700px]:min-h-12 max-[700px]:justify-center max-[700px]:p-2 max-[700px]:text-center max-[460px]:justify-start ${
                    item.active ? "bg-[rgba(175,152,196,0.72)]" : ""
                  }`}
                  href="#"
                >
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 pt-6 sm:pt-0 bg-[#310048] ">
          <header className="flex h-22 items-center justify-between border-b border-black/30 px-4.5 pl-4 max-[700px]:h-19">
            <div className="min-w-0 items-center">
              <h1 className="m-0 text-[25px] font-extrabold leading-none tracking-normal text-white max-[700px]:text-[21px]">
                Emploi du temps
              </h1>
              <p className="mt-2 text-sm text-white/85">
                Complétez les informations ci-dessous pour créer un nouvel emploi du temps.
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

          <section
            className="mx-2 mb-6 rounded-xl pb-9.5 pt-4.25 "
            aria-label="Ajouter un emploi du temps"
          >
            <form id="emploi-du-temps-form" className="rounded-[39px] px-7 pb-5.25 pt-8.75">

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-7.5 gap-y-6.5">
                <SelectField label="Enseignants" options={teachers} required />
                <SelectField label="Classe" options={classes} required />
                <SelectField label="Cours" options={courses} required />

                <SelectField label="Matière" options={subjects} required />
                <SelectField label="Salle" options={rooms} required />
                <SelectField label="Jours de la semaine" options={days} required />

                <SelectField label="Semestre" options={semesters} required />
                <TimePicker label="Heure de début" required onChange={setDebut} />
                <TimePicker label="Heure de fin" required onChange={setFin}/>
              </div>
            </form>

            <div className="flex justify-end gap-7 pr-13.75 pt-6.25 max-[700px]:gap-3 max-[700px]:pr-0 max-[460px]:flex-col-reverse max-[460px]:items-stretch">
              <Button
                className="h-9 w-full border-0 bg-[rgba(203,164,218,0.86)] text-[12px] font-extrabold text-white hover:bg-[rgba(203,164,218,1)] sm:w-auto sm:min-w-26.75"
              >
                Annuler
              </Button>

              <Button
                className="inline-flex h-9 w-full items-center justify-center gap-1.5 border-0 bg-[#061ed6] text-[12px] font-extrabold text-white hover:bg-[#0a26f0] sm:w-auto sm:min-w-31.75"
                type="submit"
                form="emploi-du-temps-form"
              >
                <Save size={15} strokeWidth={2} aria-hidden="true" />
                Enregistrer
              </Button>

            </div>
          </section>
        </section>
      </section>
    </main>
  );
}