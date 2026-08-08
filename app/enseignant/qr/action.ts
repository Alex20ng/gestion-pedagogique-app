"use server"

import { createClient } from "@/lib/supabase/server";


export type GenQR =
  | {
      success: true;
      sessionId: string;
    }
  | {
      success: false;
      errorMessage: string;
    };

export async function generateSessionCode(): Promise<GenQR>{

  try {
    const supabase = await createClient();

    const {data, error} = await supabase.rpc("gen_qr");

    if (error){
      return {
        success: false,
        errorMessage: `${error.message}`
      }
    }

    return {
      success: true,
      sessionId: data
    };

  }catch(error) {
    throw error
  }
}