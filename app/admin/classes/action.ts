"use server";

import { createClient } from "@/lib/supabase/server";

export type ParcoursClasses = 
    | {
        success: true;
        data: Record<string, unknown>
    }
    | {
        success: false;
        message: string;
    }

export type GenEmploiTemps =
    | {
        success: true;
        data: Record<string, unknown>;
    }
    | {
        success: false;
        message: string;
    }

export type EmploiTempsItem = {
  id: string;
  jour: string;
  heure_debut: string;
  heure_fin: string;
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
 
export type GetEmploiTempsResult =
  | {
      success: true;
      data: EmploiTempsItem[];
    }
  | {
      success: false;
      message: string;
    };

export async function get_parcours_classes(): Promise<ParcoursClasses>{
    const supabase = await createClient();

    try{
        const {data, error} = await supabase.rpc("get_parcours_classe");

        if (error){
            return {
                success: false,
                message: "Echec de la récupération des classes"
            }
        }

        return {
            success: true,
            data: data
        }
    } catch (error){
        throw error
    }
}
 
export async function getEmploiTemps(idClasse: string): Promise<GetEmploiTempsResult> {
  const supabase = await createClient();
 
  try {
    const { data, error } = await supabase.rpc("get_emploi_temps", {
      p_id_classe: idClasse,
    });
 
    if (error) {
      return {
        success: false,
        message: `Echec de l'obtention de l'emploi du temps: ${error.message}`,
      };
    }
 
    return {
      success: true,
      data: (data ?? []) as EmploiTempsItem[],
    };
  } catch (error) {
    throw error;
  }
}
 

