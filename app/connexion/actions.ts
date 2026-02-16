"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


export  async function login(formData: FormData){
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error){
        return {error: "Email ou mot de passe incorrect."};
    }

    const { data: roles  } = await supabase.rpc("get_user_role");

    if(roles.includes("etudiant")) {
        redirect("/etudiant");
    }
    if (roles.includes("enseignant")) {
        redirect("/enseignant");
    }
}

export async function SignUp(formData: FormData){
    const supabase = await createClient();

    const data = {
        email: formData.get('emaail') as string,
        password: formData.get('paassword') as string
    };

    const { error } = await supabase.auth.signUp(data);

    if(error){
        redirect('/erreur')
    }

    redirect("etudiant")
}