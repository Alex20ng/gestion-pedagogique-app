"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export const LoginForm = ({action}: {action: any}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData){
        // --- Logique Supabase désactivée temporairement (remplacement du backend en cours) ---
        // const result = await action(formData);
        // if(result?.error){
        //     toast.error("Email ou mot de passe incorrect.")
        // }

        // TODO: remplacer par l'appel au nouveau backend, puis rediriger
        // selon le rôle renvoyé (etudiant / enseignant)
        router.push("/etudiant/scanner");
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-white/80">Adresse mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="alexng@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#DA2A2A] bg-[#D9D9D980] px-3 text-white outline-none placeholder:text-white/40 lg:border-transparent lg:bg-black/70"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium text-white/80">Mot de passe</label>
                <div className="relative">
                    <input
                        type={isVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-xl border border-[#DA2A2A] bg-[#D9D9D980] px-3 pr-10 text-white outline-none placeholder:text-white/40 lg:border-transparent lg:bg-black/70"
                    />
                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {isVisible ? <Eye width={18} height={18} /> : <EyeOff width={18} height={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="mt-2 h-12 w-full rounded-full bg-[#0D0710] font-semibold text-white transition hover:bg-[#160B1A] active:scale-[0.98] lg:bg-black/70 lg:hover:bg-black/60"
            >
                Se connecter
            </button>

            <div className="flex items-center justify-between text-xs text-white/70">
                <Link href="">Pas de compte ?</Link>
                <Link href=""> </Link>
            </div>
        </form>
    )
}