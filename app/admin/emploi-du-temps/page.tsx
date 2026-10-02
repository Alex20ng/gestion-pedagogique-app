"use client";

import { Button } from "@/components/ui/button";
import {
  Clock3,
  Loader2,
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

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getEmploiTempsData, createScheduler, EmploiTempsData } from "./actions";
import { toast } from "sonner";

const dayOptions: Option[] = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"].map(
  (d) => ({ id: d, label: d })
);

type Option = {
  id: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: Option[];
  value: string;
  onValueChange: (id: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const EMPTY_EMPLOI_TEMPS_DATA: EmploiTempsData = {
  classes: [],
  salles: [],
  cours: [],
  parcours: [],
  enseignant: [],
};

function toStringValue(value: string | null): string {
  return value ?? "";
}

// "09:05" -> 545, pour comparer deux heures de début/fin.
function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

type TimePickerProps = {
  label: string;
  required?: boolean;
  value?: string; // format "HH:MM"
  onChange?: (value: string) => void;
};

function TimePicker({ label, required = false, value, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false);

  const current = value ?? "";
  const [hour, minute] = current ? current.split(":") : ["", ""];

  function setTime(nextHour: string, nextMinute: string) {
    onChange?.(`${nextHour}:${nextMinute}`);
  }

  return (
    <div className="grid min-w-0 gap-2 text-white">
      <span className="text-3xs font-semibold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label={label}
          className="flex w-full py-3.5 min-w-0 items-center gap-2.5 rounded-[13px] bg-[rgba(199,126,229,0.78)] px-3 text-left outline-none focus:ring-2 focus:ring-white/60"
        >
          <Clock3 className="h-5 w-5 shrink-0 text-white/85" aria-hidden="true" />
          <span
            className={`text-[13px] font-medium tracking-normal ${current ? "text-white" : "text-white/60"}`}
          >
            {current || "hh:mm"}
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
    </div>
  );
}


function SelectField({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  required = false,
}: SelectFieldProps) {
  const selectedLabel = options.find((option) => option.id === value)?.label;

  return (
    <div className="grid min-w-0 gap-2 text-white">
      <span className="text-3xs font-semibold leading-none tracking-normal">
        {label}
        {required && <span className="ml-0.5 text-[#ff6b38]">*</span>}
      </span>
      <Select
        value={value}
        onValueChange={(newValue) => onValueChange(toStringValue(newValue))}
      >
        <SelectTrigger
          className="py-6 w-full min-w-0 rounded-xl border-0 bg-[rgba(199,126,229,0.78)] px-3 text-[13px] font-medium tracking-normal text-white outline-none focus:ring-2 focus:ring-white/60 data-placeholder:text-white/85 [&>svg]:text-white [&>svg]:opacity-90"
          aria-label={label}
        >
          <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent className="max-sm:max-w-[90vw] border-white/10 bg-[#3a0055] text-white">
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="text-[13px] focus:bg-[rgba(199,126,229,0.35)] focus:text-white [&>span]:shrink [&>span]:whitespace-normal"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Skeleton (){
  return (
    <main className="min-h-screen text-white bg-[#310048]">
      <section className="min-w-0 pt-6 sm:pt-0">
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
            alt="Logo Université Denis Sassou-N'Guesso"
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
          <div className="grid grid-cols-2 gap-x-7.5 gap-y-6.5 sm:grid-cols-3">

              <div className="grid min-w-0 gap-2">
                <div className="h-3 w-28 animate-pulse rounded bg-white/20" />
                <div className="h-12.5 w-full animate-pulse rounded-xl bg-white/15" />
              </div>

              <div className="grid min-w-0 gap-2">
                <div className="h-3 w-32 animate-pulse rounded bg-white/20" />
                <div className="h-12.5 w-full animate-pulse rounded-[13px] bg-white/15" />
              </div>

              <div className="grid min-w-0 gap-2">
                <div className="h-3 w-28 animate-pulse rounded bg-white/20" />
                <div className="h-12.5 w-full animate-pulse rounded-[13px] bg-white/15" />
              </div>

              <div className="grid min-w-0 gap-2">
                <div className="h-3 w-20 animate-pulse rounded bg-white/20" />
                <div className="h-12.5 w-full animate-pulse rounded-xl bg-white/15" />
              </div>
          </div>

          <div className="flex justify-end gap-7 pr-13.75 pt-6.25 max-[700px]:gap-3 max-[700px]:pr-0 max-[460px]:flex-col-reverse max-[460px]:items-stretch">
            <div className="h-9 w-full animate-pulse rounded-full bg-white/15 sm:w-auto sm:min-w-26.75" />
            <div className="h-9 w-full animate-pulse rounded-full bg-white/15 sm:w-auto sm:min-w-31.75" />
          </div>
        </section>
      </section>
    </main>
  )
}

export default function EmploiDuTempsPage() {
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const [debut, setDebut] = useState<string>("");
  const [fin, setFin] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emploiTempsData, setEmploiTempsData] = useState<EmploiTempsData>(EMPTY_EMPLOI_TEMPS_DATA);

  const [enseignant, setEnseignant] = useState("");
  const [classe, setClasse] = useState("");
  const [cour, setCour] = useState("");
  const [salle, setSalle] = useState("");
  const [jour, setJour] = useState("");

  useEffect(() => {
    async function fetchInformations() {
      setIsLoadingData(true);
      try {
        const data = await getEmploiTempsData();

        setEmploiTempsData(data ?? EMPTY_EMPLOI_TEMPS_DATA);
      } catch (error){
          console.error("Erreur lors du chargement des données :", error);

        toast.error(
          "Impossible de charger les informations du formulaire."
        );
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchInformations();
  }, []);

  const handleCancel = () => {
    setJour("");
    setSalle("");
    setClasse("");
    setCour("");
    setDebut("");
    setFin("");
    setEnseignant("");
  }

  const optionsEnseignant: Option[] = emploiTempsData.enseignant.map((e) => ({
    id: String(e.id),
    label: `${e.nom} ${e.prenom}`,
  }));
  const optionsSalles: Option[] = emploiTempsData.salles.map((e) => ({
    id: String(e.id),
    label: e.libelle,
  }));
  const optionsClasses: Option[] = emploiTempsData.classes.map((e) => ({
    id: String(e.id),
    label: e.libelle,
  }));
  const optionsCours: Option[] = emploiTempsData.cours.map((e) => ({
    id: String(e.id),
    label: e.libelle,
  }));

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const missing: string[] = [];

    if (!enseignant) missing.push("l'enseignant");
    if (!classe) missing.push("la classe");
    if (!cour) missing.push("le cours");
    if (!jour) missing.push("le jour");
    if (!salle) missing.push("la salle");
    if (!debut) missing.push("l'heure de début");
    if (!fin) missing.push("l'heure de fin");

    if (missing.length > 0) {
      toast.error(`Veuillez renseigner ${missing.length > 1 ? "les champs" : "le champ"} suivant${missing.length > 1 ? "s" : ""} : ${missing.join(", ")}`);
      return;
    }

    if (toMinutes(fin) <= toMinutes(debut)) {
      toast.error("L'heure de fin doit être postérieure à l'heure de début");
      return;
    }

    setIsLoading(true);

    try {
      const { success, message } = await createScheduler(
        enseignant,
        cour,
        classe,
        salle,
        jour,
        debut,
        fin
      );

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      handleCancel();
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) return <Skeleton/>;

  return (
    <main className="min-h-screen text-white bg-[#310048]">
      <section className="min-w-0 pt-6 sm:pt-0">
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
            alt="Logo Université Denis Sassou-N'Guesso"
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
          <form
            id="emploi-du-temps-form"
            className="rounded-[39px] px-7 pb-5.25 pt-8.75"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-7.5 gap-y-6.5">
              <SelectField
                label="Enseignants"
                options={optionsEnseignant}
                value={enseignant}
                onValueChange={setEnseignant}
                placeholder="Sélectionner un enseignant"
                required
              />
              <SelectField
                label="Classe"
                options={optionsClasses}
                value={classe}
                onValueChange={setClasse}
                placeholder="Sélectionner une classe"
                required
              />
              <SelectField
                label="Cours"
                options={optionsCours}
                value={cour}
                onValueChange={setCour}
                placeholder="Sélectionner un cours"
                required
              />

              <SelectField
                label="Jours de la semaine"
                options={dayOptions}
                value={jour}
                onValueChange={setJour}
                placeholder="Sélectionner un jours"
                required
              />
              <TimePicker label="Heure de début" required value={debut} onChange={setDebut} />
              <TimePicker label="Heure de fin" required value={fin} onChange={setFin} />

              <SelectField
                label="Salle"
                options={optionsSalles}
                value={salle}
                onValueChange={setSalle}
                placeholder="Sélectionner une salle"
                required
              />

            </div>
            <div className="flex justify-end gap-7 pr-13.75 pt-6.25 max-[700px]:gap-3 max-[700px]:pr-0 max-[460px]:flex-col-reverse max-[460px]:items-stretch">
            <Button
              type="button"
              onClick={handleCancel}
              className="h-9 w-full border-0 bg-[rgba(203,164,218,0.86)] text-[12px] font-extrabold text-white hover:bg-[rgba(203,164,218,1)] sm:w-auto sm:min-w-26.75"
            >
              Annuler
            </Button>

            <Button
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 border-0 bg-[#061ed6] text-[12px] font-extrabold text-white hover:bg-[#0a26f0] sm:w-auto sm:min-w-31.75"
              type="submit"
              form="emploi-du-temps-form"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>
                    <Loader2 className="animate-spin" />
                  </span>
                  <p>Enregistrement...</p>
                </>
              ) : (
                <>
                  <Save size={15} strokeWidth={2} aria-hidden="true" />
                  <p>Enregistrement</p>
                </>
              )}
            </Button>
          </div>
          </form>

        </section>
      </section>
    </main>
  );
}