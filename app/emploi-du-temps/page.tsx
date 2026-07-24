import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Clock3,
  GraduationCap,
  Home,
  Menu,
  Save,
  ShieldCheck,
} from "lucide-react";
import styles from "./emploi-du-temps.module.css";

const teachers = ["Sélectionner un enseignant", "M. Mabirou", "Dr Ngoubou", "Dr Eyogo", "Dr Mavoungou"];
const classes = ["Sélectionner une classe", "Licence 1", "Licence 2", "Licence 3", "Master 1"];
const courses = ["Sélectionner un cours", "Algorithme complexe", "Base de données", "Réseaux informatique", "Analyse I"];
const subjects = ["Sélectionner une matière", "Algorithmique", "Base de données", "Réseaux", "Analyse"];
const rooms = ["Sélectionner une salle", "E45", "E40", "E52", "B12"];
const days = ["Sélectionner un jour", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const semesters = ["Sélectionner un semestre", "Semestre 1", "Semestre 2"];

type SelectFieldProps = {
  label: string;
  options: string[];
  required?: boolean;
  className?: string;
};

function SelectField({ label, options, required = false, className = "" }: SelectFieldProps) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      <span className={styles.selectWrap}>
        <select className={styles.control} defaultValue={options[0]} aria-label={label}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} aria-hidden="true" />
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
    <label className={styles.field}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      <span className={styles.timeWrap}>
        <Clock3 className={styles.timeIcon} aria-hidden="true" />
        <input className={styles.timeInput} type="text" placeholder="--:--" aria-label={label} />
      </span>
    </label>
  );
}

export default function EmploiDuTempsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.appFrame} aria-label="Interface emploi du temps">
        <aside className={styles.sidebar} aria-label="Navigation principale">
          <div className={styles.brand}>
            <div className={styles.brandBadge} aria-hidden="true">
              <ShieldCheck size={28} strokeWidth={1.7} />
            </div>
            <div className={styles.brandText}>
              <strong>Gestion des</strong>
              <span>retards</span>
            </div>
          </div>

          <span className={styles.menuTitle}>Menu principal</span>

          <nav className={styles.nav}>
            <a className={styles.navItem} href="#">
              <Home size={21} strokeWidth={1.8} aria-hidden="true" />
              <span>Accueil</span>
            </a>
            <a className={`${styles.navItem} ${styles.active}`} href="#">
              <CalendarDays size={21} strokeWidth={1.8} aria-hidden="true" />
              <span>Emploi du temps</span>
            </a>
            <a className={styles.navItem} href="#">
              <GraduationCap size={22} strokeWidth={1.8} aria-hidden="true" />
              <span>Classe</span>
            </a>
          </nav>
        </aside>

        <section className={styles.content}>
          <header className={styles.topbar}>
            <div className={styles.titleGroup}>
              <button className={styles.iconButton} type="button" aria-label="Ouvrir le menu">
                <Menu size={34} strokeWidth={1.6} />
              </button>
              <h1>Emploi du temps</h1>
            </div>

            <div className={styles.schoolCrest} aria-label="Logo université">
              <ShieldCheck size={28} strokeWidth={1.8} />
            </div>
          </header>

          <section className={styles.formPanel} aria-label="Ajouter un emploi du temps">
            <div className={styles.panelHeader}>
              <button className={styles.backButton} type="button" aria-label="Retour">
                <ArrowLeft size={22} strokeWidth={2} />
              </button>
              <div>
                <h2>Ajouter un emploi du temps</h2>
                <p>Complétez les informations ci-dessous pour créer un nouvel emploi du temps.</p>
              </div>
            </div>

            <div className={styles.separator} />

            <form id="emploi-du-temps-form" className={styles.formCard}>
              <div className={styles.cardTitle}>
                <span className={styles.calendarIcon} aria-hidden="true">
                  <CalendarDays size={22} strokeWidth={1.9} />
                </span>
                <h3>Informations Générales</h3>
              </div>

              <div className={styles.formGrid}>
                <SelectField label="Enseignants" options={teachers} required />
                <SelectField label="Classe" options={classes} required />
                <SelectField label="Cours" options={courses} required />

                <SelectField label="Matière" options={subjects} required />
                <SelectField label="Salle" options={rooms} required />
                <SelectField label="Jours de la semaine" options={days} required />

                <TimeField label="Heure de début" required />
                <div className={styles.gridSpacer} aria-hidden="true" />
                <TimeField label="Heure de fin" required />

                <SelectField label="Semetre" options={semesters} required className={styles.semesterField} />
              </div>
            </form>

            <div className={styles.actions}>
              <button className={styles.cancelButton} type="button">
                Annuler
              </button>
              <button className={styles.saveButton} type="submit" form="emploi-du-temps-form">
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
