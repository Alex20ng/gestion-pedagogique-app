"use server";

import { createClient } from "@/lib/supabase/server";

export type Enseignant = {
  id: string;
  nom: string;
  prenom: string;
};

export type Infos = {
  id: string;
  libelle: string;
}

export type EmploiTemps = 
  | {
      success: true;
      message: string;
    }
  | {
    success: false;
    message: string;
  }

export type EmploiTempsData = {
  classes: Infos[];
  salles: Infos[];
  cours: Infos[];
  parcours: Infos[];
  enseignant: Enseignant[];
};

export async function getEmploiTempsData(): Promise<EmploiTempsData> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_emploi_temps_data");

  if (error) throw error.message;

  return data as EmploiTempsData;
}

export async function createScheduler(idEnseignant: string, idCour: string, idClasse: string, idSalle: string, jour: string, heureDebut: string, heureFin: string): Promise<EmploiTemps>{
    const supabase = await createClient();
    try{
      const { error } = await supabase.rpc("gen_emploi_temps",{
        p_id_enseignant: idEnseignant,
        p_id_cour: idCour,
        p_id_classe: idClasse,
        p_id_salle: idSalle,
        p_jour: jour,
        p_heure_debut: heureDebut,
        p_heure_fin: heureFin,
      })

      if (error) {
        console.log(`"Echec: ${error.message}`);
        return {
          success: false,
          message: "Echec de l'ajout de l'emploi du temps"
        }
      }

      return {
        success: true,
        message: "Ajout de l'emploi du temps avec succès"
      }

    }catch(error){
      throw error
    }

    

   
}
