"use server";

import { createClient } from "@/lib/supabase/server";

type ScanQrResult =
  | {
      success: true;
      id_qr: string;
      id_emploi_temps: string;
      heure_prevue: string;
      heure_scan: string;
      duree_retard_minutes: number;
      is_late: boolean;
      id_retard: string | null;
    }
  | {
      success: false;
      error_code: string;
      message: string;
    };


export async function scanQr(token: string): Promise<ScanQrResult> {
  if (!token || typeof token !== "string") {
    return {
      success: false,
      error_code: "TOKEN INVALIDE",
      message: "Token manquant ou invalide.",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("scan_qr", {
    p_token: token,
  });

  if (error) {
    console.error("Erreur RPC scan_qr:", error);
    return {
      success: false,
      error_code: "RPC_ERROR",
      message: "Une erreur technique est survenue lors du scan.",
    };
  }

  // data est le jsonb retourné par la fonction SQL
  return data as ScanQrResult;
}
