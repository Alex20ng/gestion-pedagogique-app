"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

    revalidatePath('/', 'layout');
    redirect("/etudiant")
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

    revalidatePath('/','layout')
    redirect("etudiant")
}