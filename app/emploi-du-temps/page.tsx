import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Clock3,
  GraduationCap,
  Home,
  Menu,
  Save,
} from "lucide-react";
import Image from "next/image";

const teachers = ["Sélectionner un enseignant", "M. Mabirou", "Dr Ngoubou", "Dr Eyogo", "Dr Mavoungou"];
const classes = ["Sélectionner une classe", "Licence 1", "Licence 2", "Licence 3", "Master 1"];
const courses = ["Sélectionner un cours", "Algorithme complexe", "Base de données", "Réseaux informatique", "Analyse I"];
const subjects = ["Sélectionner une matière", "Algorithmique", "Base de données", "Réseaux", "Analyse"];
const rooms = ["Sélectionner une salle", "E45", "E40", "E52", "B12"];
const days = ["Sélectionner un jour", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const semesters = ["Sélectionner un semestre", "Semestre 1", "Semestre 2"];

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

function SelectField({ label, options, required = false, className = "" }: SelectFieldProps) {
  return (
    <label className={`grid min-w-0 gap-2 text-white ${className}`}>
      <span className="text-[12px] font-extrabold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>
      <span className="relative block min-w-0">
        <select
          className="h-[53px] w-full appearance-none rounded-[13px] border-0 bg-[rgba(199,126,229,0.78)] px-3 pr-9 text-[10px] font-medium tracking-normal text-white outline-none [&_option]:bg-white [&_option]:text-[#2b003d]"
          defaultValue={options[0]}
          aria-label={label}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}

type TimeFieldProps = {
  label: string;
  required?: boolean;
};

function TimeField({ label, required = false }: TimeFieldProps) {
  return (
    <label className="grid min-w-0 gap-2 text-white">
      <span className="text-[12px] font-extrabold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>
      <span className="flex h-[53px] min-w-0 items-center gap-2.5 rounded-[13px] bg-[rgba(199,126,229,0.78)] px-3">
        <Clock3 className="h-[21px] w-[21px] shrink-0 text-white/85" aria-hidden="true" />
        <input
          className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-[10px] font-medium tracking-normal text-white outline-none placeholder:text-white/90"
          type="text"
          placeholder="--:--"
          aria-label={label}
        />
      </span>
    </label>
  );
}

export default function EmploiDuTempsPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#202020] p-6 text-white max-[920px]:place-items-stretch max-[920px]:p-0">
      <section
        className="grid min-h-[870px] w-[min(100%,1088px)] grid-cols-[204px_minmax(0,1fr)] overflow-hidden border border-white/10 bg-[#2b003d] shadow-[0_24px_70px_rgba(0,0,0,0.35)] max-[920px]:min-h-screen max-[920px]:w-full max-[920px]:grid-cols-[170px_minmax(0,1fr)] max-[700px]:grid-cols-1"
        aria-label="Interface emploi du temps"
      >
        <aside className="flex flex-col border-r border-black/35 bg-[#2a003d] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:border-black/35" aria-label="Navigation principale">
          <div className="flex min-h-[88px] items-center gap-[11px] border-b border-black/30 px-4 py-[18px] max-[700px]:min-h-0">
            <div className="grid h-[62px] w-[54px] shrink-0 place-items-center overflow-hidden">
              <Image
                src="/images/logo_UDSN.png"
                alt="Logo Université Denis Sassou-N'Guesso"
                width={54}
                height={62}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="grid gap-px text-[12px] font-bold leading-[1.08] text-white">
              <strong className="font-bold">Gestion des</strong>
              <span>retards</span>
            </div>
          </div>

          <span className="px-2 pb-2 pt-3 text-[12px] leading-none text-white/70">Menu principal</span>

          <nav className="grid gap-3 px-2.5 py-3 max-[700px]:grid-cols-3 max-[460px]:grid-cols-1" aria-label="Menu principal">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  className={`flex min-h-[42px] items-center gap-3.5 rounded px-2.5 text-[13px] font-bold text-white no-underline transition-colors hover:bg-white/10 max-[700px]:min-h-12 max-[700px]:justify-center max-[700px]:p-2 max-[700px]:text-center max-[460px]:justify-start ${
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

        <section className="min-w-0 bg-[#310048]">
          <header className="flex h-[88px] items-center justify-between border-b border-black/30 px-[18px] pl-4 max-[700px]:h-[76px]">
            <div className="flex min-w-0 items-center gap-6 max-[700px]:gap-3.5">
              <button className="grid h-12 w-12 place-items-center border-0 bg-transparent text-white" type="button" aria-label="Ouvrir le menu">
                <Menu size={34} strokeWidth={1.6} />
              </button>
              <h1 className="m-0 text-[25px] font-extrabold leading-none tracking-normal text-white max-[700px]:text-[21px]">
                Emploi du temps
              </h1>
            </div>

            <Image
              src="/images/logo_UDSN.png"
              alt="Logo Université Denis Sassou-N'Guesso"
              width={48}
              height={56}
              className="h-14 w-12 shrink-0 object-contain max-[460px]:hidden"
              priority
            />
          </header>

          <section
            className="mx-auto mb-6 mt-9 w-[min(calc(100%_-_44px),782px)] rounded-[42px] bg-gradient-to-b from-[#921dda] to-[#8a18d4] px-[21px] pb-[38px] pt-[17px] shadow-[0_22px_44px_rgba(0,0,0,0.16)] max-[920px]:w-[min(calc(100%_-_24px),760px)] max-[700px]:mt-5 max-[700px]:rounded-[30px] max-[460px]:w-[calc(100%_-_16px)] max-[460px]:px-3"
            aria-label="Ajouter un emploi du temps"
          >
            <div className="flex items-start gap-2 text-white">
              <button
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white/90 bg-white/10 p-0 text-white"
                type="button"
                aria-label="Retour"
              >
                <ArrowLeft size={22} strokeWidth={2} />
              </button>
              <div>
                <h2 className="m-0 text-[15px] font-extrabold leading-[1.15] tracking-normal text-white max-[460px]:text-[14px]">
                  Ajouter un emploi du temps
                </h2>
                <p className="mt-[3px] text-[10px] leading-tight text-white/85">
                  Complétez les informations ci-dessous pour créer un nouvel emploi du temps.
                </p>
              </div>
            </div>

            <div className="mt-[7px] h-px bg-white/45" />

            <form id="emploi-du-temps-form" className="rounded-[39px] bg-[rgba(190,88,220,0.40)] px-7 pb-[21px] pt-[35px] max-[700px]:rounded-[28px] max-[700px]:px-[18px] max-[700px]:pb-5 max-[700px]:pt-[26px]">
              <div className="mb-7 flex items-center gap-[9px] text-white">
                <span className="grid h-10 w-10 place-items-center rounded-lg border-2 border-white/85" aria-hidden="true">
                  <CalendarDays size={22} strokeWidth={1.9} />
                </span>
                <h3 className="m-0 text-[18px] font-extrabold leading-none tracking-normal text-white max-[460px]:text-[16px]">
                  Informations Générales
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-x-[30px] gap-y-[26px] max-[920px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-y-[18px]">
                <SelectField label="Enseignants" options={teachers} required />
                <SelectField label="Classe" options={classes} required />
                <SelectField label="Cours" options={courses} required />

                <SelectField label="Matière" options={subjects} required />
                <SelectField label="Salle" options={rooms} required />
                <SelectField label="Jours de la semaine" options={days} required />

                <TimeField label="Heure de début" required />
                <div className="block max-[920px]:hidden" aria-hidden="true" />
                <TimeField label="Heure de fin" required />

                <SelectField
                  label="Semestre"
                  options={semesters}
                  required
                  className="col-span-full w-[min(100%,604px)] justify-self-center max-[920px]:justify-self-stretch"
                />
              </div>
            </form>

            <div className="flex justify-end gap-[38px] pr-[55px] pt-[25px] max-[700px]:gap-3 max-[700px]:pr-0 max-[460px]:flex-col-reverse max-[460px]:items-stretch">
              <button className="h-[34px] min-w-[107px] border-0 bg-[rgba(203,164,218,0.86)] text-[12px] font-extrabold text-white max-[460px]:w-full" type="button">
                Annuler
              </button>
              <button
                className="inline-flex h-[34px] min-w-[126px] items-center justify-center gap-[5px] border-0 bg-[#061ed6] text-[12px] font-extrabold text-white max-[460px]:w-full"
                type="submit"
                form="emploi-du-temps-form"
              >
                <Save size={15} strokeWidth={2} aria-hidden="true" />
                Enregistrer
              </button>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}


