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

export async function getEnseignants(): Promise<Enseignant[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_enseignants");

  if (error) throw error;

  return data;
}

export async function getClasses(): Promise<Infos[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_classes");

  if (error) throw error;

  return data;
}

export async function getCours(): Promise<Infos[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_cours");

  if (error) throw error;

  return data;
}

export async function getSalles(): Promise<Infos[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_salles");

  if (error) throw error;

  return data;
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
