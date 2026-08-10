"use server";

import { createClient } from "@/lib/supabase/server";

export type RetardItem = {
  id: string;
  duree_minutes: number;
  created_at: string;
  enseignant: {
    id: string;
    nom: string;
    prenom: string;
  };
  cours: {
    id: string;
    libelle: string;
  };
  classe: {
    id: string;
    libelle: string;
  };
  salle: {
    id: string;
    libelle: string;
  };
};

export type GetAllRetardResult =
  | {
      success: true;
      data: RetardItem[];
    }
  | {
      success: false;
      message: string;
    };

export type Periode = "jour" | "semaine" | "mois";


export type EnseignantParParcours = {
  id_parcours: string;
  parcours: string;
  nombre_enseignants: number;
};
 
export type RetardParJour = {
  jour: string; // date "YYYY-MM-DD"
  label: string; // "YYYY-MM-DD"
  nombre_retards: number;
  total_minutes: number;
};
 
export type RetardParSemaine = {
  semaine: string; // date du lundi de la semaine, "YYYY-MM-DD"
  label: string; // format ISO semaine, ex: "2026-32"
  nombre_retards: number;
  total_minutes: number;
};
 
export type RetardParMois = {
  mois: string; // date "YYYY-MM-01"
  label: string; // "YYYY-MM"
  nombre_retards: number;
  total_minutes: number;
};
 
export type RetardParEnseignant = {
  id_enseignant: string;
  nom: string;
  prenom: string;
  nombre_retards: number;
  total_minutes: number;
};
 
export type DashboardStats = {
  enseignants_par_parcours: EnseignantParParcours[];
  retards_par_jour: RetardParJour[];
  retards_par_semaine: RetardParSemaine[];
  retards_par_mois: RetardParMois[];
  temps_total_retard_minutes: number;
  retards_par_enseignant: RetardParEnseignant[];
  total_enseignants: number;
};
 
export type GetDashboardStatsResult =
  | {
      success: true;
      data: DashboardStats;
    }
  | {
      success: false;
      message: string;
    };
 
export type DashboardStatsFilters = {
  parcoursId?: string | null;
  classeId?: string | null;
  enseignantId?: string | null;
};


export async function getAllRetard(periode: Periode): Promise<GetAllRetardResult> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("get_all_retard", {
      p_periode: periode,
    });

    if (error) {
      return {
        success: false,
        message: "Echec de la récupération des retards",
      };
    }

    return {
      success: true,
      data: (data ?? []) as RetardItem[],
    };
  } catch (error) {
    throw error;
  }
}
 
export async function getDashboardStats(
  filters: DashboardStatsFilters = {}
): Promise<GetDashboardStatsResult> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("admin_dashboard_kpis", {
      filtre_parcours: filters.parcoursId ?? null,
      filtre_classe: filters.classeId ?? null,
      filtre_enseignant: filters.enseignantId ?? null,
    });
 
    if (error) {
      return {
        success: false,
        message: `Echec de la récupération des statistiques: ${error.message}`,
      };
    }
 
    return {
      success: true,
      data: data as DashboardStats,
    };
  } catch (error) {
    throw error;
  }
}
